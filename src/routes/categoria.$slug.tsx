import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, Heart, ArrowRight } from "lucide-react";
import { Header, Footer, WhatsAppButton, MobileTabBar } from "./index";
import { ProductCard } from "./shop";
import { getMasterCategory, type MasterCategory, type Subcategory } from "@/lib/categories";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const cat = getMasterCategory(params.slug);
    if (!cat) throw notFound();
    return { category: cat };
  },
  head: ({ loaderData }) => {
    const cat = loaderData?.category;
    if (!cat) return { meta: [{ title: "Categoria – DA MORENO" }] };
    const title = `${cat.name} – DA MORENO`;
    const desc = cat.tagline;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: cat.heroImage },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Categoria non trovata</h1>
        <p className="text-muted-foreground mt-2">La categoria che cerchi non esiste.</p>
        <Link to="/" className="inline-block mt-6 rounded-[10px] bg-brand-red text-white px-5 py-2.5 font-semibold">Torna alla home</Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="text-center">
        <h1 className="text-xl font-bold">Errore nel caricamento</h1>
        <button onClick={reset} className="mt-4 rounded-[10px] bg-brand-red text-white px-4 py-2 font-semibold">Riprova</button>
      </div>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();

  const products = category.productCategory
    ? PRODUCTS.filter((p) => p.category === category.productCategory)
    : [];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />
      <CategoryHero category={category} />
      <SubcategoriesSection category={category} />
      {products.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-10 md:pb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">In primo piano</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/shop" className="inline-flex items-center gap-2 rounded-[10px] bg-brand-red text-white px-6 py-3 font-semibold hover:bg-brand-red-dark transition-colors">
              Vedi tutti i prodotti <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      )}
      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}

/* ────────────────────── HERO ────────────────────── */

function CategoryHero({ category }: { category: MasterCategory }) {
  return (
    <section className="relative overflow-hidden bg-background h-[280px] md:h-[320px] lg:h-[360px]">
      <img
        src={category.heroImage}
        alt={category.name}
        className="absolute inset-y-0 right-0 h-full w-full md:w-[62%] object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 via-[45%] to-background/0 md:to-background/5" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background md:to-background/70" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 h-full flex items-center">
        <div className="max-w-2xl pt-1 md:pt-0">
          <nav className="text-xs mb-4 md:mb-6 flex items-center gap-1.5">
            <Link to="/" className="font-semibold text-foreground hover:text-brand-red">Home</Link>
            <ChevronRight className="size-3 text-brand-red" strokeWidth={2.5} />
            <span className="text-foreground/70">{category.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[1.05]">
            {category.name}
          </h1>
          <p className="mt-3 md:mt-4 text-sm md:text-lg text-foreground/80 max-w-lg">
            {category.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────── SUBCATEGORIES ────────────────────── */

function SubcategoriesSection({ category }: { category: MasterCategory }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      {/* Titolo con righe rosse laterali */}
      <div className="flex items-center gap-4 md:gap-6 mb-2">
        <div className="flex-1 h-px bg-brand-red" />
        <h2 className="text-lg md:text-2xl font-bold text-center whitespace-nowrap">
          Scegli la sezione che ti interessa
        </h2>
        <div className="flex-1 h-px bg-brand-red" />
      </div>
      {/* Cuoricino rosso animato */}
      <div className="flex justify-center mb-8 md:mb-10">
        <Heart className="size-4 text-brand-red fill-brand-red animate-pulse" />
      </div>

      {/* Griglia sotto-categorie */}
      <div
        className={`grid gap-5 md:gap-8 justify-items-center ${
          category.subcategories.length >= 5
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
            : category.subcategories.length === 4
              ? "grid-cols-2 md:grid-cols-4"
              : "grid-cols-2 md:grid-cols-3"
        }`}
      >
        {category.subcategories.map((s) => (
          <SubcategoryCircle key={s.slug} sub={s} />
        ))}
      </div>
    </section>
  );
}

function SubcategoryCircle({ sub }: { sub: Subcategory }) {
  return (
    <a href="#" className="group flex flex-col items-center text-center max-w-[200px]">
      <div className="size-28 md:size-40 rounded-full overflow-hidden brand-shadow ring-4 ring-white group-hover:scale-105 transition-transform">
        <img src={sub.image} alt={sub.name} loading="lazy" className="w-full h-full object-cover" width={400} height={400} />
      </div>
      <h3 className="mt-3 md:mt-4 text-sm md:text-base font-bold uppercase tracking-wide group-hover:text-brand-red transition-colors">
        {sub.name}
      </h3>
      <p className="mt-1 text-xs md:text-sm text-muted-foreground leading-snug">
        {sub.description}
      </p>
    </a>
  );
}
