/* ==========================================================================
   Xi'iuy Audio & Phonetic Pronunciation Engine
   Clean Spanish-Based (es-MX) Phonemic Speech Synthesis Engine
   ========================================================================== */

class XiiuyAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.spanishVoice = null;
    this.initVoices();
  }

  /**
   * Find best matching Spanish voice for Mexican / Latin American Spanish
   */
  initVoices() {
    if (!this.synth || typeof this.synth.getVoices !== 'function') return;

    const findVoice = () => {
      const voices = this.synth.getVoices();
      if (!Array.isArray(voices) || voices.length === 0) return;

      // Priority: Mexican Spanish (es-MX), US/LatAm Spanish, any Spanish (es), then default
      this.spanishVoice =
        voices.find(v => v.lang === 'es-MX' && /paulina/i.test(v.name)) ||
        voices.find(v => v.lang === 'es-MX') ||
        voices.find(v => v.lang === 'es-US') ||
        voices.find(v => v.lang && v.lang.startsWith('es-419')) ||
        voices.find(v => v.lang && v.lang.startsWith('es')) ||
        voices[0];
    };

    findVoice();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = findVoice;
    }
  }

  /**
   * Lazily initialize Web Audio API context for subtle nasal vowel resonance
   */
  initAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  /**
   * Subtle 250 Hz French-style nasal formant murmur layered over nasalized vowels (ã, ẽ, ĩ, õ, ũ)
   * Avoids Spanish TTS pronouncing a consonant /n/ while giving true vocalic nasalization
   */
  playNasalVowelResonance(tone = '3') {
    const ctx = this.initAudioContext();
    if (!ctx) return;
    try {
      const t0 = ctx.currentTime + 0.08;
      const dur = 0.17;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const bp = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      const f0 = tone === '1' || tone === '1-' ? 235 : (tone === '2' ? 200 : 165);
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(f0, t0);
      if (tone === '2') {
        osc1.frequency.linearRampToValueAtTime(140, t0 + dur);
      }

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(260, t0);

      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(260, t0);
      bp.Q.setValueAtTime(3.0, t0);

      gain.gain.setValueAtTime(0.001, t0);
      gain.gain.linearRampToValueAtTime(0.055, t0 + 0.025);
      gain.gain.setValueAtTime(0.050, t0 + dur - 0.035);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);

      osc1.connect(bp);
      osc2.connect(bp);
      bp.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(t0);
      osc2.start(t0);
      osc1.stop(t0 + dur + 0.01);
      osc2.stop(t0 + dur + 0.01);
    } catch (e) {}
  }

  /**
   * Normalize and detect tone string
   * Handles 1, 2, 3, H, F, L, H-, 1-, LH-, etc.
   */
  detectTone(phonemicOrLocal, explicitTone = null) {
    const raw = String(explicitTone || phonemicOrLocal || '').toUpperCase();
    if (raw.includes('LH-')) return 'LH-';
    if (raw.includes('H-') || raw.includes('1-')) return '1-';
    if (raw.includes('1') || raw.includes('H')) return '1';
    if (raw.includes('2') || raw.includes('F')) return '2';
    if (raw.includes('3') || raw.includes('L')) return '3';
    return '0';
  }

  /**
   * Format phonemic/local text into clean phonetic text for Spanish SpeechSynthesis:
   *
   * 1. Stress Assignment:
   *    - Tone numbers (1, 2, 3) and tone letters (H, F, L) mark the stressed vowel.
   *    - That vowel receives a Spanish acute accent (á, é, í, ú) so the Spanish
   *      voice places primary stress on the exact stem syllable while keeping
   *      initial unstressed prefixes short and lower in pitch.
   *
   * 2. Vowel Mappings:
   *    - Phonemic 'o' and 'õ' correspond to IPA /u/ and /ũ/ everywhere.
   *    - Diphthongs (oa -> ua, oe -> ue, oi -> ui, ao -> au, eo -> eu) stay in one syllable.
   *
   * 3. Consonant Correspondences:
   *    - Intervocalic single 'd' -> alveolar flap 'r' ([ɾ]); geminate 'dd' -> stop 'd'.
   *    - Double consonants (kk, pp, tt, bb, gg, mm, nn, ss, ll, ww, xx, yy) collapse to single
   *      consonants so they are never read as two bursts or Spanish palatal 'll'.
   *    - 'w' / 'ww' -> 'b' (realized intervocalically in Spanish as bilabial [β]).
   *    - Post-consonantal 'y' before a vowel (e.g. i-wyo3, kyoa1ŋ) -> 'i' so Spanish
   *      pronounces the palatal glide [j] in a single syllable ([i'βju]) rather than [ʝ].
   *    - 'j' and 'h' -> 'j' (Mexican Spanish [x ~ h], never left silent like Spanish 'h').
   *    - 'iŋ' / 'ĩŋ' -> 'iñ' ([iɲ]); other 'ŋ' -> 'n' so final nasals are never dropped.
   *    - Glottal stops (' / ʔ) are stripped without inserting hyphens/spaces, preventing
   *      Spanish TTS from ever spelling out final letters (-n, -t, -mp) as "ene", "te", "eme-pe".
   */
  formatSpeechText(localOrPhonemic, phonemicHint = null) {
    const s1 = String(localOrPhonemic || '').trim();
    const s2 = String(phonemicHint || '').trim();

    // Prefer the string that contains phonemic annotations (numbers 1-3, H/F/L, IPA symbols)
    let raw = s2;
    if (!raw || (!/[123HFLʔŋɛæ]/.test(raw) && /[123HFLʔŋɛæ]/.test(s1))) {
      raw = s1;
    }
    if (!raw) raw = s1 || s2;

    // Take first form if comma-separated
    let txt = raw.split(',')[0].trim();
    if (!txt || txt === '—' || /no existe|nonexistent/i.test(txt)) return '';

    // Remove zero-prefix marker '0-'
    txt = txt.replace(/^0-/, '');

    // Normalize combining tilde sequences (e.g. ɛ̃, æ̃, ã, õ) before stress assignment
    txt = txt
      .replace(/a\u0303/g, 'ã')
      .replace(/e\u0303/g, 'ẽ')
      .replace(/i\u0303/g, 'ĩ')
      .replace(/o\u0303/g, 'õ')
      .replace(/u\u0303/g, 'ũ')
      .replace(/[æɛ]\u0303/g, 'ẽ');

    // Palatal nasal rule: iŋ / ĩŋ -> iñ (pronounced /iɲ/)
    txt = txt.replace(/([iĩ])([123HFL]?)ŋ+/g, '$1$2ñ');

    // Acute vowel mappings for lexical stress
    // Note: in Xi'iuy phonemic transcription, 'o' and 'õ' correspond to IPA /u/ and /ũ/
    const stressMap = {
      a: 'á', e: 'é', i: 'í', o: 'ú', u: 'ú',
      æ: 'é', ɛ: 'é',
      ã: 'á', ẽ: 'é', ĩ: 'í', õ: 'ú', ũ: 'ú',
      A: 'Á', E: 'É', I: 'Í', O: 'Ú', U: 'Ú'
    };

    const hasExplicitStress = /[123HFL]/.test(txt);

    // Rule 1: Numbers (1, 2, 3) and tone letters (H, F, L) indicate that the
    // vowel immediately before them carries primary lexical/phonetic stress
    if (hasExplicitStress) {
      txt = txt.replace(/([aeiouæɛãẽĩõũAEIOU])([123HFL])/g, (match, v) => {
        return stressMap[v] || v;
      });
    }

    // Strip remaining tone letters, numbers, and hyphens
    txt = txt.replace(/[123HFL]/g, '');
    txt = txt.replace(/-/g, '');

    // Rule 1b: Vowel 'o' corresponds to IPA /u/ everywhere in phonemic transcription
    txt = txt
      .replace(/õ/g, 'u')
      .replace(/Õ/g, 'U')
      .replace(/ó/g, 'ú')
      .replace(/Ó/g, 'Ú')
      .replace(/o/g, 'u')
      .replace(/O/g, 'U');

    // Rule 2: Intervocalic single 'd' is an alveolar flap [ɾ] (Spanish single 'r' in 'pero')
    // Double 'dd' is a stop [dː] and must NOT become a flap
    const vowels = 'aeiouáéíóúæɛãẽĩõũAEIOUÁÉÍÓÚ';
    const intervocalicSingleD = new RegExp('([' + vowels + '])(?<!d)d(?!d)([' + vowels + '])', 'g');
    txt = txt.replace(intervocalicSingleD, '$1r$2');

    // Rule 3: Collapse double/geminate affricates & map affricates
    // Preserve 'ts' as 'ts'; map tx / tʃ / tS / ʧ to Spanish 'ch'
    txt = txt.replace(/tts|tʦ/gi, 'ts');
    txt = txt.replace(/ʦ/g, 'ts');
    txt = txt.replace(/ttx|tʧ|ttʃ|tʃ|tS|ʧ|tx/g, 'ch');

    // Rule 4: 'x' corresponds to /ʃ/ -> 'sh'
    txt = txt.replace(/xx/gi, 'sh');
    txt = txt.replace(/x/gi, 'sh');

    // Rule 5: 'w' corresponds to /β/ -> 'b' (intervocalic Spanish 'b' is [β] and never spelled out)
    txt = txt.replace(/ww/gi, 'b');
    txt = txt.replace(/vv/gi, 'b');
    txt = txt.replace(/w/gi, 'b');
    txt = txt.replace(/v/gi, 'b');

    // Rule 6: Collapse all remaining double consonants (dd, kk, pp, tt, bb, gg, mm, nn, ss, ll, yy)
    // so SpeechSynthesis never reads 'll' as palatal /ʝ/ or double stops as two separate bursts
    txt = txt
      .replace(/dd/gi, 'd')
      .replace(/kk/gi, 'k')
      .replace(/pp/gi, 'p')
      .replace(/tt/gi, 't')
      .replace(/bb/gi, 'b')
      .replace(/gg/gi, 'g')
      .replace(/mm/gi, 'm')
      .replace(/nn/gi, 'n')
      .replace(/ss/gi, 's')
      .replace(/ll/gi, 'l')
      .replace(/yy/gi, 'y')
      .replace(/ʎ+/g, 'y');

    // Rule 6b: Post-consonantal 'y' before a vowel (e.g. i-wyo3 -> ibíu, kyoa1ŋ -> kiuán)
    // Convert 'y' to 'i' after any consonant (except 'c'/'s' in 'ch'/'sh') so Spanish
    // pronounces the approximant glide /j/ in a diphthong rather than obstruent /ʝ/
    txt = txt.replace(/([bdfgjklmnñpqrtvxz])y([aeiouáéíóú])/gi, '$1i$2');

    // Rule 7: Laryngeal fricative 'j' and 'h' -> Spanish 'j' ([x ~ h])
    // Protect 'ch' and 'sh' digraphs while ensuring every standalone 'h' or 'j' is pronounced as 'j'
    txt = txt.replace(/([^cs\s])h/gi, '$1j');
    txt = txt.replace(/^h/gi, 'j');
    txt = txt.replace(/jj+/gi, 'j');

    // Rule 8: Nasals (ɲ -> ñ; remaining ŋ -> n so Spanish TTS always articulates final nasals)
    txt = txt.replace(/ɲ/g, 'ñ');
    txt = txt.replace(/ŋ+/g, 'n');
    txt = txt.replace(/ngg+/gi, 'n');

    // Rule 9: Open & nasal vowels
    txt = txt.replace(/æ/g, 'e');
    txt = txt.replace(/ɛ/g, 'e');
    txt = txt.replace(/ã/g, 'a');
    txt = txt.replace(/ẽ/g, 'e');
    txt = txt.replace(/ĩ/g, 'i');
    txt = txt.replace(/ũ/g, 'u');

    // Rule 10: Glottal stop (' or ʔ)
    // Remove apostrophes/glottal stops without inserting spaces or hyphens so Spanish TTS
    // never splits the word or spells out final consonants (-n, -t, -mp) as letter names.
    txt = txt.replace(/['ʔ]+/g, '');

    // Rule 11: Root syllable stress for words without overt tone numbers
    if (!hasExplicitStress && !/[áéíóúÁÉÍÓÚ]/.test(txt)) {
      const prefixMatch = txt.match(/^(?:ka|ko|ku|ki|na|no|nu|to|tu|ta|ti|la|lo|lu|ba|bo|bu|bi|sh|sk|sn|sl)(.+)$/i);
      if (prefixMatch && prefixMatch[1]) {
        const root = prefixMatch[1].replace(/([aeiou])/i, (m, v) => stressMap[v.toLowerCase()] || v);
        txt = txt.slice(0, txt.length - prefixMatch[1].length) + root;
      } else {
        txt = txt.replace(/([aeiou])/i, (m, v) => stressMap[v.toLowerCase()] || v);
      }
    }

    txt = txt.replace(/\s+/g, ' ').trim();
    return txt;
  }

  /**
   * Play word pronunciation using ONLY clean Spanish SpeechSynthesis
   */
  pronounceWord(localOrPhonemic, tone = null, btnEl = null, phonemicHint = null) {
    // Support both (word, tone, btn, phon) and (word, btn)
    if (tone && typeof tone === 'object' && tone.classList) {
      btnEl = tone;
      tone = null;
    }

    if (btnEl && btnEl.classList) {
      btnEl.classList.add('playing');
      setTimeout(() => {
        if (btnEl && btnEl.classList) btnEl.classList.remove('playing');
      }, 850);
    }

    const tCode = this.detectTone(phonemicHint || localOrPhonemic, tone);

    if (!this.synth) return;

    const speechText = this.formatSpeechText(localOrPhonemic, phonemicHint);
    if (!speechText) return;

    try {
      this.synth.cancel();

      const utter = new SpeechSynthesisUtterance(speechText);
      if (this.spanishVoice) {
        utter.voice = this.spanishVoice;
        utter.lang = this.spanishVoice.lang || 'es-MX';
      } else {
        utter.lang = 'es-MX';
      }

      utter.rate = 0.92;

      // Utterance pitch calibration based on tone
      if ( tCode === '1') {
        utter.pitch = 1.45;
      } else if (tCode === '2') {
        utter.pitch = 1.10;
      } else if (tCode === '3') {
        utter.pitch = 0.78;
      } else if (tCode === '1-') {
        utter.pitch = 1.38;
      } else {
        utter.pitch = 1.0;
      }

      const rawCheck = String(phonemicHint || localOrPhonemic || '');
      if (/[ãẽĩõũ\u0303]/.test(rawCheck)) {
        utter.onstart = () => {
          this.playNasalVowelResonance(tCode);
        };
      }

      this.synth.speak(utter);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
    }
  }

  /**
   * Alias for pronounceWord
   */
  speak(localOrPhonemic, tone = null, btnEl = null, phonemicHint = null) {
    return this.pronounceWord(localOrPhonemic, tone, btnEl, phonemicHint);
  }

  /**
   * Stop any active audio
   */
  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

window.xiiuyAudio = new XiiuyAudioEngine();
