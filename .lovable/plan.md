## Pagina Master Categoria (es. Casalinghi)

Creo una nuova rotta dinamica `src/routes/categoria.$slug.tsx` che funge da template per tutte le 9 macro-categorie della home (Home Decor, Arredamento, Profumazione, Casalinghi, Party, Kids, Pensa Crea Regala, Animali + le 3 di servizio). I box tondi in home verranno collegati a `/categoria/{slug}`.

### Struttura della pagina (come da screenshot)

1. **Header + Top bar + Menu rosso** — riutilizzo i componenti già esportati da `index.tsx`.
2. **Hero banner sfumato**
   - Breadcrumb `Home > Casalinghi` (separatori in **rosso brand**)
   - Titolo grande della categoria + sottotitolo descrittivo
   - Immagine categoria a destra che sfuma sul fondo (stesso pattern hero `/negozi`, altezza contenuta ~280–320px)
3. **Sezione "Scegli la sezione che ti interessa"**
   - Titolo centrato con piccolo **cuoricino rosso** sotto
   - Due **righe orizzontali laterali in rosso** che fiancheggiano il titolo (come da screenshot)
   - Griglia di sotto-categorie a cerchio (5 colonne desktop, scroll orizzontale mobile)
   - Ogni cerchio: immagine + label maiuscolo + breve descrizione sotto
4. **Griglia prodotti della categoria** (proposta migliorativa)
   - Sotto le sotto-sezioni mostro i prodotti del catalogo filtrati per categoria, riusando la `ProductCard` di `/shop`
   - CTA "Vedi tutti i prodotti" → link a `/shop?cat=...`
5. **Footer + Mobile tab bar + WhatsApp FAB** standard.

### Dati e configurazione

Creo `src/lib/categories.ts` con un dizionario delle 9 macro:
```
{
  slug, name, tagline, heroImage,
  subcategories: [{ slug, name, description, image }]
}
```
Per `casalinghi` popolo: Tavola, Cucina, Bagno, Camera e Organizzazione, Cura Casa (come screenshot). Per le altre macro inserisco 4–5 sotto-categorie coerenti (placeholder sensati, es. Home Decor → Vasi, Cornici, Candele, Specchi, Tessili).

### Collegamento dalla home

In `src/routes/index.tsx`, nei componenti `MacroCategories` / `MoreCategoriesCircle`, sostituisco i cerchi statici con `<Link to="/categoria/$slug" params={{ slug }}>`. Il pulsante "SCOPRI LE NOSTRE CATEGORIE" linka invece a una pagina indice categorie (o resta popover come ora — confermami).

### Proposte migliorative

- **Cuoricino rosso animato** (leggero pulse) sotto il titolo "Scegli la sezione".
- **Sticky sub-nav** desktop: una barra che appare allo scroll con le sotto-categorie come chip, per saltare rapidamente.
- **Chip orizzontali scrollabili su mobile** (stesso pattern già usato in home) invece della griglia, per UX app-like.
- **Schema.org BreadcrumbList + CollectionPage** JSON-LD nell'head() per SEO.
- **Head per-categoria** dinamico: title/description/og generati dal nome categoria.

### Asset

Genero (o riuso quelli esistenti) immagini hero e per le sotto-categorie di Casalinghi. Per le altre 8 macro uso al volo gli asset già in `src/assets/` (cat-*, linea-*) come placeholder coerenti.

### File toccati

- nuovo: `src/routes/categoria.$slug.tsx`
- nuovo: `src/lib/categories.ts`
- nuovi asset hero/sotto-cat per Casalinghi (generati)
- modificato: `src/routes/index.tsx` (link sui cerchi macro)

Confermi questo approccio? In particolare: ok includere la griglia prodotti in fondo, e ok generare i nuovi asset Casalinghi (tavola/cucina/bagno/camera/cura casa)?
