import casalinghiHero from "@/assets/cat-casalinghi-hero.jpg";
import catHomeDecor from "@/assets/cat-home-decor.jpg";
import catCasalinghi from "@/assets/cat-casalinghi.jpg";
import catParty from "@/assets/cat-party.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catCrea from "@/assets/cat-crea.jpg";
import catAnimali from "@/assets/cat-animali.jpg";
import lineaArredamento from "@/assets/linea-arredamento.jpg";
import lineaProfumazione from "@/assets/linea-profumazione.jpg";
import lineaBagno from "@/assets/linea-bagno.jpg";
import lineaKawaii from "@/assets/linea-kawaii.jpg";
import seasonalAutumn from "@/assets/seasonal-autumn.jpg";
import subTavola from "@/assets/sub-tavola.jpg";
import subCucina from "@/assets/sub-cucina.jpg";
import subCamera from "@/assets/sub-camera.jpg";
import subCuraCasa from "@/assets/sub-cura-casa.jpg";

export type Subcategory = {
  slug: string;
  name: string;
  description: string;
  image: string;
  productCategory?: string; // mappa verso PRODUCTS.category
};

export type MasterCategory = {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  productCategory?: string; // per filtrare il catalogo
  subcategories: Subcategory[];
};

export const MASTER_CATEGORIES: Record<string, MasterCategory> = {
  casalinghi: {
    slug: "casalinghi",
    name: "Casalinghi",
    tagline:
      "Tutto ciò che ti serve per la tua casa, ogni giorno. Funzionalità, qualità e stile al miglior prezzo.",
    heroImage: casalinghiHero,
    productCategory: "Casalinghi",
    subcategories: [
      { slug: "tavola",   name: "Tavola",   description: "Piatti, bicchieri, posate, tovaglie e tutto per una tavola perfetta.", image: subTavola },
      { slug: "cucina",   name: "Cucina",   description: "Pentole, utensili, accessori e organizer per cucinare con praticità.", image: subCucina },
      { slug: "bagno",    name: "Bagno",    description: "Accessori, tessili e organizer per un bagno sempre in ordine.",       image: lineaBagno },
      { slug: "camera-organizzazione", name: "Camera e Organizzazione", description: "Ceste, scatole, appendiabiti e soluzioni salva-spazio per ogni ambiente.", image: subCamera },
      { slug: "cura-casa", name: "Cura Casa", description: "Tutto il necessario per prenderti cura della tua casa: pulizia, accessori utili e molto altro.", image: subCuraCasa },
    ],
  },
  "home-decor": {
    slug: "home-decor",
    name: "Home Decor",
    tagline: "Vasi, candele, cornici e tessili per dare carattere a ogni stanza.",
    heroImage: catHomeDecor,
    productCategory: "Home Decor",
    subcategories: [
      { slug: "vasi-fioriere", name: "Vasi e Fioriere", description: "Ceramica, vetro e materiali naturali per le tue piante.", image: catHomeDecor },
      { slug: "candele",       name: "Candele",         description: "Profumate, decorative e a lunga durata.",                  image: lineaProfumazione },
      { slug: "cornici-quadri", name: "Cornici e Quadri", description: "Per raccontare i tuoi momenti più belli.",                image: lineaArredamento },
      { slug: "tessili",       name: "Tessili",         description: "Cuscini, plaid e runner per scaldare la casa.",            image: catCasalinghi },
    ],
  },
  arredamento: {
    slug: "arredamento",
    name: "Arredamento",
    tagline: "Mobili leggeri, scaffali e complementi per arredare con stile.",
    heroImage: lineaArredamento,
    productCategory: "Arredamento",
    subcategories: [
      { slug: "scaffali",  name: "Scaffali",  description: "Modulari e versatili, per ogni spazio.",   image: lineaArredamento },
      { slug: "lampade",   name: "Lampade",   description: "Luci calde per ambienti accoglienti.",      image: lineaArredamento },
      { slug: "specchi",   name: "Specchi",   description: "Decorativi e funzionali.",                   image: catHomeDecor },
      { slug: "complementi", name: "Complementi", description: "Tavolini, appendiabiti e dettagli.",    image: lineaKawaii },
    ],
  },
  profumazione: {
    slug: "profumazione",
    name: "Profumazione",
    tagline: "Diffusori, candele e fragranze d'ambiente per ogni stagione.",
    heroImage: lineaProfumazione,
    productCategory: "Profumazione",
    subcategories: [
      { slug: "diffusori", name: "Diffusori", description: "A bastoncini e elettrici.",      image: lineaProfumazione },
      { slug: "candele-profumate", name: "Candele Profumate", description: "Cera di soia, durata fino a 30 ore.", image: lineaProfumazione },
      { slug: "spray-ambiente", name: "Spray Ambiente", description: "Note delicate, profumo immediato.", image: lineaProfumazione },
    ],
  },
  party: {
    slug: "party",
    name: "Party",
    tagline: "Tutto per la festa: kit coordinati, decorazioni e accessori.",
    heroImage: catParty,
    productCategory: "Party",
    subcategories: [
      { slug: "compleanno", name: "Compleanno", description: "Kit coordinati e candeline.",   image: catParty },
      { slug: "stoviglie-monouso", name: "Stoviglie Monouso", description: "Piatti, bicchieri, posate.", image: catParty },
      { slug: "decorazioni-festa", name: "Decorazioni", description: "Festoni, palloncini, ghirlande.",   image: catParty },
    ],
  },
  kids: {
    slug: "kids",
    name: "Kids",
    tagline: "Giocattoli, cancelleria, idee creative per i più piccoli.",
    heroImage: catKids,
    productCategory: "Kids",
    subcategories: [
      { slug: "giochi",       name: "Giochi",       description: "Per ogni età.",                    image: catKids },
      { slug: "cancelleria-kids", name: "Cancelleria", description: "Colori, quaderni, astucci.",   image: catKids },
      { slug: "creativita",   name: "Creatività",   description: "Tante idee per creare insieme.",   image: catCrea },
    ],
  },
  "pensa-crea-regala": {
    slug: "pensa-crea-regala",
    name: "Pensa, Crea, Regala!",
    tagline: "Confezioni, biglietti e idee handmade per ogni occasione.",
    heroImage: catCrea,
    productCategory: "Pensa Crea Regala",
    subcategories: [
      { slug: "confezioni-regalo", name: "Confezioni Regalo", description: "Scatole, carta, nastri.",  image: catCrea },
      { slug: "biglietti",        name: "Biglietti",        description: "Per ogni occasione.",        image: catCrea },
      { slug: "stagionale",       name: "Idee Stagionali",  description: "Sempre in tema con la stagione.", image: seasonalAutumn },
    ],
  },
  animali: {
    slug: "animali",
    name: "Animali",
    tagline: "Tutto per i tuoi amici a quattro zampe: ciotole, giochi e accessori.",
    heroImage: catAnimali,
    productCategory: "Animali",
    subcategories: [
      { slug: "cane", name: "Cane", description: "Ciotole, guinzagli, giochi.",       image: catAnimali },
      { slug: "gatto", name: "Gatto", description: "Tiragraffi, giochi, accessori.",   image: catAnimali },
      { slug: "altri-amici", name: "Altri Amici", description: "Piccoli roditori, uccelli e altro.", image: catAnimali },
    ],
  },
  alimentari: {
    slug: "alimentari",
    name: "Alimentari",
    tagline: "Una selezione di prodotti alimentari per ogni giorno.",
    heroImage: catCasalinghi,
    subcategories: [
      { slug: "dispensa",  name: "Dispensa",   description: "Pasta, conserve, condimenti.", image: catCasalinghi },
      { slug: "bevande",   name: "Bevande",    description: "Acqua, succhi, bibite.",       image: catCasalinghi },
      { slug: "dolci-snack", name: "Dolci e Snack", description: "Per spuntini golosi.",   image: catCasalinghi },
    ],
  },
  detersivi: {
    slug: "detersivi",
    name: "Detersivi",
    tagline: "Pulizia profonda per ogni angolo della casa.",
    heroImage: subCuraCasa,
    subcategories: [
      { slug: "bucato",     name: "Bucato",     description: "Detersivi e ammorbidenti.",  image: subCuraCasa },
      { slug: "pavimenti",  name: "Pavimenti",  description: "Per ogni tipo di superficie.", image: subCuraCasa },
      { slug: "cucina-bagno-pulizia", name: "Cucina e Bagno", description: "Sgrassatori e anticalcare.", image: subCuraCasa },
    ],
  },
  "igiene-persona": {
    slug: "igiene-persona",
    name: "Igiene Persona",
    tagline: "Cura quotidiana per te e tutta la famiglia.",
    heroImage: lineaBagno,
    subcategories: [
      { slug: "corpo",   name: "Corpo",   description: "Saponi, bagnoschiuma, creme.", image: lineaBagno },
      { slug: "capelli", name: "Capelli", description: "Shampoo, balsamo, styling.",   image: lineaBagno },
      { slug: "viso",    name: "Viso",    description: "Detergenti e cura quotidiana.", image: lineaBagno },
    ],
  },
};

export function getMasterCategory(slug: string): MasterCategory | undefined {
  return MASTER_CATEGORIES[slug];
}

export function getAllMasterSlugs(): string[] {
  return Object.keys(MASTER_CATEGORIES);
}
