import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getProductBySlug } from "@/lib/products";

export default defineTool({
  name: "get_product",
  title: "Get product details",
  description:
    "Get full details for a single DA MORENO product by its slug (as returned by list_products or search_products).",
  inputSchema: {
    slug: z.string().trim().min(1).describe("Product slug, e.g. 'vaso-decorativo-ceramica'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const p = getProductBySlug(slug);
    if (!p) {
      return {
        content: [{ type: "text", text: `No product found for slug '${slug}'.` }],
        isError: true,
      };
    }
    const data = {
      slug: p.slug,
      name: p.name,
      price_chf: p.price,
      old_price_chf: p.oldPrice,
      category: p.category,
      badge: p.badge,
      short_description: p.shortDescription,
      description: p.description,
      features: p.features,
      url: `/prodotto/${p.slug}`,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: data,
    };
  },
});
