---
theme: dashboard
title: Lausanne dashboard
toc: false
---

# Moyenne des catégories de métiers par année

```js
const input = await FileAttachment("./data/means_lausanne.json").json()

const cityNames = {
    "0": "1885",
    "1": "1901",
    "2": "1923",
    "3": "1951"
};

const demographicData = Object.entries(cityNames).map(([key, name]) => ({
    year: name,
    values: Object.values(input).map(obj => obj[key] ?? null)
}));

const groups = [
    "liberal_professions_law",
    "associations_unions",
    "liberal_professions_finance",
    "local_commerce_groceries",
    "hospitality_lodging",
    "raw_material_production",
    "livestock",
    "transport_professions",
    "sharpening_service",
    "raw_material_sales",
    "fine_articles",
    "bathing_establishments",
    "luxury_items",
    "garment_supplies",
    "book_art_supply",
    "science_articles",
    "containers",
    "laundry",
    "raw_material_building",
    "fabric_supply",
    "lighting",
    "construction_sites",
    "liberal_professions_construction",
    "entertainment_articles",
    "processing_articles",
    "antiquarians",
    "non_prestigious_garment",
    "raw_material_agriculture",
    "household_items",
    "products_boats_home",
    "liberal_professions_art",
    "personal_care",
    "medical_products",
    "agricultural_products",
    "liberal_professions_engraving",
    "local_commerce_groceries_soap",
    "postal_delivery",
    "children_entertainment",
    "tooling",
    "liberal_professions_retail",
    "food_processing",
    "recreational_leisure",
    "craft_processing",
    "construction_products",
    "education_professions",
    "widow",
    "other",
    "alcool_producer_seller"
];

const demographics = demographicData.flatMap(d => {
    const total = d.values.reduce((a, b) => a + b, 0);
    return d.values.map((count, i) => ({
        year: d.year,
        group: groups[i],
        percent: count / total
    }));
});
````


```js
const categoryColors = {
    liberal_professions_law: "#FF9999",
    liberal_professions_finance: "#FF8080",
    liberal_professions_construction: "#FF6666",
    liberal_professions_art: "#FF4D4D",
    liberal_professions_engraving: "#FF3333",
    liberal_professions_retail: "#FF1A1A",
    associations_unions: "#FFA07A",
    local_commerce_groceries: "#99CCFF",
    local_commerce_groceries_soap: "#80BFFF",
    fine_articles: "#66B2FF",
    luxury_items: "#4DA6FF",
    garment_supplies: "#3399FF",
    book_art_supply: "#1A8CFF",
    science_articles: "#007FFF",
    antiquarians: "#0066CC",
    hospitality_lodging: "#FFD700",
    bathing_establishments: "#FFC700",
    raw_material_production: "#90EE90",
    raw_material_sales: "#77DD77",
    raw_material_building: "#66CC66",
    raw_material_agriculture: "#55BB55",
    food_processing: "#44AA44",
    craft_processing: "#339933",
    construction_products: "#228822",
    processing_articles: "#117711",
    livestock: "#CCFFCC",
    agricultural_products: "#BBFFBB",
    transport_professions: "#CCCCFF",
    postal_delivery: "#B3B3FF",
    containers: "#9999FF",
    sharpening_service: "#FFB6C1",
    tooling: "#FF99CC",
    personal_care: "#FF80BF",
    laundry: "#FF66B2",
    entertainment_articles: "#DDA0DD",
    recreational_leisure: "#CC99FF",
    children_entertainment: "#BB88FF",
    non_prestigious_garment: "#D3D3D3",
    household_items: "#C0C0C0",
    products_boats_home: "#A9A9A9",
    medical_products: "#999999",
    education_professions: "#808080",
    widow: "#696969",
    other: "#555555",
    alcool_producer_seller: "#FF4444",

    // Missing from your original list, added based on data keys:
    fabric_supply: "#E6A8A8",
    lighting: "#FFDAB9",
    construction_sites: "#FFA500",
};
function stackedChart(data, {width} = {}) {
  return Plot.plot({
    title: "Proportions of Categories by Year",
    width,
    height: 800,
    x: {label: "Year", type: "band"},
    y: {label: "Percentage", percent: true},
    color: {
      legend: true,
      domain: Object.keys(categoryColors),
      range: Object.values(categoryColors),
      type: "ordinal"
    },
    marks: [
      Plot.barY(data, Plot.stackY({x: "year", y: "percent", fill: "group", tip: true})),
      Plot.ruleY([0])
    ]
  });
}
```


<div class="grid grid-cols-1"> <div class="card">${resize(width => stackedChart(demographics, {width}))}</div> </div>
