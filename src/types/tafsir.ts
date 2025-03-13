export interface Tafsir {
  verses: Verses;
  resource_id: number;
  resource_name: string;
  language_id: number;
  slug: string;
  translated_name: TranslatedName;
  text: string;
}

export interface Verses {
  "2:2": N22;
}

export interface N22 {
  id: number;
  words: Word[];
}

export interface Word {
  id: number;
  position: number;
  audio_url?: string;
  verse_key: string;
  verse_id: number;
  location: string;
  text_uthmani: string;
  code_v1: string;
  char_type_name: string;
  page_number: number;
  line_number: number;
  text: string;
  translation: Translation;
  transliteration: Transliteration;
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

export interface TranslatedName {
  name: string;
  language_name: string;
}
