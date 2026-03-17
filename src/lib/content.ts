import type { Locale } from "./i18n";

export type LocalizedText = Record<Locale, string>;

export type ArtistData = {
  slug: string;
  name: string;
  expositionTitle: LocalizedText;
  subtitle?: LocalizedText;
  shortIntro?: LocalizedText;
  description: LocalizedText;
  heroImage: string;
  instagramUrl?: string;
  websiteUrl?: string;
  email?: string;
  phone?: string;
  dimensionsOrDuration?: LocalizedText;
  technique?: LocalizedText;
  price?: LocalizedText;
  order: number;
};

export type ExhibitionData = {
  slug: string;
  title: LocalizedText;
  subtitle?: LocalizedText;
  description: LocalizedText;
  venue: string;
  address?: string;
  dates: string;
  hours?: string;
  organizer?: string;
  curator?: string;
  heroImage: string;
  artists: string[];
  instagramUrl?: string;
  websiteUrl?: string;
  mapsUrl?: string;
};
