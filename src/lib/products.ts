import catHomeDecor from "@/assets/cat-home-decor.jpg";
import catCasalinghi from "@/assets/cat-casalinghi.jpg";
import catParty from "@/assets/cat-party.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catCrea from "@/assets/cat-crea.jpg";
import catAnimali from "@/assets/cat-animali.jpg";
import catAltre from "@/assets/cat-altre.jpg";
import lineaArredamento from "@/assets/linea-arredamento.jpg";
import lineaKawaii from "@/assets/linea-kawaii.jpg";
import lineaProfumazione from "@/assets/linea-profumazione.jpg";
import lineaBagno from "@/assets/linea-bagno.jpg";
import lineePets from "@/assets/linee-pets.jpg";
import seasonalAutumn from "@/assets/seasonal-autumn.jpg";

export type Product = {
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  shortDescription: string;
  description: string;
  features: string[];
  badge?: "NOVITÀ" | "OFFERTA" | "BEST SELLER";
};

export const CATEGORIES = [
  "Tutti",
  "Home Decor",
  "Arredamento",
  "Profumazione",
  "Casalinghi",
  "Party",
  "Kids",
  "Pensa Crea Regala",
  "Animali",
  "Stagionale",
] as const;

export const PRODUCTS: Product[] = [
  {
    slug: "vaso-decorativo-ceramica",
    name: "Vaso decorativo in ceramica opaca",
    price: 14.9, oldPrice: 19.9, image: catHomeDecor, category: "Home Decor",
    shortDescription: "Vaso in ceramica opaca, finitura pastello.",
    description: "Un vaso elegante e versatile, perfetto per fiori freschi o composizioni essiccate. Finitura opaca che dona un tocco moderno a qualsiasi ambiente.",
    features: ["Ceramica opaca", "Altezza 22 cm", "Made for everyday", "Pulizia a mano"],
    badge: "OFFERTA",
  },
  {
    slug: "lampada-da-tavolo-rattan",
    name: "Lampada da tavolo in rattan naturale",
    price: 39.9, image: lineaArredamento, category: "Arredamento",
    shortDescription: "Luce calda e atmosfera bohémien.",
    description: "Lampada da tavolo in rattan intrecciato a mano. Diffonde una luce calda e accogliente, ideale per la camera da letto o il soggiorno.",
    features: ["Rattan naturale", "E27 max 40W", "Cavo tessile 1,5 m", "Interruttore inline"],
    badge: "BEST SELLER",
  },
  {
    slug: "diffusore-bastoncini-fico",
    name: "Diffusore a bastoncini — Fico & Cedro",
    price: 12.5, image: lineaProfumazione, category: "Profumazione",
    shortDescription: "Profumo d'ambiente delicato e duraturo.",
    description: "Diffusore con bastoncini in rattan, fragranza Fico & Cedro. Profumazione lenta e continua fino a 8 settimane.",
    features: ["100 ml", "Durata ~8 settimane", "Senza alcol", "Bastoncini inclusi"],
  },
  {
    slug: "set-pentole-antiaderente-5pz",
    name: "Set pentole antiaderenti 5 pezzi",
    price: 79.0, oldPrice: 99.0, image: catCasalinghi, category: "Casalinghi",
    shortDescription: "Cucina come a casa di Moreno.",
    description: "Set completo di pentole con rivestimento antiaderente di nuova generazione. Adatto a tutti i piani cottura, induzione inclusa.",
    features: ["5 pezzi", "Compatibile induzione", "Manici soft-touch", "Lavabili in lavastoviglie"],
    badge: "OFFERTA",
  },
  {
    slug: "kit-festa-compleanno-rosso",
    name: "Kit festa compleanno — tema rosso",
    price: 9.9, image: catParty, category: "Party",
    shortDescription: "Tutto pronto per il party.",
    description: "Kit completo: piatti, bicchieri, tovaglioli e festoni coordinati. Perfetto per 8 persone.",
    features: ["Per 8 persone", "Materiali riciclabili", "Tema coordinato", "Festone incluso"],
  },
  {
    slug: "set-colori-bambini-24pz",
    name: "Set colori per bambini 24 pezzi",
    price: 6.9, image: catKids, category: "Kids",
    shortDescription: "Pennarelli atossici lavabili.",
    description: "Set di 24 pennarelli a punta media, colori vivaci e lavabili. Adatti dai 3 anni.",
    features: ["24 colori", "Atossici", "Lavabili", "Punta media"],
  },
  {
    slug: "scatola-regalo-kraft-set",
    name: "Set scatole regalo kraft con nastro",
    price: 8.5, image: catCrea, category: "Pensa Crea Regala",
    shortDescription: "Tre misure, infinite occasioni.",
    description: "Tre scatole regalo in carta kraft con nastro in cotone. Ideali per regali handmade e occasioni speciali.",
    features: ["3 misure", "Carta kraft FSC", "Nastro in cotone", "Etichette incluse"],
    badge: "NOVITÀ",
  },
  {
    slug: "barattolo-crocchette-latta",
    name: "Barattolo porta crocchette in latta",
    price: 16.9, image: lineePets, category: "Animali",
    shortDescription: "Decorato a mano, capienza 2 kg.",
    description: "Mantiene le crocchette fresche e profumate. Decoro stampato, chiusura ermetica con guarnizione.",
    features: ["Capienza 2 kg", "Chiusura ermetica", "Latta alimentare", "Decoro illustrato"],
    badge: "NOVITÀ",
  },
  {
    slug: "candela-profumata-vaniglia",
    name: "Candela profumata vetro — Vaniglia",
    price: 7.9, image: lineaProfumazione, category: "Profumazione",
    shortDescription: "30 ore di profumo avvolgente.",
    description: "Candela in vetro con cera di soia e fragranza alla vaniglia. Durata circa 30 ore.",
    features: ["Cera di soia", "~30 ore", "Stoppino in cotone", "Vetro riutilizzabile"],
  },
  {
    slug: "tappeto-bagno-microfibra",
    name: "Tappeto bagno in microfibra",
    price: 11.9, image: lineaBagno, category: "Casalinghi",
    shortDescription: "Morbidissimo, antiscivolo.",
    description: "Tappeto in microfibra ultra-assorbente, base antiscivolo. Disponibile in colori neutri.",
    features: ["50x80 cm", "Antiscivolo", "Lavabile a 30°", "Ultra-assorbente"],
  },
  {
    slug: "set-asciugamani-cotone-3pz",
    name: "Set asciugamani in cotone 3 pezzi",
    price: 19.9, image: lineaBagno, category: "Casalinghi",
    shortDescription: "Spugna 100% cotone 450 gsm.",
    description: "Set composto da viso, ospite e telo doccia in spugna di cotone pettinato.",
    features: ["100% cotone", "450 gsm", "Bordo decorato", "Colori delicati"],
  },
  {
    slug: "ghirlanda-autunno-foglie",
    name: "Ghirlanda autunnale con foglie",
    price: 13.5, image: seasonalAutumn, category: "Stagionale",
    shortDescription: "Decoro autunnale per porta.",
    description: "Ghirlanda decorativa con foglie autunnali, bacche e nastro. Diametro 35 cm.",
    features: ["Ø 35 cm", "Materiali misti", "Solo decorativa", "Riutilizzabile"],
  },
  {
    slug: "set-piatti-porcellana-12pz",
    name: "Set piatti porcellana 12 pezzi",
    price: 49.9, oldPrice: 69.9, image: catCasalinghi, category: "Casalinghi",
    shortDescription: "Servizio per 4, tre misure.",
    description: "Set in porcellana bianca: 4 piani, 4 fondi, 4 dessert. Adatto a microonde e lavastoviglie.",
    features: ["12 pezzi", "Porcellana", "Microonde-safe", "Lavastoviglie-safe"],
    badge: "OFFERTA",
  },
  {
    slug: "cuscino-decorativo-velluto",
    name: "Cuscino decorativo in velluto",
    price: 17.9, image: catHomeDecor, category: "Home Decor",
    shortDescription: "45x45 cm, federa rimovibile.",
    description: "Cuscino dal touch vellutato, perfetto per dare carattere al divano. Imbottitura sfoderabile.",
    features: ["45x45 cm", "Velluto", "Federa con zip", "Imbottitura inclusa"],
  },
  {
    slug: "scaffale-legno-naturale",
    name: "Scaffale modulare in legno naturale",
    price: 89.0, image: lineaArredamento, category: "Arredamento",
    shortDescription: "3 ripiani, montaggio facile.",
    description: "Scaffale leggero in legno naturale, 3 ripiani. Ideale per camera, ingresso o ufficio.",
    features: ["3 ripiani", "80x30x110 cm", "Legno naturale", "Istruzioni incluse"],
  },
  {
    slug: "gioco-interattivo-gatto",
    name: "Gioco interattivo per gatto",
    price: 12.9, image: catAnimali, category: "Animali",
    shortDescription: "Stimola l'istinto del tuo gatto.",
    description: "Gioco interattivo con pallina e piuma, base antiscivolo. Tiene impegnati i felini più curiosi.",
    features: ["Base antiscivolo", "Piuma sostituibile", "Adatto a tutte le età", "Materiali sicuri"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelated(slug: string, limit = 4): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return PRODUCTS.slice(0, limit);
  return PRODUCTS.filter((p) => p.slug !== slug && p.category === current.category)
    .concat(PRODUCTS.filter((p) => p.slug !== slug && p.category !== current.category))
    .slice(0, limit);
}

export { catAltre };
