export interface Chapter {
  verses: Verse[];
}

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number: any;
  text_uthmani: string;
  chapter_id: number;
  page_number: number;
  juz_number: number;
  words: Word[];
  timestamps: Timestamps;
  translations: VerseTranslation[];
}

export interface Word {
  id: number;
  position: number;
  audio_url?: string;
  verse_key: string;
  verse_id: number;
  location: string;
  text_uthmani: string;
  text_indopak: string;
  qpc_uthmani_hafs: string;
  char_type_name: string;
  page_number: number;
  line_number: number;
  text: string;
  translation: Translation;
  transliteration: Transliteration;
  css_class?: string;
}

export interface Translation {
  text: string;
  language_name: string;
  language_id: number;
}

export interface Transliteration {
  text?: string;
  language_name: string;
  language_id: number;
}

export interface Timestamps {
  timestamp_from: number;
}

export interface VerseTranslation {
  id: number;
  resource_id: number;
  text: string;
}
export interface ChapterV2 {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: TranslatedName;
}

export interface TranslatedName {
  language_name: string;
  name: string;
}
