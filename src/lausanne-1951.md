---
title: Lausanne 1951
toc: false
---

```js
// Explicit import of leaflet to avoid issues with the Leaflet.heat plugin
import L from "npm:leaflet";
```

```js
// Wait for L to be defined before importing the Leaflet.heat plugin
// This is necessary because Leaflet.heat depends on the L variable being defined
if (L === undefined) console.error("L is undefined");

// Leaflet.heat: https://github.com/Leaflet/Leaflet.heat/
import "./plugins/leaflet-heat.js";
```

# Lausanne 1951

## Carte

```js
const mydata = await FileAttachment("./data/1951_prompt_based_classification_results_lausanne_all_persons_v2_normalized.csv").csv()
mydata.forEach((entry, index) => {
    entry.merge_id = index.toString();
});
const geojson = {
    name: "david",
    type: "FeatureCollection",
    crs: {type: "name", properties: {name: "urn:ogc:def:crs:OGC:1.3:CRS84"}},
    features: mydata.map((entry, i) => ({
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [parseFloat(entry.lon), parseFloat(entry.lat)]
        },
        properties: {...entry, merge_id: i.toString()}
    }))
};
// mydata.log(mydata)

```

<!-- Create the map container -->
<div id="map-container" style="height: 500px; margin: 1em 0 2em 0;"></div>

```js
// Create Map and Layer - Runs Once
function createMapAndLayer(mapContainer, geojsonData) {
    const map = L.map(mapContainer).setView([46.55, 6.65], 11);

    const osmLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const cartoLayer = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Crate a control to switch between layers
    const layerControl = L.control.layers().addTo(map);

    // Add the OSM and Carto layers to the control
    layerControl.addBaseLayer(osmLayer, "OSM");
    layerControl.addBaseLayer(cartoLayer, "Carto");

    // Store map from geom_id -> leaflet layer instance
    const featureLayersMap = new Map();

    const geoJsonLayer = L.geoJSON(geojsonData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 4,
                fillColor: getDominantCategoryColor(feature.properties),
                color: "#666",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5
            });
        },
        onEachFeature: function (feature, layer) {
            // Store a reference to the layer using its merge_id
            // As a single merge_id can be used for multiple features, we use a Set
            // to store all layers associated with that merge_id
            if (feature.properties && feature.properties.merge_id) {
                const merge_id = feature.properties.merge_id;

                // Check if the merge_id already exists in the map
                if (!featureLayersMap.has(merge_id)) {
                    featureLayersMap.set(merge_id, new Set());
                }
                // Add the layer to the Set associated with the merge_id
                featureLayersMap.get(merge_id).add(layer);

                // Bind a popup to the layer with the details of the corresponding entries
                const entries = mergeIDMap.get(merge_id);
                if (entries) {
                    const popupContent = entries.map(entry => {

                        return `<strong>CATEGORIES:</strong> ${getCategoriesForDisplay(entry).join(",\n")}<br>` +
                            columnNames.map(column => {
                                return `<strong>${column}:</strong> ${entry[column]}<br>`;
                            }).join("") + "<hr>";
                    }).join("");
                    layer.bindPopup(popupContent);
                }
            }
        }
    }).addTo(map);

    layerControl.addOverlay(geoJsonLayer, "Points");

    // Return the the map instance, the layer group, and the mapping
    return {map, layerControl, geoJsonLayer, featureLayersMap};
}

// Call the creation function and store the results
const mapElements = createMapAndLayer("map-container", geojson);
```

```js
// Reactive Update Cell - Runs when filteredMergeIDsSet changes
function updateMapFilter(geoJsonLayer, featureLayersMap, filteredMergeIDsSet) {
    let featuresAdded = 0;
    let featuresRemoved = 0;

    // Iterate through all the layers we stored
    featureLayersMap.forEach((layerSet, merge_id) => {
        const shouldBeVisible = filteredMergeIDsSet.has(merge_id);
        // LayerSet may contain multiple layers for the same merge_id
        layerSet.forEach(layer => {
            const isVisible = geoJsonLayer.hasLayer(layer);
            if (shouldBeVisible && !isVisible) {
                // If the layer is not already added, add it
                geoJsonLayer.addLayer(layer);
                featuresAdded++;
            } else if (!shouldBeVisible && isVisible) {
                // If the layer is currently displayed but should not be, remove it
                geoJsonLayer.removeLayer(layer);
                featuresRemoved++;
            }
        });
    });
}

// Call the update function. This cell depends on filteredMergeIDsSet and mapElements.
const mapUpdateStatus = updateMapFilter(mapElements.geoJsonLayer, mapElements.featureLayersMap, filteredMergeIDsSet)
```

```js
// Map the GeoJSON data to an array of entries matching the required pattern for the heatmap
// e.g. [50.5, 30.5, 0.2] // lat, lng, intensity
const heatmapData = geojson.features.map(feature => {
    const coords = feature.geometry.coordinates;
    const lat = coords[1];
    const lng = coords[0];
    const intensity = 0.5;
    return [lat, lng, intensity];
});
```

```js
// Create a heatmap layer using the heatmapData
const heatmapLayer = L.heatLayer(heatmapData, {
    radius: 10,
    blur: 15,
});

// Add the heatmap layer to the layer control
mapElements.layerControl.addOverlay(heatmapLayer, "Heatmap");
```

## Registre

```js
// const registre = FileAttachment("./data/lausanne-1888-cadastre-renove-registre-20250410.csv").csv()
const registre = await FileAttachment("./data/1951_prompt_based_classification_results_lausanne_all_persons_v2_normalized.csv").csv()
registre.forEach((entry, index) => {
    entry.merge_id = index.toString();
    entry.CATEGORIES = getCategories(entry).join(", ");
});
```

```js
// Create a list of column names
//  ,Unnamed: 0.1,Unnamed: 0,LASTNAME,FIRSTNAME,ORG,JOB,LOC,line,jobs,liberal_professions_law,associations_unions,liberal_professions_finance,local_commerce_groceries,hospitality_lodging,raw_material_production,livestock,transport_professions,sharpening_service,raw_material_sales,fine_articles,bathing_establishments,luxury_items,garment_supplies,book_art_supply,science_articles,beer_producer_seller,containers,laundry,raw_material_building,fabric_supply,lighting,construction_sites,liberal_professions_construction,entertainment_articles,processing_articles,antiquarians,non_prestigious_garment,raw_material_agriculture,household_items,products_boats_home,liberal_professions_art,personal_care,medical_products,agricultural_products,liberal_professions_engraving,local_commerce_groceries_soap,postal_delivery,children_entertainment,tooling,liberal_professions_retail,food_processing,recreational_leisure,craft_processing,construction_products,education_professions,widow,other,lon,lat
const columnNames = ["LASTNAME", "FIRSTNAME", "CATEGORIES", "ORG", "JOB", "LOC", "line", "lon", "lat"]
```

```js
// Create a Map of the merge_id to corresponding entries in the registre
// This is used to populate the popups with the relevant data for each point
const mergeIDMap = new Map();
registre.forEach(entry => {
    const merge_id = entry.merge_id;
    if (!mergeIDMap.has(merge_id)) {
        mergeIDMap.set(merge_id, []);
    }
    mergeIDMap.get(merge_id).push(entry);
});
```

_Utilisez le champ de recherche pour filtrer les entrées du registre. Les points affichés sur la carte sont mis à jour
en fonction du résultat de la recherche._

```js
const searchResults = view(Inputs.search(registre.filter(r => getCategories(r).some(elem => selectedCategories.includes(elem)))))
```

```js
Inputs.table(searchResults, { columns: columnNames })
```

```js
const filteredMergeIDs = searchResults.map(r => r.merge_id)
```

```js
const filteredMergeIDsSet = new Set(filteredMergeIDs);
```

```js
const categoryColors = {
    // Liberal professions
    liberal_professions_law: "#FF9999",
    liberal_professions_finance: "#FF8080",
    liberal_professions_construction: "#FF6666",
    liberal_professions_art: "#FF4D4D",
    liberal_professions_engraving: "#FF3333",
    liberal_professions_retail: "#FF1A1A",

    // Associations and unions
    associations_unions: "#FFA07A",

    // Commerce
    local_commerce_groceries: "#99CCFF",
    local_commerce_groceries_soap: "#80BFFF",
    fine_articles: "#66B2FF",
    luxury_items: "#4DA6FF",
    garment_supplies: "#3399FF",
    book_art_supply: "#1A8CFF",
    science_articles: "#007FFF",
    antiquarians: "#0066CC",

    // Hospitality
    hospitality_lodging: "#FFD700",
    bathing_establishments: "#FFC700",

    // Production and processing
    raw_material_production: "#90EE90",
    raw_material_sales: "#77DD77",
    raw_material_building: "#66CC66",
    raw_material_agriculture: "#55BB55",
    food_processing: "#44AA44",
    craft_processing: "#339933",
    construction_products: "#228822",
    processing_articles: "#117711",

    // Livestock and agriculture
    livestock: "#CCFFCC",
    agricultural_products: "#BBFFBB",

    // Transport and delivery
    transport_professions: "#CCCCFF",
    postal_delivery: "#B3B3FF",
    containers: "#9999FF",

    // Services and tools
    sharpening_service: "#FFB6C1",
    tooling: "#FF99CC",
    personal_care: "#FF80BF",
    laundry: "#FF66B2",

    // Entertainment and leisure
    entertainment_articles: "#DDA0DD",
    recreational_leisure: "#CC99FF",
    children_entertainment: "#BB88FF",

    // Miscellaneous
    non_prestigious_garment: "#D3D3D3",
    household_items: "#C0C0C0",
    products_boats_home: "#A9A9A9",
    medical_products: "#999999",
    education_professions: "#808080",
    widow: "#696969",
    other: "#555555"
};
categoryColors
```

```js
function getDominantCategoryColor(entry) {
    let maxCategory = null;
    let maxValue = -Infinity;
    Object.keys(categoryColors).forEach(category => {
        const val = parseFloat(entry[category]);
        if (!isNaN(val) && val > maxValue) {
            maxValue = val;
            maxCategory = category;
        }
    });

    return maxCategory ? categoryColors[maxCategory] : "#000000";
}

function getCategories(entry) {
    let categories = [];
    Object.keys(categoryColors).forEach(category => {
        const val = parseFloat(entry[category]);
        if (!isNaN(val) && val > 0) {
            categories.push(category);
        }
    });

    return categories;
}
```
```js
function getCategoriesForDisplay(entry) {
    let categories = [];
    Object.keys(categoryColors).forEach(category => {
        const val = parseFloat(entry[category]);
        if (!isNaN(val) && val > 0) {
            categories.push(category +" " +val+"%");
        }
    });

    return categories;
}
```
```js
const selectedCategories = view(
    Inputs.checkbox(Object.keys(categoryColors), {
        value: Object.keys(categoryColors),
        label: html`<b>Clusters</b>`,
        format: (x) =>
            html`<span style="
          text-transform: capitalize;
          border-bottom: solid 2px ${x};
          margin-bottom: -2px;
          color: ${categoryColors[x]};
        ">${x}</span>`
    })
);
```

```js
function getCategoriesForDisplay(entry) {
    let categories = [];
    Object.keys(categoryColors).forEach(category => {
        const val = parseFloat(entry[category]);
        if (!isNaN(val) && val > 0) {
            categories.push(category +" " +val+"%");
        }
    });

    return categories;
}
```
