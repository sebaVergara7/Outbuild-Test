export const paginationParameters = [
  {
    in: "query",
    name: "page",
    required: false,
    description: "Page number",
    schema: { type: "integer" },
    default: 1,
  },
  {
    in: "query",
    name: "pageSize",
    required: false,
    description: "Number of items per page",
    schema: { type: "integer" },
    default: 10,
  },
];
