import { defineTool } from "@lovable.dev/mcp-js";
import { MASTER_CATEGORIES } from "@/lib/categories";

export default defineTool({
  name: "list_categories",
  title: "List categories",
  description:
    "List DA MORENO master categories with their sub-sections and short taglines. Useful to guide product browsing.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = Object.values(MASTER_CATEGORIES).map((c) => ({
      slug: c.slug,
      name: c.name,
      tagline: c.tagline,
      url: `/categoria/${c.slug}`,
      subcategories: c.subcategories?.map((s) => s.name) ?? [],
    }));
    return {
      content: [{ type: "text", text: JSON.stringify({ count: items.length, categories: items }, null, 2) }],
      structuredContent: { count: items.length, categories: items },
    };
  },
});
