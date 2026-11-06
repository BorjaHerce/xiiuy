/* ==========================================================================
   Xi'iuy Illustrated Interactive Dictionary - Main Application Logic
   Bilingual UI (ES / EN) · Search & Filters · Surrey-Style Inflection Paradigms
   ========================================================================== */

// ==========================================================================
// 1. Internationalization (Bilingual Strings & Domain Translations)
// ==========================================================================

const DOMAIN_I18N = {
  "All": { en: "All Categories", es: "Todas las Categorías" },
  "Animals": { en: "Animals", es: "Animales" },
  "Plants & Nature": { en: "Plants & Nature", es: "Plantas y Naturaleza" },
  "Body Parts": { en: "Body Parts", es: "Partes del Cuerpo" },
  "Food & Cooking": { en: "Food & Cooking", es: "Comida y Bebida" },
  "Tools & Instruments": { en: "Tools & Instruments", es: "Herramientas e Instrumentos" },
  "Household & Clothing": { en: "Household & Clothing", es: "Hogar y Ropa" },
  "People, Kinship & Society": { en: "People, Kinship & Society", es: "Personas, Parentesco y Sociedad" },
  "Actions & Verbs": { en: "Actions & Verbs", es: "Acciones y Verbos" },
  "Qualities & States": { en: "Qualities & States", es: "Cualidades y Estados" }
};

function getDomainLabel(entry) {
  if (!entry) return '';
  if (state.lang === 'es') {
    return entry.semantic_domain_es || (DOMAIN_I18N[entry.semantic_domain] && DOMAIN_I18N[entry.semantic_domain].es) || entry.semantic_domain || 'General';
  } else {
    return entry.semantic_domain_en || (DOMAIN_I18N[entry.semantic_domain] && DOMAIN_I18N[entry.semantic_domain].en) || entry.semantic_domain || 'General';
  }
}

const I18N = {
  en: {
    appTitle: "Xi'iuy Illustrated Dictionary",
    appSubtitle: "Central Pame (Oto-Manguean) · Santa María Acapulco, San Luis Potosí",
    statsBadge: "892 Words (676 Nouns · 216 Verbs)",
    helpBtn: "Orthography & Morphology Guide",
    searchPlaceholder: "Search by Spanish, English, Xi'iuy phonemic or local orthography...",
    posAll: "All (892)",
    posNouns: "Nouns (676)",
    posVerbs: "Verbs (216)",
    domainAll: "All Categories",
    citationLabel: "Citation Form:",
    citDefault: "Default First Form",
    citUnpossSg: "Unpossessed SG (Nouns)",
    cit1Sg: "1SG (My / I)",
    cit3Sg: "3SG (His / He)",
    cit2SgImp: "2SG Imperative (Verbs)",
    showingWords: "Showing {start}-{end} of {total} words",
    noResults: "No words found matching your search and filter criteria.",
    viewGrid: "Grid Cards",
    viewTable: "Table View",
    tableColIll: "Illustration",
    tableColPhonemic: "Phonemic (IPA)",
    tableColLocal: "Orthography",
    tableColSpanish: "Spanish",
    tableColEnglish: "English",
    tableColPos: "POS",
    tableColClass: "Class",
    tableColDomain: "Domain",
    tableColAudio: "Audio",
    btnListen: "Listen",
    btnViewParadigm: "Paradigm",
    modalParadigmTitle: "Inflectional Paradigm",
    viewmodeLabel: "Morphological Opposition Layer:",
    vmFull: "Phonological transcription",
    vmPrefixes: "Prefixes",
    vmStems: "Root / Stem Alternations",
    vmTones: "Tones",
    vmSuffixes: "Suffixes / Codas",
    vmLocal: "Orthography",
    legendTitle: "Morphological Oppositions (Allomorph Classes):",
    legendPrefix: "Prefix",
    legendStem: "Root / Stem",
    legendTone: "Tone",
    legendSuffix: "Suffix / Coda",
    inspectorTitle: "Cell Inspector",
    inspectorHoverHint: "Click or hover any cell to inspect its morphological layers and highlight allomorphs.",
    inspectorCellLabel: "Grammatical Cell:",
    inspectorPhonemic: "Phonological transcription:",
    inspectorLocal: "Orthography:",
    inspectorLayersBreakdown: "Morphological Layers Breakdown:",
    nounGroupUnposs: "Unpossessed Forms",
    nounGroupPossSg: "Possessed Singular (My, Your, His...)",
    nounGroupPossDu: "Possessed Dual (2 Items)",
    nounGroupPossPl: "Possessed Plural (Multiple Items)",
    verbTamPrs: "Present",
    verbTamPst: "Past",
    verbTamIrr: "Irrealis",
    verbTamSub: "Subjunctive",
    verbTamFut: "Future",
    verbTamImp: "Imperative",
    nounClassAlien: "Alienable Noun",
    nounClassInalien: "Inalienable Noun",
    nounClassAnimal: "Animal Noun",
    nounClassWeird: "Irregular Noun",
    guideTitle: "Xi'iuy Orthography & Paradigm Guide",
    guideClose: "Close",
    guideIntro: "Central Pame (Xi'iuy) is an Oto-Manguean language spoken in Santa María Acapulco, San Luis Potosí, Mexico. It is renowned in morphological theory for its rich inflectional synthesis involving four simultaneous morphological layers.",
    guideOrthoHeading: "Two Complementary Orthographies",
    guidePhonemicTitle: "1. Phonological transcription (IPA)",
    guidePhonemicDesc: "Used in peer-reviewed scientific literature (NoLePa & VeLePa). Accurately distinguishes tones (1, 2, 3 or H, L, F), consonant geminates (kk, pp, tt), nasal vowels (ã, ẽ, ĩ, õ, ũ), glottal stop (ʔ), velar nasal (ŋ), and morphological boundaries (-).",
    guideLocalTitle: "2. Orthography",
    guideLocalDesc: "Used by native speakers in Santa María Acapulco based on practical Mexican conventions: replaces ʔ with ', replaces h with j, replaces affricates with ch, replaces o with u, replaces w with v, replaces ŋ with ng (or ñ after i), and does not mark tones or geminates.",
    guideLayersHeading: "The Four Inflectional Layers (Surrey-Inspired)",
    guidePrefixDesc: "Marks person, number, and TAM (Present, Past, Irrealis, Subjunctive, Future, Imperative).",
    guideStemDesc: "Root vowel/onset alternations, palatalization, and suppletion.",
    guideToneDesc: "Distinctive tone-stress melody: High (H/1), Low (L/2), or Falling (F/3).",
    guideSuffixDesc: "Person and number agreement markers (e.g. -k, -ŋ', -m', -n, -p).",
    altAll: "All Alternation Types",
    altPrefInv: "Invariable Prefix",
    altPrefAlt: "Alternating Prefix",
    altStemInv: "Invariable Stem",
    altStemAlt: "Alternating Stem",
    altToneInv: "Invariable Tone",
    altToneAlt: "Alternating Tone",
    citeBtn: "Authorship & How to Cite",
    citeModalTitle: "Authorship, How to Cite & Acknowledgements",
    citeSectionDbHeading: "How to Cite This Online Interactive Database",
    citeSectionDbText: "<strong>Herce, Borja.</strong> (2026). <em>Xi'iuy Illustrated Dictionary: Interactive Lexical and Morphological Database of Central Pame (Santa María Acapulco)</em>. University of Zurich.",
    citeSectionPapersHeading: "Published Morphological Analyses & Inflected Lexicons (VeLePa & NoLePa)",
    citeSectionPapersIntro: "Detailed morphological analyses and computer-operable inflected lexicons of Central Pame verbal and nominal inflection have been published separately as <strong>VeLePa</strong> (Herce 2024) and <strong>NoLePa</strong> (Herce 2027):",
    citeVelepaTitle: "Verbal Inflection — VeLePa (Verbal Lexicon of Pame)",
    citeVelepaRef: "<strong>Herce, Borja.</strong> (2024). “VeLePa: Central Pame verbal inflection in a quantitative perspective.” <em>Morphology</em> 34 (3): 281–319. <br>📄 Article (DOI): <a href=\"https://doi.org/10.1007/s11525-024-09426-x\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #0f766e; font-weight: 600;\">https://doi.org/10.1007/s11525-024-09426-x</a> · 🗂️ OSF Repository: <a href=\"https://osf.io/xhyzm/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #0f766e; font-weight: 600;\">https://osf.io/xhyzm/</a>",
    citeNolepaTitle: "Nominal Inflection — NoLePa (Nominal Lexicon of Pame)",
    citeNolepaRef: "<strong>Herce, Borja.</strong> (2027). “NoLePa: Nominal inflection of Pame in quantitative perspective.” <br>🗂️ OSF Repository: <a href=\"https://osf.io/53pc9/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #0f766e; font-weight: 600;\">https://osf.io/53pc9/</a>",
    citeSectionSpeakersHeading: "Acknowledgement to Native Speakers of Xi'iuy",
    citeSectionSpeakersText: "I wish to express my deepest gratitude to the native speakers of Xi'iuy (Central Pame) from Santa María Acapulco who have worked with me over the years to teach me their language and generously share their knowledge, in particular <strong>Josefa Martínez</strong>, <strong>Brenda Montero</strong>, and <strong>Aniceto Rubio</strong>.",
    citeSectionFundingHeading: "Sources of Funding",
    citeSectionFundingIntro: "The fieldwork data collection and research underlying this database were supported by three grants and funding sources:",
    citeGrant1: "<strong>Swiss National Science Foundation (SNSF):</strong> Spark Grant No. <strong>220720</strong> and the National Centre of Competence in Research <strong>NCCR <em>Evolving Language</em></strong> (SNSF Agreement No. <strong>51NF40_180888</strong> / Grant No. <strong>225146</strong>).",
    citeGrant2: "<strong>Swiss Society for Endangered Languages (Schweizerische Gesellschaft für bedrohte Sprachen, SSEL):</strong> Fieldwork grant for the linguistic documentation of Central Pame.",
    citeGrant3: "<strong>St. Gallen Institute of Management in Latin America (GIMLA-HSG / Leading House for the Latin American Region)</strong> and the <strong>University of Zurich</strong> (UZH Postdoctoral Grant No. <strong>FK-24-077</strong>).",
    citeSectionAudioHeading: "Disclaimer on Sound Recordings",
    citeSectionAudioText: "⚠️ <strong>Important notice:</strong> The sound recordings in this interactive database were generated automatically via speech synthesis from the phonological transcription. They are intended strictly as an indicative approximation and are not always phonetically accurate."
  },
  es: {
    appTitle: "Diccionario Ilustrado Xi'iuy",
    appSubtitle: "Pame Central (Oto-mangue) · Santa María Acapulco, San Luis Potosí",
    statsBadge: "892 Palabras (676 Sustantivos · 216 Verbos)",
    helpBtn: "Guía de Ortografía y Morfología",
    searchPlaceholder: "Buscar por español, inglés, ortografía fonémica o local xi'iuy...",
    posAll: "Todos (892)",
    posNouns: "Sustantivos (676)",
    posVerbs: "Verbos (216)",
    domainAll: "Todas las Categorías",
    citationLabel: "Forma de Citación:",
    citDefault: "Primera forma por defecto",
    citUnpossSg: "No poseído SG (Sustantivos)",
    cit1Sg: "1SG (Mi / Yo)",
    cit3Sg: "3SG (Su / Él)",
    cit2SgImp: "2SG Imperativo (Verbos)",
    showingWords: "Mostrando {start}-{end} de {total} palabras",
    noResults: "No se encontraron palabras que coincidan con su búsqueda.",
    viewGrid: "Tarjetas",
    viewTable: "Tabla",
    tableColIll: "Ilustración",
    tableColPhonemic: "Transcripción fonológica",
    tableColLocal: "Ortografía",
    tableColSpanish: "Español",
    tableColEnglish: "Inglés",
    tableColPos: "Cat.",
    tableColClass: "Clase",
    tableColDomain: "Dominio",
    tableColAudio: "Audio",
    btnListen: "Escuchar",
    btnViewParadigm: "Paradigma",
    modalParadigmTitle: "Paradigma de Flexión",
    viewmodeLabel: "Capa de Oposición Morfológica:",
    vmFull: "Transcripción fonológica",
    vmPrefixes: "Prefijos",
    vmStems: "Alternancias de Raíz (Tema)",
    vmTones: "Tonos",
    vmSuffixes: "Sufijos / Codas",
    vmLocal: "Ortografía",
    legendTitle: "Oposiciones Morfológicas (Clases de Alomorfos):",
    legendPrefix: "Prefijo",
    legendStem: "Raíz / Tema",
    legendTone: "Tono",
    legendSuffix: "Sufijo / Coda",
    inspectorTitle: "Inspector de Casillas",
    inspectorHoverHint: "Pase el cursor o haga clic en cualquier celda para inspeccionar sus capas morfológicas y resaltar alomorfos.",
    inspectorCellLabel: "Casilla Gramatical:",
    inspectorPhonemic: "Transcripción fonológica:",
    inspectorLocal: "Ortografía:",
    inspectorLayersBreakdown: "Desglose de Capas Morfológicas:",
    nounGroupUnposs: "Formas No Poseídas",
    nounGroupPossSg: "Poseído Singular (Mi, Tu, Su...)",
    nounGroupPossDu: "Poseído Dual (2 Objetos)",
    nounGroupPossPl: "Poseído Plural (Varios Objetos)",
    verbTamPrs: "Presente",
    verbTamPst: "Pasado",
    verbTamIrr: "Irrealis",
    verbTamSub: "Subjuntivo",
    verbTamFut: "Futuro",
    verbTamImp: "Imperativo",
    nounClassAlien: "Sustantivo Alienable",
    nounClassInalien: "Sustantivo Inalienable",
    nounClassAnimal: "Sustantivo Animal",
    nounClassWeird: "Sustantivo Irregular",
    guideTitle: "Guía de Ortografía y Morfología Xi'iuy",
    guideClose: "Cerrar",
    guideIntro: "El pame central (xi'iuy) es una lengua de la familia oto-mangue hablada en Santa María Acapulco, San Luis Potosí, México. Es sumamente reconocida en la lingüística por su enorme complejidad morfológica distribuida en cuatro capas simultáneas.",
    guideOrthoHeading: "Dos Ortografías Complementarias",
    guidePhonemicTitle: "1. Transcripción fonológica (AFI)",
    guidePhonemicDesc: "Utilizada en las bases de datos de investigación (NoLePa y VeLePa). Representa con precisión los tonos (1, 2, 3 o H, L, F), consonantes geminadas (kk, pp, tt), vocales nasales (ã, ẽ, ĩ, õ, ũ), oclusión glotal (ʔ), nasal velar (ŋ) y fronteras de morfemas (-).",
    guideLocalTitle: "2. Ortografía",
    guideLocalDesc: "Utilizada por los hablantes nativos en Santa María Acapulco según las normas prácticas locales: reemplaza ʔ por ', h por j, africadas por ch, o por u, w por v, ŋ por ng (o ñ después de i), y omite tonos y consonantes dobles.",
    guideLayersHeading: "Las Cuatro Capas de Flexión (Inspirado en Surrey)",
    guidePrefixDesc: "Codifica persona, número y TAM (Presente, Pasado, Irrealis, Subjuntivo, Futuro, Imperativo).",
    guideStemDesc: "Alternancias de la raíz vocálica y consonántica, palatalización y supleción.",
    guideToneDesc: "Melodía tonal distintiva: Tono Alto (H/1), Tono Bajo (L/2) o Tono Descendente (F/3).",
    guideSuffixDesc: "Marcadores de concordancia de persona y número (ej. -k, -ŋ', -m', -n, -p).",
    altAll: "Todos los Tipos",
    altPrefInv: "Prefijo no alternante",
    altPrefAlt: "Prefijo alternante",
    altStemInv: "Tema no alternante",
    altStemAlt: "Tema alternante",
    altToneInv: "Tono no alternante",
    altToneAlt: "Tono alternante",
    citeBtn: "Autoría y cómo citar",
    citeModalTitle: "Autoría, Cómo Citar y Agradecimientos",
    citeSectionDbHeading: "Cómo citar esta base de datos interactiva",
    citeSectionDbText: "<strong>Herce, Borja.</strong> (2026). <em>Diccionario Ilustrado Xi'iuy: Base de datos léxica y morfológica interactiva del pame central (Santa María Acapulco)</em>. Universidad de Zúrich.",
    citeSectionPapersHeading: "Estudios morfológicos y bases de datos publicadas (VeLePa y NoLePa)",
    citeSectionPapersIntro: "Los análisis morfológicos detallados y los léxicos flexionados de la flexión verbal y nominal del pame central por separado han sido publicados como <strong>VeLePa</strong> (Herce 2024) y <strong>NoLePa</strong> (Herce 2027):",
    citeVelepaTitle: "Flexión verbal — VeLePa (Verbal Lexicon of Pame)",
    citeVelepaRef: "<strong>Herce, Borja.</strong> (2024). “VeLePa: Central Pame verbal inflection in a quantitative perspective.” <em>Morphology</em> 34 (3): 281–319. <br>📄 Artículo (DOI): <a href=\"https://doi.org/10.1007/s11525-024-09426-x\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #0f766e; font-weight: 600;\">https://doi.org/10.1007/s11525-024-09426-x</a> · 🗂️ Repositorio OSF: <a href=\"https://osf.io/xhyzm/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #0f766e; font-weight: 600;\">https://osf.io/xhyzm/</a>",
    citeNolepaTitle: "Flexión nominal — NoLePa (Nominal Lexicon of Pame)",
    citeNolepaRef: "<strong>Herce, Borja.</strong> (2027). “NoLePa: Nominal inflection of Pame in quantitative perspective.” <br>🗂️ Repositorio OSF: <a href=\"https://osf.io/53pc9/\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #0f766e; font-weight: 600;\">https://osf.io/53pc9/</a>",
    citeSectionSpeakersHeading: "Agradecimiento a los hablantes nativos de xi'iuy",
    citeSectionSpeakersText: "Quiero expresar mi más profundo agradecimiento a los hablantes nativos de xi'iuy (pame central) de Santa María Acapulco que han trabajado conmigo a lo largo de los años para enseñarme su lengua y compartir generosamente su conocimiento, en particular a <strong>Josefa Martínez</strong>, <strong>Brenda Montero</strong> y <strong>Aniceto Rubio</strong>.",
    citeSectionFundingHeading: "Fuentes de financiación",
    citeSectionFundingIntro: "El trabajo de campo y la investigación que han hecho posible esta base de datos han contado con el apoyo de tres fuentes principales de financiación:",
    citeGrant1: "<strong>Fondo Nacional Suizo para la Investigación Científica (Swiss National Science Foundation, SNSF):</strong> Beca Spark n.º <strong>220720</strong> y el Centro Nacional de Competencia en Investigación <strong>NCCR <em>Evolving Language</em></strong> (Acuerdo SNSF n.º <strong>51NF40_180888</strong> / Beca n.º <strong>225146</strong>).",
    citeGrant2: "<strong>Sociedad Suiza para las Lenguas Amenazadas (Swiss Society for Endangered Languages / Schweizerische Gesellschaft für bedrohte Sprachen, SSEL):</strong> Beca de trabajo de campo para la documentación lingüística del pame central.",
    citeGrant3: "<strong>Instituto de Gestión de San Galo en América Latina (St. Gallen Institute of Management in Latin America, GIMLA-HSG)</strong> y la <strong>Universidad de Zúrich</strong> (Beca posdoctoral UZH n.º <strong>FK-24-077</strong>).",
    citeSectionAudioHeading: "Nota sobre las grabaciones de sonido",
    citeSectionAudioText: "⚠️ <strong>Aviso importante:</strong> Los sonidos de las palabras en esta base de datos han sido generados automáticamente mediante síntesis de voz a partir de la transcripción fonológica. Tienen un carácter meramente orientativo e indicativo y no siempre son fonéticamente exactos."
  }
};

// ==========================================================================
// 2. Application State
// ==========================================================================
const state = {
  lang: 'es',              // 'es' | 'en'
  dictionary: null,        // Full master dictionary
  entries: [],             // Array of entries
  filteredEntries: [],     // Filtered entries
  currentEntry: null,      // Word currently inspected in modal
  
  // Filters
  searchQuery: '',
  posFilter: 'all',        // 'all' | 'noun' | 'verb'
  domainFilter: 'all',
  alternationFilter: 'all', // 'all' | 'pref_inv' | 'pref_alt' | 'stem_inv' | 'stem_alt' | 'tone_inv' | 'tone_alt'
  citationMode: 'default', // 'default' | 'unposs_sg' | 'poss_1sg' | 'poss_3sg' | 'imp_2sg'
  
  // View
  viewMode: 'grid',        // 'grid' | 'table'
  currentPage: 1,
  pageSize: 36,
  
  // Paradigm Surrey Morphological Oppositions
  paradigmLayerMode: 'local', // 'local' | 'full' | 'prefixes' | 'stems' | 'tones' | 'suffixes'
  activeTamTab: 'PRS',       // For verbs: PRS, PST, IRR, SUB, FUT, IMP
  selectedCell: null,        // Currently selected cell in inspector
  currentParadigmColorMap: null // Dynamic opposition color map for active word
};

// ==========================================================================
// Surrey Chichimec Morphological Oppositions Color Palettes
// ==========================================================================
const OPPOSITION_PALETTE = [
  { bg: '#dbeafe', border: '#93c5fd', text: '#1e40af', name: 'blue' },
  { bg: '#dcfce7', border: '#86efac', text: '#166534', name: 'green' },
  { bg: '#ffedd5', border: '#fdba74', text: '#9a3412', name: 'orange' },
  { bg: '#f3e8ff', border: '#d8b4fe', text: '#6b21a8', name: 'purple' },
  { bg: '#ccfbf1', border: '#5eead4', text: '#115e59', name: 'teal' },
  { bg: '#fce7f3', border: '#f472b6', text: '#9d174d', name: 'pink' },
  { bg: '#fef9c3', border: '#fde047', text: '#854d0e', name: 'yellow' },
  { bg: '#e0e7ff', border: '#a5b4fc', text: '#3730a3', name: 'indigo' },
  { bg: '#fae8ff', border: '#f0abfc', text: '#86198f', name: 'fuchsia' },
  { bg: '#ecfccb', border: '#bef264', text: '#3f6212', name: 'lime' },
  { bg: '#fee2e2', border: '#fca5a5', text: '#991b1b', name: 'red' },
  { bg: '#e0f2fe', border: '#7dd3fc', text: '#0369a1', name: 'sky' }
];

const NEUTRAL_PALETTE = { bg: '#f1f5f9', border: '#cbd5e1', text: '#475569', name: 'neutral' };

const TONE_PALETTE = {
  '1':  { bg: '#fee2e2', border: '#fca5a5', text: '#991b1b', name: 'Tono 1 (Alto / High)' },
  'H':  { bg: '#fee2e2', border: '#fca5a5', text: '#991b1b', name: 'Tono 1 (Alto / High)' },
  '1-': { bg: '#ede9fe', border: '#c4b5fd', text: '#5b21b6', name: 'Tono 1- (Prefijo Alto / Prefix High)' },
  'H-': { bg: '#ede9fe', border: '#c4b5fd', text: '#5b21b6', name: 'Tono 1- (Prefijo Alto / Prefix High)' },
  '2':  { bg: '#fef3c7', border: '#fcd34d', text: '#92400e', name: 'Tono 2 (Descendente / Falling)' },
  'F':  { bg: '#fef3c7', border: '#fcd34d', text: '#92400e', name: 'Tono 2 (Descendente / Falling)' },
  '3':  { bg: '#cffafe', border: '#67e8f9', text: '#155e75', name: 'Tono 3 (Bajo / Low)' },
  'L':  { bg: '#cffafe', border: '#67e8f9', text: '#155e75', name: 'Tono 3 (Bajo / Low)' },
  '0':  { bg: '#f1f5f9', border: '#cbd5e1', text: '#475569', name: '0 (Sin Tono)' },
  'default': { bg: '#f8fafc', border: '#e2e8f0', text: '#64748b', name: '—' }
};

// ==========================================================================
// 3. Data Initialization
// ==========================================================================
async function initApp() {
  renderI18n();

  // Try preloaded global data first (works for offline file://)
  if (window.XIIUY_DATA && window.XIIUY_DATA.entries) {
    console.log("Loaded dictionary from window.XIIUY_DATA");
    state.dictionary = window.XIIUY_DATA;
    state.entries = Object.values(window.XIIUY_DATA.entries);
    finishLoading();
    return;
  }

  // Fallback to fetch
  try {
    const res = await fetch('data/xiiuy_dictionary.json');
    const data = await res.json();
    state.dictionary = data;
    state.entries = Object.values(data.entries);
    finishLoading();
  } catch (err) {
    console.error("Failed to load dictionary data:", err);
    document.getElementById('wordsContainer').innerHTML = `
      <div style="padding: 3rem; text-align: center; color: #dc2626;">
        <h3>Error loading dictionary data</h3>
        <p>Could not fetch data/xiiuy_dictionary.json. Please ensure the file exists and is served properly.</p>
      </div>`;
  }
}

function finishLoading() {
  populateDomainFilter();
  applyFilters();
  setupEventListeners();
  updateStats();
}

// ==========================================================================
// 4. UI Rendering & Internationalization
// ==========================================================================
function setLanguage(lang) {
  if (state.lang === lang) return;
  state.lang = lang;
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  renderI18n();
  populateDomainFilter();
  renderResults();
  
  // If modal is open, re-render it
  if (state.currentEntry) {
    renderModalContent(state.currentEntry);
  }
}

function t(key) {
  const dict = I18N[state.lang] || I18N.en;
  return dict[key] || key;
}

function renderI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    el.innerHTML = t(key);
  });
  
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = t(key);
  });
  
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.dataset.i18nTitle;
    el.title = t(key);
  });
}

function updateStats() {
  const badge = document.getElementById('statsBadge');
  if (badge) {
    badge.textContent = t('statsBadge');
  }
}

// ==========================================================================
// 5. Semantic Domain Filter Population
// ==========================================================================
function populateDomainFilter() {
  const select = document.getElementById('domainFilter');
  if (!select) return;
  
  const currentVal = select.value || 'all';
  
  // Explicitly ordered categories matching user specifications
  const orderedKeys = [
    "Animals",
    "Plants & Nature",
    "Body Parts",
    "Food & Cooking",
    "Tools & Instruments",
    "Household & Clothing",
    "People, Kinship & Society",
    "Actions & Verbs",
    "Qualities & States"
  ];
  
  const domainsInUse = new Set();
  state.entries.forEach(e => {
    if (e.semantic_domain) domainsInUse.add(e.semantic_domain);
  });
  
  select.innerHTML = `<option value="all">${t('domainAll')}</option>`;
  
  orderedKeys.forEach(domKey => {
    if (domainsInUse.has(domKey)) {
      const opt = document.createElement('option');
      opt.value = domKey;
      const trans = DOMAIN_I18N[domKey];
      opt.textContent = (trans && trans[state.lang]) ? trans[state.lang] : domKey;
      select.appendChild(opt);
    }
  });
  
  // Any extra domain if present
  domainsInUse.forEach(domKey => {
    if (!orderedKeys.includes(domKey)) {
      const opt = document.createElement('option');
      opt.value = domKey;
      const trans = DOMAIN_I18N[domKey];
      opt.textContent = (trans && trans[state.lang]) ? trans[state.lang] : domKey;
      select.appendChild(opt);
    }
  });
  
  select.value = currentVal;
}

// ==========================================================================
// 6. Filtering & Search Logic
// ==========================================================================
function stripAccents(str) {
  return String(str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function cleanGlossItem(str) {
  return String(str || '')
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\d+$/g, '')
    .trim()
    .toLowerCase();
}

function extractGlossSynonyms(glossStr) {
  const cleanedFull = String(glossStr || '')
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/([a-záéíóúñ]+)o\/a\b/gi, '$1o, $1a');
  return cleanedFull
    .split(/[,;/]/)
    .map(s => s.replace(/\d+$/g, '').trim().toLowerCase())
    .filter(s => s.length > 0);
}

function isExactEntryMatch(entry, q, normQ) {
  // 1) Spanish synonyms or full Spanish gloss
  const esFull = cleanGlossItem(entry.spanish);
  if (esFull === q || stripAccents(esFull) === normQ) return true;
  const esSyns = extractGlossSynonyms(entry.spanish);
  for (let i = 0; i < esSyns.length; i++) {
    const syn = esSyns[i];
    if (syn === q || stripAccents(syn) === normQ) return true;
  }

  // 2) English synonyms or full English gloss
  const enFull = cleanGlossItem(entry.english);
  if (enFull === q || stripAccents(enFull) === normQ) return true;
  const enSyns = extractGlossSynonyms(entry.english);
  for (let i = 0; i < enSyns.length; i++) {
    const syn = enSyns[i];
    if (syn === q || stripAccents(syn) === normQ) return true;
  }

  // 3) Phonemic or local orthography citation forms
  const cit = getCitationDisplay(entry);
  const phon = String(entry.citation_phonemic || '').trim().toLowerCase();
  const loc = String(entry.citation_local || '').trim().toLowerCase();
  const citPhon = String(cit.phonemic || '').trim().toLowerCase();
  const citLoc = String(cit.local || '').trim().toLowerCase();

  if (
    phon === q || stripAccents(phon) === normQ ||
    loc === q || stripAccents(loc) === normQ ||
    citPhon === q || stripAccents(citPhon) === normQ ||
    citLoc === q || stripAccents(citLoc) === normQ
  ) {
    return true;
  }

  return false;
}

function applyFilters() {
  const q = state.searchQuery.toLowerCase().trim();
  const normQ = stripAccents(q);
  const pos = state.posFilter;
  const domain = state.domainFilter;
  const alt = state.alternationFilter || 'all';
  
  // Step 1: Filter by POS, semantic domain, and morphological alternation
  const baseCandidates = state.entries.filter(entry => {
    if (pos !== 'all' && entry.pos !== pos) return false;
    if (domain !== 'all' && entry.semantic_domain !== domain) return false;

    if (alt === 'pref_inv' && entry.has_prefix_alternation) return false;
    if (alt === 'pref_alt' && !entry.has_prefix_alternation) return false;
    if (alt === 'stem_inv' && entry.has_stem_alternation) return false;
    if (alt === 'stem_alt' && !entry.has_stem_alternation) return false;
    if (alt === 'tone_inv' && entry.has_tone_alternation) return false;
    if (alt === 'tone_alt' && !entry.has_tone_alternation) return false;
    
    return true;
  });

  // Step 2: Apply search query with Exact Match Priority
  if (!q) {
    state.filteredEntries = baseCandidates;
  } else {
    const exactMatches = baseCandidates.filter(entry => isExactEntryMatch(entry, q, normQ));
    if (exactMatches.length > 0) {
      state.filteredEntries = exactMatches;
    } else {
      state.filteredEntries = baseCandidates.filter(entry => {
        const es = (entry.spanish || '').toLowerCase();
        const en = (entry.english || '').toLowerCase();
        const phon = (entry.citation_phonemic || '').toLowerCase();
        const loc = (entry.citation_local || '').toLowerCase();
        const matchEs = es.includes(q) || stripAccents(es).includes(normQ);
        const matchEn = en.includes(q) || stripAccents(en).includes(normQ);
        const matchPhon = phon.includes(q) || stripAccents(phon).includes(normQ);
        const matchLocal = loc.includes(q) || stripAccents(loc).includes(normQ);
        return matchEs || matchEn || matchPhon || matchLocal;
      });
    }
  }
  
  state.currentPage = 1;
  renderResults();
}

const filterAndRender = applyFilters;

function isValidForm(val) {
  return typeof val === 'string' && val.trim() !== '' && val.trim() !== 'NA' && val.trim() !== '-';
}

// Get the display citation form based on state.citationMode
function getCitationDisplay(entry) {
  const mode = state.citationMode;
  const opts = entry.citation_options || {};
  const nonExistentLabel = state.lang === 'es' ? 'no existe' : 'nonexistent';
  
  if (mode === 'unposs_sg' && opts.unpossessed_sg) {
    if (isValidForm(opts.unpossessed_sg.phonemic)) {
      return {
        ...opts.unpossessed_sg,
        full_phonemic: opts.unpossessed_sg.full_phonemic || opts.unpossessed_sg.raw || opts.unpossessed_sg.phonemic
      };
    } else if (entry.pos === 'noun') {
      return { phonemic: nonExistentLabel, full_phonemic: nonExistentLabel, local: nonExistentLabel, nonexistent: true };
    }
  }
  if (mode === 'poss_1sg' && opts.possessed_1sg && isValidForm(opts.possessed_1sg.phonemic)) {
    return {
      ...opts.possessed_1sg,
      full_phonemic: opts.possessed_1sg.full_phonemic || opts.possessed_1sg.raw || opts.possessed_1sg.phonemic
    };
  }
  if (mode === 'poss_1sg' && opts.prs_1sg && isValidForm(opts.prs_1sg.phonemic)) {
    return {
      ...opts.prs_1sg,
      full_phonemic: opts.prs_1sg.full_phonemic || opts.prs_1sg.raw || opts.prs_1sg.phonemic
    };
  }
  if (mode === 'poss_3sg' && opts.possessed_3sg && isValidForm(opts.possessed_3sg.phonemic)) {
    return {
      ...opts.possessed_3sg,
      full_phonemic: opts.possessed_3sg.full_phonemic || opts.possessed_3sg.raw || opts.possessed_3sg.phonemic
    };
  }
  if (mode === 'poss_3sg' && opts.prs_3sg && isValidForm(opts.prs_3sg.phonemic)) {
    return {
      ...opts.prs_3sg,
      full_phonemic: opts.prs_3sg.full_phonemic || opts.prs_3sg.raw || opts.prs_3sg.phonemic
    };
  }
  if (mode === 'imp_2sg' && opts.imp_2sg) {
    if (isValidForm(opts.imp_2sg.phonemic)) {
      return {
        ...opts.imp_2sg,
        full_phonemic: opts.imp_2sg.full_phonemic || opts.imp_2sg.raw || opts.imp_2sg.phonemic
      };
    } else if (entry.pos === 'verb') {
      return { phonemic: nonExistentLabel, full_phonemic: nonExistentLabel, local: nonExistentLabel, nonexistent: true };
    }
  }
  
  // Default fallback
  const defPhon = isValidForm(entry.citation_phonemic) ? entry.citation_phonemic : nonExistentLabel;
  const defFullPhon = isValidForm(entry.citation_full_phonemic)
    ? entry.citation_full_phonemic
    : (opts.default && isValidForm(opts.default.full_phonemic || opts.default.raw)
        ? (opts.default.full_phonemic || opts.default.raw)
        : defPhon);
  return {
    phonemic: defPhon,
    full_phonemic: defFullPhon,
    local: isValidForm(entry.citation_local) ? entry.citation_local : nonExistentLabel,
    nonexistent: !isValidForm(entry.citation_phonemic)
  };
}

// ==========================================================================
// 7. Results Rendering (Cards & Table)
// ==========================================================================
function renderResults() {
  const container = document.getElementById('wordsContainer');
  if (!container) return;
  const countEl = document.getElementById('resultsCount');
  const total = state.filteredEntries.length;
  
  if (total === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; padding: 4rem 2rem; text-align: center; color: var(--text-muted); background: white; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
        <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🔍</div>
        <p style="font-size: 1.1rem; font-weight: 600;">${t('noResults')}</p>
      </div>`;
    if (countEl) countEl.textContent = '';
    renderPagination(0);
    return;
  }
  
  // Pagination slice
  const startIdx = (state.currentPage - 1) * state.pageSize;
  const endIdx = Math.min(startIdx + state.pageSize, total);
  const pageEntries = state.filteredEntries.slice(startIdx, endIdx);
  
  if (countEl) {
    countEl.textContent = t('showingWords')
      .replace('{start}', startIdx + 1)
      .replace('{end}', endIdx)
      .replace('{total}', total);
  }
  
  if (state.viewMode === 'grid') {
    renderGridView(container, pageEntries);
  } else {
    renderTableView(container, pageEntries);
  }
  
  renderPagination(total);
}

function renderGridView(container, entries) {
  container.className = 'words-grid';
  container.innerHTML = entries.map(entry => {
    const cit = getCitationDisplay(entry);
    const mainMeaning = state.lang === 'es' ? entry.spanish : entry.english;
    const secMeaning = state.lang === 'es' ? entry.english : entry.spanish;
    const posBadge = entry.pos === 'noun' ? 'badge-noun' : 'badge-verb';
    const posLabel = entry.pos === 'noun' 
      ? (state.lang === 'es' ? 'Sustantivo' : 'Noun')
      : (state.lang === 'es' ? 'Verbo' : 'Verb');
      
    const illSrc = (entry.illustration || `illustrations/${entry.id}.svg`) + '?v=4';
    
    return `
      <div class="word-card" data-id="${entry.id}">
        <div class="word-card-top">
          <div class="word-illustration-thumb">
            <img src="${illSrc}" alt="${mainMeaning}" loading="lazy" onerror="this.onerror=null; this.src='illustrations/noun_001.svg?v=4';">
          </div>
          <div class="word-card-header">
            <div class="word-phonemic">${cit.phonemic}</div>
            <div class="word-local">${cit.local}</div>
          </div>
          ${cit.nonexistent ? '' : `<button class="word-audio-btn" data-word="${encodeURIComponent(cit.full_phonemic || cit.phonemic)}" data-phon="${encodeURIComponent(cit.full_phonemic || cit.phonemic)}" data-tone="${extractTone(cit.full_phonemic || cit.phonemic)}" title="${t('btnListen')}" onclick="event.stopPropagation(); window.xiiuyAudio.pronounceWord(decodeURIComponent(this.dataset.word), this.dataset.tone, this, decodeURIComponent(this.dataset.phon));">
            🔊
          </button>`}
        </div>
        <div class="word-meanings">
          <div class="meaning-item">${mainMeaning}</div>
          <div class="meaning-secondary">${secMeaning}</div>
        </div>
        <div class="word-card-footer">
          <span class="badge ${posBadge}">${posLabel}</span>
          <span class="badge badge-domain">${getDomainLabel(entry)}</span>
        </div>
      </div>
    `;
  }).join('');
  
  // Attach card click handlers
  container.querySelectorAll('.word-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      const entry = state.entries.find(e => e.id === id);
      if (entry) openParadigmModal(entry);
    });
  });
}

function renderTableView(container, entries) {
  container.className = 'words-table-wrapper';
  const rows = entries.map(entry => {
    const cit = getCitationDisplay(entry);
    const posBadge = entry.pos === 'noun' ? 'badge-noun' : 'badge-verb';
    const posLabel = entry.pos === 'noun' 
      ? (state.lang === 'es' ? 'Sustantivo' : 'Noun')
      : (state.lang === 'es' ? 'Verbo' : 'Verb');
    const illSrc = (entry.illustration || `illustrations/${entry.id}.svg`) + '?v=4';

    return `
      <tr data-id="${entry.id}">
        <td>
          <div class="table-ill">
            <img src="${illSrc}" alt="${entry.spanish}" loading="lazy" onerror="this.onerror=null; this.src='illustrations/noun_001.svg?v=4';">
          </div>
        </td>
        <td><strong style="font-family: var(--font-serif); font-size: 1.05rem; color: var(--primary);">${cit.phonemic}</strong></td>
        <td><span class="word-local">${cit.local}</span></td>
        <td><strong>${entry.spanish}</strong></td>
        <td style="color: var(--text-muted);">${entry.english}</td>
        <td><span class="badge ${posBadge}">${posLabel}</span></td>
        <td><span class="badge badge-domain">${getDomainLabel(entry)}</span></td>
        <td>
          ${cit.nonexistent ? '' : `<button class="word-audio-btn" data-word="${encodeURIComponent(cit.full_phonemic || cit.phonemic)}" data-phon="${encodeURIComponent(cit.full_phonemic || cit.phonemic)}" data-tone="${extractTone(cit.full_phonemic || cit.phonemic)}" title="${t('btnListen')}" onclick="event.stopPropagation(); window.xiiuyAudio.pronounceWord(decodeURIComponent(this.dataset.word), this.dataset.tone, this, decodeURIComponent(this.dataset.phon));">
            🔊
          </button>`}
        </td>
      </tr>
    `;
  }).join('');
  
  container.innerHTML = `
    <table class="words-table">
      <thead>
        <tr>
          <th>${t('tableColIll')}</th>
          <th>${t('tableColPhonemic')}</th>
          <th>${t('tableColLocal')}</th>
          <th>${t('tableColSpanish')}</th>
          <th>${t('tableColEnglish')}</th>
          <th>${t('tableColPos')}</th>
          <th>${t('tableColDomain')}</th>
          <th>${t('tableColAudio')}</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
  
  container.querySelectorAll('tbody tr').forEach(row => {
    row.addEventListener('click', () => {
      const id = row.dataset.id;
      const entry = state.entries.find(e => e.id === id);
      if (entry) openParadigmModal(entry);
    });
  });
}

function extractTone(str) {
  if (!str) return '0';
  const m = str.match(/(?:LH-|H-|F-|L-|1-|2-|3-|[123HLF])/);
  return m ? m[0] : '0';
}

// ==========================================================================
// 8. Pagination Controls
// ==========================================================================
function renderPagination(total) {
  const container = document.getElementById('pagination');
  if (!container) return;
  
  const totalPages = Math.ceil(total / state.pageSize);
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }
  
  let html = `
    <button class="page-btn" ${state.currentPage === 1 ? 'disabled' : ''} onclick="changePage(${state.currentPage - 1})">
      ← ${state.lang === 'es' ? 'Anterior' : 'Previous'}
    </button>
  `;
  
  // Show page window
  const cur = state.currentPage;
  const maxButtons = 5;
  let startP = Math.max(1, cur - 2);
  let endP = Math.min(totalPages, startP + maxButtons - 1);
  if (endP - startP + 1 < maxButtons) {
    startP = Math.max(1, endP - maxButtons + 1);
  }
  
  if (startP > 1) {
    html += `<button class="page-btn" onclick="changePage(1)">1</button>`;
    if (startP > 2) html += `<span style="padding: 0 0.25rem;">...</span>`;
  }
  
  for (let p = startP; p <= endP; p++) {
    html += `
      <button class="page-btn ${p === cur ? 'active' : ''}" onclick="changePage(${p})">
        ${p}
      </button>
    `;
  }
  
  if (endP < totalPages) {
    if (endP < totalPages - 1) html += `<span style="padding: 0 0.25rem;">...</span>`;
    html += `<button class="page-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
  }
  
  html += `
    <button class="page-btn" ${state.currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${state.currentPage + 1})">
      ${state.lang === 'es' ? 'Siguiente' : 'Next'} →
    </button>
  `;
  
  container.innerHTML = html;
}

function changePage(newPage) {
  state.currentPage = newPage;
  renderResults();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================================================
// 9. Word Details & Surrey-Style Paradigm Modal
// ==========================================================================
function openParadigmModal(entry) {
  state.currentEntry = entry;
  state.selectedCell = null;
  
  // Default layer mode: Orthography ('local')
  state.paradigmLayerMode = 'local';
  state.activeTamTab = 'PRS';
  
  renderModalContent(entry);
  
  const backdrop = document.getElementById('paradigmModal');
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeParadigmModal() {
  const backdrop = document.getElementById('paradigmModal');
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
  state.currentEntry = null;
}

function renderModalContent(entry) {
  const cit = getCitationDisplay(entry);
  const mainMeaning = state.lang === 'es' ? entry.spanish : entry.english;
  const secMeaning = state.lang === 'es' ? entry.english : entry.spanish;
  const illSrc = (entry.illustration || `illustrations/${entry.id}.svg`) + '?v=4';
  
  // Header Elements
  document.getElementById('modalIll').src = illSrc;
  document.getElementById('modalWordPhonemic').textContent = entry.citation_phonemic || cit.phonemic;
  document.getElementById('modalWordLocal').textContent = entry.citation_local || cit.local;
  document.getElementById('modalMeanings').textContent = `${mainMeaning} · ${secMeaning}`;
  
  const classLabel = entry.pos === 'noun'
    ? (t('nounClass' + capitalize(entry.class)) || entry.class)
    : (entry.class || 'Regular');
    
  const pInv = !entry.has_prefix_alternation;
  const sInv = !entry.has_stem_alternation;
  const tInv = !entry.has_tone_alternation;

  const pBadgeClass = pInv ? 'badge-inv' : 'badge-alt';
  const sBadgeClass = sInv ? 'badge-inv' : 'badge-alt';
  const tBadgeClass = tInv ? 'badge-inv' : 'badge-alt';

  const pVal = Array.isArray(entry.unique_prefixes) ? entry.unique_prefixes.join('/') : (entry.unique_prefixes || '0');
  const sVal = Array.isArray(entry.unique_stems) ? entry.unique_stems.join('/') : (entry.unique_stems || '—');
  const tVal = Array.isArray(entry.unique_tones) ? entry.unique_tones.join('/') : (entry.unique_tones || '0');

  const pText = pInv 
    ? (state.lang === 'es' ? `Prefijo inv. [${pVal}-]` : `Inv. prefix [${pVal}-]`)
    : (state.lang === 'es' ? `Prefijo alt. (${pVal})` : `Alt. prefix (${pVal})`);
  const sText = sInv
    ? (state.lang === 'es' ? `Tema inv. [${sVal}-]` : `Inv. stem [${sVal}-]`)
    : (state.lang === 'es' ? `Tema alt. (${sVal})` : `Alt. stem (${sVal})`);
  const tText = tInv
    ? (state.lang === 'es' ? `Tono inv. (Tono ${tVal})` : `Inv. tone (Tone ${tVal})`)
    : (state.lang === 'es' ? `Tono alt. (${tVal})` : `Alt. tone (${tVal})`);

  const tagsContainer = document.getElementById('modalTags');
  tagsContainer.innerHTML = `
    <span class="badge ${entry.pos === 'noun' ? 'badge-noun' : 'badge-verb'}">
      ${entry.pos === 'noun' ? (state.lang === 'es' ? 'Sustantivo' : 'Noun') : (state.lang === 'es' ? 'Verbo' : 'Verb')}
    </span>
    <span class="badge badge-domain">${getDomainLabel(entry)}</span>
    <span class="badge" style="background: #e2e8f0; color: #334155;">${classLabel}</span>
    <span class="badge ${pBadgeClass}" title="${pText}">${pText}</span>
    <span class="badge ${sBadgeClass}" title="${sText}">${sText}</span>
    <span class="badge ${tBadgeClass}" title="${tText}">${tText}</span>
  `;
  
  // Modal audio button: Play Word pronunciation (SpeechSynthesis only)
  const fullPhonemicText = entry.citation_full_phonemic || entry.citation_phonemic || cit.full_phonemic || cit.phonemic || '';
  const toneVal = extractTone(fullPhonemicText);
  
  const audioBtn = document.getElementById('modalAudioBtn');
  if (audioBtn) {
    audioBtn.onclick = () => {
      window.xiiuyAudio.pronounceWord(fullPhonemicText, toneVal, audioBtn, fullPhonemicText);
    };
  }
  
  // Render Toolbar Viewmode Buttons
  renderToolbarButtons();
  
  // Render Paradigm Table Matrix
  renderParadigmMatrix(entry);
  
  // Render Inspector Initial State
  renderCellInspector(null);
}

function capitalize(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function computeParadigmColorMap(entry, mode) {
  if (!entry || !entry.paradigm) {
    return { colorMap: {}, counts: {}, targetKey: 'prefix' };
  }
  
  const p = entry.paradigm;
  const cells = Object.values(p).filter(c => c && isValidForm(c.full_phonemic));
  
  const colorMap = {};
  const counts = {};
  
  if (mode === 'tones') {
    cells.forEach(c => {
      const t = String(c.tone || '0');
      counts[t] = (counts[t] || 0) + 1;
      if (!colorMap[t]) {
        colorMap[t] = TONE_PALETTE[t] || TONE_PALETTE['default'];
      }
    });
    return { colorMap, counts, targetKey: 'tone' };
  }
  
  let targetKey = 'prefix';
  if (mode === 'prefixes') {
    targetKey = 'prefix';
  } else if (mode === 'stems' || mode === 'full' || mode === 'local') {
    targetKey = 'stem_onset';
  } else if (mode === 'suffixes') {
    targetKey = 'stem_coda';
  }
  
  // Count frequency of each unique allomorph value
  cells.forEach(c => {
    let val = c[targetKey];
    if (val === undefined || val === null || val === '') {
      if (targetKey === 'stem_coda') val = c.suffix || '0';
      else if (targetKey === 'stem_onset') val = c.stem || '—';
      else val = '0';
    }
    val = String(val);
    counts[val] = (counts[val] || 0) + 1;
  });
  
  // Sort values: '0' first if present, then alphabetical
  const uniqueVals = Object.keys(counts).sort((a, b) => {
    if (a === '0') return -1;
    if (b === '0') return 1;
    return a.localeCompare(b);
  });
  
  let palIdx = 0;
  uniqueVals.forEach(val => {
    if (val === '0') {
      colorMap[val] = NEUTRAL_PALETTE;
    } else {
      colorMap[val] = OPPOSITION_PALETTE[palIdx % OPPOSITION_PALETTE.length];
      palIdx++;
    }
  });
  
  return { colorMap, counts, targetKey };
}

function renderToolbarButtons() {
  const bar = document.getElementById('paradigmToolbar');
  if (!bar) return;
  
  const modes = [
    { id: 'local',    label: t('vmLocal'),    icon: '✏️' },
    { id: 'full',     label: t('vmFull'),     icon: '🔘' },
    { id: 'prefixes', label: t('vmPrefixes'), icon: '🔹' },
    { id: 'stems',    label: t('vmStems'),    icon: '🔸' },
    { id: 'tones',    label: t('vmTones'),    icon: '🎵' },
    { id: 'suffixes', label: t('vmSuffixes'), icon: '▫️' }
  ];
  
  bar.innerHTML = `
    <div class="viewmode-selector">
      <span class="viewmode-label">${t('viewmodeLabel')}</span>
      ${modes.map(m => `
        <button class="viewmode-btn ${state.paradigmLayerMode === m.id ? 'active' : ''}" data-mode="${m.id}">
          <span>${m.icon}</span> ${m.label}
        </button>
      `).join('')}
    </div>
    <div class="layer-legend-container" id="paradigmDynamicLegend">
      <!-- Injected by renderToolbarLegend() -->
    </div>
  `;
  
  bar.querySelectorAll('.viewmode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.paradigmLayerMode = btn.dataset.mode;
      renderToolbarButtons();
      renderParadigmMatrix(state.currentEntry);
      if (state.selectedCell) renderCellInspector(state.selectedCell);
    });
  });
  
  if (state.currentParadigmColorMap) {
    renderToolbarLegend(state.currentParadigmColorMap);
  }
}

function renderToolbarLegend(colorMapData) {
  const legendEl = document.getElementById('paradigmDynamicLegend');
  if (!legendEl || !colorMapData) return;
  
  const { colorMap, counts, targetKey } = colorMapData;
  const vals = Object.keys(colorMap);
  
  if (vals.length === 0) {
    legendEl.innerHTML = '';
    return;
  }
  
  const entry = state.currentEntry;
  const mode = state.paradigmLayerMode;
  let statusBannerHtml = '';
  
  if (entry) {
    if (mode === 'prefixes') {
      const pInv = !entry.has_prefix_alternation;
      const pVal = Array.isArray(entry.unique_prefixes) ? entry.unique_prefixes.join('/') : (entry.unique_prefixes || '0');
      const pCount = vals.length;
      if (pInv) {
        const pDisp = pVal === '0' ? (state.lang === 'es' ? 'cero (0-)' : 'zero (0-)') : `[${pVal}-]`;
        statusBannerHtml = `
          <div class="legend-status-banner status-invariable">
            <span>🛡️ ${state.lang === 'es' ? `Prefijo no alternante: ${pDisp}` : `Invariable prefix: ${pDisp}`}</span>
            <span class="badge badge-inv">${state.lang === 'es' ? 'Uniforme' : 'Uniform'}</span>
          </div>
        `;
      } else {
        statusBannerHtml = `
          <div class="legend-status-banner status-alternating">
            <span>🔄 ${state.lang === 'es' ? `Prefijo alternante (${pCount} alomorfos)` : `Alternating prefix (${pCount} allomorphs)`}</span>
            <span class="badge badge-alt">${state.lang === 'es' ? 'Oposición morfológica' : 'Morphological split'}</span>
          </div>
        `;
      }
    } else if (mode === 'stems') {
      const sInv = !entry.has_stem_alternation;
      const sVal = Array.isArray(entry.unique_stems) ? entry.unique_stems.join('/') : (entry.unique_stems || '—');
      const sCount = vals.length;
      if (sInv) {
        const sDisp = sVal === '0' ? (state.lang === 'es' ? 'vocal inicial (0-)' : 'initial vowel (0-)') : `[${sVal}-]`;
        statusBannerHtml = `
          <div class="legend-status-banner status-invariable">
            <span>🛡️ ${state.lang === 'es' ? `Tema no alternante: ${sDisp}` : `Invariable stem: ${sDisp}`}</span>
            <span class="badge badge-inv">${state.lang === 'es' ? 'Raíz constante' : 'Constant root'}</span>
          </div>
        `;
      } else {
        statusBannerHtml = `
          <div class="legend-status-banner status-alternating">
            <span>🔄 ${state.lang === 'es' ? `Tema alternante (${sCount} alomorfos de raíz)` : `Alternating stem (${sCount} root allomorphs)`}</span>
            <span class="badge badge-alt">${state.lang === 'es' ? 'Oposición de raíz' : 'Root split'}</span>
          </div>
        `;
      }
    } else if (mode === 'tones') {
      const tInv = !entry.has_tone_alternation;
      const tVal = Array.isArray(entry.unique_tones) ? entry.unique_tones.join('/') : (entry.unique_tones || '0');
      const tCount = vals.length;
      if (tInv) {
        let toneDesc = 'Tono ' + tVal;
        if (tVal === '1' || tVal === 'H') toneDesc = state.lang === 'es' ? 'Tono 1 (Alto)' : 'Tone 1 (High)';
        else if (tVal === '2' || tVal === 'F') toneDesc = state.lang === 'es' ? 'Tono 2 (Descendente)' : 'Tone 2 (Falling)';
        else if (tVal === '3' || tVal === 'L') toneDesc = state.lang === 'es' ? 'Tono 3 (Bajo)' : 'Tone 3 (Low)';
        else if (tVal === '1-' || tVal === 'H-') toneDesc = state.lang === 'es' ? 'Tono 1- (Prefijo Alto)' : 'Tone 1- (Prefix High)';
        
        statusBannerHtml = `
          <div class="legend-status-banner status-invariable">
            <span>🛡️ ${state.lang === 'es' ? `Tono no alternante: ${toneDesc}` : `Invariable tone: ${toneDesc}`}</span>
            <span class="badge badge-inv">${state.lang === 'es' ? 'Melodía constante' : 'Constant melody'}</span>
          </div>
        `;
      } else {
        statusBannerHtml = `
          <div class="legend-status-banner status-alternating">
            <span>🔄 ${state.lang === 'es' ? `Tono alternante (${tCount} melodías tonales)` : `Alternating tone (${tCount} tonal melodies)`}</span>
            <span class="badge badge-alt">${state.lang === 'es' ? 'Alternancia tonal' : 'Tonal split'}</span>
          </div>
        `;
      }
    } else if (mode === 'suffixes') {
      const sufInv = !entry.has_suffix_alternation;
      const sufCount = vals.length;
      if (sufInv) {
        statusBannerHtml = `
          <div class="legend-status-banner status-invariable">
            <span>🛡️ ${state.lang === 'es' ? 'Sufijo/coda no alternante' : 'Invariable suffix/coda'}</span>
            <span class="badge badge-inv">${state.lang === 'es' ? 'Constante' : 'Constant'}</span>
          </div>
        `;
      } else {
        statusBannerHtml = `
          <div class="legend-status-banner status-alternating">
            <span>🔄 ${state.lang === 'es' ? `Sufijo/coda alternante (${sufCount} variantes)` : `Alternating suffix/coda (${sufCount} variants)`}</span>
            <span class="badge badge-alt">${state.lang === 'es' ? 'Flexión de sufijo' : 'Suffix inflection'}</span>
          </div>
        `;
      }
    } else if (mode === 'full' || mode === 'local') {
      const pInv = !entry.has_prefix_alternation;
      const sInv = !entry.has_stem_alternation;
      const tInv = !entry.has_tone_alternation;
      statusBannerHtml = `
        <div class="legend-status-banner status-alternating" style="background: #f8fafc; border-color: #cbd5e1; color: #334155;">
          <span>
            <strong>${state.lang === 'es' ? 'Síntesis flexiva:' : 'Inflectional synthesis:'}</strong>
            ${pInv ? (state.lang === 'es' ? 'Prefijo inv.' : 'Inv. prefix') : (state.lang === 'es' ? 'Prefijo alt.' : 'Alt. prefix')} ·
            ${sInv ? (state.lang === 'es' ? 'Tema inv.' : 'Inv. stem') : (state.lang === 'es' ? 'Tema alt.' : 'Alt. stem')} ·
            ${tInv ? (state.lang === 'es' ? 'Tono inv.' : 'Inv. tone') : (state.lang === 'es' ? 'Tono alt.' : 'Alt. tone')}
          </span>
          <span style="font-size: 0.75rem; color: #64748b;">(${state.lang === 'es' ? 'Fondo coloreado por alternancia de raíz' : 'Background colored by root alternation'})</span>
        </div>
      `;
    }
  }

  const badges = vals.map(val => {
    const col = colorMap[val] || NEUTRAL_PALETTE;
    const cnt = counts[val] || 0;
    let label = val;
    if (targetKey === 'prefix') {
      label = val === '0' ? (state.lang === 'es' ? '0- (Sin prefijo)' : '0- (No prefix)') : val + '-';
    } else if (targetKey === 'stem_onset') {
      label = val === '0' ? (state.lang === 'es' ? '0- (Vocal inicial)' : '0- (Initial vowel)') : val + '- (Raíz)';
    } else if (targetKey === 'stem_coda') {
      label = val === '0' ? (state.lang === 'es' ? '0 (Sin sufijo/coda)' : '0 (No suffix/coda)') : '-' + val;
    } else if (targetKey === 'tone') {
      label = col.name || ('Tono ' + val);
    }
    
    return `
      <div class="legend-badge" 
           style="background: ${col.bg}; border-color: ${col.border}; color: ${col.text};" 
           data-feature-match="${val}"
           title="Resaltar casillas con ${label}">
        <span class="legend-swatch" style="background: ${col.text};"></span>
        <span class="legend-label">${label}</span>
        <span class="legend-count">${cnt}</span>
      </div>
    `;
  }).join('');
  
  legendEl.innerHTML = `
    ${statusBannerHtml}
    <div class="legend-title">${t('legendTitle')}</div>
    <div class="legend-badges-wrap">${badges}</div>
  `;
  
  legendEl.querySelectorAll('.legend-badge').forEach(b => {
    const fVal = b.dataset.featureMatch;
    b.addEventListener('mouseenter', () => {
      highlightFeatureCells(fVal);
    });
    b.addEventListener('mouseleave', () => {
      clearHighlightFeatureCells();
    });
    b.addEventListener('click', () => {
      highlightFeatureCells(fVal);
    });
  });
}

// Render Paradigm Matrix (Noun 36 cells vs Verb 58 cells)
function renderParadigmMatrix(entry) {
  const container = document.getElementById('paradigmTableArea');
  if (!container) return;
  
  // Compute Surrey Chichimec opposition colors
  state.currentParadigmColorMap = computeParadigmColorMap(entry, state.paradigmLayerMode);
  renderToolbarLegend(state.currentParadigmColorMap);
  
  if (entry.pos === 'noun') {
    renderNounParadigm(container, entry);
  } else {
    renderVerbParadigm(container, entry);
  }
}

// --------------------------------------------------------------------------
// Noun Paradigm Table Rendering (36 Cells)
// --------------------------------------------------------------------------
function renderNounParadigm(container, entry) {
  const p = entry.paradigm || {};
  
  // Unpossessed cells (cell1..cell3)
  const unpossCells = [p.cell1, p.cell2, p.cell3];
  
  // 11 Possessor Persons
  const persons = [
    { key: '1SG',     en: '1SG (My)',          es: '1SG (Mi)',             cells: ['cell4', 'cell15', 'cell26'] },
    { key: '1DU.EX',  en: '1DU.EX (Our 2 excl)', es: '1DU.EX (Nuestro 2 sin ti)', cells: ['cell5', 'cell16', 'cell27'] },
    { key: '1DU.INC', en: '1DU.INC (Our 2 incl)', es: '1DU.INC (Tú y yo)',       cells: ['cell7', 'cell18', 'cell29'] },
    { key: '1PL.EX',  en: '1PL.EX (Our 3+ excl)', es: '1PL.EX (Nuestro 3+ sin ti)',cells: ['cell6', 'cell17', 'cell28'] },
    { key: '1PL.INC', en: '1PL.INC (All of us)', es: '1PL.INC (Todos nosotros)', cells: ['cell8', 'cell19', 'cell30'] },
    { key: '2SG',     en: '2SG (Your)',        es: '2SG (Tu)',             cells: ['cell9', 'cell20', 'cell31'] },
    { key: '2DU',     en: '2DU (Your 2)',      es: '2DU (De ustedes 2)',   cells: ['cell10', 'cell21', 'cell32'] },
    { key: '2PL',     en: '2PL (Your 3+)',     es: '2PL (De ustedes 3+)',  cells: ['cell11', 'cell22', 'cell33'] },
    { key: '3SG',     en: '3SG (His/Her)',     es: '3SG (Su de él/ella)',  cells: ['cell12', 'cell23', 'cell34'] },
    { key: '3DU',     en: '3DU (Their 2)',     es: '3DU (De ellos 2)',     cells: ['cell13', 'cell24', 'cell35'] },
    { key: '3PL',     en: '3PL (Their 3+)',    es: '3PL (De ellos 3+)',    cells: ['cell14', 'cell25', 'cell36'] }
  ];
  
  let html = `
    <div style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 0.95rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.5rem;">
        ${t('nounGroupUnposs')}
      </h4>
      <div class="paradigm-table-container">
        <table class="paradigm-table">
          <thead>
            <tr>
              <th>Singular (SG)</th>
              <th>Dual (DU)</th>
              <th>Plural (PL)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${formatCellHTML(unpossCells[0])}</td>
              <td>${formatCellHTML(unpossCells[1])}</td>
              <td>${formatCellHTML(unpossCells[2])}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div>
      <h4 style="font-size: 0.95rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.5rem;">
        ${state.lang === 'es' ? 'Formas Poseídas (33 Casillas)' : 'Possessed Forms (33 Cells)'}
      </h4>
      <div class="paradigm-table-container">
        <table class="paradigm-table">
          <thead>
            <tr>
              <th style="text-align: left; min-width: 130px;">
                ${state.lang === 'es' ? 'Poseedor' : 'Possessor'}
              </th>
              <th>${t('nounGroupPossSg')}</th>
              <th>${t('nounGroupPossDu')}</th>
              <th>${t('nounGroupPossPl')}</th>
            </tr>
          </thead>
          <tbody>
            ${persons.map(pers => `
              <tr>
                <td style="text-align: left; font-weight: 600; color: #475569;">
                  ${state.lang === 'es' ? pers.es : pers.en}
                </td>
                <td>${formatCellHTML(p[pers.cells[0]])}</td>
                <td>${formatCellHTML(p[pers.cells[1]])}</td>
                <td>${formatCellHTML(p[pers.cells[2]])}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
  attachCellListeners(container);
}

// --------------------------------------------------------------------------
// Verb Paradigm Table Rendering (58 Cells)
// --------------------------------------------------------------------------
function renderVerbParadigm(container, entry) {
  const p = entry.paradigm || {};
  
  const tamList = [
    { key: 'PRS', label: t('verbTamPrs') },
    { key: 'PST', label: t('verbTamPst') },
    { key: 'IRR', label: t('verbTamIrr') },
    { key: 'SUB', label: t('verbTamSub') },
    { key: 'FUT', label: t('verbTamFut') },
    { key: 'IMP', label: t('verbTamImp') }
  ];
  
  // Person definitions for standard 11 cells
  const persons = [
    { id: '1.SG',    en: '1SG (I)',             es: '1SG (Yo)' },
    { id: '1DU.EX',  en: '1DU.EX (We 2 excl)',  es: '1DU.EX (Nosotros 2 sin ti)' },
    { id: '1DU.INC', en: '1DU.INC (We 2 incl)', es: '1DU.INC (Tú y yo)' },
    { id: '1PL.EX',  en: '1PL.EX (We 3+ excl)', es: '1PL.EX (Nosotros 3+ sin ti)' },
    { id: '1PL.INC', en: '1PL.INC (All of us)', es: '1PL.INC (Todos)' },
    { id: '2SG',     en: '2SG (You)',           es: '2SG (Tú)' },
    { id: '2DU',     en: '2DU (You 2)',         es: '2DU (Ustedes 2)' },
    { id: '2PL',     en: '2PL (You 3+)',        es: '2PL (Ustedes 3+)' },
    { id: '3SG',     en: '3SG (He/She)',        es: '3SG (Él/Ella)' },
    { id: '3DU',     en: '3DU (They 2)',        es: '3DU (Ellos 2)' },
    { id: '3PL',     en: '3PL (They 3+)',       es: '3PL (Ellos 3+)' }
  ];
  
  const activeTam = state.activeTamTab;
  
  let contentHtml = '';
  if (activeTam === 'IMP') {
    // 3 Imperative cells: 2SG.IMP, 2DU.IMP, 2PL.IMP
    contentHtml = `
      <div class="paradigm-table-container">
        <table class="paradigm-table">
          <thead>
            <tr>
              <th>2SG (You!)</th>
              <th>2DU (You 2!)</th>
              <th>2PL (You all!)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${formatCellHTML(p['2SG.IMP'])}</td>
              <td>${formatCellHTML(p['2DU.IMP'])}</td>
              <td>${formatCellHTML(p['2PL.IMP'])}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  } else {
    // 11 TAM cells for active TAM
    contentHtml = `
      <div class="paradigm-table-container">
        <table class="paradigm-table">
          <thead>
            <tr>
              <th style="text-align: left;">Person / Number</th>
              <th>Singular (SG)</th>
              <th>Dual (DU)</th>
              <th>Plural (PL)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: left; font-weight: 600;">1st Person Exclusive</td>
              <td>${formatCellHTML(p[`1.SG.${activeTam}`])}</td>
              <td>${formatCellHTML(p[`1DU.EX.${activeTam}`])}</td>
              <td>${formatCellHTML(p[`1PL.EX.${activeTam}`])}</td>
            </tr>
            <tr>
              <td style="text-align: left; font-weight: 600;">1st Person Inclusive</td>
              <td>${formatCellHTML(null)}</td>
              <td>${formatCellHTML(p[`1DU.INC.${activeTam}`])}</td>
              <td>${formatCellHTML(p[`1PL.INC.${activeTam}`])}</td>
            </tr>
            <tr>
              <td style="text-align: left; font-weight: 600;">2nd Person</td>
              <td>${formatCellHTML(p[`2SG.${activeTam}`])}</td>
              <td>${formatCellHTML(p[`2DU.${activeTam}`])}</td>
              <td>${formatCellHTML(p[`2PL.${activeTam}`])}</td>
            </tr>
            <tr>
              <td style="text-align: left; font-weight: 600;">3rd Person</td>
              <td>${formatCellHTML(p[`3SG.${activeTam}`])}</td>
              <td>${formatCellHTML(p[`3DU.${activeTam}`])}</td>
              <td>${formatCellHTML(p[`3PL.${activeTam}`])}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }
  
  let html = `
    <div class="tam-tabs">
      ${tamList.map(t => `
        <button class="tam-tab-btn ${state.activeTamTab === t.key ? 'active' : ''}" data-tam="${t.key}">
          ${t.label}
        </button>
      `).join('')}
    </div>
    ${contentHtml}
  `;
  
  container.innerHTML = html;
  
  // Attach TAM tab switcher
  container.querySelectorAll('.tam-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeTamTab = btn.dataset.tam;
      renderVerbParadigm(container, entry);
    });
  });
  
  attachCellListeners(container);
}

// --------------------------------------------------------------------------
// Cell Formatter (Surrey Chichimec Morphological Oppositions Display)
// --------------------------------------------------------------------------
function formatCellHTML(cell) {
  if (!cell || !isValidForm(cell.full_phonemic)) {
    const emptyLabel = state.lang === 'es' ? 'no existe' : 'nonexistent';
    return `<div class="paradigm-cell empty" style="color: #94a3b8; background: #f8fafc; border: 1px dashed #e2e8f0; font-style: italic; font-size: 0.85rem; cursor: default;">${emptyLabel}</div>`;
  }
  
  const mode = state.paradigmLayerMode;
  const colorData = state.currentParadigmColorMap || { colorMap: {}, targetKey: 'prefix' };
  const { colorMap, targetKey } = colorData;
  
  let featVal = cell[targetKey];
  if (featVal === undefined || featVal === null || featVal === '') {
    if (targetKey === 'stem_coda') featVal = cell.suffix || '0';
    else if (targetKey === 'stem_onset') featVal = cell.stem || '—';
    else featVal = '0';
  }
  featVal = String(featVal);
  
  const col = colorMap[featVal] || NEUTRAL_PALETTE;
  
  let display = '';
  if (mode === 'full') {
    display = cell.full_phonemic;
  } else if (mode === 'local') {
    display = isValidForm(cell.local) ? cell.local : cleanLocal(cell.full_phonemic);
  } else if (mode === 'prefixes') {
    const p = cell.prefix && cell.prefix !== '0' ? `${cell.prefix}-` : '0-';
    display = `<span class="cell-morpheme-text"><strong>${p}</strong></span>`;
  } else if (mode === 'stems') {
    const on = cell.stem_onset || '0';
    display = `<span class="cell-morpheme-text"><strong>${on}-</strong></span> <small class="cell-sub-stem">${cell.stem || ''}</small>`;
  } else if (mode === 'tones') {
    const tVal = cell.tone || '0';
    display = `<span class="cell-morpheme-text"><strong>Tono ${tVal}</strong></span>`;
  } else if (mode === 'suffixes') {
    const suf = (cell.stem_coda && cell.stem_coda !== '0') 
      ? `-${cell.stem_coda}` 
      : ((cell.suffix && cell.suffix !== '0') ? `-${cell.suffix}` : '0');
    display = `<span class="cell-morpheme-text"><strong>${suf}</strong></span>`;
  }
  // Fallback to local orthography if mode is unrecognized
  if (!display) {
    display = isValidForm(cell.local) ? cell.local : cell.full_phonemic;
  }
  
  const isSelected = state.selectedCell && state.selectedCell.cell_id === cell.cell_id;
  const jsonStr = encodeURIComponent(JSON.stringify(cell));
  
  return `
    <div class="paradigm-cell ${isSelected ? 'selected' : ''}" 
         data-cell="${jsonStr}"
         data-feature-val="${featVal}"
         data-cell-id="${cell.cell_id}"
         style="background: ${col.bg}; border-color: ${col.border}; color: ${col.text};">
      ${display}
    </div>
  `;
}

function cleanLocal(str) {
  if (!str) return '';
  return str.replace(/[-0-9HLF]/g, '').trim();
}

// --------------------------------------------------------------------------
// Interactive Cell Highlighting & Inspector
// --------------------------------------------------------------------------
function highlightFeatureCells(featVal) {
  const container = document.getElementById('paradigmTableArea');
  if (!container) return;
  const matchStr = String(featVal);
  container.querySelectorAll('.paradigm-cell:not(.empty)').forEach(c => {
    if (c.dataset.featureVal === matchStr) {
      c.classList.add('highlight-match');
      c.classList.remove('dimmed');
    } else {
      c.classList.remove('highlight-match');
      c.classList.add('dimmed');
    }
  });
}

function clearHighlightFeatureCells() {
  const container = document.getElementById('paradigmTableArea');
  if (!container) return;
  if (state.selectedCell) {
    const targetKey = state.currentParadigmColorMap ? state.currentParadigmColorMap.targetKey : 'prefix';
    let selVal = state.selectedCell[targetKey];
    if (selVal === undefined || selVal === null || selVal === '') {
      if (targetKey === 'stem_coda') selVal = state.selectedCell.suffix || '0';
      else if (targetKey === 'stem_onset') selVal = state.selectedCell.stem || '—';
      else selVal = '0';
    }
    highlightFeatureCells(selVal);
  } else {
    container.querySelectorAll('.paradigm-cell').forEach(c => {
      c.classList.remove('highlight-match');
      c.classList.remove('dimmed');
    });
  }
}

function attachCellListeners(container) {
  container.querySelectorAll('.paradigm-cell:not(.empty)').forEach(cellEl => {
    cellEl.addEventListener('mouseenter', () => {
      const featVal = cellEl.dataset.featureVal;
      highlightFeatureCells(featVal);
      const cellData = JSON.parse(decodeURIComponent(cellEl.dataset.cell));
      renderCellInspector(cellData);
    });
    
    cellEl.addEventListener('mouseleave', () => {
      clearHighlightFeatureCells();
    });
    
    cellEl.addEventListener('click', () => {
      container.querySelectorAll('.paradigm-cell').forEach(el => el.classList.remove('selected'));
      cellEl.classList.add('selected');
      const cellData = JSON.parse(decodeURIComponent(cellEl.dataset.cell));
      state.selectedCell = cellData;
      renderCellInspector(cellData);
      highlightFeatureCells(cellEl.dataset.featureVal);
      
      // Speak cell on click!
      if (isValidForm(cellData.full_phonemic) || isValidForm(cellData.surface_phonemic)) {
        window.xiiuyAudio.pronounceWord(cellData.full_phonemic || cellData.surface_phonemic, cellData.tone, null, cellData.full_phonemic || cellData.surface_phonemic);
      }
    });
  });
}

function renderCellInspector(cell) {
  const container = document.getElementById('cellInspectorArea');
  if (!container) return;
  
  if (!cell || !isValidForm(cell.full_phonemic)) {
    container.innerHTML = `
      <div class="cell-inspector">
        <div class="inspector-title">
          <span>${t('inspectorTitle')}</span>
        </div>
        <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
          ${t('inspectorHoverHint')}
        </p>
      </div>
    `;
    return;
  }
  
  const cellLabel = state.lang === 'es' ? (cell.label_es || cell.label_en) : cell.label_en;
  
  let toneDesc = 'Tono';
  const tVal = String(cell.tone || '');
  if (tVal === '1' || tVal === 'H') toneDesc = state.lang === 'es' ? 'Tono 1 (Alto)' : 'Tone 1 (High)';
  else if (tVal === '1-' || tVal === 'H-') toneDesc = state.lang === 'es' ? 'Tono 1- (Prefijo Alto)' : 'Tone 1- (Prefix High)';
  else if (tVal === '2' || tVal === 'F') toneDesc = state.lang === 'es' ? 'Tono 2 (Descendente)' : 'Tone 2 (Falling)';
  else if (tVal === '3' || tVal === 'L') toneDesc = state.lang === 'es' ? 'Tono 3 (Bajo)' : 'Tone 3 (Low)';
  else if (tVal === '0') toneDesc = state.lang === 'es' ? 'Sin tono distintivo' : 'Level / Default';
  
  const prefDisplay = (cell.prefix && cell.prefix !== '0') ? `${cell.prefix}-` : (state.lang === 'es' ? '0- (Sin prefijo)' : '0- (No prefix)');
  const stemDisplay = cell.stem || '—';
  const onsetDisplay = cell.stem_onset || '0';
  const codaDisplay = (cell.stem_coda && cell.stem_coda !== '0') 
    ? `-${cell.stem_coda}` 
    : ((cell.suffix && cell.suffix !== '0') ? `-${cell.suffix}` : (state.lang === 'es' ? '0 (Sin sufijo/coda)' : '0 (No suffix/coda)'));
  
  container.innerHTML = `
    <div class="cell-inspector">
      <div class="inspector-title">
        <span>${t('inspectorTitle')}</span>
        <div style="display: flex; gap: 4px; align-items: center;">
          <button class="word-audio-btn" style="width: 28px; height: 28px;" data-word="${encodeURIComponent(cell.full_phonemic || cell.surface_phonemic)}" data-phon="${encodeURIComponent(cell.full_phonemic || cell.surface_phonemic)}" data-tone="${cell.tone || '0'}" title="${t('btnListen')}" onclick="window.xiiuyAudio.pronounceWord(decodeURIComponent(this.dataset.word), this.dataset.tone, this, decodeURIComponent(this.dataset.phon))">
            🔊
          </button>
        </div>
      </div>
      
      <div class="inspector-cell-name">${cell.cell_id}</div>
      <div class="inspector-cell-desc">${cellLabel}</div>
      
      <div class="inspector-form-display">
        <div>
          <div class="inspector-phonemic">${cell.full_phonemic || '—'}</div>
          <div class="inspector-local">${cell.local || cleanLocal(cell.full_phonemic)}</div>
        </div>
      </div>
      
      <div class="inspector-layers-list">
        <div class="inspector-layer-row row-prefix">
          <span class="layer-key">${t('legendPrefix')}</span>
          <span class="layer-val"><strong>${prefDisplay}</strong></span>
        </div>
        <div class="inspector-layer-row row-stem">
          <span class="layer-key">${t('legendStem')}</span>
          <span class="layer-val"><strong>${onsetDisplay}-</strong> <small>(${stemDisplay})</small></span>
        </div>
        <div class="inspector-layer-row row-tone">
          <span class="layer-key">${t('legendTone')}</span>
          <span class="layer-val"><strong>${cell.tone || '0'}</strong> <small style="font-size: 0.75rem; font-weight: normal;">(${toneDesc})</small></span>
        </div>
        <div class="inspector-layer-row row-suffix">
          <span class="layer-key">${t('legendSuffix')}</span>
          <span class="layer-val"><strong>${codaDisplay}</strong></span>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// 10. Event Listeners Setup
// ==========================================================================
function setupEventListeners() {
  // Language Switch
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
  
  // Search Input
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (searchClear) {
        searchClear.style.display = state.searchQuery ? 'block' : 'none';
      }
      applyFilters();
    });
  }
  
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      searchClear.style.display = 'none';
      applyFilters();
      searchInput.focus();
    });
  }
  
  // POS Pills
  document.querySelectorAll('.pos-pills .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pos-pills .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.posFilter = btn.dataset.pos;
      applyFilters();
    });
  });
  
  // Semantic Domain Dropdown
  const domainSelect = document.getElementById('domainFilter');
  if (domainSelect) {
    domainSelect.addEventListener('change', (e) => {
      state.domainFilter = e.target.value;
      applyFilters();
    });
  }

  // Alternation Filter Dropdown
  const altSelect = document.getElementById('alternationFilter');
  if (altSelect) {
    altSelect.addEventListener('change', (e) => {
      state.alternationFilter = e.target.value;
      applyFilters();
    });
  }
  
  // Citation Form Selector
  const citSelect = document.getElementById('citationSelect');
  if (citSelect) {
    citSelect.addEventListener('change', (e) => {
      state.citationMode = e.target.value;
      renderResults();
    });
  }
  
  // View Toggle (Grid / Table)
  const btnGrid = document.getElementById('btnViewGrid');
  const btnTable = document.getElementById('btnViewTable');
  
  if (btnGrid && btnTable) {
    btnGrid.addEventListener('click', () => {
      state.viewMode = 'grid';
      btnGrid.classList.add('active');
      btnTable.classList.remove('active');
      renderResults();
    });
    
    btnTable.addEventListener('click', () => {
      state.viewMode = 'table';
      btnTable.classList.add('active');
      btnGrid.classList.remove('active');
      renderResults();
    });
  }
  
  // Modal Close
  const closeBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('paradigmModal');
  
  if (closeBtn) closeBtn.addEventListener('click', closeParadigmModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeParadigmModal();
    });
  }
  
  // Guide Modal
  const helpBtn = document.getElementById('helpBtn');
  const guideModal = document.getElementById('guideModal');
  const guideClose = document.getElementById('guideCloseBtn');
  
  if (helpBtn && guideModal) {
    helpBtn.addEventListener('click', () => guideModal.classList.add('open'));
  }
  if (guideClose && guideModal) {
    guideClose.addEventListener('click', () => guideModal.classList.remove('open'));
  }
  if (guideModal) {
    guideModal.addEventListener('click', (e) => {
      if (e.target === guideModal) guideModal.classList.remove('open');
    });
  }

  // Authorship & How to Cite Modal
  const citeBtn = document.getElementById('citeBtn');
  const citeModal = document.getElementById('citeModal');
  const citeClose = document.getElementById('citeCloseBtn');

  if (citeBtn && citeModal) {
    citeBtn.addEventListener('click', () => citeModal.classList.add('open'));
  }
  if (citeClose && citeModal) {
    citeClose.addEventListener('click', () => citeModal.classList.remove('open'));
  }
  if (citeModal) {
    citeModal.addEventListener('click', (e) => {
      if (e.target === citeModal) citeModal.classList.remove('open');
    });
  }
  
  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeParadigmModal();
      if (guideModal) guideModal.classList.remove('open');
      if (citeModal) citeModal.classList.remove('open');
    }
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });
}

// Kick off when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
