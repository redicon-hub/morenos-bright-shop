import { defineMcp } from "@lovable.dev/mcp-js";
import listProducts from "./tools/list-products";
import searchProducts from "./tools/search-products";
import getProduct from "./tools/get-product";
import listStores from "./tools/list-stores";
import listCategories from "./tools/list-categories";

export default defineMcp({
  name: "damoreno-mcp",
  title: "DA MORENO",
  version: "0.1.0",
  instructions:
    "Tools to browse the DA MORENO online catalog (casa, idee e regali) and its 5 Ticino stores. Use `list_categories` and `list_stores` for an overview, `list_products` to browse by category, `search_products` for keyword search, and `get_product` for full product details by slug.",
  tools: [listCategories, listProducts, searchProducts, getProduct, listStores],
});
