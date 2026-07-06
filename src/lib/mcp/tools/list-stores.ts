import { defineTool } from "@lovable.dev/mcp-js";

const STORES = [
  { id: 1, name: "GRAVESANO",     address: "Via al Fiume 1",   zip: "6929 Gravesano",     phone: "091 224 30 31", hours_weekdays: "8.30 – 19.00", hours_sunday: "9.00 – 18.00" },
  { id: 2, name: "BODIO",         address: "Via Bellinzona 4", zip: "6743 Bodio",         phone: "091 225 78 68", hours_weekdays: "8.30 – 19.00", hours_sunday: "9.00 – 18.00" },
  { id: 3, name: "SEMENTINA",     address: "Via Pobbia 6",     zip: "6514 Sementina",     phone: "091 857 93 04", hours_weekdays: "8.30 – 19.00", hours_sunday: "9.00 – 18.00" },
  { id: 4, name: "MURALTO",       address: "Via Stazione 9",   zip: "6600 Muralto",       phone: "091 224 30 31", hours_weekdays: "8.30 – 19.00", hours_sunday: "9.00 – 18.00" },
  { id: 5, name: "SANT'ANTONINO", address: "Via Industrie 3",  zip: "6592 Sant'Antonino", phone: "091 224 30 31", hours_weekdays: "8.30 – 19.00", hours_sunday: "9.00 – 18.00" },
];

export default defineTool({
  name: "list_stores",
  title: "List DA MORENO stores",
  description:
    "List the 5 DA MORENO physical stores in Ticino (Switzerland) with address, ZIP, phone and opening hours.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ count: STORES.length, stores: STORES }, null, 2) }],
    structuredContent: { count: STORES.length, stores: STORES },
  }),
});
