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
  {
    slug: "jungle-mows",
    name: "Jungle Mows",
    expositionTitle: {
      ca: "Jungla",
      es: "Jungla",
      en: "Jungla",
    },
    subtitle: {
      ca: "Gerard Lloret",
      es: "Gerard Lloret",
      en: "Gerard Lloret",
    },
    shortIntro: {
      ca: "Instal·lació orgànica sobre memòria, transformació i cicles naturals",
      es: "Instalación orgánica sobre memoria, transformación y ciclos naturales",
      en: "Organic installation about memory, transformation, and natural cycles",
    },
    description: {
      ca: "A “Jungla”, Gerard Lloret utilitza molsa conservada, aturada en la seva aparent quietud, per contenir la memòria del que és viu. L’obra proposa una mirada cap als cicles naturals que escapen a simple vista —la humitat que migra, la saba que ascendeix, la matèria que es descompon i es regenera— i els vincula amb els nostres propis processos interns. Fins i tot en la quietud, alguna cosa es mou. El que és viu no desapareix: canvia d’estat. Tot el que som també està en trànsit.",
      es: "En “Jungla”, Gerard Lloret utiliza musgo conservado, detenido en su aparente quietud, para contener la memoria de lo vivo. La obra propone una mirada hacia los ciclos naturales que escapan a simple vista —la humedad que migra, la savia que asciende, la materia que se descompone y se regenera— y los vincula con nuestros propios procesos internos. Incluso en la quietud, algo se está moviendo. Lo vivo no desaparece: cambia de estado. Todo lo que somos también está en tránsito.",
      en: "In “Jungla”, Gerard Lloret uses preserved moss, held in its apparent stillness, to hold the memory of what is alive. The work proposes a gaze toward natural cycles that escape the naked eye — moisture migrating, sap rising, matter decomposing and regenerating — and connects them to our own internal processes. Even in stillness, something is moving. Life does not disappear: it changes state. Everything we are is also in transit.",
    },
    heroImage: posterFallback,
    instagramUrl: "https://instagram.com/junglemows",
    websiteUrl: "",
    email: "",
    phone: "+34 671 034 197",
    dimensionsOrDuration: {
      ca: "180 × 145 × 12 cm",
      es: "180 × 145 × 12 cm",
      en: "180 × 145 × 12 cm",
    },
    technique: {
      ca: "Molsa i líquens",
      es: "Musgos y líquenes",
      en: "Mosses and lichens",
    },
    price: {
      ca: "1.850€ + 10% IVA",
      es: "1.850€ + 10% IVA",
      en: "€1,850 + 10% VAT",
    },
    order: 3,
  },
  {
    slug: "julio-bono",
    name: "Julio Bono",
    expositionTitle: {
      ca: "Botánica",
      es: "Botánica",
      en: "Botánica",
    },
    subtitle: {
      ca: "120 × 140 × 80 cm · Ceràmica vitrificada",
      es: "120 × 140 × 80 cm · Cerámica vidriada",
      en: "120 × 140 × 80 cm · Glazed ceramic",
    },
    shortIntro: {
      ca: "Instal·lació ceràmica inspirada en l’abstracció del món vegetal",
      es: "Instalación cerámica inspirada en la abstracción del mundo vegetal",
      en: "Ceramic installation inspired by the abstraction of the vegetal world",
    },
    description: {
      ca: "Aquesta instal·lació combina la tècnica ceràmica amb la representació abstracta de plantes i flors. Aquestes peces connectades i úniques capturen la bellesa i la delicadesa del món vegetal, utilitzant modelatge i esmaltat per crear aquests elements estètics que fusionen la natura amb la ceràmica.",
      es: "Esta instalación combina la técnica cerámica con la representación abstracta de plantas y flores. Estas piezas conectadas y únicas capturan la belleza y la delicadeza del mundo vegetal, utilizando modelado y esmaltado para crear estos elementos estéticos que fusionan la naturaleza con la cerámica.",
      en: "This installation combines ceramic technique with the abstract representation of plants and flowers. These connected and unique pieces capture the beauty and delicacy of the vegetal world, using modelling and glazing to create aesthetic elements that fuse nature with ceramics.",
    },
    heroImage: posterFallback,
    instagramUrl: "https://instagram.com/A4Ceramic",
    websiteUrl: "",
    email: "A4ceramic@gmail.com",
    phone: "",
    dimensionsOrDuration: {
      ca: "120 × 140 × 80 cm",
      es: "120 × 140 × 80 cm",
      en: "120 × 140 × 80 cm",
    },
    technique: {
      ca: "Ceràmica vitrificada",
      es: "Cerámica vidriada",
      en: "Glazed ceramic",
    },
    price: {
      ca: "4.350€ + 10% IVA",
      es: "4.350€ + 10% IVA",
      en: "€4,350 + 10% VAT",
    },
    order: 4,
  },
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
  {
    slug: "yerine-richardson",
    name: "Yerine Richardson",
    expositionTitle: {
      ca: "Angels Nest",
      es: "Angels Nest",
      en: "Angels Nest",
    },
    subtitle: {
      ca: "80 × 40 × 200 cm · Suspensió d’estructura tèxtil i corpòria",
      es: "80 × 40 × 200 cm · Suspensión estructura textil y corpórea",
      en: "80 × 40 × 200 cm · Suspension of textile and corporeal structure",
    },
    shortIntro: {
      ca: "Instal·lació suspesa sobre presència invisible, protecció i naixement",
      es: "Instalación suspendida sobre presencia invisible, protección y nacimiento",
      en: "Suspended installation about invisible presence, protection, and birth",
    },
    description: {
      ca: "La reciprocitat artística ens ha conduït al concepte d’un niu d’àngels. Aquests éssers que ens acompanyen en la seva invisibilitat i ens ajuden a superar les aventures vitals. La instal·lació contempla la suspensió de “nius” entre tèxtils blancs que simulen els núvols i els embolcallen fins que ja poden néixer.",
      es: "La reciprocidad artística nos ha llevado al concepto de un nido de ángeles. Esos seres que nos acompañan en su invisibilidad y nos ayudan a superar las aventuras vitales. La instalación contempla la suspensión de “nidos” entre textiles blancos que simulan las nubes y los arropan hasta que ya pueden nacer.",
      en: "Artistic reciprocity has led us to the concept of a nest of angels. These beings accompany us in their invisibility and help us overcome life’s adventures. The installation proposes the suspension of “nests” among white textiles that simulate clouds and shelter them until they are ready to be born.",
    },
    heroImage: posterFallback,
    instagramUrl: "https://instagram.com/popcaribe",
    websiteUrl: "https://www.popcaribe.com",
    email: "",
    phone: "+34 609 902 757",
    dimensionsOrDuration: {
      ca: "80 × 40 × 200 cm",
      es: "80 × 40 × 200 cm",
      en: "80 × 40 × 200 cm",
    },
    technique: {
      ca: "Suspensió d’estructura tèxtil i corpòria",
      es: "Suspensión estructura textil y corpórea",
      en: "Suspension of textile and corporeal structure",
    },
    price: {
      ca: "6.750€ + 10% IVA",
      es: "6.750€ + 10% IVA",
      en: "€6,750 + 10% VAT",
    },
    order: 6,
  },
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
  {
    slug: "agustin-cervai-alejandro-rosas",
    name: "Agustín Cervai & Alejandro Rosas",
    expositionTitle: {
      ca: "EL GESTO",
      es: "EL GESTO",
      en: "EL GESTO",
    },
    subtitle: {
      ca: "80 × 120 × 55 cm · Cianotípia sobre paper i escultura sobre poliestirè expandit",
      es: "80 × 120 × 55 cm · Cianotipia sobre papel y escultura sobre poliexpan",
      en: "80 × 120 × 55 cm · Cyanotype on paper and sculpture on polystyrene",
    },
    shortIntro: {
      ca: "Instal·lació col·laborativa sobre trobada, proximitat i unió sensible",
      es: "Instalación colaborativa sobre encuentro, cercanía y unión sensible",
      en: "Collaborative installation about encounter, proximity, and sensitive connection",
    },
    description: {
      ca: "En un context travessat per la incertesa, l’obra proposa un gest de trobada. Sorgida de la col·laboració entre dos artistes que entenen l’art com un pont sensible, la instal·lació articula cianotípia i escultura: en el pla, unes mans evoquen contacte, proximitat i contenció; al centre, una forma circular orgànica irromp i integra, com un cos híbrid. La peça convida a una contemplació hipnòtica, desplaçant la mirada entre superfície i volum. Així, es configura com un territori d’unió que deixa una pregunta oberta: què passa si comencem a apropar-nos més?",
      es: "En un contexto atravesado por la incertidumbre, la obra propone un gesto de encuentro. Surge de la colaboración entre dos artistas que entienden el arte como un puente sensible. La instalación articula cianotipia y escultura: en el plano, unas manos evocan contacto, cercanía y contención; en el centro, una forma circular orgánica irrumpe e integra, como un cuerpo híbrido. La pieza invita a una contemplación hipnótica, desplazando la mirada entre superficie y volumen. Así, se configura como un territorio de unión que deja una pregunta abierta: ¿qué sucede si empezamos a acercarnos más?",
      en: "In a context marked by uncertainty, the work proposes a gesture of encounter. It emerges from the collaboration between two artists who understand art as a sensitive bridge. The installation brings together cyanotype and sculpture: on the surface, hands evoke contact, closeness, and containment; at the center, an organic circular form breaks through and integrates like a hybrid body. The piece invites a hypnotic contemplation, shifting the gaze between surface and volume. In this way, it becomes a territory of union that leaves an open question: what happens if we begin to move closer to one another?",
    },
    heroImage: posterFallback,
    instagramUrl: "https://www.instagram.com/monocromo_cyan_?igsh=MTZrOTluYjNnZWI4cQ%3D%3D&utm_source=qr",
    websiteUrl: "",
    secondaryLinkUrl: "https://www.instagram.com/bakanobandito?igsh=MTVtZWRoMnEwMXZrNA==",
    secondaryLinkText: "Instagram · Alejandro Rosas",
    email: "Cervaiagustin@gmail.com",
    phone: "",
    dimensionsOrDuration: {
      ca: "80 × 120 × 55 cm",
      es: "80 × 120 × 55 cm",
      en: "80 × 120 × 55 cm",
    },
    technique: {
      ca: "Cianotípia sobre paper i escultura sobre poliestirè expandit",
      es: "Cianotipia sobre papel y escultura sobre poliexpan",
      en: "Cyanotype on paper and sculpture on polystyrene",
    },
    price: {
      ca: "4.200€ + 10% IVA",
      es: "4.200€ + 10% IVA",
      en: "€4,200 + 10% VAT",
    },
    order: 9,
  },
  {
    slug: "eugenio-s-shapoval",
    name: "Eugenio S Shapoval",
    expositionTitle: {
      ca: "Echo",
      es: "Echo",
      en: "Echo",
    },
    subtitle: {
      ca: "165 × 215 × 80 cm · Paper artesanal sobre paret intervingut amb ceràmica i or + escultura exempta en ciment blanc",
      es: "165 × 215 × 80 cm · Papel artesanal sobre pared intervenido por cerámica & oro en combinación con escultura exenta en cemento blanco",
      en: "165 × 215 × 80 cm · Handmade paper on wall with ceramic and gold, combined with a freestanding white cement sculpture",
    },
    shortIntro: {
      ca: "Visió compartida de dos llenguatges materials en una instal·lació de doble direccionalitat",
      es: "Visión compartida de dos lenguajes materiales en una instalación de doble direccionalidad",
      en: "Shared vision of two material languages in a double-directional installation",
    },
    description: {
      ca: "A “Echo” es desprèn la visió comuna de dos artistes amb tècniques diferents: d’una banda, una explosió de massa de paper artesanal treballat i enganxat aleatòriament a la paret, i de l’altra, una explosió de ceràmica i pa d’or. Igual que l’eco del so, l’obra presenta una doble direccionalitat: l’anada i la tornada cap a l’escultura blanca, que suggereix alhora la flora (llavor) i la fauna (llebre) de la natura.",
      es: "En “Echo” se desprende la visión común de dos artistas con técnicas diferentes: por una parte explosión de masa de papel artesanal trabajado y enganchado aleatoriamente a la pared y explosión de cerámica y pan de oro. Al igual que el eco de sonido, la obra presenta doble direccionalidad: la ida y la vuelta hacia la escultura blanca, que desprende un guiño a la flora (semilla) y a la fauna (liebre) de la naturaleza.",
      en: "In “Echo”, a shared vision emerges between two artists working with different techniques: on one side, an explosion of handmade paper pulp worked and randomly attached to the wall, and on the other, an explosion of ceramic and gold leaf. Like the echo of sound, the work presents a double directionality: the movement outward and back toward the white sculpture, which alludes both to flora (seed) and fauna (hare) within nature.",
    },
    heroImage: posterFallback,
    instagramUrl: "https://instagram.com/zhk_artist",
    websiteUrl: "",
    email: "",
    phone: "+34 722 182 184",
    dimensionsOrDuration: {
      ca: "165 × 215 × 80 cm",
      es: "165 × 215 × 80 cm",
      en: "165 × 215 × 80 cm",
    },
    technique: {
      ca: "Paper artesanal sobre paret intervingut amb ceràmica i or, en combinació amb escultura exempta en ciment blanc",
      es: "Papel artesanal sobre pared intervenido por cerámica & oro en combinación con escultura exenta en cemento blanco",
      en: "Handmade paper on wall with ceramic and gold, combined with a freestanding white cement sculpture",
    },
    price: {
      ca: "5.700€ + 10% IVA",
      es: "5.700€ + 10% IVA",
      en: "€5,700 + 10% VAT",
    },
    order: 10,
  },
];

export function getArtistBySlug(slug: string) {
  return artists.find((artist) => artist.slug === slug);
}
