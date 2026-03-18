import type { ArtistData } from "../lib/content";

const posterFallback = "/exhibition/poster/fluid-poster.jpg";

function genericArtist(
  slug: string,
  name: string,
  order: number,
  isPlural = false,
): ArtistData {
  return {
    slug,
    name,
    expositionTitle: {
      ca: isPlural ? "Artistes participants a FLUID" : "Artista participant a FLUID",
      es: isPlural ? "Artistas participantes en FLUID" : "Artista participante en FLUID",
      en: isPlural ? "Participating artists in FLUID" : "Participating artist in FLUID",
    },
    subtitle: {
      ca: "Santlluc Cercle Artístic · Barcelona",
      es: "Santlluc Cercle Artístic · Barcelona",
      en: "Santlluc Cercle Artístic · Barcelona",
    },
    shortIntro: {
      ca: isPlural
        ? `${name} participen a FLUID, exposició col·laborativa de Santlluc Cercle Artístic.`
        : `${name} participa a FLUID, exposició col·laborativa de Santlluc Cercle Artístic.`,
      es: isPlural
        ? `${name} participan en FLUID, exposición colaborativa de Santlluc Cercle Artístic.`
        : `${name} participa en FLUID, exposición colaborativa de Santlluc Cercle Artístic.`,
      en: isPlural
        ? `${name} participate in FLUID, a collaborative exhibition by Santlluc Cercle Artístic.`
        : `${name} participates in FLUID, a collaborative exhibition by Santlluc Cercle Artístic.`,
    },
    description: {
      ca: isPlural
        ? `${name} apareixen a l’afisha oficial de FLUID com a artistes participants. El text individual i els detalls específics de l’obra s’afegiran quan arribin els materials finals.`
        : `${name} apareix a l’afisha oficial de FLUID com a artista participant. El text individual i els detalls específics de l’obra s’afegiran quan arribin els materials finals.`,
      es: isPlural
        ? `${name} aparecen en el cartel oficial de FLUID como artistas participantes. El texto individual y los detalles específicos de la obra se añadirán cuando lleguen los materiales finales.`
        : `${name} aparece en el cartel oficial de FLUID como artista participante. El texto individual y los detalles específicos de la obra se añadirán cuando lleguen los materiales finales.`,
      en: isPlural
        ? `${name} are listed on the official FLUID poster as participating artists. The individual text and specific artwork details will be added when the final materials arrive.`
        : `${name} is listed on the official FLUID poster as a participating artist. The individual text and specific artwork details will be added when the final materials arrive.`,
    },
    heroImage: posterFallback,
    instagramUrl: "",
    websiteUrl: "",
    email: "",
    phone: "",
    dimensionsOrDuration: {
      ca: "",
      es: "",
      en: "",
    },
    technique: {
      ca: "",
      es: "",
      en: "",
    },
    price: {
      ca: "",
      es: "",
      en: "",
    },
    order,
  };
}

export const artists: ArtistData[] = [
  {
    slug: "eduardo-perez-cabrero",
    name: "Eduardo Pérez-Cabrero",
    expositionTitle: {
      ca: "Apnea",
      es: "Apnea",
      en: "Apnea",
    },
    subtitle: {
      ca: "175 × 120 × 35 cm · Paper arrugat i puffat",
      es: "175 × 120 × 35 cm · Papel arrugado y puffado",
      en: "175 × 120 × 35 cm · Crumpled and puffed paper",
    },
    shortIntro: {
      ca: "Artista principal de FLUID · instal·lació escultòrica",
      es: "Artista principal de FLUID · instalación escultórica",
      en: "Featured artist in FLUID · sculptural installation",
    },
    description: {
      ca: "Aguanta la respiració tant com puguis i quan ja no puguis més, tanca els ulls, torna’ls a obrir i observa aquesta instal·lació durant un minut. Entendràs per què ets aquí, d’on vens i cap a on et dirigeixes. L’art et porta allà on tu desitges.",
      es: "Aguanta la respiración tanto como puedas y cuando ya no aguantes más, cierra los ojos, vuélvelos a abrir y observa esta instalación durante un minuto. Entenderás porqué estás aquí, de dónde vienes y a dónde te diriges. El arte te lleva allí donde tú deseas.",
      en: "Hold your breath for as long as you can, and when you can no longer hold it, close your eyes, open them again, and observe this installation for one minute. You will understand why you are here, where you come from, and where you are heading. Art takes you wherever you wish to go.",
    },
    heroImage: posterFallback,
    instagramUrl: "https://instagram.com/eduardoperezcabrero",
    websiteUrl: "",
    email: "eduardopcb@gmail.com",
    phone: "",
    dimensionsOrDuration: {
      ca: "175 × 120 × 35 cm",
      es: "175 × 120 × 35 cm",
      en: "175 × 120 × 35 cm",
    },
    technique: {
      ca: "Paper arrugat i puffat",
      es: "Papel arrugado y puffado",
      en: "Crumpled and puffed paper",
    },
    price: {
      ca: "5.650€ + 10% IVA",
      es: "5.650€ + 10% IVA",
      en: "€5,650 + 10% VAT",
    },
    order: 1,
  },

  {
  slug: "ricard-casabayo",
  name: "Ricard Casabayó",
  expositionTitle: {
    ca: "Estructures conjuntes",
    es: "Estructures conjuntes",
    en: "Estructures conjuntes",
  },
  subtitle: {
    ca: "145 × 32 × 58 cm · Alabastre, pedres calcàries i còdols · tècnica mixta",
    es: "145 × 32 × 58 cm · Alabastro, piedras calcáreas y guijarros · técnica mixta",
    en: "145 × 32 × 58 cm · Alabaster, limestone stones and pebbles · mixed technique",
  },
  shortIntro: {
    ca: "Escultura orgànica desenvolupada en col·laboració amb Eduardo Pérez-Cabrero",
    es: "Escultura orgánica desarrollada en colaboración con Eduardo Pérez-Cabrero",
    en: "Organic sculpture developed in collaboration with Eduardo Pérez-Cabrero",
  },
  description: {
    ca: "“Estructures conjuntes” està dissenyada en col·laboració amb Eduardo Pérez-Cabrero seguint una tendència de construcció curvilínia i orgànica. Consta de dues estructures bessones creades en pedra i encaixades a l’interior d’una ànima d’alabastre. Ofereixen la sensació que volen brollar cap a una nova dimensió. Els volums i les textures neixen del sòl d’on provenen i es relacionen sorprenent-se mútuament.",
    es: "“Estructures conjuntes” está diseñada en colaboración con Eduardo Pérez-Cabrero siguiendo una tendencia de construcción curvilínea y orgánica. Consta de dos estructuras gemelas creadas en piedra y encastadas en el interior de un alma de alabastro. Ofrecen la sensación de que quieren brotar a una nueva dimensión. Los volúmenes y texturas nacen del suelo de donde provienen y se relacionan sorprendiéndose mutuamente.",
    en: "“Estructures conjuntes” was designed in collaboration with Eduardo Pérez-Cabrero following a curvilinear and organic construction language. It consists of two twin structures created in stone and embedded inside an alabaster core. They suggest the feeling of emerging toward a new dimension. The volumes and textures rise from the ground they come from and relate to one another in a mutual state of discovery.",
  },
  heroImage: posterFallback,
  instagramUrl: "https://instagram.com/ricardcasabayo",
  websiteUrl: "",
  email: "ricard_escultura@hotmail.com",
  phone: "+34 617599562",
  dimensionsOrDuration: {
    ca: "145 × 32 × 58 cm",
    es: "145 × 32 × 58 cm",
    en: "145 × 32 × 58 cm",
  },
  technique: {
    ca: "Alabastre, pedres calcàries i còdols · tècnica mixta",
    es: "Alabastro, piedras calcáreas y guijarros · técnica mixta",
    en: "Alabaster, limestone stones and pebbles · mixed technique",
  },
  price: {
    ca: "5.800€",
    es: "5.800€",
    en: "€5,800",
  },
  order: 2,
},
  genericArtist("jungle-mows", "Jungle Mows", 3),
  genericArtist("julio-bono", "Julio Bono", 4),
{
  slug: "concept2048",
  name: "Concept2048",
  expositionTitle: {
    ca: "Whisper of the Sea",
    es: "Whisper of the Sea",
    en: "Whisper of the Sea",
  },
  subtitle: {
    ca: "Ekaterina Perekopskaya & Rostyslav Brenych",
    es: "Ekaterina Perekopskaya & Rostyslav Brenych",
    en: "Ekaterina Perekopskaya & Rostyslav Brenych",
  },
  shortIntro: {
    ca: "Instal·lació multimèdia immersiva sobre la relació fràgil entre la humanitat i la natura",
    es: "Instalación multimedia inmersiva sobre la frágil relación entre la humanidad y la naturaleza",
    en: "Immersive multimedia work about humanity’s fragile relationship with nature",
  },
  description: {
    ca: "Whisper of the Sea és una obra multimèdia immersiva de Concept2048 que explora la fràgil relació de la humanitat amb la natura. Els mítics AquaSouls —testimonis silenciosos de la memòria ancestral de l’oceà i guardians d’una saviesa oblidada— emergeixen a la riba a la recerca d’empatia i, a través d’una dansa serena, assenyalen aquesta ruptura, evocant una advertència velada: el passat mai no desapareix del tot, i les aigües poden alçar-se una vegada més, com ja va passar en el passat.\n\nWhisper of the Sea convida a aturar-se i escoltar, no només el mar, sinó també la consciència que uneix tots els éssers vius. En aquest moment delicat, apareix una consciència més profunda només a aquells que desitgen sentir.",
    es: "Whisper of the Sea es una obra multimedia inmersiva de Concept2048 que explora la frágil relación de la humanidad con la naturaleza. Los míticos AquaSouls —testigos silenciosos de la memoria ancestral del océano y guardianes de una sabiduría olvidada— surgen en la orilla en busca de empatía y, a través de una danza serena, señalan esta ruptura, evocando una advertencia velada: el pasado nunca desaparece del todo, y las aguas pueden alzarse una vez más, como ya ocurrió en el pasado.\n\nWhisper of the Sea invita a detenerse y escuchar, no solo al mar, sino también a la conciencia que une a todos los seres vivos. En este delicado momento, aparece una conciencia más profunda solo a quienes desean oír.",
    en: "Whisper of the Sea is an immersive multimedia work by Concept2048 exploring humanity’s fragile relationship with nature. The mythical AquaSouls — silent witnesses of the ocean’s ancient memory and carriers of forgotten knowledge — come ashore in search of empathy and, through a quiet dance, draw attention to this rupture, echoing a subtle warning: the past is never truly gone, and the waters may rise again, as they once did before.\n\nWhisper of the Sea invites viewers to pause and listen — not only to the sea, but to the consciousness that connects all living beings. In this delicate moment, a deeper awareness appears — only to those who wish to hear.",
  },
  heroImage: posterFallback,
  instagramUrl: "https://www.instagram.com/concept_2048/",
  websiteUrl: "https://concept2048.com/",
  email: "artproject@concept2048.com",
  phone: "",
  dimensionsOrDuration: {
    ca: "5 min 28 sec / 42 × 28 cm",
    es: "5 min 28 sec / 42 × 28 cm",
    en: "5 min 28 sec / 42 × 28 cm",
  },
  technique: {
    ca: "Instal·lació multimèdia (vídeo, so, fotografia fine art)",
    es: "Instalación multimedia (vídeo, sonido, fotografía fine art)",
    en: "Multimedia installation (video, sound, fine art photography)",
  },
  price: {
    ca: "370 € + 10% IVA (per obra)",
    es: "370 € + 10% VAT (por obra)",
    en: "370 € + 10% IVA (each work)",
  },
  order: 5,
},
  genericArtist("yerine-richardson", "Yerine Richardson", 6),
  {
  slug: "ruben",
  name: "Rubén",
  expositionTitle: {
    ca: "UnderWater 5070",
    es: "UnderWater 5070",
    en: "UnderWater 5070",
  },
  subtitle: {
    ca: "90 × 90 × 4 cm · Resina epoxi pigmentada sobre fusta",
    es: "90 × 90 × 4 cm · Resina epoxi pigmentada sobre madera",
    en: "90 × 90 × 4 cm · Pigmented epoxy resin on wood",
  },
  shortIntro: {
    ca: "Peça de la col·lecció UnderWater, centrada en profunditat, transparència i transicions silencioses",
    es: "Pieza de la colección UnderWater, centrada en profundidad, transparencia y transiciones silenciosas",
    en: "Work from the UnderWater collection, focused on depth, transparency, and silent transitions",
  },
  description: {
    ca: "La col·lecció UnderWater explora la sensació de mirar cap a l’oceà des de dins. Els colors apareixen com camps superposats que se solapen, es dissolen i tornen a emergir, creant profunditat, transparència i transicions silencioses sota la superfície. En aquesta obra, un nucli intens de rosa magenta s’expandeix suaument cap a capes més clares que es desfan en tons lletosos i delicats. La resina epoxi transparent crea un mar en calma, perfectament llis i lluminós, amb un subtil reflex que transforma la superfície en aigua i revela noves tonalitats segons canvia la llum.",
    es: "La colección UnderWater explora la sensación de mirar hacia el océano desde dentro. Los colores aparecen como campos superpuestos que se solapan, se disuelven y vuelven a emerger, creando profundidad, transparencia y transiciones silenciosas bajo la superficie. En esta obra, un núcleo intenso de rosa magenta se expande suavemente hacia capas más claras que se desvanecen en tonos lechosos y delicados. La resina epoxi transparente crea un mar en calma, perfectamente liso y luminoso, con un sutil reflejo que transforma la superficie en agua y revela nuevas tonalidades según cambia la luz.",
    en: "The UnderWater collection explores the sensation of looking toward the ocean from within. Colors appear as overlapping fields that dissolve and re-emerge, creating depth, transparency, and quiet transitions beneath the surface. In this work, an intense magenta pink core expands softly into lighter layers that fade into milky, delicate tones. The transparent epoxy resin creates a calm sea, perfectly smooth and luminous, with a subtle reflection that transforms the surface into water and reveals new tonalities as the light changes.",
  },
  heroImage: posterFallback,
  instagramUrl: "https://www.instagram.com/ruben.art/",
  websiteUrl: "",
  email: "Ruben@ArtistRuben.com",
  phone: "+34 608550891",
  dimensionsOrDuration: {
    ca: "90 × 90 × 4 cm",
    es: "90 × 90 × 4 cm",
    en: "90 × 90 × 4 cm",
  },
  technique: {
    ca: "Resina epoxi pigmentada sobre fusta",
    es: "Resina epoxi pigmentada sobre madera",
    en: "Pigmented epoxy resin on wood",
  },
  price: {
    ca: "2.900€ + 10% IVA",
    es: "2.900€ + 10% IVA",
    en: "€2,900 + 10% VAT",
  },
  order: 7,
},
  genericArtist("ferran-collado", "Ferràn Collado", 8),
  genericArtist("agustin-cervai-alejandro-rosas", "Agustín Cervai & Alejandro Rosas", 9, true),
  genericArtist("eugenio-s-shapoval", "Eugenio S Shapoval", 10),
];

export function getArtistBySlug(slug: string) {
  return artists.find((artist) => artist.slug === slug);
}
