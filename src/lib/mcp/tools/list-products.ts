import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { PRODUCTS, CATEGORIES } from "@/lib/products";

export default defineTool({
  name: "list_products",
  title: "List products",
  description:
    "List DA MORENO products in the online catalog, optionally filtered by category. Returns name, slug, price (CHF), category and a short description for each product.",
  inputSchema: {
    category: z
      .enum(CATEGORIES as unknown as [string, ...string[]])
      .optional()
      .describe("Optional category filter. Use 'Tutti' or omit for all categories."),
    limit: z.number().int().min(1).max(100).optional().describe("Maximum items to return (default 50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, limit }) => {
    const filtered = !category || category === "Tutti"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);
    const items = filtered.slice(0, limit ?? 50).map((p) => ({
      slug: p.slug,
      name: p.name,
      price_chf: p.price,
      old_price_chf: p.oldPrice,
      category: p.category,
      badge: p.badge,
      short_description: p.shortDescription,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify({ count: items.length, items }, null, 2) }],
      structuredContent: { count: items.length, items },
    };
  },
});
