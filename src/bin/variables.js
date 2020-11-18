const columns = [
  {
    name: "title",
    required: true,
    label: "Title",
    align: "left",
    field: "title"
  },
  {
    name: "price",
    align: "right",
    label: "price / savings",
    field: "salePrice"
  },
  {
    name: "store",
    label: "store",
    field: "storeID",
    align: "left"
  },
  {
    name: "release",
    label: "Release",
    field: "releaseDate",
    align: "left"
  },
  {
    name: "metacritic",
    label: "metacritic",
    field: "metacriticScore",
    align: "center"
  }
];

export { columns };
