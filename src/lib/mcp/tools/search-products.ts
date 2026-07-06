import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { PRODUCTS } from "@/lib/products";

export default defineTool({
  name: "search_products",
  title: "Search products",
  description:
    "Full-text search across DA MORENO products by name, description and features. Returns matching products with slug, name, price and category.",
  inputSchema: {
    query: z.string().trim().min(1).describe("Search text (Italian). Matched against name, description and features."),
    limit: z.number().int().min(1).max(50).optional().describe("Maximum results to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, limit }) => {
    const q = query.toLowerCase();
    const hits = PRODUCTS.filter((p) =>
      [p.name, p.description, p.shortDescription, p.category, ...(p.features ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(q),
    )
      .slice(0, limit ?? 20)
      .map((p) => ({
        slug: p.slug,
        name: p.name,
        price_chf: p.price,
        category: p.category,
        short_description: p.shortDescription,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify({ query, count: hits.length, items: hits }, null, 2) }],
      structuredContent: { query, count: hits.length, items: hits },
    };
  },
});
