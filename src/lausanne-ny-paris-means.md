---
theme: dashboard
title: Lausanne NewYork Paris 1885 dashboard
toc: false
---

# Moyenne des catégories de métiers par ville en 1885

```js
const demographicData = [
    {
        "ville": "Lausanne",
        "values": [
            0.0230951716, 0.0012326728, 0.0465857289, 0.0267466741, 0.0480277235, 0.0149944181,
            0.0103474742, 0.0713415201, 0.0008140292, 0.0017513257, 0.0149771407, 0.0002790957,
            0.003497003, 0.0658549633, 0.0092706298, 0.0003488697, 0.0000697739, 0.0099776723,
            0.0141165956, 0.0135245139, 0.0009419481, 0.0162247651, 0.0325322621, 0.0009559029,
            0.0005349335, 0.0003488697, 0.0003721276, 0.0077076937, 0.0221788073, 0.000046516,
            0.0266828808, 0.0054191088, 0.0094659968, 0.0159526468, 0.0018141222, 0.0006977393,
            0.0080240022, 0.0004419016, 0.0018955252, 0.013064006, 0.0023955717, 0.0002674667,
            0.0027690283, 0.0193961565, 0.0381430831, 0.1310587031, 0.0126290818, null
        ]
    },
    {
        "ville": "New York",
        "values": [
            0.0147321578, 0.0000779258, 0.009748383, 0.4826745585, 0.0137729742, 0.0116123545,
            0.0030540766, 0.023558372, 0.0007243591, 0.0039569925, 0.011040736, 0.0000389629,
            0.0056117337, 0.0332719667, 0.0053550059, 0.0002728796, 0.0008016422, 0.001548776,
            0.0141681364, 0.0240902159, 0.0009069414, 0.015796243, 0.0436269885, 0.0065956369,
            0.000409876, 0.0001150798, 0.0001535656, 0.009422327, 0.0108691931, 0.001589528,
            0.0162007914, 0.003133871, 0.0085058834, 0.0037319916, 0.0012030497, 0.0012196785,
            0.0000473121, 0.0003120413, 0.0071425556, 0.0099486842, 0.0021021886, 0.0005656183,
            0.0055188555, 0.0184359476, 0.0026103764, 0.0384200815, 0.0266511729, 0.1039092331
        ]
    },
    {
        "ville": "Paris",
        "values": [
            null, 0.0016139804, 0.0368432769, 0.05383645, 0.0486791333, 0.0084947314,
            0.0012243989, 0.0097951915, 0.0027827248, 0.0026472989, 0.0327871242, 0.0006121995,
            0.0182658059, 0.1629990353, 0.0222628588, 0.0044152568, 0.000222618, 0.0052315227,
            0.0039005852, 0.0731355744, 0.0010852627, 0.0018236123, 0.0148162872, 0.0018458741,
            0.0028291036, 0.0010203324, 0.000148412, 0.0031537548, 0.0122951384, 0.000556545,
            0.0543150787, 0.0243210151, 0.0377337489, 0.0021705254, 0.0080977293, 0.0002411695,
            0.000333927, 0.0007606115, 0.0018458741, 0.027512933, 0.0043781538, 0.0004266845,
            0.0094742505, 0.0045406119, 0.009071683, 0.0, 0.0648745919, 0.0865056397
        ]
    }
]

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
    "beer_producer_seller",
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
    "alcool_producer_seller"
];

const demographics = demographicData.flatMap(d => {
    const total = d.values.reduce((a, b) => a + b, 0);
    return d.values.map((count, i) => ({
        year: d.ville,
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
  other: "#555555"
};

function stackedChart(data, {width} = {}) {
  return Plot.plot({
    title: "Proportions of Categories by City",
    width,
    height: 800,
    x: {label: "Ville", type: "band"},
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
