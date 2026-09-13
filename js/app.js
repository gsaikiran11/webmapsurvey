// ============================================================
// OPENLAYERS MAP
// STAGE 2 - LAYER MANAGER
// ============================================================

// ------------------------------------------------------------
// GITHUB SETTINGS
// ------------------------------------------------------------

const GITHUB_OWNER = "gsaikiran11";
const GITHUB_REPO = "webmapsurvey";
const GITHUB_BRANCH = "main";
const GITHUB_LAYER_FOLDER = "layers";

// ------------------------------------------------------------
// PROJECTIONS
// ------------------------------------------------------------

const DATA_PROJECTION = "EPSG:32643";   // UTM Zone 43N
const MAP_PROJECTION = "EPSG:3857";      // OpenLayers map

// ------------------------------------------------------------
// BASE LAYERS
// ------------------------------------------------------------

// OpenStreetMap
const osmLayer = new ol.layer.Tile({
    title: "OpenStreetMap",
    type: "base",
    visible: true,
    source: new ol.source.XYZ({
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        attributions: '&copy; OpenStreetMap contributors'
    })
});

// Google Hybrid
const googleHybridLayer = new ol.layer.Tile({
    title: "Google Hybrid",
    type: "base",
    visible: false,

    source: new ol.source.XYZ({
        url:
            "https://mt1.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
        attributions:
            "© Google"
    })
});

// ------------------------------------------------------------
// MAP
// ------------------------------------------------------------

const map = new ol.Map({

    target: "map",

    layers: [
        osmLayer,
        googleHybridLayer
    ],

    view: new ol.View({

        projection: MAP_PROJECTION,

        center: ol.proj.fromLonLat([
            78.0,
            15.8
        ]),

        zoom: 7

    }),

    controls: ol.control.defaults.defaults().extend([

        new ol.control.ScaleLine(),

        new ol.control.FullScreen()

    ])

});

// ------------------------------------------------------------
// VECTOR LAYER ARRAY
// ------------------------------------------------------------

let vectorLayers = [];

// ------------------------------------------------------------
// CREATE LAYER SWITCHER
// ------------------------------------------------------------

// ============================================================
// CREATE COLLAPSIBLE LAYER SWITCHER
// ============================================================

// ============================================================
// 🗂️ COLLAPSIBLE LAYER SWITCHER
// ============================================================

function createLayerSwitcher() {

    const panel = document.createElement("div");

    panel.className = "layer-switcher";

    panel.innerHTML = `

        <!-- ==================================================
             LAYERS BUTTON
             ================================================== -->

        <div
            class="layer-switcher-header"
            title="Layers">

            <span class="layer-switcher-title">
                Layers
            </span>

        </div>


        <!-- ==================================================
             LAYER SWITCHER CONTENT
             ================================================== -->

        <div id="layer-switcher-content">

            <!-- BASE MAPS -->

            <div class="layer-section-title">
                Base Maps
            </div>

            <div id="base-layers"></div>


            <!-- DIVIDER -->

            <div class="layer-divider"></div>


            <!-- VECTOR LAYERS -->

            <div class="layer-section-title">
                Layers
            </div>

            <div id="vector-layers"></div>

        </div>

    `;


    // --------------------------------------------------------
    // ADD SWITCHER TO PAGE
    // --------------------------------------------------------

    document.body.appendChild(panel);


    // --------------------------------------------------------
    // CREATE BASE MAP CONTROLS
    // --------------------------------------------------------

    createBaseLayerControls();


    // --------------------------------------------------------
    // GET ELEMENTS
    // --------------------------------------------------------

    const header =
        panel.querySelector(
            ".layer-switcher-header"
        );

    const content =
        panel.querySelector(
            "#layer-switcher-content"
        );


    // --------------------------------------------------------
    // START COLLAPSED
    // --------------------------------------------------------

    panel.classList.remove("open");


    // --------------------------------------------------------
    // CLICK LAYERS ICON
    // --------------------------------------------------------

    header.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            panel.classList.toggle("open");

        }
    );


    // --------------------------------------------------------
    // CLICK INSIDE PANEL
    // DO NOT CLOSE PANEL
    // --------------------------------------------------------

    content.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );

}


// ============================================================
// BASE LAYER CONTROLS
// ============================================================

function createBaseLayerControls() {

    const container =
        document.getElementById(
            "base-layers"
        );

    if (!container) return;


    container.innerHTML = "";


    // ========================================================
    // OPEN STREET MAP
    // ========================================================

    const osmItem =
        document.createElement(
            "label"
        );

    osmItem.className =
        "layer-item";


    const osmRadio =
        document.createElement(
            "input"
        );

    osmRadio.type =
        "radio";

    osmRadio.name =
        "base-layer";

    osmRadio.checked =
        osmLayer.getVisible();


    osmRadio.onchange =
        function () {

            if (osmRadio.checked) {

                osmLayer.setVisible(
                    true
                );

                googleHybridLayer.setVisible(
                    false
                );

            }

        };


    const osmText =
        document.createElement(
            "span"
        );

    osmText.textContent =
        "OpenStreetMap";


    osmItem.appendChild(
        osmRadio
    );

    osmItem.appendChild(
        osmText
    );

    container.appendChild(
        osmItem
    );


    // ========================================================
    // GOOGLE HYBRID
    // ========================================================

    const googleItem =
        document.createElement(
            "label"
        );

    googleItem.className =
        "layer-item";


    const googleRadio =
        document.createElement(
            "input"
        );

    googleRadio.type =
        "radio";

    googleRadio.name =
        "base-layer";

    googleRadio.checked =
        googleHybridLayer.getVisible();


    googleRadio.onchange =
        function () {

            if (googleRadio.checked) {

                osmLayer.setVisible(
                    false
                );

                googleHybridLayer.setVisible(
                    true
                );

            }

        };


    const googleText =
        document.createElement(
            "span"
        );

    googleText.textContent =
        "Google Hybrid";


    googleItem.appendChild(
        googleRadio
    );

    googleItem.appendChild(
        googleText
    );

    container.appendChild(
        googleItem
    );

}


// ============================================================
// CREATE LAYER BUTTON
// ============================================================

function createLayerButton(
    text,
    title
) {

    const button =
        document.createElement(
            "button"
        );

    button.type =
        "button";

    button.className =
        "layer-button";

    button.textContent =
        text;

    button.title =
        title;

    return button;

}


// ============================================================
// ADD VECTOR LAYER TO LAYER MANAGER
// ============================================================

function addOverlayToSwitcher(
    layer
) {

    const container =
        document.getElementById(
            "vector-layers"
        );

    if (!container) return;


    // --------------------------------------------------------
    // CREATE ROW
    // --------------------------------------------------------

    const row =
        document.createElement(
            "div"
        );

    row.className =
        "layer-manager-row";


    // Save row reference

    layer.set(
        "managerRow",
        row
    );


    // --------------------------------------------------------
    // NAME SECTION
    // --------------------------------------------------------

    const nameSection =
        document.createElement(
            "div"
        );

    nameSection.className =
        "layer-name-section";


    // --------------------------------------------------------
    // CHECKBOX
    // --------------------------------------------------------

    const checkbox =
        document.createElement(
            "input"
        );

    checkbox.type =
        "checkbox";

    checkbox.checked =
        layer.getVisible();


    checkbox.onchange =
        function () {

            layer.setVisible(
                checkbox.checked
            );

        };


    // --------------------------------------------------------
    // LAYER NAME
    // --------------------------------------------------------

    const name =
        document.createElement(
            "span"
        );

    name.className =
        "layer-name";


    const layerTitle =
        layer.get("title") ||
        "Unnamed Layer";


    name.textContent =
        layerTitle;

    name.title =
        layerTitle;


    // --------------------------------------------------------
    // ADD NAME ELEMENTS
    // --------------------------------------------------------

    nameSection.appendChild(
        checkbox
    );

    nameSection.appendChild(
        name
    );


    // --------------------------------------------------------
    // BUTTON SECTION
    // --------------------------------------------------------

    const buttons =
        document.createElement(
            "div"
        );

    buttons.className =
        "layer-buttons";


    // ========================================================
    // ZOOM BUTTON
    // ========================================================

    const zoomButton =
        createLayerButton(
            "🔍",
            "Zoom to layer"
        );


    zoomButton.onclick =
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            zoomToLayer(
                layer
            );

        };


    // ========================================================
    // MOVE UP BUTTON
    // ========================================================

    const upButton =
        createLayerButton(
            "↑",
            "Move layer up"
        );


    upButton.onclick =
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            moveLayerUp(
                layer
            );

        };


    // ========================================================
    // MOVE DOWN BUTTON
    // ========================================================

    const downButton =
        createLayerButton(
            "↓",
            "Move layer down"
        );


    downButton.onclick =
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            moveLayerDown(
                layer
            );

        };


    // --------------------------------------------------------
    // ADD BUTTONS
    // --------------------------------------------------------

    buttons.appendChild(
        zoomButton
    );

    buttons.appendChild(
        upButton
    );

    buttons.appendChild(
        downButton
    );


    // --------------------------------------------------------
    // ADD TO ROW
    // --------------------------------------------------------

    row.appendChild(
        nameSection
    );

    row.appendChild(
        buttons
    );


    // --------------------------------------------------------
    // ADD ROW TO CONTAINER
    // --------------------------------------------------------

    container.appendChild(
        row
    );

}


// ============================================================
// ZOOM TO LAYER
// ============================================================

function zoomToLayer(
    layer
) {

    const source =
        layer.getSource();

    if (!source) return;


    const extent =
        source.getExtent();

    if (!extent) return;


    if (

        extent[0] === Infinity ||

        extent[1] === Infinity ||

        extent[2] === -Infinity ||

        extent[3] === -Infinity

    ) {

        alert(
            "Layer does not contain any features."
        );

        return;

    }


    map.getView().fit(
        extent,
        {

            padding: [
                80,
                80,
                80,
                80
            ],

            duration: 700,

            maxZoom: 19

        }
    );

}


// ============================================================
// MOVE LAYER UP
// ============================================================

function moveLayerUp(
    layer
) {

    const index =
        vectorLayers.indexOf(
            layer
        );


    if (index <= 0) {

        return;

    }


    // --------------------------------------------------------
    // SWAP
    // --------------------------------------------------------

    const temp =
        vectorLayers[
            index - 1
        ];


    vectorLayers[
        index - 1
    ] =
        vectorLayers[
            index
        ];


    vectorLayers[
        index
    ] =
        temp;


    rebuildMapOrder();

    rebuildLayerManager();

}


// ============================================================
// MOVE LAYER DOWN
// ============================================================

function moveLayerDown(
    layer
) {

    const index =
        vectorLayers.indexOf(
            layer
        );


    if (

        index === -1 ||

        index >=
        vectorLayers.length - 1

    ) {

        return;

    }


    // --------------------------------------------------------
    // SWAP
    // --------------------------------------------------------

    const temp =
        vectorLayers[
            index + 1
        ];


    vectorLayers[
        index + 1
    ] =
        vectorLayers[
            index
        ];


    vectorLayers[
        index
    ] =
        temp;


    rebuildMapOrder();

    rebuildLayerManager();

}


// ============================================================
// REBUILD MAP LAYER ORDER
// ============================================================

function rebuildMapOrder() {

    vectorLayers.forEach(
        function (layer) {

            map.removeLayer(
                layer
            );

        }
    );


    vectorLayers.forEach(
        function (layer) {

            map.addLayer(
                layer
            );

        }
    );

}


// ============================================================
// REBUILD LAYER MANAGER
// ============================================================

function rebuildLayerManager() {

    const container =
        document.getElementById(
            "vector-layers"
        );

    if (!container) return;


    container.innerHTML = "";


    vectorLayers.forEach(
        function (layer) {

            addOverlayToSwitcher(
                layer
            );

        }
    );

}


// ============================================================
// LOAD GEOJSON
// ============================================================

async function loadGeoJSON(
    fileUrl,
    layerName
) {

    try {

        console.log(
            "Loading:",
            fileUrl
        );


        const response =
            await fetch(
                fileUrl
            );


        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status
            );

        }


        const geojson =
            await response.json();


        // ----------------------------------------------------
        // READ FEATURES
        // ----------------------------------------------------

        const format =
            new ol.format.GeoJSON({

                dataProjection:
                    DATA_PROJECTION,

                featureProjection:
                    MAP_PROJECTION

            });


        const features =
            format.readFeatures(
                geojson
            );


        console.log(
            "Loaded:",
            layerName,
            "Features:",
            features.length
        );


        // ----------------------------------------------------
        // VECTOR SOURCE
        // ----------------------------------------------------

        const source =
            new ol.source.Vector({

                features:
                    features

            });


        // ----------------------------------------------------
        // VECTOR LAYER
        // ----------------------------------------------------

        const layer =
            new ol.layer.Vector({

                source:
                    source,

                visible:
                    false

            });


        layer.set(
            "title",
            layerName
        );


        layer.set(
            "file",
            fileUrl
        );


        // ----------------------------------------------------
        // ADD TO ARRAY
        // ----------------------------------------------------

        vectorLayers.push(
            layer
        );


        // ----------------------------------------------------
        // ADD TO MAP
        // ----------------------------------------------------

        map.addLayer(
            layer
        );


        // ----------------------------------------------------
        // ADD TO SWITCHER
        // ----------------------------------------------------

        addOverlayToSwitcher(
            layer
        );


        console.log(
            "Layer added:",
            layerName
        );


        return layer;

    }

    catch (error) {

        console.error(
            "Error loading layer:",
            fileUrl,
            error
        );

    }

}


// ============================================================
// GET LOCAL SERVER GEOJSON FILES
// ============================================================

async function getLocalGeoJSONFiles() {

    try {

        const response =
            await fetch(
                "layers/"
            );


        if (!response.ok) {

            throw new Error(
                "Cannot access layers folder"
            );

        }


        const html =
            await response.text();


        // ----------------------------------------------------
        // FIND GEOJSON FILES
        // ----------------------------------------------------

        const parser =
            new DOMParser();


        const doc =
            parser.parseFromString(
                html,
                "text/html"
            );


        const links =
            Array.from(
                doc.querySelectorAll(
                    "a"
                )
            );


        const files =
            links
                .map(
                    function (link) {

                        return link.getAttribute(
                            "href"
                        );

                    }
                )
                .filter(
                    function (href) {

                        return href &&
                            href
                                .toLowerCase()
                                .endsWith(
                                    ".geojson"
                                );

                    }
                );


        // ----------------------------------------------------
        // REMOVE DUPLICATES
        // ----------------------------------------------------

        return [
            ...new Set(
                files
            )
        ];

    }

    catch (error) {

        console.error(
            "Local folder detection failed:",
            error
        );

        return [];

    }

}


// ============================================================
// GET GITHUB GEOJSON FILES
// ============================================================

async function getGitHubGeoJSONFiles() {

    try {

        const apiUrl =
            "https://api.github.com/repos/" +

            GITHUB_OWNER +

            "/" +

            GITHUB_REPO +

            "/contents/" +

            GITHUB_LAYER_FOLDER +

            "?ref=" +

            GITHUB_BRANCH;


        const response =
            await fetch(
                apiUrl
            );


        if (!response.ok) {

            throw new Error(
                "GitHub API error: " +
                response.status
            );

        }


        const files =
            await response.json();


        return files

            .filter(
                function (file) {

                    return (

                        file.type ===
                        "file"

                        &&

                        file.name
                            .toLowerCase()
                            .endsWith(
                                ".geojson"
                            )

                    );

                }
            )

            .map(
                function (file) {

                    return {

                        name:
                            file.name,

                        url:
                            file.download_url

                    };

                }
            );

    }

    catch (error) {

        console.error(
            "GitHub layer detection failed:",
            error
        );

        return [];

    }

}


// ============================================================
// LOAD ALL LOCAL LAYERS
// ============================================================

async function loadLocalLayers() {

    console.log(
        "Detecting GeoJSON files in layers folder..."
    );


    const files =
        await getLocalGeoJSONFiles();


    console.log(
        "Detected files:",
        files
    );


    for (
        const file of files
    ) {

        const fileName =
            file
                .split("/")
                .pop();


        const layerName =
            fileName
                .replace(
                    /\.geojson$/i,
                    ""
                );


        await loadGeoJSON(
            "layers/" +
            fileName,

            layerName
        );

    }

}


// ============================================================
// LOAD ALL GITHUB LAYERS
// ============================================================

async function loadGitHubLayers() {

    console.log(
        "Detecting GitHub GeoJSON files..."
    );


    const files =
        await getGitHubGeoJSONFiles();


    console.log(
        "Detected GitHub files:",
        files
    );


    for (
        const file of files
    ) {

        const layerName =
            file.name
                .replace(
                    /\.geojson$/i,
                    ""
                );


        await loadGeoJSON(
            file.url,
            layerName
        );

    }

}


// ============================================================
// AUTOMATIC LAYER DETECTION
// ============================================================

async function autoLoadLayers() {

    const hostname =
        window.location.hostname;


    console.log(
        "Current hostname:",
        hostname
    );


    // --------------------------------------------------------
    // GITHUB PAGES
    // --------------------------------------------------------

    if (
        hostname.endsWith(
            "github.io"
        )
    ) {

        console.log(
            "GitHub Pages detected"
        );


        await loadGitHubLayers();

    }


    // --------------------------------------------------------
    // LOCAL SERVER
    // --------------------------------------------------------

    else {

        console.log(
            "Local web server detected"
        );


        await loadLocalLayers();

    }


    // --------------------------------------------------------
    // ZOOM TO FIRST LAYER
    // --------------------------------------------------------

    if (
        vectorLayers.length > 0
    ) {

        const firstLayer =
            vectorLayers[0];


        const source =
            firstLayer.getSource();


        if (source) {

            const extent =
                source.getExtent();


            if (

                extent &&

                extent[0] !== Infinity

            ) {

                map.getView().fit(
                    extent,
                    {

                        padding: [
                            50,
                            50,
                            50,
                            50
                        ],

                        duration: 800,

                        maxZoom: 18

                    }
                );

            }

        }

    }

}


// ============================================================
// 🚀 START APPLICATION
// ============================================================

createLayerSwitcher();

autoLoadLayers();

console.log(
    "OpenLayers application started."
);



































































// ============================================================
// 🎨 DYNAMIC LAYER STYLE EDITOR
// QGIS2Web + OpenLayers
// ============================================================
// FEATURES
// ------------------------------------------------------------
// ✔ Automatic vector layer detection
// ✔ Single Symbol styling
// ✔ Categorized / Unique Value styling
// ✔ Automatic attribute field detection
// ✔ Automatic unique value detection
// ✔ Individual category colors
// ✔ Fill color
// ✔ Fill opacity
// ✔ Border color
// ✔ Border width
// ✔ Feature labels
// ✔ Label field
// ✔ Label color
// ✔ Label size
// ✔ Label rotation
// ✔ LocalStorage persistence
// ✔ Restore styles after page reload
// ✔ Reset layer style
// ✔ Mobile-friendly UI
// ✔ Works with QGIS2Web OpenLayers
// ============================================================


// ============================================================
// 1. GLOBAL VARIABLES
// ============================================================

var dynamicStyleEditor = {
    panel: null,
    layerSelect: null,
    styleTypeSelect: null,

    fillColor: null,
    fillOpacity: null,

    strokeColor: null,
    strokeWidth: null,

    categoryField: null,
    categoryContainer: null,

    labelEnabled: null,
    labelField: null,
    labelColor: null,
    labelSize: null,
    labelRotation: null,

    applyButton: null,
    resetButton: null,

    currentLayer: null
};


// ============================================================
// 2. LOCAL STORAGE KEY
// ============================================================

var DYNAMIC_STYLE_STORAGE_KEY = "QGIS2WEB_DYNAMIC_LAYER_STYLES_V1";


// ============================================================
// 3. STORAGE FUNCTIONS
// ============================================================

function getSavedStyles() {

    try {

        var saved = localStorage.getItem(DYNAMIC_STYLE_STORAGE_KEY);

        if (!saved) {
            return {};
        }

        return JSON.parse(saved);

    } catch (e) {

        console.error(
            "Dynamic Style Editor: Unable to read localStorage",
            e
        );

        return {};
    }
}


function saveAllStyles(styles) {

    try {

        localStorage.setItem(
            DYNAMIC_STYLE_STORAGE_KEY,
            JSON.stringify(styles)
        );

    } catch (e) {

        console.error(
            "Dynamic Style Editor: Unable to save localStorage",
            e
        );
    }
}


// ============================================================
// 4. GET VECTOR LAYERS
// ============================================================

function getVectorLayers() {

    var layers = [];

    if (!map) {
        return layers;
    }

    /*
     * Keep track of layers already added.
     * This prevents the same layer from appearing
     * multiple times in the dropdown.
     */
    var seenLayers = [];

    map.getLayers().forEach(function(layer) {

        if (
            !(
                layer instanceof ol.layer.Vector ||
                layer instanceof ol.layer.VectorImage
            )
        ) {
            return;
        }


        // ----------------------------------------------------
        // Ignore internal QGIS2Web/helper layers
        // ----------------------------------------------------

        var excluded = [
            "featureOverlay",
            "measureLayer",
            "geolocateOverlay",
            "stage14MeasureLayer",
            "stage14SnapLayer"
        ];


        var title =
            layer.get("title") ||
            layer.get("name") ||
            layer.get("layerName") ||
            layer.get("popuplayertitle") ||
            "";


        if (
            excluded.indexOf(title) !== -1
        ) {
            return;
        }


        // ----------------------------------------------------
        // Must have a source
        // ----------------------------------------------------

        var source =
            layer.getSource();

        if (!source) {
            return;
        }


        // ----------------------------------------------------
        // Must contain features
        // ----------------------------------------------------

        if (
            typeof source.getFeatures !==
            "function"
        ) {
            return;
        }


        var features =
            source.getFeatures();

        if (
            !features ||
            features.length === 0
        ) {
            return;
        }


        // ----------------------------------------------------
        // Get layer name
        // ----------------------------------------------------

        var layerName =
            getLayerName(layer);


        if (
            !layerName ||
            layerName === "Layer"
        ) {
            return;
        }


        // ----------------------------------------------------
        // Prevent duplicate layers
        // ----------------------------------------------------

        var duplicate =
            false;


        for (
            var i = 0;
            i < seenLayers.length;
            i++
        ) {

            var existing =
                seenLayers[i];


            /*
             * First compare the actual layer object.
             */

            if (
                existing.layer === layer
            ) {

                duplicate = true;

                break;
            }


            /*
             * Then compare layer name + source.
             *
             * This catches QGIS2Web duplicate
             * layer references.
             */

            var existingSource =
                existing.layer.getSource();


            var sameSource =
                existingSource === source;


            var sameName =
                getLayerName(
                    existing.layer
                ) === layerName;


            if (
                sameSource &&
                sameName
            ) {

                duplicate = true;

                break;
            }
        }


        if (duplicate) {
            return;
        }


        // ----------------------------------------------------
        // Add layer
        // ----------------------------------------------------

        seenLayers.push({
            layer: layer
        });


        layers.push(layer);

    });


    return layers;
}


// ============================================================
// 5. GET LAYER NAME
// ============================================================

function getLayerName(layer) {

    if (!layer) {
        return "Layer";
    }

    return (
        layer.get("popuplayertitle") ||
        layer.get("title") ||
        layer.get("name") ||
        layer.get("layerName") ||
        "Layer"
    );
}


// ============================================================
// 6. CREATE STABLE LAYER KEY
// ============================================================

function getLayerKey(layer) {

    var name = getLayerName(layer);

    var source = layer.getSource();

    var url = "";

    if (
        source &&
        typeof source.getUrl === "function"
    ) {

        try {
            url = source.getUrl() || "";
        } catch (e) {
            url = "";
        }
    }

    return name + "|" + url;
}


// ============================================================
// 7. GET FEATURE FIELDS
// ============================================================

function getLayerFields(layer) {

    var fields = [];

    if (!layer || !layer.getSource()) {
        return fields;
    }

    var features =
        layer.getSource().getFeatures();

    if (!features || features.length === 0) {
        return fields;
    }

    features.some(function(feature) {

        var properties =
            feature.getProperties();

        Object.keys(properties).forEach(function(key) {

            if (
                key !== "geometry" &&
                key !== "layerObject" &&
                key !== "idO"
            ) {

                if (fields.indexOf(key) === -1) {
                    fields.push(key);
                }
            }

        });

        return fields.length > 0;
    });

    return fields.sort();
}


// ============================================================
// 8. GET UNIQUE VALUES
// ============================================================

function getUniqueValues(layer, field) {

    var values = [];

    if (
        !layer ||
        !layer.getSource() ||
        !field
    ) {
        return values;
    }

    var features =
        layer.getSource().getFeatures();

    var valueMap = {};

    features.forEach(function(feature) {

        var value = feature.get(field);

        if (
            value !== undefined &&
            value !== null &&
            String(value).trim() !== ""
        ) {

            var text = String(value);

            if (!valueMap[text]) {

                valueMap[text] = true;
                values.push(text);
            }
        }

    });

    return values.sort(function(a, b) {

        return a.localeCompare(b, undefined, {
            numeric: true,
            sensitivity: "base"
        });

    });
}


// ============================================================
// 9. RANDOM COLOR
// ============================================================

function randomColor(index) {

    var colors = [

        "#e6194b",
        "#3cb44b",
        "#ffe119",
        "#4363d8",
        "#f58231",
        "#911eb4",
        "#46f0f0",
        "#f032e6",
        "#bcf60c",
        "#fabebe",
        "#008080",
        "#e6beff",
        "#9a6324",
        "#fffac8",
        "#800000",
        "#aaffc3",
        "#808000",
        "#ffd8b1",
        "#000075",
        "#808080",
        "#42d4f4",
        "#bfef45",
        "#469990",
        "#dcbeff",
        "#9A6324",
        "#800000"

    ];

    return colors[index % colors.length];
}


// ============================================================
// 10. HEX → RGBA
// ============================================================

function hexToRgba(hex, opacity) {

    if (!hex) {
        hex = "#ffffff";
    }

    hex = hex.replace("#", "");

    if (hex.length === 3) {

        hex =
            hex[0] + hex[0] +
            hex[1] + hex[1] +
            hex[2] + hex[2];
    }

    var r =
        parseInt(hex.substring(0, 2), 16);

    var g =
        parseInt(hex.substring(2, 4), 16);

    var b =
        parseInt(hex.substring(4, 6), 16);

    return "rgba(" +
        r + "," +
        g + "," +
        b + "," +
        opacity +
        ")";
}


// ============================================================
// 11. CREATE PANEL
// ============================================================

function createDynamicStylePanel() {

    if (
        document.getElementById(
            "dynamic-style-editor-panel"
        )
    ) {
        return;
    }


    // --------------------------------------------------------
    // PANEL
    // --------------------------------------------------------

    var panel =
        document.createElement("div");

    panel.id =
        "dynamic-style-editor-panel";

    panel.innerHTML = `

        <div id="dynamic-style-header">

            <span>
                🎨 Layer Style Editor
            </span>

            <button
                id="dynamic-style-close"
                type="button">
                ×
            </button>

        </div>


        <div id="dynamic-style-content">

            <label>
                Layer
            </label>

            <select
                id="dynamic-style-layer">
            </select>


            <label>
                Style Type
            </label>

            <select
                id="dynamic-style-type">

                <option value="single">
                    Single Symbol
                </option>

                <option value="categorized">
                    Categorized / Unique Value
                </option>

            </select>


            <div class="style-section">

                <div class="style-section-title">
                    🎨 Fill
                </div>


                <label>
                    Fill Color
                </label>

                <input
                    type="color"
                    id="dynamic-fill-color"
                    value="#4CAF50"
                >


                <label>
                    Fill Opacity
                </label>

                <div class="range-row">

                    <input
                        type="range"
                        id="dynamic-fill-opacity"
                        min="0"
                        max="1"
                        step="0.01"
                        value="0.45"
                    >

                    <span
                        id="dynamic-fill-opacity-value">
                        45%
                    </span>

                </div>

            </div>


            <div class="style-section">

                <div class="style-section-title">
                    🖊 Border
                </div>


                <label>
                    Border Color
                </label>

                <input
                    type="color"
                    id="dynamic-stroke-color"
                    value="#000000"
                >


                <label>
                    Border Width
                </label>

                <input
                    type="number"
                    id="dynamic-stroke-width"
                    min="0"
                    max="20"
                    step="0.5"
                    value="1"
                >

            </div>


            <div
                id="dynamic-category-section"
                class="style-section">

                <div class="style-section-title">
                    🏷 Categorized Styling
                </div>


                <label>
                    Category Field
                </label>

                <select
                    id="dynamic-category-field">
                </select>


                <div
                    id="dynamic-category-container">
                </div>

            </div>


            <div class="style-section">

                <div class="style-section-title">
                    🔤 Labels
                </div>


                <label class="checkbox-row">

                    <input
                        type="checkbox"
                        id="dynamic-label-enabled"
                    >

                    <span>
                        Show Labels
                    </span>

                </label>


                <label>
                    Label Field
                </label>

                <select
                    id="dynamic-label-field">
                </select>


                <label>
                    Label Color
                </label>

                <input
                    type="color"
                    id="dynamic-label-color"
                    value="#000000"
                >


                <label>
                    Label Size
                </label>

                <input
                    type="number"
                    id="dynamic-label-size"
                    min="6"
                    max="50"
                    step="1"
                    value="12"
                >


                <label>
                    Label Rotation
                </label>

                <input
                    type="number"
                    id="dynamic-label-rotation"
                    min="-180"
                    max="180"
                    step="1"
                    value="0"
                >

            </div>


            <div class="dynamic-style-buttons">

                <button
                    id="dynamic-style-apply"
                    type="button">
                    ✓ Apply & Save
                </button>


                <button
                    id="dynamic-style-reset"
                    type="button">
                    ↺ Reset
                </button>

            </div>


            <div
                id="dynamic-style-status">
            </div>

        </div>
    `;


    document.body.appendChild(panel);

    dynamicStyleEditor.panel = panel;


    // --------------------------------------------------------
    // GET ELEMENTS
    // --------------------------------------------------------

    dynamicStyleEditor.layerSelect =
        document.getElementById(
            "dynamic-style-layer"
        );

    dynamicStyleEditor.styleTypeSelect =
        document.getElementById(
            "dynamic-style-type"
        );

    dynamicStyleEditor.fillColor =
        document.getElementById(
            "dynamic-fill-color"
        );

    dynamicStyleEditor.fillOpacity =
        document.getElementById(
            "dynamic-fill-opacity"
        );

    dynamicStyleEditor.strokeColor =
        document.getElementById(
            "dynamic-stroke-color"
        );

    dynamicStyleEditor.strokeWidth =
        document.getElementById(
            "dynamic-stroke-width"
        );

    dynamicStyleEditor.categoryField =
        document.getElementById(
            "dynamic-category-field"
        );

    dynamicStyleEditor.categoryContainer =
        document.getElementById(
            "dynamic-category-container"
        );

    dynamicStyleEditor.labelEnabled =
        document.getElementById(
            "dynamic-label-enabled"
        );

    dynamicStyleEditor.labelField =
        document.getElementById(
            "dynamic-label-field"
        );

    dynamicStyleEditor.labelColor =
        document.getElementById(
            "dynamic-label-color"
        );

    dynamicStyleEditor.labelSize =
        document.getElementById(
            "dynamic-label-size"
        );

    dynamicStyleEditor.labelRotation =
        document.getElementById(
            "dynamic-label-rotation"
        );

    dynamicStyleEditor.applyButton =
        document.getElementById(
            "dynamic-style-apply"
        );

    dynamicStyleEditor.resetButton =
        document.getElementById(
            "dynamic-style-reset"
        );


    // --------------------------------------------------------
    // EVENTS
    // --------------------------------------------------------

    dynamicStyleEditor.layerSelect
        .addEventListener(
            "change",
            function() {

                var index =
                    parseInt(
                        this.value,
                        10
                    );

                var layers =
                    getVectorLayers();

                dynamicStyleEditor.currentLayer =
                    layers[index];

                loadLayer(
                    dynamicStyleEditor.currentLayer
                );
            }
        );


    dynamicStyleEditor.styleTypeSelect
        .addEventListener(
            "change",
            function() {

                updateCategoryVisibility();

                if (
                    this.value ===
                    "categorized"
                ) {

                    populateCategoryValues();
                }
            }
        );


    dynamicStyleEditor.categoryField
        .addEventListener(
            "change",
            function() {

                populateCategoryValues();
            }
        );


    dynamicStyleEditor.fillOpacity
        .addEventListener(
            "input",
            function() {

                document.getElementById(
                    "dynamic-fill-opacity-value"
                ).textContent =
                    Math.round(
                        parseFloat(
                            this.value
                        ) * 100
                    ) + "%";
            }
        );


    dynamicStyleEditor.applyButton
        .addEventListener(
            "click",
            function() {

                applyCurrentStyle();
            }
        );


    dynamicStyleEditor.resetButton
        .addEventListener(
            "click",
            function() {

                resetCurrentStyle();
            }
        );


    document.getElementById(
        "dynamic-style-close"
    ).addEventListener(
        "click",
        function() {

            closeDynamicStyleEditor();
        }
    );


    // Initial population

    populateLayers();

    updateCategoryVisibility();
}


// ============================================================
// 12. POPULATE LAYERS
// ============================================================

function populateLayers() {

    var select =
        dynamicStyleEditor.layerSelect;

    if (!select) {
        return;
    }

    select.innerHTML = "";

    var layers =
        getVectorLayers();

    layers.forEach(
        function(layer, index) {

            var option =
                document.createElement("option");

            option.value = index;

            option.textContent =
                getLayerName(layer);

            select.appendChild(option);
        }
    );


    if (layers.length > 0) {

        dynamicStyleEditor.currentLayer =
            layers[0];

        select.value = "0";

        loadLayer(layers[0]);
    }
}


// ============================================================
// 13. POPULATE FIELDS
// ============================================================

function populateFields(layer) {

    var fields =
        getLayerFields(layer);


    // --------------------------------------------------------
    // LABEL FIELD
    // --------------------------------------------------------

    var labelSelect =
        dynamicStyleEditor.labelField;

    labelSelect.innerHTML = "";

    var blankLabel =
        document.createElement("option");

    blankLabel.value = "";

    blankLabel.textContent =
        "-- Select Label Field --";

    labelSelect.appendChild(
        blankLabel
    );


    fields.forEach(
        function(field) {

            var option =
                document.createElement("option");

            option.value = field;

            option.textContent = field;

            labelSelect.appendChild(
                option
            );
        }
    );


    // --------------------------------------------------------
    // CATEGORY FIELD
    // --------------------------------------------------------

    var categorySelect =
        dynamicStyleEditor.categoryField;

    categorySelect.innerHTML = "";

    var blankCategory =
        document.createElement("option");

    blankCategory.value = "";

    blankCategory.textContent =
        "-- Select Category Field --";

    categorySelect.appendChild(
        blankCategory
    );


    fields.forEach(
        function(field) {

            var option =
                document.createElement("option");

            option.value = field;

            option.textContent = field;

            categorySelect.appendChild(
                option
            );
        }
    );
}


// ============================================================
// 14. POPULATE CATEGORY VALUES
// ============================================================

function populateCategoryValues() {

    var layer =
        dynamicStyleEditor.currentLayer;

    if (!layer) {
        return;
    }

    var field =
        dynamicStyleEditor.categoryField.value;

    var container =
        dynamicStyleEditor.categoryContainer;

    container.innerHTML = "";


    if (!field) {

        return;
    }


    var values =
        getUniqueValues(
            layer,
            field
        );


    var saved =
        getSavedStyles();

    var layerKey =
        getLayerKey(layer);

    var savedStyle =
        saved[layerKey] || {};

    var savedColors =
        savedStyle.categoryColors || {};


    values.forEach(
        function(value, index) {

            var row =
                document.createElement("div");

            row.className =
                "category-row";


            var label =
                document.createElement("span");

            label.className =
                "category-name";

            label.textContent =
                value;


            var color =
                document.createElement("input");

            color.type =
                "color";

            color.className =
                "category-color";

            color.dataset.value =
                value;


            if (
                savedColors[value]
            ) {

                color.value =
                    savedColors[value];

            } else {

                color.value =
                    randomColor(index);
            }


            row.appendChild(label);

            row.appendChild(color);

            container.appendChild(row);
        }
    );
}


// ============================================================
// 15. CATEGORY VISIBILITY
// ============================================================

function updateCategoryVisibility() {

    var section =
        document.getElementById(
            "dynamic-category-section"
        );

    if (
        dynamicStyleEditor.styleTypeSelect.value ===
        "categorized"
    ) {

        section.style.display =
            "block";

        populateCategoryValues();

    } else {

        section.style.display =
            "none";
    }
}


// ============================================================
// 16. GET CURRENT STYLE CONFIG
// ============================================================

function getCurrentStyleConfig() {

    var config = {

        styleType:
            dynamicStyleEditor.styleTypeSelect.value,

        fillColor:
            dynamicStyleEditor.fillColor.value,

        fillOpacity:
            parseFloat(
                dynamicStyleEditor.fillOpacity.value
            ),

        strokeColor:
            dynamicStyleEditor.strokeColor.value,

        strokeWidth:
            parseFloat(
                dynamicStyleEditor.strokeWidth.value
            ),

        categoryField:
            dynamicStyleEditor.categoryField.value,

        categoryColors: {},

        labelEnabled:
            dynamicStyleEditor.labelEnabled.checked,

        labelField:
            dynamicStyleEditor.labelField.value,

        labelColor:
            dynamicStyleEditor.labelColor.value,

        labelSize:
            parseFloat(
                dynamicStyleEditor.labelSize.value
            ),

        labelRotation:
            parseFloat(
                dynamicStyleEditor.labelRotation.value
            )
    };


    // --------------------------------------------------------
    // CATEGORY COLORS
    // --------------------------------------------------------

    var categoryInputs =
        dynamicStyleEditor.categoryContainer
            .querySelectorAll(
                ".category-color"
            );


    categoryInputs.forEach(
        function(input) {

            config.categoryColors[
                input.dataset.value
            ] = input.value;

        }
    );


    return config;
}


// ============================================================
// 17. APPLY STYLE TO LAYER
// ============================================================

function applyStyleConfig(
    layer,
    config
) {

    if (!layer) {
        return;
    }


    if (!config) {
        return;
    }


    // --------------------------------------------------------
    // FORCE DECLUTTER OFF
    // --------------------------------------------------------
    // This helps labels display on QGIS2Web layers.
    // --------------------------------------------------------

    if (
        typeof layer.setDeclutter ===
        "function"
    ) {

        layer.setDeclutter(false);
    }


    if (
        config.styleType ===
        "categorized"
    ) {

        layer.setStyle(
            createCategorizedStyle(
                config
            )
        );

    } else {

        layer.setStyle(
            createSingleStyle(
                config
            )
        );
    }


    // Force redraw

    if (
        layer.getSource() &&
        typeof layer.getSource()
            .changed === "function"
    ) {

        layer.getSource().changed();
    }


    if (
        typeof layer.changed ===
        "function"
    ) {

        layer.changed();
    }


    if (
        typeof map.renderSync ===
        "function"
    ) {

        map.renderSync();
    }
}


// ============================================================
// 18. CREATE SINGLE SYMBOL STYLE
// ============================================================

function createSingleStyle(config) {

    return function(
        feature,
        resolution
    ) {


        // ----------------------------------------------------
        // FILL
        // ----------------------------------------------------

        var fill =
            new ol.style.Fill({

                color: hexToRgba(
                    config.fillColor,
                    config.fillOpacity
                )
            });


        // ----------------------------------------------------
        // STROKE
        // ----------------------------------------------------

        var stroke =
            new ol.style.Stroke({

                color:
                    config.strokeColor,

                width:
                    config.strokeWidth
            });


        // ----------------------------------------------------
        // STYLE OPTIONS
        // ----------------------------------------------------

        var styleOptions = {

            fill: fill,

            stroke: stroke
        };


        // ====================================================
        // 🔤 LABEL
        // ====================================================

        if (
            config.labelEnabled &&
            config.labelField
        ) {

            var labelValue =
                feature.get(
                    config.labelField
                );


            // ------------------------------------------------
            // ONLY CREATE LABEL IF VALUE EXISTS
            // ------------------------------------------------

            if (
                labelValue !== undefined &&
                labelValue !== null &&
                String(labelValue).trim() !== ""
            ) {


                var text =
                    new ol.style.Text({

                        // IMPORTANT:
                        // Use actual text value here.
                        // DO NOT use a function.
                        text:
                            String(labelValue),

                        font:
                            config.labelSize +
                            "px Arial",

                        fill:
                            new ol.style.Fill({

                                color:
                                    config.labelColor
                            }),

                        stroke:
                            new ol.style.Stroke({

                                color:
                                    "#ffffff",

                                width:
                                    3
                            }),

                        textAlign:
                            "center",

                        textBaseline:
                            "middle",

                        placement:
                            "point",

                        overflow:
                            true,

                        rotation:
                            (
                                config.labelRotation *
                                Math.PI
                            ) / 180
                    });


                styleOptions.text =
                    text;
            }
        }


        // ----------------------------------------------------
        // RETURN STYLE
        // ----------------------------------------------------

        return new ol.style.Style(
            styleOptions
        );
    };
}


// ============================================================
// 19. CREATE CATEGORIZED STYLE
// ============================================================

function createCategorizedStyle(config) {

    return function(
        feature,
        resolution
    ) {


        // ----------------------------------------------------
        // GET CATEGORY VALUE
        // ----------------------------------------------------

        var categoryValue =
            feature.get(
                config.categoryField
            );


        var categoryText =
            categoryValue === undefined ||
            categoryValue === null
                ? ""
                : String(categoryValue);


        // ----------------------------------------------------
        // GET CATEGORY COLOR
        // ----------------------------------------------------

        var fillColor =
            config.categoryColors[
                categoryText
            ];


        // Fallback

        if (!fillColor) {

            fillColor =
                config.fillColor;
        }


        // ----------------------------------------------------
        // FILL
        // ----------------------------------------------------

        var fill =
            new ol.style.Fill({

                color:
                    hexToRgba(
                        fillColor,
                        config.fillOpacity
                    )
            });


        // ----------------------------------------------------
        // STROKE
        // ----------------------------------------------------

        var stroke =
            new ol.style.Stroke({

                color:
                    config.strokeColor,

                width:
                    config.strokeWidth
            });


        // ----------------------------------------------------
        // STYLE OPTIONS
        // ----------------------------------------------------

        var styleOptions = {

            fill: fill,

            stroke: stroke
        };


        // ====================================================
        // 🔤 LABEL
        // ====================================================

        if (
            config.labelEnabled &&
            config.labelField
        ) {

            var labelValue =
                feature.get(
                    config.labelField
                );


            if (
                labelValue !== undefined &&
                labelValue !== null &&
                String(labelValue).trim() !== ""
            ) {


                var text =
                    new ol.style.Text({

                        // IMPORTANT
                        // Actual feature value
                        text:
                            String(labelValue),

                        font:
                            config.labelSize +
                            "px Arial",

                        fill:
                            new ol.style.Fill({

                                color:
                                    config.labelColor
                            }),

                        stroke:
                            new ol.style.Stroke({

                                color:
                                    "#ffffff",

                                width:
                                    3
                            }),

                        textAlign:
                            "center",

                        textBaseline:
                            "middle",

                        placement:
                            "point",

                        overflow:
                            true,

                        rotation:
                            (
                                config.labelRotation *
                                Math.PI
                            ) / 180
                    });


                styleOptions.text =
                    text;
            }
        }


        // ----------------------------------------------------
        // RETURN STYLE
        // ----------------------------------------------------

        return new ol.style.Style(
            styleOptions
        );
    };
}


// ============================================================
// 20. APPLY CURRENT STYLE
// ============================================================

function applyCurrentStyle() {

    var layer =
        dynamicStyleEditor.currentLayer;

    if (!layer) {

        showStyleStatus(
            "No vector layer selected.",
            true
        );

        return;
    }


    var config =
        getCurrentStyleConfig();


    // --------------------------------------------------------
    // APPLY
    // --------------------------------------------------------

    applyStyleConfig(
        layer,
        config
    );


    // --------------------------------------------------------
    // SAVE
    // --------------------------------------------------------

    var saved =
        getSavedStyles();

    var key =
        getLayerKey(layer);

    saved[key] =
        config;

    saveAllStyles(
        saved
    );


    showStyleStatus(
        "✓ Style applied and saved.",
        false
    );
}


// ============================================================
// 21. LOAD LAYER
// ============================================================

function loadLayer(layer) {

    if (!layer) {
        return;
    }


    dynamicStyleEditor.currentLayer =
        layer;


    // --------------------------------------------------------
    // FIELDS
    // --------------------------------------------------------

    populateFields(layer);


    // --------------------------------------------------------
    // DEFAULT VALUES
    // --------------------------------------------------------

    dynamicStyleEditor.styleTypeSelect.value =
        "single";

    dynamicStyleEditor.fillColor.value =
        "#4CAF50";

    dynamicStyleEditor.fillOpacity.value =
        "0.45";

    dynamicStyleEditor.strokeColor.value =
        "#000000";

    dynamicStyleEditor.strokeWidth.value =
        "1";

    dynamicStyleEditor.labelEnabled.checked =
        false;

    dynamicStyleEditor.labelColor.value =
        "#000000";

    dynamicStyleEditor.labelSize.value =
        "12";

    dynamicStyleEditor.labelRotation.value =
        "0";

    dynamicStyleEditor.categoryField.value =
        "";

    dynamicStyleEditor.labelField.value =
        "";


    document.getElementById(
        "dynamic-fill-opacity-value"
    ).textContent = "45%";


    // --------------------------------------------------------
    // LOAD SAVED STYLE
    // --------------------------------------------------------

    var saved =
        getSavedStyles();

    var key =
        getLayerKey(layer);

    var config =
        saved[key];


    if (config) {

        if (config.styleType) {

            dynamicStyleEditor
                .styleTypeSelect
                .value =
                config.styleType;
        }


        if (config.fillColor) {

            dynamicStyleEditor
                .fillColor
                .value =
                config.fillColor;
        }


        if (
            config.fillOpacity !== undefined
        ) {

            dynamicStyleEditor
                .fillOpacity
                .value =
                config.fillOpacity;

            document.getElementById(
                "dynamic-fill-opacity-value"
            ).textContent =
                Math.round(
                    config.fillOpacity *
                    100
                ) + "%";
        }


        if (config.strokeColor) {

            dynamicStyleEditor
                .strokeColor
                .value =
                config.strokeColor;
        }


        if (
            config.strokeWidth !== undefined
        ) {

            dynamicStyleEditor
                .strokeWidth
                .value =
                config.strokeWidth;
        }


        if (config.categoryField) {

            dynamicStyleEditor
                .categoryField
                .value =
                config.categoryField;
        }


        if (
            config.labelEnabled !== undefined
        ) {

            dynamicStyleEditor
                .labelEnabled
                .checked =
                config.labelEnabled;
        }


        if (config.labelField) {

            dynamicStyleEditor
                .labelField
                .value =
                config.labelField;
        }


        if (config.labelColor) {

            dynamicStyleEditor
                .labelColor
                .value =
                config.labelColor;
        }


        if (
            config.labelSize !== undefined
        ) {

            dynamicStyleEditor
                .labelSize
                .value =
                config.labelSize;
        }


        if (
            config.labelRotation !== undefined
        ) {

            dynamicStyleEditor
                .labelRotation
                .value =
                config.labelRotation;
        }


        updateCategoryVisibility();


        if (
            config.styleType ===
            "categorized"
        ) {

            populateCategoryValues();
        }


        // Apply saved style immediately

        applyStyleConfig(
            layer,
            config
        );


        return;
    }


    // --------------------------------------------------------
    // NO SAVED STYLE
    // --------------------------------------------------------

    updateCategoryVisibility();
}


// ============================================================
// 22. RESET CURRENT STYLE
// ============================================================

function resetCurrentStyle() {

    var layer =
        dynamicStyleEditor.currentLayer;

    if (!layer) {
        return;
    }


    // --------------------------------------------------------
    // REMOVE SAVED STYLE
    // --------------------------------------------------------

    var saved =
        getSavedStyles();

    var key =
        getLayerKey(layer);

    delete saved[key];

    saveAllStyles(
        saved
    );


    // --------------------------------------------------------
    // RESTORE ORIGINAL QGIS2WEB STYLE
    // --------------------------------------------------------

    layer.setStyle(null);


    if (
        layer.getSource() &&
        typeof layer.getSource()
            .changed === "function"
    ) {

        layer.getSource().changed();
    }


    if (
        typeof layer.changed ===
        "function"
    ) {

        layer.changed();
    }


    if (
        typeof map.renderSync ===
        "function"
    ) {

        map.renderSync();
    }


    // --------------------------------------------------------
    // RELOAD CONTROLS
    // --------------------------------------------------------

    loadLayer(layer);


    showStyleStatus(
        "↺ Style reset.",
        false
    );
}


// ============================================================
// 23. STATUS MESSAGE
// ============================================================

function showStyleStatus(
    message,
    error
) {

    var status =
        document.getElementById(
            "dynamic-style-status"
        );

    if (!status) {
        return;
    }

    status.textContent =
        message;

    status.style.color =
        error
            ? "#d32f2f"
            : "#2e7d32";


    setTimeout(
        function() {

            status.textContent = "";

        },
        3000
    );
}


// ============================================================
// 24. OPEN EDITOR
// ============================================================

function openDynamicStyleEditor() {

    if (
        !document.getElementById(
            "dynamic-style-editor-panel"
        )
    ) {

        createDynamicStylePanel();
    }


    populateLayers();


    dynamicStyleEditor.panel.style.display =
        "block";
}


// ============================================================
// 25. CLOSE EDITOR
// ============================================================

function closeDynamicStyleEditor() {

    if (
        dynamicStyleEditor.panel
    ) {

        dynamicStyleEditor.panel.style.display =
            "none";
    }
}


// ============================================================
// 26. RESTORE ALL SAVED STYLES
// ============================================================

function restoreAllSavedStyles() {

    var saved =
        getSavedStyles();

    var layers =
        getVectorLayers();


    layers.forEach(
        function(layer) {

            var key =
                getLayerKey(layer);

            var config =
                saved[key];


            if (config) {

                applyStyleConfig(
                    layer,
                    config
                );
            }

        }
    );
}


// ============================================================
// 27. CREATE TOOL BUTTON
// ============================================================

function createDynamicStyleButton() {

    if (
        document.getElementById(
            "dynamic-style-open-button"
        )
    ) {
        return;
    }


    var button =
        document.createElement("button");

    button.id =
        "dynamic-style-open-button";

    button.type =
        "button";

    button.innerHTML =
        "🎨";


    button.title =
        "Layer Style Editor";


    button.addEventListener(
        "click",
        function() {

            openDynamicStyleEditor();

        }
    );


    document.body.appendChild(
        button
    );
}


// ============================================================
// 28. MOBILE / DESKTOP CSS
// ============================================================

function addDynamicStyleEditorCSS() {

    if (
        document.getElementById(
            "dynamic-style-editor-css"
        )
    ) {
        return;
    }


    var style =
        document.createElement("style");

    style.id =
        "dynamic-style-editor-css";


    style.textContent = `

/* ==========================================================
   STYLE EDITOR PANEL
   ========================================================== */

#dynamic-style-editor-panel {

    position: fixed;

    top: 70px;

    right: 15px;

    width: 330px;

    max-width: calc(100vw - 30px);

    max-height: calc(100vh - 90px);

    background: rgba(255,255,255,0.98);

    border-radius: 12px;

    box-shadow:
        0 4px 20px rgba(0,0,0,0.30);

    z-index: 999999;

    overflow: hidden;

    display: none;

    font-family:
        Arial,
        sans-serif;
}


/* ==========================================================
   HEADER
   ========================================================== */

#dynamic-style-header {

    display: flex;

    align-items: center;

    justify-content: space-between;

    background: #263238;

    color: white;

    padding: 12px 14px;

    font-size: 15px;

    font-weight: bold;
}


#dynamic-style-close {

    border: none;

    background: transparent;

    color: white;

    font-size: 25px;

    line-height: 20px;

    cursor: pointer;

    padding: 0;

    width: 30px;

    height: 30px;
}


/* ==========================================================
   CONTENT
   ========================================================== */

#dynamic-style-content {

    padding: 12px;

    overflow-y: auto;

    max-height:
        calc(100vh - 145px);
}


#dynamic-style-content label {

    display: block;

    font-size: 13px;

    font-weight: bold;

    margin-top: 10px;

    margin-bottom: 5px;

    color: #37474f;
}


#dynamic-style-content select,

#dynamic-style-content input[type="number"] {

    width: 100%;

    box-sizing: border-box;

    padding: 8px;

    border: 1px solid #b0bec5;

    border-radius: 6px;

    background: white;

    font-size: 13px;
}


#dynamic-style-content input[type="color"] {

    width: 100%;

    height: 38px;

    padding: 2px;

    border: 1px solid #b0bec5;

    border-radius: 6px;

    background: white;

    cursor: pointer;
}


/* ==========================================================
   RANGE
   ========================================================== */

.range-row {

    display: flex;

    align-items: center;

    gap: 8px;
}


.range-row input {

    flex: 1;
}


.range-row span {

    width: 45px;

    text-align: right;

    font-size: 12px;

    font-weight: bold;
}


/* ==========================================================
   SECTIONS
   ========================================================== */

.style-section {

    margin-top: 12px;

    padding: 10px;

    border: 1px solid #d0d7da;

    border-radius: 8px;

    background: #fafafa;
}


.style-section-title {

    font-weight: bold;

    color: #263238;

    margin-bottom: 8px;

    font-size: 14px;
}


/* ==========================================================
   CHECKBOX
   ========================================================== */

.checkbox-row {

    display: flex !important;

    align-items: center;

    gap: 8px;

    cursor: pointer;
}


.checkbox-row input {

    width: 18px;

    height: 18px;

    margin: 0;
}


/* ==========================================================
   CATEGORY ROW
   ========================================================== */

.category-row {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 8px;

    margin-top: 6px;

    padding: 5px;

    background: white;

    border-radius: 5px;

    border: 1px solid #e0e0e0;
}


.category-name {

    flex: 1;

    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;

    font-size: 12px;
}


.category-color {

    width: 45px !important;

    height: 30px !important;

    flex-shrink: 0;
}


/* ==========================================================
   BUTTONS
   ========================================================== */

.dynamic-style-buttons {

    display: flex;

    gap: 8px;

    margin-top: 15px;
}


.dynamic-style-buttons button {

    flex: 1;

    border: none;

    border-radius: 7px;

    padding: 10px 8px;

    font-weight: bold;

    cursor: pointer;

    font-size: 13px;
}


#dynamic-style-apply {

    background: #2e7d32;

    color: white;
}


#dynamic-style-reset {

    background: #eceff1;

    color: #263238;
}


/* ==========================================================
   STATUS
   ========================================================== */

#dynamic-style-status {

    text-align: center;

    font-size: 12px;

    font-weight: bold;

    min-height: 18px;

    margin-top: 8px;
}


/* ==========================================================
   MOBILE
   ========================================================== */

@media (max-width: 600px) {

    #dynamic-style-editor-panel {

        top: 50px;

        left: 8px;

        right: 8px;

        width: auto;

        max-width: none;

        max-height:
            calc(100vh - 65px);

        border-radius: 10px;
    }


    #dynamic-style-content {

        max-height:
            calc(100vh - 120px);

        padding: 10px;
    }



    #dynamic-style-content select,

    #dynamic-style-content input[type="number"] {

        padding: 9px;

        font-size: 14px;
    }


    .style-section {

        padding: 9px;
    }

}


/* ==========================================================
   VERY SMALL PHONES
   ========================================================== */

@media (max-width: 380px) {

    #dynamic-style-editor-panel {

        left: 5px;

        right: 5px;
    }


    #dynamic-style-header {

        padding: 10px;
    }


    #dynamic-style-content {

        padding: 8px;
    }

}

`;


    document.head.appendChild(
        style
    );
}


// ============================================================
// 29. INITIALIZE
// ============================================================

function initializeDynamicStyleEditor() {

    addDynamicStyleEditorCSS();

    createDynamicStylePanel();

    createDynamicStyleButton();


    // --------------------------------------------------------
    // Restore saved styles after map/layers are ready
    // --------------------------------------------------------

    setTimeout(
        function() {

            restoreAllSavedStyles();

        },
        1000
    );


    // Additional delayed restore for QGIS2Web
    // because some QGIS2Web layers can initialize later.

    setTimeout(
        function() {

            restoreAllSavedStyles();

        },
        3000
    );
}


// ============================================================
// 30. START AFTER PAGE LOAD
// ============================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function() {

            setTimeout(
                initializeDynamicStyleEditor,
                500
            );

        }
    );

} else {

    setTimeout(
        initializeDynamicStyleEditor,
        500
    );
}
































// ============================================================
// 📋 STAGE 5 — FEATURE INFORMATION POPUP
// OpenLayers 10.x
//
// Features:
// ✔ Dynamic vectorLayers[] support
// ✔ Feature information
// ✔ Zoom
// ✔ Copy
// ✔ Close
// ✔ Mobile friendly
// ✔ Stage 14 Measure Tool protection
// ✔ Measurement layers excluded
// ✔ Snap layers excluded
// ============================================================

(function () {

    "use strict";

    console.log(
        "📋 Starting Stage 5 popup..."
    );


    // ========================================================
    // POPUP HTML
    // ========================================================

    const popupElement =
        document.createElement("div");


    popupElement.id =
        "feature-info-popup";


    popupElement.innerHTML = `

        <div class="feature-popup-header">

            <span id="feature-popup-title">
                📋 Feature Information
            </span>

            <button
                type="button"
                id="feature-popup-close">
                ×
            </button>

        </div>


        <div
            id="feature-popup-layer"
            class="feature-popup-layer">
        </div>


        <div
            id="feature-popup-content"
            class="feature-popup-content">
        </div>


        <div class="feature-popup-buttons">

            <button
                type="button"
                id="feature-popup-zoom">
                🔍 Zoom
            </button>


            <button
                type="button"
                id="feature-popup-copy">
                📋 Copy
            </button>

        </div>

    `;


    document.body.appendChild(
        popupElement
    );


    // ========================================================
    // POPUP CSS
    // ========================================================

    const popupCSS =
        document.createElement("style");


    popupCSS.textContent = `

        /* ================================================
           MAIN POPUP
        ================================================ */

        #feature-info-popup {

            position:
                absolute !important;

            display:
                none;

            z-index:
                20000 !important;

            width:
                350px;

            max-width:
                calc(100vw - 30px);

            background:
                #ffffff;

            border:
                1px solid #888;

            border-radius:
                10px;

            box-shadow:
                0 4px 20px
                rgba(0,0,0,0.35);

            font-family:
                Arial, sans-serif;

            font-size:
                13px;

            color:
                #222;

            overflow:
                hidden;

            box-sizing:
                border-box;

        }


        /* ================================================
           HEADER
        ================================================ */

        .feature-popup-header {

            display:
                flex;

            align-items:
                center;

            justify-content:
                space-between;

            padding:
                10px 12px;

            background:
                #f3f3f3;

            border-bottom:
                1px solid #ddd;

            font-size:
                16px;

            font-weight:
                bold;

        }


        /* ================================================
           CLOSE BUTTON
        ================================================ */

        #feature-popup-close {

            width:
                30px;

            height:
                30px;

            border:
                none;

            background:
                transparent;

            font-size:
                22px;

            cursor:
                pointer;

            border-radius:
                5px;

        }


        #feature-popup-close:hover {

            background:
                #dddddd;

        }


        /* ================================================
           LAYER NAME
        ================================================ */

        .feature-popup-layer {

            padding:
                8px 12px;

            font-weight:
                bold;

            color:
                #555;

            border-bottom:
                1px solid #eeeeee;

        }


        /* ================================================
           CONTENT
        ================================================ */

        .feature-popup-content {

            max-height:
                350px;

            overflow-y:
                auto;

            padding:
                8px 10px;

        }


        /* ================================================
           ATTRIBUTE ROW
        ================================================ */

        .feature-popup-row {

            display:
                grid;

            grid-template-columns:
                42% 58%;

            border-bottom:
                1px solid #eeeeee;

            padding:
                7px 2px;

            line-height:
                1.3;

        }


        .feature-popup-field {

            font-weight:
                bold;

            color:
                #444;

            padding-right:
                8px;

            word-break:
                break-word;

        }


        .feature-popup-value {

            color:
                #111;

            word-break:
                break-word;

        }


        /* ================================================
           BUTTONS
        ================================================ */

        .feature-popup-buttons {

            display:
                flex;

            gap:
                8px;

            padding:
                10px;

            border-top:
                1px solid #ddd;

            background:
                #fafafa;

        }


        .feature-popup-buttons button {

            flex:
                1;

            padding:
                8px;

            border:
                1px solid #aaa;

            border-radius:
                5px;

            background:
                #f5f5f5;

            cursor:
                pointer;

            font-size:
                13px;

        }


        .feature-popup-buttons button:hover {

            background:
                #dddddd;

        }


        /* ================================================
           MOBILE
        ================================================ */

        @media (max-width: 600px) {

            #feature-info-popup {

                width:
                    calc(100vw - 20px);

                max-width:
                    calc(100vw - 20px);

            }


            .feature-popup-content {

                max-height:
                    300px;

            }

        }

    `;


    document.head.appendChild(
        popupCSS
    );


    // ========================================================
    // OPENLAYERS OVERLAY
    // ========================================================

    const featurePopupOverlay =
        new ol.Overlay({

            element:
                popupElement,

            autoPan:
                true,

            autoPanAnimation: {

                duration:
                    250

            },

            positioning:
                "bottom-center",

            offset:
                [0, -15],

            stopEvent:
                true

        });


    map.addOverlay(
        featurePopupOverlay
    );


    console.log(
        "📋 Popup overlay added to map."
    );


    // ========================================================
    // VARIABLES
    // ========================================================

    let selectedFeature =
        null;


    let selectedLayer =
        null;


    // ========================================================
    // GET LAYER NAME
    // ========================================================

    function getLayerName(
        layer
    ) {

        if (
            !layer
        ) {

            return "Unknown Layer";

        }


        return (

            layer.get("title") ||

            layer.get("name") ||

            layer.get("layerName") ||

            "Unnamed Layer"

        );

    }


    // ========================================================
    // CLEAN FIELD NAME
    // ========================================================

    function cleanFieldName(
        name
    ) {

        return String(name)

            .replace(
                /_/g,
                " "
            )

            .replace(
                /\b\w/g,
                function (letter) {

                    return letter.toUpperCase();

                }
            );

    }


    // ========================================================
    // FORMAT VALUE
    // ========================================================

    function formatValue(
        value
    ) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }


        if (
            typeof value ===
            "object"
        ) {

            try {

                return JSON.stringify(
                    value
                );

            } catch (
                error
            ) {

                return String(
                    value
                );

            }

        }


        return String(
            value
        );

    }


    // ========================================================
    // IGNORE TECHNICAL FIELDS
    // ========================================================

    function isTechnicalField(
        key
    ) {

        const ignoredFields = [

            "geometry",

            "layerObject",

            "idO",

            "bbox",

            "style",

            "styleUrl"

        ];


        return ignoredFields.includes(
            key
        );

    }


    // ========================================================
    // CLOSE POPUP
    // ========================================================

    function closeFeaturePopup() {

        popupElement.style.display =
            "none";


        featurePopupOverlay.setPosition(
            undefined
        );


        selectedFeature =
            null;


        selectedLayer =
            null;


        console.log(
            "📋 Popup closed."
        );

    }


    // ========================================================
    // EXPOSE CLOSE FUNCTION
    //
    // Stage 14 uses this when measurement starts.
    // ========================================================

    window.closeFeaturePopup =
        closeFeaturePopup;


    // ========================================================
    // SHOW POPUP
    // ========================================================

    function showFeaturePopup(
        feature,
        layer,
        coordinate
    ) {

        // ====================================================
        // 🚫 NEVER SHOW POPUP DURING MEASUREMENT
        // ====================================================

        if (
            window.stage14MeasureActive ===
            true
        ) {

            console.log(
                "📐 Measure active — popup prevented."
            );

            closeFeaturePopup();

            return;

        }


        if (
            !feature
        ) {

            return;

        }


        selectedFeature =
            feature;


        selectedLayer =
            layer;


        // ----------------------------------------------------
        // LAYER NAME
        // ----------------------------------------------------

        const layerElement =
            document.getElementById(
                "feature-popup-layer"
            );


        layerElement.textContent =
            "Layer: " +
            getLayerName(
                layer
            );


        // ----------------------------------------------------
        // CONTENT
        // ----------------------------------------------------

        const contentElement =
            document.getElementById(
                "feature-popup-content"
            );


        contentElement.innerHTML =
            "";


        const properties =
            feature.getProperties();


        const keys =
            Object.keys(
                properties
            );


        let attributeCount =
            0;


        keys.forEach(
            function (key) {

                if (
                    isTechnicalField(
                        key
                    )
                ) {

                    return;

                }


                attributeCount++;


                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "feature-popup-row";


                const fieldElement =
                    document.createElement(
                        "div"
                    );


                fieldElement.className =
                    "feature-popup-field";


                fieldElement.textContent =
                    cleanFieldName(
                        key
                    );


                const valueElement =
                    document.createElement(
                        "div"
                    );


                valueElement.className =
                    "feature-popup-value";


                valueElement.textContent =
                    formatValue(
                        properties[key]
                    );


                row.appendChild(
                    fieldElement
                );


                row.appendChild(
                    valueElement
                );


                contentElement.appendChild(
                    row
                );

            }
        );


        // ----------------------------------------------------
        // NO ATTRIBUTES
        // ----------------------------------------------------

        if (
            attributeCount ===
            0
        ) {

            contentElement.innerHTML = `

                <div style="
                    padding:15px;
                    text-align:center;
                    color:#777;
                ">

                    No attributes available.

                </div>

            `;

        }


        // ----------------------------------------------------
        // SHOW
        // ----------------------------------------------------

        popupElement.style.display =
            "block";


        featurePopupOverlay.setPosition(
            coordinate
        );


        console.log(
            "📋 Popup opened:",
            getLayerName(layer),
            properties
        );

    }


    // ========================================================
    // MAP CLICK
    // ========================================================

    map.on(
        "singleclick",
        function (event) {

            // =================================================
            // 🚫 ABSOLUTE MEASURE PROTECTION
            // =================================================

            if (
                window.stage14MeasureActive ===
                true
            ) {

                console.log(
                    "📐 Measure active — popup click ignored."
                );


                closeFeaturePopup();


                return;

            }


            console.log(
                "🖱 Map clicked:",
                event.coordinate
            );


            let clickedFeature =
                null;


            let clickedLayer =
                null;


            // =================================================
            // FIND FEATURE
            // =================================================

            map.forEachFeatureAtPixel(

                event.pixel,

                function (
                    feature,
                    layer
                ) {

                    // -----------------------------------------
                    // Only vector layers
                    // -----------------------------------------

                    if (
                        !(
                            layer instanceof
                            ol.layer.Vector
                        )
                    ) {

                        return false;

                    }


                    // -----------------------------------------
                    // NEVER SELECT MEASURE LAYER
                    // -----------------------------------------

                    if (
                        layer ===
                        window.stage14MeasureLayer
                    ) {

                        return false;

                    }


                    // -----------------------------------------
                    // NEVER SELECT SNAP LAYER
                    // -----------------------------------------

                    if (
                        layer ===
                        window.stage14SnapLayer
                    ) {

                        return false;

                    }


                    clickedFeature =
                        feature;


                    clickedLayer =
                        layer;


                    return true;

                },

                {

                    hitTolerance:
                        8,


                    layerFilter:
                        function (
                            layer
                        ) {

                            // ---------------------------------
                            // Vector only
                            // ---------------------------------

                            if (
                                !(
                                    layer instanceof
                                    ol.layer.Vector
                                )
                            ) {

                                return false;

                            }


                            // ---------------------------------
                            // Visible only
                            // ---------------------------------

                            if (
                                !layer.getVisible()
                            ) {

                                return false;

                            }


                            // ---------------------------------
                            // Exclude measure layer
                            // ---------------------------------

                            if (
                                layer ===
                                window.stage14MeasureLayer
                            ) {

                                return false;

                            }


                            // ---------------------------------
                            // Exclude snap layer
                            // ---------------------------------

                            if (
                                layer ===
                                window.stage14SnapLayer
                            ) {

                                return false;

                            }


                            return true;

                        }

                }

            );


            // =================================================
            // NO FEATURE
            // =================================================

            if (
                !clickedFeature
            ) {

                console.log(
                    "No vector feature at clicked location."
                );


                closeFeaturePopup();


                return;

            }


            // =================================================
            // SHOW POPUP
            // =================================================

            showFeaturePopup(

                clickedFeature,

                clickedLayer,

                event.coordinate

            );

        }
    );


    // ========================================================
    // CLOSE BUTTON
    // ========================================================

    document
        .getElementById(
            "feature-popup-close"
        )
        .addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                closeFeaturePopup();

            }
        );


    // ========================================================
    // ZOOM BUTTON
    // ========================================================

    document
        .getElementById(
            "feature-popup-zoom"
        )
        .addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                if (
                    !selectedFeature
                ) {

                    return;

                }


                const geometry =
                    selectedFeature.getGeometry();


                if (
                    !geometry
                ) {

                    return;

                }


                const extent =
                    geometry.getExtent();


                map.getView().fit(

                    extent,

                    {

                        padding:
                            [
                                100,
                                100,
                                100,
                                100
                            ],

                        duration:
                            500,

                        maxZoom:
                            20

                    }

                );

            }
        );


    // ========================================================
    // COPY BUTTON
    // ========================================================

    document
        .getElementById(
            "feature-popup-copy"
        )
        .addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                if (
                    !selectedFeature
                ) {

                    return;

                }


                const properties =
                    selectedFeature.getProperties();


                const lines =
                    [];


                Object.keys(
                    properties
                )
                .forEach(
                    function (key) {

                        if (
                            isTechnicalField(
                                key
                            )
                        ) {

                            return;

                        }


                        lines.push(

                            cleanFieldName(
                                key
                            ) +

                            ": " +

                            formatValue(
                                properties[key]
                            )

                        );

                    }
                );


                const text =
                    lines.join(
                        "\n"
                    );


                copyText(
                    text
                );

            }
        );


    // ========================================================
    // COPY TEXT
    // ========================================================

    function copyText(
        text
    ) {

        if (
            navigator.clipboard &&
            navigator.clipboard.writeText
        ) {

            navigator.clipboard
                .writeText(
                    text
                )
                .then(
                    function () {

                        showCopied();

                    }
                )
                .catch(
                    function () {

                        fallbackCopy(
                            text
                        );

                    }
                );

        } else {

            fallbackCopy(
                text
            );

        }

    }


    // ========================================================
    // FALLBACK COPY
    // ========================================================

    function fallbackCopy(
        text
    ) {

        const textarea =
            document.createElement(
                "textarea"
            );


        textarea.value =
            text;


        textarea.style.position =
            "fixed";


        textarea.style.left =
            "-9999px";


        textarea.style.top =
            "0";


        document.body.appendChild(
            textarea
        );


        textarea.select();


        try {

            document.execCommand(
                "copy"
            );


            showCopied();

        } catch (
            error
        ) {

            alert(
                "Unable to copy."
            );

        }


        document.body.removeChild(
            textarea
        );

    }


    // ========================================================
    // COPIED MESSAGE
    // ========================================================

    function showCopied() {

        const button =
            document.getElementById(
                "feature-popup-copy"
            );


        if (
            !button
        ) {

            return;

        }


        const oldText =
            button.textContent;


        button.textContent =
            "✅ Copied";


        setTimeout(
            function () {

                button.textContent =
                    oldText;

            },
            1200
        );

    }


    // ========================================================
    // ESC KEY
    // ========================================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeFeaturePopup();

            }

        }
    );


    // ========================================================
    // INITIAL STATE
    // ========================================================

    closeFeaturePopup();


    // ========================================================
    // FINISHED
    // ========================================================

    console.log(
        "📋 Stage 5 Feature Information Popup READY."
    );

})();































/* ============================================================
   STAGE 6
   ADVANCED ATTRIBUTE SEARCH
   WITH MAXIMUM 10 TYPING SUGGESTIONS
   ============================================================ */

(function () {

    "use strict";

    console.log("Stage 6 Search initialized");


    /* ============================================================
       HIGHLIGHT LAYER
       ============================================================ */

    var stage6HighlightSource = new ol.source.Vector();

    var stage6HighlightLayer = new ol.layer.Vector({

        source: stage6HighlightSource,

        zIndex: 9999,

        style: new ol.style.Style({

            fill: new ol.style.Fill({
                color: "rgba(255, 255, 0, 0.30)"
            }),

            stroke: new ol.style.Stroke({
                color: "#ff0000",
                width: 4
            })

        })

    });

    map.addLayer(stage6HighlightLayer);


    /* ============================================================
       SEARCH BUTTON
       ============================================================ */

    var searchButton =
        document.createElement("button");

    searchButton.id =
        "stage6-search-button";

    searchButton.innerHTML =
        "🔍 ";

    searchButton.title =
        "Search layer attributes";

    searchButton.style.position =
        "fixed";

    searchButton.style.top =
        "10px";

    searchButton.style.left =
        "10px";

    searchButton.style.zIndex =
        "10000";

    document.body.appendChild(
        searchButton
    );


    /* ============================================================
       SEARCH PANEL
       ============================================================ */

    var searchPanel =
        document.createElement("div");

    searchPanel.id =
        "stage6-search-panel";

    searchPanel.style.position =
        "fixed";

    searchPanel.style.top =
        "55px";

    searchPanel.style.left =
        "10px";

    searchPanel.style.zIndex =
        "10001";

    searchPanel.style.width =
        "310px";

    searchPanel.style.maxWidth =
        "calc(100vw - 30px)";

    searchPanel.style.background =
        "#ffffff";

    searchPanel.style.border =
        "1px solid #ccc";

    searchPanel.style.borderRadius =
        "8px";

    searchPanel.style.padding =
        "12px";

    searchPanel.style.boxShadow =
        "0 3px 15px rgba(0,0,0,0.30)";

    searchPanel.style.display =
        "none";

    searchPanel.style.fontFamily =
        "Arial, sans-serif";

    document.body.appendChild(
        searchPanel
    );


    /* ============================================================
       PANEL HEADER
       ============================================================ */

    var header =
        document.createElement("div");

    header.style.display =
        "flex";

    header.style.alignItems =
        "center";

    header.style.justifyContent =
        "space-between";

    header.style.marginBottom =
        "10px";


    var headerTitle =
        document.createElement("strong");

    headerTitle.innerHTML =
        "🔍 Attribute Search";


    var closeButton =
        document.createElement("button");

    closeButton.innerHTML =
        "×";

    closeButton.title =
        "Close";

    closeButton.style.width =
        "30px";

    closeButton.style.height =
        "30px";

    closeButton.style.padding =
        "0";

    closeButton.style.fontSize =
        "20px";

    closeButton.style.cursor =
        "pointer";

    closeButton.style.border =
        "1px solid #ccc";

    closeButton.style.borderRadius =
        "5px";

    closeButton.style.background =
        "#f5f5f5";


    header.appendChild(
        headerTitle
    );

    header.appendChild(
        closeButton
    );

    searchPanel.appendChild(
        header
    );


    /* ============================================================
       LABEL FUNCTION
       ============================================================ */

    function createLabel(text) {

        var label =
            document.createElement("label");

        label.innerHTML =
            text;

        label.style.display =
            "block";

        label.style.fontSize =
            "13px";

        label.style.fontWeight =
            "bold";

        label.style.marginBottom =
            "4px";

        label.style.marginTop =
            "8px";

        return label;
    }


    /* ============================================================
       LAYER SELECT
       ============================================================ */

    searchPanel.appendChild(
        createLabel("Layer")
    );


    var layerSelect =
        document.createElement("select");

    layerSelect.id =
        "stage6-layer-select";

    layerSelect.style.width =
        "100%";

    layerSelect.style.height =
        "36px";

    layerSelect.style.padding =
        "5px";

    layerSelect.style.border =
        "1px solid #bbb";

    layerSelect.style.borderRadius =
        "5px";

    searchPanel.appendChild(
        layerSelect
    );


    /* ============================================================
       FIELD SELECT
       ============================================================ */

    searchPanel.appendChild(
        createLabel("Field / Attribute")
    );


    var fieldSelect =
        document.createElement("select");

    fieldSelect.id =
        "stage6-field-select";

    fieldSelect.style.width =
        "100%";

    fieldSelect.style.height =
        "36px";

    fieldSelect.style.padding =
        "5px";

    fieldSelect.style.border =
        "1px solid #bbb";

    fieldSelect.style.borderRadius =
        "5px";

    searchPanel.appendChild(
        fieldSelect
    );


    /* ============================================================
       VALUE LABEL
       ============================================================ */

    searchPanel.appendChild(
        createLabel("Search Value")
    );


    /* ============================================================
       VALUE WRAPPER
       ============================================================ */

    var valueWrapper =
        document.createElement("div");

    valueWrapper.style.position =
        "relative";

    valueWrapper.style.width =
        "100%";


    /* ============================================================
       VALUE INPUT
       ============================================================ */

    var valueInput =
        document.createElement("input");

    valueInput.id =
        "stage6-value-input";

    valueInput.type =
        "text";

    valueInput.placeholder =
        "Type a value...";

    valueInput.autocomplete =
        "off";

    valueInput.style.width =
        "100%";

    valueInput.style.height =
        "38px";

    valueInput.style.padding =
        "7px 9px";

    valueInput.style.border =
        "1px solid #bbb";

    valueInput.style.borderRadius =
        "5px";

    valueInput.style.fontSize =
        "14px";

    valueWrapper.appendChild(
        valueInput
    );


    /* ============================================================
       SUGGESTION BOX
       ============================================================ */

    var suggestionBox =
        document.createElement("div");

    suggestionBox.id =
        "stage6-value-suggestions";

    suggestionBox.style.position =
        "absolute";

    suggestionBox.style.left =
        "0";

    suggestionBox.style.right =
        "0";

    suggestionBox.style.top =
        "40px";

    suggestionBox.style.background =
        "#ffffff";

    suggestionBox.style.border =
        "1px solid #ccc";

    suggestionBox.style.borderRadius =
        "0 0 6px 6px";

    suggestionBox.style.maxHeight =
        "220px";

    suggestionBox.style.overflowY =
        "auto";

    suggestionBox.style.zIndex =
        "10010";

    suggestionBox.style.display =
        "none";

    suggestionBox.style.boxShadow =
        "0 3px 8px rgba(0,0,0,0.20)";


    valueWrapper.appendChild(
        suggestionBox
    );

    searchPanel.appendChild(
        valueWrapper
    );


    /* ============================================================
       BUTTON ROW
       ============================================================ */

    var buttonRow =
        document.createElement("div");

    buttonRow.style.display =
        "flex";

    buttonRow.style.gap =
        "6px";

    buttonRow.style.marginTop =
        "12px";


    /* ============================================================
       FIND BUTTON
       ============================================================ */

    var findButton =
        document.createElement("button");

    findButton.innerHTML =
        "🔎 Find";

    findButton.style.flex =
        "1";

    findButton.style.height =
        "36px";

    findButton.style.cursor =
        "pointer";

    findButton.style.border =
        "1px solid #bbb";

    findButton.style.borderRadius =
        "5px";

    findButton.style.background =
        "#f5f5f5";


    /* ============================================================
       CLEAR BUTTON
       ============================================================ */

    var clearButton =
        document.createElement("button");

    clearButton.innerHTML =
        "Clear";

    clearButton.style.flex =
        "1";

    clearButton.style.height =
        "36px";

    clearButton.style.cursor =
        "pointer";

    clearButton.style.border =
        "1px solid #bbb";

    clearButton.style.borderRadius =
        "5px";

    clearButton.style.background =
        "#f5f5f5";


    buttonRow.appendChild(
        findButton
    );

    buttonRow.appendChild(
        clearButton
    );

    searchPanel.appendChild(
        buttonRow
    );


    /* ============================================================
       STATUS
       ============================================================ */

    var status =
        document.createElement("div");

    status.id =
        "stage6-search-status";

    status.style.marginTop =
        "10px";

    status.style.fontSize =
        "12px";

    status.style.color =
        "#555";

    status.style.lineHeight =
        "18px";

    searchPanel.appendChild(
        status
    );


    /* ============================================================
       OPEN / CLOSE SEARCH
       ============================================================ */

    searchButton.addEventListener(
        "click",
        function () {

            if (
                searchPanel.style.display ===
                "none"
            ) {

                searchPanel.style.display =
                    "block";

                refreshLayerList();

            } else {

                searchPanel.style.display =
                    "none";

                hideSuggestions();
            }

        }
    );


    closeButton.addEventListener(
        "click",
        function () {

            searchPanel.style.display =
                "none";

            hideSuggestions();

        }
    );


    /* ============================================================
       GET LAYER NAME
       ============================================================ */

  function getLayerName(layer) {

    if (!layer) {
        return null;
    }

    var name =
        layer.get("popuplayertitle") ||
        layer.get("title") ||
        layer.get("name") ||
        layer.get("layerName") ||
        layer.get("file");

    /*
     * If there is no actual layer name,
     * don't return "Unnamed Layer".
     */
    if (
        name === undefined ||
        name === null ||
        String(name).trim() === ""
    ) {
        return null;
    }

    name = String(name).trim();

    /*
     * Ignore generic/internal layer names.
     */
    var ignoredNames = [
        "layer",
        "layer 1",
        "layer 2",
        "layer 3",
        "layer 4",
        "layer 5",
        "unnamed layer",
        "vector layer",
        "vector"
    ];

    if (
        ignoredNames.indexOf(
            name.toLowerCase()
        ) !== -1
    ) {
        return null;
    }

    return name;
}

    /* ============================================================
       GET SEARCHABLE VECTOR LAYERS
       ============================================================ */

   function getSearchableLayers() {

    var layers = [];

    map.getLayers().forEach(function (layer) {

        /*
         * Don't search the Stage 6 highlight layer.
         */
        if (
            layer === stage6HighlightLayer
        ) {
            return;
        }

        /*
         * Only OpenLayers Vector layers.
         */
        if (
            !(layer instanceof ol.layer.Vector)
        ) {
            return;
        }

        var source =
            layer.getSource();

        /*
         * Source must contain features.
         */
        if (
            !source ||
            typeof source.getFeatures !== "function"
        ) {
            return;
        }

        /*
         * Get actual layer name.
         */
        var layerName =
            getLayerName(layer);

        /*
         * If the layer doesn't have a
         * meaningful name, ignore it.
         */
        if (!layerName) {
            return;
        }

        /*
         * Ignore known internal/helper layers.
         */
        var excludedNames = [
            "featureOverlay",
            "measureLayer",
            "geolocateOverlay",
            "stage14MeasureLayer",
            "stage14SnapLayer",
            "highlight",
            "selection",
            "select",
            "measure",
            "geolocate"
        ];

        var lowerName =
            layerName.toLowerCase();

        var isExcluded =
            excludedNames.some(function (excluded) {

                return (
                    lowerName.indexOf(
                        excluded.toLowerCase()
                    ) !== -1
                );

            });

        if (isExcluded) {
            return;
        }

        /*
         * Ignore empty vector layers.
         */
        var features =
            source.getFeatures();

        if (
            !features ||
            features.length === 0
        ) {
            return;
        }

        /*
         * This is a genuine searchable layer.
         */
        layers.push(layer);

    });

    return layers;
}


    /* ============================================================
       REFRESH LAYER LIST
       ============================================================ */

    function refreshLayerList() {

        var layers =
            getSearchableLayers();


        var oldLayerName =
            layerSelect.options[
                layerSelect.selectedIndex
            ]
                ? layerSelect.options[
                    layerSelect.selectedIndex
                ].textContent
                : "";


        layerSelect.innerHTML =
            "";


        if (
            layers.length === 0
        ) {

            var emptyOption =
                document.createElement(
                    "option"
                );

            emptyOption.textContent =
                "No vector layers found";

            layerSelect.appendChild(
                emptyOption
            );

            fieldSelect.innerHTML =
                "";

            hideSuggestions();

            return;
        }


        layers.forEach(
            function (layer, index) {

                var option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    index;

                option.textContent =
                    getLayerName(layer);

                layerSelect.appendChild(
                    option
                );

            }
        );


        /*
           Restore previous layer
           if possible.
        */

        var restored =
            false;


        for (
            var i = 0;
            i < layers.length;
            i++
        ) {

            if (
                getLayerName(
                    layers[i]
                ) === oldLayerName
            ) {

                layerSelect.value =
                    i;

                restored =
                    true;

                break;
            }
        }


        if (!restored) {

            layerSelect.selectedIndex =
                0;
        }


        updateFieldList();
    }


    /* ============================================================
       GET SELECTED LAYER
       ============================================================ */

    function getSelectedLayer() {

        var layers =
            getSearchableLayers();


        var index =
            parseInt(
                layerSelect.value,
                10
            );


        if (
            isNaN(index) ||
            !layers[index]
        ) {

            return null;
        }


        return layers[index];
    }


    /* ============================================================
       GET FIELDS
       ============================================================ */

    function getLayerFields(layer) {

        if (!layer) {
            return [];
        }


        var source =
            layer.getSource();


        if (!source) {
            return [];
        }


        var features =
            source.getFeatures();


        var fieldSet =
            new Set();


        features.forEach(
            function (feature) {

                var properties =
                    feature.getProperties();


                Object.keys(
                    properties
                ).forEach(
                    function (field) {

                        if (
                            field ===
                            "geometry"
                        ) {

                            return;
                        }


                        if (
                            field ===
                            "layerObject"
                        ) {

                            return;
                        }


                        if (
                            field ===
                            "idO"
                        ) {

                            return;
                        }


                        fieldSet.add(
                            field
                        );

                    }
                );

            }
        );


        var fields =
            Array.from(fieldSet);


        /*
           Preferred survey fields first.
        */

        var preferredFields = [

            "parcel_num",

            "parcel_no",

            "parcelno",

            "lpm_no",

            "lpmno",

            "lp_no",

            "survey_no",

            "survey_no_",

            "survey",

            "name"

        ];


        fields.sort(
            function (a, b) {

                var ai =
                    preferredFields.indexOf(
                        a.toLowerCase()
                    );


                var bi =
                    preferredFields.indexOf(
                        b.toLowerCase()
                    );


                if (
                    ai !== -1 &&
                    bi === -1
                ) {

                    return -1;
                }


                if (
                    ai === -1 &&
                    bi !== -1
                ) {

                    return 1;
                }


                if (
                    ai !== -1 &&
                    bi !== -1
                ) {

                    return ai - bi;
                }


                return a.localeCompare(
                    b,
                    undefined,
                    {
                        sensitivity:
                            "base"
                    }
                );

            }
        );


        return fields;
    }


    /* ============================================================
       UPDATE FIELD LIST
       ============================================================ */

    function updateFieldList() {

        hideSuggestions();


        var layer =
            getSelectedLayer();


        fieldSelect.innerHTML =
            "";


        valueInput.value =
            "";


        status.innerHTML =
            "";


        if (!layer) {
            return;
        }


        var fields =
            getLayerFields(layer);


        fields.forEach(
            function (field) {

                var option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    field;

                option.textContent =
                    field;

                fieldSelect.appendChild(
                    option
                );

            }
        );

    }


    /* ============================================================
       GET UNIQUE FIELD VALUES
       ============================================================ */

    function getFieldValues(
        layer,
        field
    ) {

        if (
            !layer ||
            !field
        ) {

            return [];
        }


        var source =
            layer.getSource();


        if (!source) {
            return [];
        }


        var features =
            source.getFeatures();


        var values = [];

        var seen =
            new Set();


        features.forEach(
            function (feature) {

                var value =
                    feature.get(field);


                if (
                    value === null ||
                    value === undefined
                ) {

                    return;
                }


                var text =
                    String(value).trim();


                if (!text) {
                    return;
                }


                /*
                   Remove duplicate values
                   without changing the
                   original displayed value.
                */

                var key =
                    text.toLowerCase();


                if (
                    seen.has(key)
                ) {

                    return;
                }


                seen.add(key);

                values.push(text);

            }
        );


        return values;
    }


    /* ============================================================
       NATURAL SORT
       ============================================================ */

    function naturalSort(a, b) {

        var aText =
            String(a).trim();

        var bText =
            String(b).trim();


        var aNumber =
            Number(aText);

        var bNumber =
            Number(bText);


        var aIsNumber =
            aText !== "" &&
            isFinite(aNumber);


        var bIsNumber =
            bText !== "" &&
            isFinite(bNumber);


        /*
           Numeric values:
           1, 2, 3, 10, 20
        */

        if (
            aIsNumber &&
            bIsNumber
        ) {

            return aNumber -
                bNumber;
        }


        /*
           Numbers before text
           when mixed.
        */

        if (
            aIsNumber &&
            !bIsNumber
        ) {

            return -1;
        }


        if (
            !aIsNumber &&
            bIsNumber
        ) {

            return 1;
        }


        /*
           Alphabetical sorting.
        */

        return aText.localeCompare(
            bText,
            undefined,
            {
                numeric: true,
                sensitivity: "base"
            }
        );
    }


    /* ============================================================
       HIDE SUGGESTIONS
       ============================================================ */

    function hideSuggestions() {

        suggestionBox.style.display =
            "none";

        suggestionBox.innerHTML =
            "";
    }


    /* ============================================================
       SHOW SUGGESTIONS
       ============================================================ */

    function showSuggestions(
        values
    ) {

        suggestionBox.innerHTML =
            "";


        if (
            !values ||
            values.length === 0
        ) {

            hideSuggestions();

            return;
        }


        /*
           IMPORTANT:
           Maximum 10 suggestions.
        */

        var displayValues =
            values.slice(0, 10);


        displayValues.forEach(
            function (value) {

                var item =
                    document.createElement(
                        "div"
                    );


                item.textContent =
                    value;


                item.style.padding =
                    "8px 10px";


                item.style.cursor =
                    "pointer";


                item.style.fontSize =
                    "13px";


                item.style.borderBottom =
                    "1px solid #eee";


                item.style.whiteSpace =
                    "nowrap";


                item.style.overflow =
                    "hidden";


                item.style.textOverflow =
                    "ellipsis";


                item.addEventListener(
                    "mouseenter",
                    function () {

                        item.style.background =
                            "#f0f0f0";

                    }
                );


                item.addEventListener(
                    "mouseleave",
                    function () {

                        item.style.background =
                            "#ffffff";

                    }
                );


                /*
                   Select suggestion.
                */

                item.addEventListener(
                    "mousedown",
                    function (event) {

                        event.preventDefault();


                        valueInput.value =
                            value;


                        hideSuggestions();

                    }
                );


                suggestionBox.appendChild(
                    item
                );

            }
        );


        suggestionBox.style.display =
            "block";
    }


    /* ============================================================
       UPDATE SUGGESTIONS
       ============================================================ */

    function updateSuggestions() {

        var layer =
            getSelectedLayer();


        var field =
            fieldSelect.value;


        if (
            !layer ||
            !field
        ) {

            hideSuggestions();

            return;
        }


        /*
           IMPORTANT:
           Don't show suggestions until
           the user actually types.
        */

        var typed =
            valueInput.value
                .trim()
                .toLowerCase();


        if (!typed) {

            hideSuggestions();

            return;
        }


        var allValues =
            getFieldValues(
                layer,
                field
            );


        /*
           Sort all values first.
        */

        allValues.sort(
            naturalSort
        );


        /*
           Find values containing
           the typed text.
        */

        var filtered =
            allValues.filter(
                function (value) {

                    return String(value)
                        .toLowerCase()
                        .indexOf(typed) !== -1;

                }
            );


        /*
           Maximum 10 suggestions.
        */

        filtered =
            filtered.slice(0, 10);


        if (
            filtered.length === 0
        ) {

            hideSuggestions();

            return;
        }


        showSuggestions(
            filtered
        );
    }


    /* ============================================================
       LAYER CHANGE
       ============================================================ */

    layerSelect.addEventListener(
        "change",
        function () {

            stage6HighlightSource.clear();

            status.innerHTML = "";

            updateFieldList();

        }
    );


    /* ============================================================
       FIELD CHANGE
       ============================================================ */

    fieldSelect.addEventListener(
        "change",
        function () {

            valueInput.value =
                "";

            stage6HighlightSource.clear();

            status.innerHTML =
                "";

            hideSuggestions();

        }
    );


    /* ============================================================
       TYPING
       ============================================================ */

    valueInput.addEventListener(
        "input",
        function () {

            updateSuggestions();

        }
    );


    /* ============================================================
       FOCUS
       ============================================================ */

    valueInput.addEventListener(
        "focus",
        function () {

            /*
               Only show if there is already
               text in the box.
            */

            if (
                valueInput.value.trim()
            ) {

                updateSuggestions();
            }

        }
    );


    /* ============================================================
       BLUR
       ============================================================ */

    valueInput.addEventListener(
        "blur",
        function () {

            setTimeout(
                function () {

                    hideSuggestions();

                },
                200
            );

        }
    );


    /* ============================================================
       PERFORM SEARCH
       ============================================================ */

    function performSearch() {

        hideSuggestions();


        var layer =
            getSelectedLayer();


        var field =
            fieldSelect.value;


        var searchValue =
            valueInput.value.trim();


        stage6HighlightSource.clear();


        if (!layer) {

            status.innerHTML =
                "⚠ No vector layer selected.";

            return;
        }


        if (!field) {

            status.innerHTML =
                "⚠ Please select a field.";

            return;
        }


        if (!searchValue) {

            status.innerHTML =
                "⚠ Please enter a search value.";

            return;
        }


        var source =
            layer.getSource();


        var features =
            source.getFeatures();


        var searchLower =
            searchValue.toLowerCase();


        var exactMatches = [];

        var partialMatches = [];


        features.forEach(
            function (feature) {

                var value =
                    feature.get(field);


                if (
                    value === null ||
                    value === undefined
                ) {

                    return;
                }


                var text =
                    String(value).trim();


                var lower =
                    text.toLowerCase();


                /*
                   Exact match.
                */

                if (
                    lower ===
                    searchLower
                ) {

                    exactMatches.push(
                        feature
                    );

                    return;
                }


                /*
                   Partial match.
                */

                if (
                    lower.indexOf(
                        searchLower
                    ) !== -1
                ) {

                    partialMatches.push(
                        feature
                    );
                }

            }
        );


        /*
           Exact results have priority.
        */

        var matches =
            exactMatches.length > 0
                ? exactMatches
                : partialMatches;


        if (
            matches.length === 0
        ) {

            status.innerHTML =
                "❌ No matching features found.";

            return;
        }


        /* ========================================================
           HIGHLIGHT
           ======================================================== */

        var extent =
            ol.extent.createEmpty();


        matches.forEach(
            function (feature) {

                var clone =
                    feature.clone();


                stage6HighlightSource
                    .addFeature(
                        clone
                    );


                var geometry =
                    clone.getGeometry();


                if (geometry) {

                    ol.extent.extend(
                        extent,
                        geometry.getExtent()
                    );
                }

            }
        );


        /* ========================================================
           ZOOM
           ======================================================== */

        if (
            !ol.extent.isEmpty(
                extent
            )
        ) {

            var view =
                map.getView();


            if (
                matches.length === 1
            ) {

                view.fit(
                    extent,
                    {
                        padding: [
                            120,
                            120,
                            120,
                            120
                        ],

                        maxZoom: 19,

                        duration: 700
                    }
                );

            } else {

                view.fit(
                    extent,
                    {
                        padding: [
                            120,
                            120,
                            120,
                            120
                        ],

                        maxZoom: 17,

                        duration: 700
                    }
                );
            }

        }


        /* ========================================================
           STATUS
           ======================================================== */

        if (
            exactMatches.length > 0
        ) {

            status.innerHTML =
                "✅ " +
                exactMatches.length +
                " exact match" +
                (
                    exactMatches.length !== 1
                        ? "es"
                        : ""
                ) +
                " found.";

        } else {

            status.innerHTML =
                "🔎 " +
                partialMatches.length +
                " partial match" +
                (
                    partialMatches.length !== 1
                        ? "es"
                        : ""
                ) +
                " found.";
        }

    }


    /* ============================================================
       FIND BUTTON
       ============================================================ */

    findButton.addEventListener(
        "click",
        function () {

            performSearch();

        }
    );


    /* ============================================================
       CLEAR
       ============================================================ */

    clearButton.addEventListener(
        "click",
        function () {

            valueInput.value =
                "";

            stage6HighlightSource.clear();

            status.innerHTML =
                "";

            hideSuggestions();

        }
    );


    /* ============================================================
       ENTER KEY
       ============================================================ */

    valueInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                performSearch();

            }


            if (
                event.key === "Escape"
            ) {

                hideSuggestions();

            }

        }
    );


    /* ============================================================
       CLICK OUTSIDE
       ============================================================ */

    document.addEventListener(
        "mousedown",
        function (event) {

            if (
                !valueWrapper.contains(
                    event.target
                )
            ) {

                hideSuggestions();

            }

        }
    );


    /* ============================================================
       AUTOMATIC LAYER REFRESH
       ============================================================ */

    var previousLayerCount =
        -1;


    setInterval(
        function () {

            if (
                searchPanel.style.display ===
                "none"
            ) {

                return;
            }


            var layers =
                getSearchableLayers();


            if (
                layers.length !==
                previousLayerCount
            ) {

                previousLayerCount =
                    layers.length;

                refreshLayerList();

            }

        },
        1000
    );


    /* ============================================================
       INITIAL SETUP
       ============================================================ */

    setTimeout(
        function () {

            refreshLayerList();

        },
        500
    );


    console.log(
        "Stage 6 Search ready."
    );

})();

























































//---------------------------------------------------------------------------------------------------------------------------------
  //============== Geolocate Viewer (matches provided reference) ==============

let isTracking = false;

// Add geolocate button to map controls
const geolocateButton = document.createElement('button');
geolocateButton.className = 'geolocate-button';
geolocateButton.title = 'My Location';

const geolocateControl = document.createElement('div');
geolocateControl.className = 'ol-unselectable ol-control geolocate';
geolocateControl.appendChild(geolocateButton);
map.getTargetElement().appendChild(geolocateControl);

// Create OL features
const accuracyFeature = new ol.Feature();
const positionFeature = new ol.Feature();
const wedgeFeature = new ol.Feature();

const geolocateSource = new ol.source.Vector({
  features: [accuracyFeature, wedgeFeature, positionFeature]
});
const geolocateLayer = new ol.layer.Vector({ source: geolocateSource });

// Set up geolocation
const geolocation = new ol.Geolocation({
  projection: map.getView().getProjection(),
  trackingOptions: { enableHighAccuracy: true }
});
geolocation.setTracking(true);

// Draw accuracy circle
geolocation.on('change:accuracyGeometry', function () {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  accuracyFeature.setStyle(
    new ol.style.Style({
      fill: new ol.style.Fill({ color: 'rgba(51,153,204,0.15)' }),
      stroke: new ol.style.Stroke({ color: '#3399CC', width: 2 }),
    })
  );
});

// Google Maps-style double ring marker
function doubleRingStyle() {
  return [
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 20,
        fill: new ol.style.Fill({ color: 'rgba(0,0,0,0)' }),
        stroke: new ol.style.Stroke({ color: '#3399CC', width: 2 }),
      }),
    }),
	  new ol.style.Style({
      image: new ol.style.Circle({
        radius: 19,
        fill: new ol.style.Fill({ color: 'rgba(0,0,0,0)' }),
        stroke: new ol.style.Stroke({ color: '#fff', width: 1 }),
      })
    }),
	  new ol.style.Style({
      image: new ol.style.Circle({
        radius: 21,
        fill: new ol.style.Fill({ color: 'rgba(0,0,0,0)' }),
        stroke: new ol.style.Stroke({ color: '#fff', width: 1 }),
      })
    }),
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 4,
        fill: new ol.style.Fill({ color: 'rgba(0,0,0,0)' }),
        stroke: new ol.style.Stroke({ color: '#fff', width: 1 }),
      })
    }),
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 3,
        fill: new ol.style.Fill({ color: '#3399CC' })
      })
    }),
  ];
}

// Place marker and update wedge on geolocation change
geolocation.on('change:position', function () {
  const pos = geolocation.getPosition();
  positionFeature.setGeometry(pos ? new ol.geom.Point(pos) : null);
  positionFeature.setStyle(doubleRingStyle());
  updateWedge();
});

// Wedge (sector) style and orientation
let heading = 0;
let fov = Math.PI / 3; // ~30 degrees

function updateWedge() {
  const pos = geolocation.getPosition();
  if (!pos) { wedgeFeature.setGeometry(null); return; }
  // const radius = 20; // meters
	const resolution = map.getView().getResolution(); // meters/pixel
const wedgePixelLength = 18; // wedge length in pixels
const radius = wedgePixelLength * resolution; // meters
  const coords = [pos];
  // Fix direction: 0 deg device heading = north/up on map
  const angleOffset = Math.PI / 2;
  const centerHeading = heading + angleOffset;
  const a1 = centerHeading - fov / 2;
  const a2 = centerHeading + fov / 2;
  for (let i = 0; i <= 40; i++) {
    const angle = a1 + ((a2 - a1) * i) / 40;
    coords.push([
      pos[0] + radius * Math.cos(angle),
      pos[1] + radius * Math.sin(angle)
    ]);
  }
  coords.push(pos); // close sector

  wedgeFeature.setGeometry(new ol.geom.Polygon([coords]));
  wedgeFeature.setStyle(
    new ol.style.Style({
      fill: new ol.style.Fill({ color: 'rgba(255,153,0,0.3)' }),
      stroke: new ol.style.Stroke({ color: 'rgba(255,153,0,0.99)', width: 0 })
    })
  );
}

// Listen to device orientation: ensures heading north = wedge up
if ('ondeviceorientationabsolute' in window) {
  window.addEventListener('deviceorientationabsolute', function (event) {
    if (event.alpha !== null) {
      heading = (event.alpha * Math.PI) / 180;
      updateWedge();
    }
  }, true);
} else {
  window.addEventListener('deviceorientation', function (event) {
    if (event.webkitCompassHeading !== undefined) {
      heading = (event.webkitCompassHeading * Math.PI) / 180;
      updateWedge();
    } else if (event.alpha !== null) {
      heading = (event.alpha * Math.PI) / 180;
      updateWedge();
    }
  }, true);
}

// Geolocate layer toggle logic
function handleGeolocate() {
  if (isTracking) {
    map.removeLayer(geolocateLayer);
    isTracking = false;
  } else if (geolocation.getTracking()) {
    map.addLayer(geolocateLayer);
    const pos = geolocation.getPosition();
    if (pos) map.getView().setCenter(pos);
    isTracking = true;
  }
}
geolocateButton.addEventListener('click', handleGeolocate);
geolocateButton.addEventListener('touchstart', handleGeolocate);

//============== End Geolocate Viewer ==============






























































// ============================================================
// 📐 STAGE 14 — ADVANCED MEASURE TOOL
// OpenLayers 10.x
//
// Features:
// ✔ Length measurement
// ✔ Area measurement from 3+ points
// ✔ Individual segment lengths
// ✔ Dynamic length
// ✔ Dynamic area
// ✔ Dynamic perimeter
// ✔ Vertex snapping
// ✔ Line snapping
// ✔ Adjustable snap tolerance
// ✔ Length unit selection
// ✔ Area unit selection
// ✔ Undo
// ✔ Clear
// ✔ Finish
// ✔ Mobile friendly
// ✔ Stage 5 popup suppression
// ✔ Completely standalone
//
// Coordinate systems:
// DATA  = EPSG:32643
// MAP   = EPSG:3857
// ============================================================

(function () {

    "use strict";

    console.log(
        "📐 Starting Stage 14 Advanced Measure Tool..."
    );


    // =========================================================
    // CONFIGURATION
    // =========================================================

    const STAGE14_DATA_PROJECTION =
        "EPSG:32643";

    const STAGE14_MAP_PROJECTION =
        "EPSG:3857";


    // =========================================================
    // GLOBAL STATE
    // =========================================================

    let stage14Active =
        false;

    let stage14Finished =
        false;

    let stage14Points =
        [];

    let stage14CurrentPointer =
        null;

    let stage14LengthUnit =
        "m";

    let stage14AreaUnit =
        "m2";

    let stage14SnapEnabled =
        true;

    let stage14SnapTolerance =
        18;

    let stage14CurrentSnapType =
        null;


    // =========================================================
    // POPUP CONTROL FLAG
    // =========================================================

    window.stage14MeasureActive =
        false;


    // =========================================================
    // MEASURE SOURCE
    // =========================================================

    const stage14MeasureSource =
        new ol.source.Vector();


    // =========================================================
    // MEASURE LAYER
    // =========================================================

    const stage14MeasureLayer =
        new ol.layer.Vector({

            source:
                stage14MeasureSource,

            zIndex:
                15000

        });


    // =========================================================
    // SNAP SOURCE
    // =========================================================

    const stage14SnapSource =
        new ol.source.Vector();


    // =========================================================
    // SNAP LAYER
    // =========================================================

    const stage14SnapLayer =
        new ol.layer.Vector({

            source:
                stage14SnapSource,

            zIndex:
                16000

        });


    // =========================================================
    // EXPOSE LAYERS
    // FOR STAGE 5 POPUP TO IGNORE
    // =========================================================

    window.stage14MeasureLayer =
        stage14MeasureLayer;

    window.stage14SnapLayer =
        stage14SnapLayer;


    // =========================================================
    // ADD LAYERS TO MAP
    // =========================================================

    map.addLayer(
        stage14MeasureLayer
    );

    map.addLayer(
        stage14SnapLayer
    );


    // =========================================================
    // UTILITY
    // =========================================================

    function stage14Round(
        value,
        decimals
    ) {

        const factor =
            Math.pow(
                10,
                decimals
            );

        return Math.round(
            value * factor
        ) / factor;

    }


    // =========================================================
    // FORMAT NUMBER
    // =========================================================

    function stage14FormatNumber(
        value
    ) {

        if (
            !isFinite(value)
        ) {

            return "0";

        }

        return Number(
            value
        ).toLocaleString(
            undefined,
            {
                maximumFractionDigits:
                    2
            }
        );

    }


    // =========================================================
    // DISTANCE
    //
    // Convert from Web Mercator to UTM
    // Then calculate Euclidean distance
    // =========================================================

    function stage14Distance(
        coordinate1,
        coordinate2
    ) {

        const p1 =
            ol.proj.transform(
                coordinate1,
                STAGE14_MAP_PROJECTION,
                STAGE14_DATA_PROJECTION
            );

        const p2 =
            ol.proj.transform(
                coordinate2,
                STAGE14_MAP_PROJECTION,
                STAGE14_DATA_PROJECTION
            );


        const dx =
            p2[0] - p1[0];

        const dy =
            p2[1] - p1[1];


        return Math.sqrt(
            dx * dx +
            dy * dy
        );

    }


    // =========================================================
    // POLYGON AREA
    //
    // Calculates area in square metres
    // using UTM coordinates
    // =========================================================

    function stage14PolygonArea(
        coordinates
    ) {

        if (
            coordinates.length < 3
        ) {

            return 0;

        }


        const projected =
            coordinates.map(
                function (coordinate) {

                    return ol.proj.transform(
                        coordinate,
                        STAGE14_MAP_PROJECTION,
                        STAGE14_DATA_PROJECTION
                    );

                }
            );


        let area =
            0;


        for (
            let i = 0;
            i < projected.length;
            i++
        ) {

            const j =
                (
                    i + 1
                ) %
                projected.length;


            area +=
                projected[i][0] *
                projected[j][1];


            area -=
                projected[j][0] *
                projected[i][1];

        }


        return Math.abs(
            area / 2
        );

    }


    // =========================================================
    // LENGTH UNIT CONVERSION
    // =========================================================

    function stage14ConvertLength(
        metres
    ) {

        switch (
            stage14LengthUnit
        ) {

            case "km":

                return metres /
                    1000;


            case "ft":

                return metres *
                    3.280839895;


            case "yd":

                return metres *
                    1.093613298;


            case "mi":

                return metres /
                    1609.344;


            case "m":

            default:

                return metres;

        }

    }


    // =========================================================
    // LENGTH UNIT LABEL
    // =========================================================

    function stage14LengthLabel() {

        switch (
            stage14LengthUnit
        ) {

            case "km":
                return "km";

            case "ft":
                return "ft";

            case "yd":
                return "yd";

            case "mi":
                return "mi";

            case "m":
            default:
                return "m";

        }

    }


    // =========================================================
    // AREA UNIT CONVERSION
    // =========================================================

    function stage14ConvertArea(
        squareMetres
    ) {

        switch (
            stage14AreaUnit
        ) {

            case "ha":

                return squareMetres /
                    10000;


            case "acre":

                return squareMetres /
                    4046.8564224;


            case "ft2":

                return squareMetres *
                    10.763910417;


            case "yd2":

                return squareMetres *
                    1.195990046;


            case "m2":

            default:

                return squareMetres;

        }

    }


    // =========================================================
    // AREA UNIT LABEL
    // =========================================================

    function stage14AreaLabel() {

        switch (
            stage14AreaUnit
        ) {

            case "ha":
                return "ha";

            case "acre":
                return "acres";

            case "ft2":
                return "ft²";

            case "yd2":
                return "yd²";

            case "m2":
            default:
                return "m²";

        }

    }


    // =========================================================
    // CREATE TEXT STYLE
    // =========================================================

    function stage14TextStyle(
        text
    ) {

        return new ol.style.Style({

            text:
                new ol.style.Text({

                    text:
                        text,

                    font:
                        "bold 12px Arial",

                    fill:
                        new ol.style.Fill({
                            color:
                                "#000000"
                        }),

                    stroke:
                        new ol.style.Stroke({

                            color:
                                "#ffffff",

                            width:
                                4

                        }),

                    offsetY:
                        -12,

                    overflow:
                        true

                })

        });

    }


    // =========================================================
    // SEGMENT STYLE
    // =========================================================

    function stage14SegmentStyle(
        text
    ) {

        return [

            new ol.style.Style({

                stroke:
                    new ol.style.Stroke({

                        color:
                            "#1565c0",

                        width:
                            3

                    })

            }),

            stage14TextStyle(
                text
            )

        ];

    }


    // =========================================================
    // CURRENT POINTER SEGMENT STYLE
    // =========================================================

    function stage14CurrentLineStyle(
        text
    ) {

        return [

            new ol.style.Style({

                stroke:
                    new ol.style.Stroke({

                        color:
                            "#1565c0",

                        width:
                            3,

                        lineDash:
                            [10, 8]

                    })

            }),

            stage14TextStyle(
                text
            )

        ];

    }


    // =========================================================
    // AREA STYLE
    // =========================================================

    function stage14AreaStyle(
        text
    ) {

        return [

            new ol.style.Style({

                fill:
                    new ol.style.Fill({

                        color:
                            "rgba(30,136,229,0.18)"

                    }),

                stroke:
                    new ol.style.Stroke({

                        color:
                            "#1565c0",

                        width:
                            3

                    })

            }),

            new ol.style.Style({

                text:
                    new ol.style.Text({

                        text:
                            text,

                        font:
                            "bold 13px Arial",

                        fill:
                            new ol.style.Fill({

                                color:
                                    "#000000"

                            }),

                        stroke:
                            new ol.style.Stroke({

                                color:
                                    "#ffffff",

                                width:
                                    5

                            })

                    })

            })

        ];

    }


    // =========================================================
    // POINT STYLE
    // =========================================================

    function stage14PointStyle() {

        return new ol.style.Style({

            image:
                new ol.style.Circle({

                    radius:
                        5,

                    fill:
                        new ol.style.Fill({

                            color:
                                "#ffffff"

                        }),

                    stroke:
                        new ol.style.Stroke({

                            color:
                                "#1565c0",

                            width:
                                3

                        })

                })

        });

    }


    // =========================================================
    // SNAP VERTEX STYLE
    // =========================================================

    function stage14SnapVertexStyle() {

        return new ol.style.Style({

            image:
                new ol.style.Circle({

                    radius:
                        7,

                    fill:
                        new ol.style.Fill({

                            color:
                                "rgba(255,0,0,0.25)"

                        }),

                    stroke:
                        new ol.style.Stroke({

                            color:
                                "#ff0000",

                            width:
                                3

                        })

                })

        });

    }


    // =========================================================
    // SNAP LINE STYLE
    // =========================================================

    function stage14SnapLineStyle() {

        return new ol.style.Style({

            image:
                new ol.style.Circle({

                    radius:
                        7,

                    fill:
                        new ol.style.Fill({

                            color:
                                "rgba(0,180,0,0.25)"

                        }),

                    stroke:
                        new ol.style.Stroke({

                            color:
                                "#00a000",

                            width:
                                3

                        })

                })

        });

    }


    // =========================================================
    // COLLECT ALL VERTICES
    // =========================================================

    function stage14CollectVertices(
        geometry,
        result
    ) {

        if (
            !geometry
        ) {

            return;

        }


        const type =
            geometry.getType();


        const coordinates =
            geometry.getCoordinates();


        if (
            type === "Point"
        ) {

            result.push(
                coordinates
            );

            return;

        }


        if (
            type === "MultiPoint"
        ) {

            coordinates.forEach(
                function (coordinate) {

                    result.push(
                        coordinate
                    );

                }
            );

            return;

        }


        if (
            type === "LineString"
        ) {

            coordinates.forEach(
                function (coordinate) {

                    result.push(
                        coordinate
                    );

                }
            );

            return;

        }


        if (
            type === "MultiLineString"
        ) {

            coordinates.forEach(
                function (line) {

                    line.forEach(
                        function (coordinate) {

                            result.push(
                                coordinate
                            );

                        }
                    );

                }
            );

            return;

        }


        if (
            type === "Polygon"
        ) {

            coordinates.forEach(
                function (ring) {

                    ring.forEach(
                        function (coordinate) {

                            result.push(
                                coordinate
                            );

                        }
                    );

                }
            );

            return;

        }


        if (
            type === "MultiPolygon"
        ) {

            coordinates.forEach(
                function (polygon) {

                    polygon.forEach(
                        function (ring) {

                            ring.forEach(
                                function (coordinate) {

                                    result.push(
                                        coordinate
                                    );

                                }
                            );

                        }
                    );

                }
            );

            return;

        }


        if (
            type === "GeometryCollection"
        ) {

            geometry
                .getGeometries()
                .forEach(
                    function (childGeometry) {

                        stage14CollectVertices(
                            childGeometry,
                            result
                        );

                    }
                );

        }

    }


    // =========================================================
    // FIND CLOSEST VERTEX
    // =========================================================

    function stage14FindClosestVertex(
        pixel
    ) {

        let closest =
            null;

        let closestDistance =
            Infinity;


        map.getLayers()
            .forEach(
                function (layer) {

                    if (
                        !(layer instanceof
                            ol.layer.Vector)
                    ) {

                        return;

                    }


                    if (
                        layer ===
                        stage14MeasureLayer
                    ) {

                        return;

                    }


                    if (
                        layer ===
                        stage14SnapLayer
                    ) {

                        return;

                    }


                    if (
                        !layer.getVisible()
                    ) {

                        return;

                    }


                    const source =
                        layer.getSource();


                    if (
                        !source
                    ) {

                        return;

                    }


                    source
                        .getFeatures()
                        .forEach(
                            function (feature) {

                                const geometry =
                                    feature.getGeometry();


                                const vertices =
                                    [];


                                stage14CollectVertices(
                                    geometry,
                                    vertices
                                );


                                vertices.forEach(
                                    function (
                                        coordinate
                                    ) {

                                        const vertexPixel =
                                            map.getPixelFromCoordinate(
                                                coordinate
                                            );


                                        if (
                                            !vertexPixel
                                        ) {

                                            return;

                                        }


                                        const dx =
                                            vertexPixel[0] -
                                            pixel[0];


                                        const dy =
                                            vertexPixel[1] -
                                            pixel[1];


                                        const distance =
                                            Math.sqrt(
                                                dx * dx +
                                                dy * dy
                                            );


                                        if (
                                            distance <
                                            closestDistance &&
                                            distance <=
                                            stage14SnapTolerance
                                        ) {

                                            closestDistance =
                                                distance;

                                            closest = {

                                                coordinate:
                                                    coordinate,

                                                type:
                                                    "vertex"

                                            };

                                        }

                                    }
                                );

                            }
                        );

                }
            );


        return closest;

    }


    // =========================================================
    // FIND CLOSEST POINT ON LINE
    // =========================================================

    function stage14FindClosestLine(
        pixel
    ) {

        const coordinate =
            map.getCoordinateFromPixel(
                pixel
            );


        if (
            !coordinate
        ) {

            return null;

        }


        let closest =
            null;

        let closestDistance =
            Infinity;


        map.getLayers()
            .forEach(
                function (layer) {

                    if (
                        !(layer instanceof
                            ol.layer.Vector)
                    ) {

                        return;

                    }


                    if (
                        layer ===
                        stage14MeasureLayer
                    ) {

                        return;

                    }


                    if (
                        layer ===
                        stage14SnapLayer
                    ) {

                        return;

                    }


                    if (
                        !layer.getVisible()
                    ) {

                        return;

                    }


                    const source =
                        layer.getSource();


                    if (
                        !source
                    ) {

                        return;

                    }


                    source
                        .getFeatures()
                        .forEach(
                            function (feature) {

                                const geometry =
                                    feature.getGeometry();


                                if (
                                    !geometry
                                ) {

                                    return;

                                }


                                const type =
                                    geometry.getType();


                                if (
                                    type !==
                                    "LineString" &&
                                    type !==
                                    "MultiLineString" &&
                                    type !==
                                    "Polygon" &&
                                    type !==
                                    "MultiPolygon"
                                ) {

                                    return;

                                }


                                const closestPoint =
                                    geometry.getClosestPoint(
                                        coordinate
                                    );


                                const closestPixel =
                                    map.getPixelFromCoordinate(
                                        closestPoint
                                    );


                                if (
                                    !closestPixel
                                ) {

                                    return;

                                }


                                const dx =
                                    closestPixel[0] -
                                    pixel[0];


                                const dy =
                                    closestPixel[1] -
                                    pixel[1];


                                const distance =
                                    Math.sqrt(
                                        dx * dx +
                                        dy * dy
                                    );


                                if (
                                    distance <
                                    closestDistance &&
                                    distance <=
                                    stage14SnapTolerance
                                ) {

                                    closestDistance =
                                        distance;

                                    closest = {

                                        coordinate:
                                            closestPoint,

                                        type:
                                            "line"

                                    };

                                }

                            }
                        );

                }
            );


        return closest;

    }


    // =========================================================
    // FIND SNAP
    // =========================================================

    function stage14FindSnap(
        pixel
    ) {

        if (
            !stage14SnapEnabled
        ) {

            return null;

        }


        // Vertex has priority
        const vertex =
            stage14FindClosestVertex(
                pixel
            );


        if (
            vertex
        ) {

            return vertex;

        }


        // Then line
        return stage14FindClosestLine(
            pixel
        );

    }


    // =========================================================
    // UPDATE SNAP INDICATOR
    // =========================================================

    function stage14UpdateSnapIndicator(
        snap
    ) {

        stage14SnapSource.clear();


        if (
            !snap
        ) {

            stage14CurrentSnapType =
                null;

            return;

        }


        const feature =
            new ol.Feature({

                geometry:
                    new ol.geom.Point(
                        snap.coordinate
                    )

            });


        if (
            snap.type ===
            "vertex"
        ) {

            feature.setStyle(
                stage14SnapVertexStyle()
            );

        } else {

            feature.setStyle(
                stage14SnapLineStyle()
            );

        }


        stage14SnapSource.addFeature(
            feature
        );


        stage14CurrentSnapType =
            snap.type;

    }


    // =========================================================
    // MIDPOINT
    // =========================================================

    function stage14Midpoint(
        p1,
        p2
    ) {

        return [

            (
                p1[0] +
                p2[0]
            ) / 2,

            (
                p1[1] +
                p2[1]
            ) / 2

        ];

    }


    // =========================================================
    // GET TOTAL LENGTH
    // =========================================================

    function stage14GetTotalLength(
        points
    ) {

        let total =
            0;


        for (
            let i = 1;
            i < points.length;
            i++
        ) {

            total +=
                stage14Distance(
                    points[i - 1],
                    points[i]
                );

        }


        return total;

    }


    // =========================================================
    // GET PERIMETER
    // =========================================================

    function stage14GetPerimeter(
        points
    ) {

        if (
            points.length < 3
        ) {

            return 0;

        }


        let perimeter =
            stage14GetTotalLength(
                points
            );


        perimeter +=
            stage14Distance(
                points[
                    points.length - 1
                ],
                points[0]
            );


        return perimeter;

    }


    // =========================================================
    // CLEAR MEASURE GRAPHICS
    // =========================================================

    function stage14ClearGraphics() {

        stage14MeasureSource.clear();

        stage14SnapSource.clear();

    }


    // =========================================================
    // DRAW MEASUREMENTS
    // =========================================================

    function stage14DrawMeasurements() {

        stage14ClearGraphics();


        // =====================================================
        // DRAW FIXED SEGMENTS
        // =====================================================

        for (
            let i = 1;
            i < stage14Points.length;
            i++
        ) {

            const p1 =
                stage14Points[
                    i - 1
                ];

            const p2 =
                stage14Points[i];


            const metres =
                stage14Distance(
                    p1,
                    p2
                );


            const converted =
                stage14ConvertLength(
                    metres
                );


            const text =
                stage14FormatNumber(
                    converted
                ) +
                " " +
                stage14LengthLabel();


            const lineFeature =
                new ol.Feature({

                    geometry:
                        new ol.geom.LineString([
                            p1,
                            p2
                        ])

                });


            lineFeature.setStyle(
                stage14SegmentStyle(
                    text
                )
            );


            stage14MeasureSource.addFeature(
                lineFeature
            );

        }


        // =====================================================
        // DRAW POINTS
        // =====================================================

        stage14Points.forEach(
            function (point) {

                const feature =
                    new ol.Feature({

                        geometry:
                            new ol.geom.Point(
                                point
                            )

                    });


                feature.setStyle(
                    stage14PointStyle()
                );


                stage14MeasureSource.addFeature(
                    feature
                );

            }
        );


        // =====================================================
        // AREA
        // =====================================================

        if (
            stage14Points.length >= 3
        ) {

            const area =
                stage14PolygonArea(
                    stage14Points
                );


            const perimeter =
                stage14GetPerimeter(
                    stage14Points
                );


            const areaValue =
                stage14ConvertArea(
                    area
                );


            const perimeterValue =
                stage14ConvertLength(
                    perimeter
                );


            const areaText =
                "Area: " +
                stage14FormatNumber(
                    areaValue
                ) +
                " " +
                stage14AreaLabel() +
                "\n" +
                "Perimeter: " +
                stage14FormatNumber(
                    perimeterValue
                ) +
                " " +
                stage14LengthLabel();


            const polygonCoordinates =
                stage14Points.slice();


            polygonCoordinates.push(
                stage14Points[0]
            );


            const polygonFeature =
                new ol.Feature({

                    geometry:
                        new ol.geom.Polygon([
                            polygonCoordinates
                        ])

                });


            polygonFeature.setStyle(
                stage14AreaStyle(
                    areaText
                )
            );


            stage14MeasureSource.addFeature(
                polygonFeature
            );


            // =================================================
            // DRAW CLOSING LINE LABEL
            // =================================================

            const closingDistance =
                stage14Distance(
                    stage14Points[
                        stage14Points.length - 1
                    ],
                    stage14Points[0]
                );


            const closingText =
                stage14FormatNumber(
                    stage14ConvertLength(
                        closingDistance
                    )
                ) +
                " " +
                stage14LengthLabel();


            const closingLine =
                new ol.Feature({

                    geometry:
                        new ol.geom.LineString([

                            stage14Points[
                                stage14Points.length - 1
                            ],

                            stage14Points[0]

                        ])

                });


            closingLine.setStyle(
                stage14SegmentStyle(
                    closingText
                )
            );


            stage14MeasureSource.addFeature(
                closingLine
            );

        }

    }


    // =========================================================
    // DRAW CURRENT POINTER
    // =========================================================

    function stage14DrawCurrentPointer() {

        if (
            !stage14Active
        ) {

            return;

        }


        if (
            !stage14CurrentPointer
        ) {

            return;

        }


        if (
            stage14Points.length === 0
        ) {

            return;

        }


        // -----------------------------------------------------
        // Remove old temporary pointer graphics
        // -----------------------------------------------------

        const features =
            stage14MeasureSource
                .getFeatures();


        features.forEach(
            function (feature) {

                if (
                    feature.get(
                        "stage14Temporary"
                    )
                ) {

                    stage14MeasureSource
                        .removeFeature(
                            feature
                        );

                }

            }
        );


        const lastPoint =
            stage14Points[
                stage14Points.length - 1
            ];


        const currentPoint =
            stage14CurrentPointer;


        // -----------------------------------------------------
        // Current segment length
        // -----------------------------------------------------

        const currentDistance =
            stage14Distance(
                lastPoint,
                currentPoint
            );


        const currentText =
            stage14FormatNumber(
                stage14ConvertLength(
                    currentDistance
                )
            ) +
            " " +
            stage14LengthLabel();


        const currentLine =
            new ol.Feature({

                geometry:
                    new ol.geom.LineString([

                        lastPoint,
                        currentPoint

                    ])

            });


        currentLine.set(
            "stage14Temporary",
            true
        );


        currentLine.setStyle(
            stage14CurrentLineStyle(
                currentText
            )
        );


        stage14MeasureSource.addFeature(
            currentLine
        );


        // =====================================================
        // DYNAMIC AREA
        // =====================================================

        if (
            stage14Points.length >= 2
        ) {

            const dynamicPoints =
                stage14Points.slice();


            dynamicPoints.push(
                currentPoint
            );


            const dynamicArea =
                stage14PolygonArea(
                    dynamicPoints
                );


            const dynamicPerimeter =
                stage14GetPerimeter(
                    dynamicPoints
                );


            const dynamicAreaValue =
                stage14ConvertArea(
                    dynamicArea
                );


            const dynamicPerimeterValue =
                stage14ConvertLength(
                    dynamicPerimeter
                );


            const dynamicText =
                "Area: " +
                stage14FormatNumber(
                    dynamicAreaValue
                ) +
                " " +
                stage14AreaLabel() +
                "\n" +
                "Perimeter: " +
                stage14FormatNumber(
                    dynamicPerimeterValue
                ) +
                " " +
                stage14LengthLabel();


            // -------------------------------------------------
            // Dynamic polygon
            // -------------------------------------------------

            const dynamicPolygon =
                dynamicPoints.slice();


            dynamicPolygon.push(
                dynamicPoints[0]
            );


            const dynamicFeature =
                new ol.Feature({

                    geometry:
                        new ol.geom.Polygon([
                            dynamicPolygon
                        ])

                });


            dynamicFeature.set(
                "stage14Temporary",
                true
            );


            dynamicFeature.setStyle(
                stage14AreaStyle(
                    dynamicText
                )
            );


            stage14MeasureSource.addFeature(
                dynamicFeature
            );

        }

    }


    // =========================================================
    // REDRAW EVERYTHING
    // =========================================================

    function stage14Redraw() {

        stage14DrawMeasurements();

        stage14DrawCurrentPointer();

    }


    // =========================================================
    // UPDATE STATUS
    // =========================================================

    function stage14UpdateStatus(
        customText
    ) {

        const status =
            document.getElementById(
                "stage14-status"
            );


        if (
            !status
        ) {

            return;

        }


        if (
            customText
        ) {

            status.textContent =
                customText;

            return;

        }


        if (
            !stage14Active
        ) {

            status.textContent =
                "Measure tool ready.";

            return;

        }


        if (
            stage14Points.length === 0
        ) {

            status.textContent =
                "Click on the map to start.";

            return;

        }


        if (
            stage14Points.length === 1
        ) {

            status.textContent =
                "1 point — select next point.";

            return;

        }


        const total =
            stage14GetTotalLength(
                stage14Points
            );


        let text =
            stage14Points.length +
            " points | Total: " +
            stage14FormatNumber(
                stage14ConvertLength(
                    total
                )
            ) +
            " " +
            stage14LengthLabel();


        if (
            stage14Points.length >= 3
        ) {

            const area =
                stage14PolygonArea(
                    stage14Points
                );


            text +=
                " | Area: " +
                stage14FormatNumber(
                    stage14ConvertArea(
                        area
                    )
                ) +
                " " +
                stage14AreaLabel();

        }


        status.textContent =
            text;

    }


    // =========================================================
    // START MEASUREMENT
    // =========================================================

    function stage14Start() {

        stage14Active =
            true;

        stage14Finished =
            false;

        stage14Points =
            [];

        stage14CurrentPointer =
            null;


        // =====================================================
        // BLOCK STAGE 5 POPUP
        // =====================================================

        window.stage14MeasureActive =
            true;


        // =====================================================
        // CLOSE EXISTING STAGE 5 POPUP
        // =====================================================

        if (
            typeof window.closeFeaturePopup ===
            "function"
        ) {

            window.closeFeaturePopup();

        } else {

            const popup =
                document.getElementById(
                    "feature-info-popup"
                );


            if (
                popup
            ) {

                popup.style.display =
                    "none";

            }

        }


        stage14ClearGraphics();

        stage14UpdateStatus(
            "📐 Measuring — click points on the map."
        );


        stage14MeasureButton.textContent =
            "⏹ Stop";


        stage14MeasureButton.classList.add(
            "active"
        );


        console.log(
            "📐 Stage 14 measurement STARTED."
        );

    }


    // =========================================================
    // STOP MEASUREMENT
    // =========================================================

    function stage14Stop() {

        stage14Active =
            false;


        stage14Finished =
            true;


        stage14CurrentPointer =
            null;


        stage14SnapSource.clear();


        // =====================================================
        // ALLOW STAGE 5 POPUP AGAIN
        // =====================================================

        window.stage14MeasureActive =
            false;


        stage14DrawMeasurements();


        stage14UpdateStatus(
            "Measurement finished."
        );


        stage14MeasureButton.textContent =
            "📐";


        stage14MeasureButton.classList.remove(
            "active"
        );


        console.log(
            "📐 Stage 14 measurement STOPPED."
        );

    }


    // =========================================================
    // ADD POINT
    // =========================================================

    function stage14AddPoint(
        coordinate
    ) {

        if (
            !stage14Active
        ) {

            return;

        }


        stage14Points.push(
            coordinate
        );


        stage14CurrentPointer =
            null;


        stage14Redraw();

        stage14UpdateStatus();


        console.log(
            "📐 Measurement point:",
            coordinate
        );

    }


    // =========================================================
    // UNDO
    // =========================================================

    function stage14Undo() {

        if (
            !stage14Active
        ) {

            return;

        }


        if (
            stage14Points.length === 0
        ) {

            return;

        }


        stage14Points.pop();


        stage14CurrentPointer =
            null;


        stage14Redraw();

        stage14UpdateStatus();


        console.log(
            "↩️ Measurement point removed."
        );

    }


    // =========================================================
    // CLEAR
    // =========================================================

    function stage14Clear() {

        stage14Points =
            [];

        stage14CurrentPointer =
            null;


        stage14ClearGraphics();

        stage14SnapSource.clear();


        if (
            stage14Active
        ) {

            stage14UpdateStatus(
                "📐 Cleared — click on the map to start."
            );

        } else {

            stage14UpdateStatus(
                "Measure tool ready."
            );

        }


        console.log(
            "🗑 Stage 14 measurement cleared."
        );

    }


    // =========================================================
    // MAP POINTER MOVE
    // =========================================================

    map.on(
        "pointermove",
        function (event) {

            if (
                !stage14Active
            ) {

                return;

            }


            if (
                event.dragging
            ) {

                return;

            }


            stage14CurrentPointer =
                map.getCoordinateFromPixel(
                    event.pixel
                );


            // -------------------------------------------------
            // SNAP
            // -------------------------------------------------

            if (
                stage14SnapEnabled
            ) {

                const snap =
                    stage14FindSnap(
                        event.pixel
                    );


                stage14UpdateSnapIndicator(
                    snap
                );


                if (
                    snap
                ) {

                    stage14CurrentPointer =
                        snap.coordinate;

                }

            } else {

                stage14SnapSource.clear();

            }


            stage14Redraw();

        }
    );


    // =========================================================
    // MAP CLICK
    // =========================================================

    map.on(
        "singleclick",
        function (event) {

            if (
                !stage14Active
            ) {

                return;

            }


            // =================================================
            // 🚫 STAGE 5 POPUP BLOCK
            // =================================================

            window.stage14MeasureActive =
                true;


            // =================================================
            // GET SNAP
            // =================================================

            let coordinate =
                event.coordinate;


            if (
                stage14SnapEnabled
            ) {

                const snap =
                    stage14FindSnap(
                        event.pixel
                    );


                if (
                    snap
                ) {

                    coordinate =
                        snap.coordinate;

                }

            }


            // =================================================
            // ADD POINT
            // =================================================

            stage14AddPoint(
                coordinate
            );


            // =================================================
            // STOP EVENT PROPAGATION
            // =================================================

            if (
                event.originalEvent
            ) {

                event.originalEvent.preventDefault();

                event.originalEvent.stopPropagation();

            }

        }
    );


    // =========================================================
    // BUTTON
    // =========================================================

    const stage14MeasureButton =
        document.createElement(
            "button"
        );


    stage14MeasureButton.id =
        "stage14-measure-button";


    stage14MeasureButton.type =
        "button";


    stage14MeasureButton.textContent =
        "📐 ";


    stage14MeasureButton.title =
        "Advanced Measure Tool";


    // =========================================================
    // CONTROL
    // =========================================================

    const stage14Control =
        document.createElement(
            "div"
        );


    stage14Control.id =
        "stage14-control";


    stage14Control.className =
        "ol-unselectable ol-control";


    stage14Control.appendChild(
        stage14MeasureButton
    );


    map.getTargetElement()
        .appendChild(
            stage14Control
        );


    // =========================================================
    // PANEL
    // =========================================================

    const stage14Panel =
        document.createElement(
            "div"
        );


    stage14Panel.id =
        "stage14-panel";


    stage14Panel.innerHTML = `

        <div id="stage14-title">
            📐 Advanced Measure
        </div>

        <div id="stage14-status">
            Measure tool ready.
        </div>

        <div class="stage14-row">

            <button
                type="button"
                id="stage14-start">
                📐 Measure
            </button>

            <button
                type="button"
                id="stage14-undo">
                ↩️ Undo
            </button>

        </div>

        <div class="stage14-row">

            <button
                type="button"
                id="stage14-finish">
                ✅ Finish
            </button>

            <button
                type="button"
                id="stage14-clear">
                🗑 Clear
            </button>

        </div>

        <div class="stage14-setting">

            <label>
                Length Unit
            </label>

            <select
                id="stage14-length-unit">

                <option value="m">
                    Metres (m)
                </option>

                <option value="km">
                    Kilometres (km)
                </option>

                <option value="ft">
                    Feet (ft)
                </option>

                <option value="yd">
                    Yards (yd)
                </option>

                <option value="mi">
                    Miles (mi)
                </option>

            </select>

        </div>


        <div class="stage14-setting">

            <label>
                Area Unit
            </label>

            <select
                id="stage14-area-unit">

                <option value="m2">
                    Square metres (m²)
                </option>

                <option value="ha">
                    Hectares (ha)
                </option>

                <option value="acre">
                    Acres
                </option>

                <option value="ft2">
                    Square feet (ft²)
                </option>

                <option value="yd2">
                    Square yards (yd²)
                </option>

            </select>

        </div>


        <div class="stage14-setting">

            <label class="stage14-checkbox">

                <input
                    type="checkbox"
                    id="stage14-snap"
                    checked>

                <span>
                    Enable Snapping
                </span>

            </label>

        </div>


        <div class="stage14-setting">

            <label>
                Snap Tolerance:
                <span id="stage14-tolerance-value">
                    18
                </span>
                px
            </label>

            <input
                type="range"
                id="stage14-tolerance"
                min="5"
                max="50"
                value="18">

        </div>

        <div id="stage14-help">

            <b>How to use</b>

            <br>

            1. Click <b>Measure</b>

            <br>

            2. Click points on the map

            <br>

            3. Each segment shows its length

            <br>

            4. From 3 points, area appears

            <br>

            5. Use <b>Undo</b> if needed

            <br>

            6. Click <b>Finish</b> when complete

        </div>

    `;


    document.body.appendChild(
        stage14Panel
    );


    // =========================================================
    // CSS
    // =========================================================

    const stage14CSS =
        document.createElement(
            "style"
        );


    stage14CSS.textContent = `

        /* ================================================
           STAGE 14 CONTROL BUTTON
        ================================================ */

        #stage14-control {

            position:
                absolute;

            top:
                150px;

            right:
                10px;

            z-index:
                18000;

        }


        #stage14-measure-button {

            width:
                44px;

            height:
                44px;

            border:
                1px solid #aaa;

            border-radius:
                6px;

            background:
                #ffffff;

            font-size:
                20px;

            cursor:
                pointer;

            box-shadow:
                0 2px 6px
                rgba(0,0,0,0.3);

        }


        #stage14-measure-button:hover {

            background:
                #eeeeee;

        }


        #stage14-measure-button.active {

            background:
                #1565c0;

            color:
                #ffffff;

        }


        /* ================================================
           PANEL
        ================================================ */

        #stage14-panel {

            position:
                absolute;

            top:
                205px;

            right:
                10px;

            width:
                280px;

            max-width:
                calc(100vw - 30px);

            background:
                #ffffff;

            border:
                1px solid #999;

            border-radius:
                10px;

            box-shadow:
                0 4px 18px
                rgba(0,0,0,0.3);

            padding:
                12px;

            z-index:
                18000;

            font-family:
                Arial, sans-serif;

            font-size:
                13px;

            display:
                none;

            box-sizing:
                border-box;

        }


        /* ================================================
           TITLE
        ================================================ */

        #stage14-title {

            font-size:
                17px;

            font-weight:
                bold;

            margin-bottom:
                8px;

            border-bottom:
                1px solid #ddd;

            padding-bottom:
                8px;

        }


        /* ================================================
           STATUS
        ================================================ */

        #stage14-status {

            background:
                #f3f6f9;

            border:
                1px solid #ddd;

            border-radius:
                6px;

            padding:
                8px;

            margin-bottom:
                10px;

            line-height:
                1.4;

        }


        /* ================================================
           ROW
        ================================================ */

        .stage14-row {

            display:
                flex;

            gap:
                7px;

            margin-bottom:
                8px;

        }


        .stage14-row button {

            flex:
                1;

            padding:
                8px 5px;

            border:
                1px solid #aaa;

            border-radius:
                5px;

            background:
                #f7f7f7;

            cursor:
                pointer;

            font-size:
                12px;

        }


        .stage14-row button:hover {

            background:
                #e5e5e5;

        }


        /* ================================================
           SETTINGS
        ================================================ */

        .stage14-setting {

            margin-top:
                9px;

        }


        .stage14-setting label {

            display:
                block;

            font-weight:
                bold;

            margin-bottom:
                4px;

        }


        .stage14-setting select {

            width:
                100%;

            padding:
                7px;

            border:
                1px solid #aaa;

            border-radius:
                5px;

            background:
                #ffffff;

            box-sizing:
                border-box;

        }


        .stage14-setting input[type="range"] {

            width:
                100%;

        }


        .stage14-checkbox {

            display:
                flex !important;

            align-items:
                center;

            gap:
                7px;

            font-weight:
                normal !important;

        }


        .stage14-checkbox input {

            width:
                18px;

            height:
                18px;

        }


        /* ================================================
           HELP
        ================================================ */

        #stage14-help {

            margin-top:
                10px;

            padding:
                8px;

            background:
                #fafafa;

            border:
                1px solid #ddd;

            border-radius:
                6px;

            line-height:
                1.5;

            color:
                #555;

        }


        /* ================================================
           MOBILE
        ================================================ */

        @media (max-width: 600px) {

            #stage14-control {

                top:
                    120px;

                right:
                    8px;

            }


            #stage14-measure-button {

                width:
                    46px;

                height:
                    46px;

                font-size:
                    21px;

            }


            #stage14-panel {

                top:
                    175px;

                right:
                    8px;

                width:
                    calc(100vw - 16px);

                max-width:
                    340px;

            }

        }

    `;


    document.head.appendChild(
        stage14CSS
    );


    // =========================================================
    // BUTTON REFERENCES
    // =========================================================

    const stage14StartButton =
        document.getElementById(
            "stage14-start"
        );


    const stage14UndoButton =
        document.getElementById(
            "stage14-undo"
        );


    const stage14FinishButton =
        document.getElementById(
            "stage14-finish"
        );


    const stage14ClearButton =
        document.getElementById(
            "stage14-clear"
        );


    const stage14LengthUnitSelect =
        document.getElementById(
            "stage14-length-unit"
        );


    const stage14AreaUnitSelect =
        document.getElementById(
            "stage14-area-unit"
        );


    const stage14SnapCheckbox =
        document.getElementById(
            "stage14-snap"
        );


    const stage14ToleranceSlider =
        document.getElementById(
            "stage14-tolerance"
        );


    const stage14ToleranceValue =
        document.getElementById(
            "stage14-tolerance-value"
        );


    // =========================================================
    // MAIN BUTTON
    // =========================================================

    stage14MeasureButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            if (
                stage14Panel.style.display ===
                "block"
            ) {

                stage14Panel.style.display =
                    "none";

            } else {

                stage14Panel.style.display =
                    "block";

            }

        }
    );


    // =========================================================
    // START BUTTON
    // =========================================================

    stage14StartButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            if (
                stage14Active
            ) {

                stage14Stop();

            } else {

                stage14Start();

            }

        }
    );


    // =========================================================
    // UNDO BUTTON
    // =========================================================

    stage14UndoButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            stage14Undo();

        }
    );


    // =========================================================
    // FINISH BUTTON
    // =========================================================

    stage14FinishButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            if (
                stage14Active
            ) {

                stage14Stop();

            }

        }
    );


    // =========================================================
    // CLEAR BUTTON
    // =========================================================

    stage14ClearButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            stage14Clear();

        }
    );


    // =========================================================
    // LENGTH UNIT CHANGE
    // =========================================================

    stage14LengthUnitSelect.addEventListener(
        "change",
        function () {

            stage14LengthUnit =
                this.value;


            stage14Redraw();

            stage14UpdateStatus();

        }
    );


    // =========================================================
    // AREA UNIT CHANGE
    // =========================================================

    stage14AreaUnitSelect.addEventListener(
        "change",
        function () {

            stage14AreaUnit =
                this.value;


            stage14Redraw();

            stage14UpdateStatus();

        }
    );


    // =========================================================
    // SNAP ENABLE / DISABLE
    // =========================================================

    stage14SnapCheckbox.addEventListener(
        "change",
        function () {

            stage14SnapEnabled =
                this.checked;


            stage14SnapSource.clear();


            if (
                !stage14SnapEnabled
            ) {

                stage14CurrentSnapType =
                    null;

            }

        }
    );


    // =========================================================
    // SNAP TOLERANCE
    // =========================================================

    stage14ToleranceSlider.addEventListener(
        "input",
        function () {

            stage14SnapTolerance =
                Number(
                    this.value
                );


            stage14ToleranceValue.textContent =
                this.value;

        }
    );


    // =========================================================
    // ESC KEY
    // =========================================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !==
                "Escape"
            ) {

                return;

            }


            if (
                stage14Active
            ) {

                stage14Stop();

            }


            stage14Panel.style.display =
                "none";

        }
    );


    // =========================================================
    // INITIAL STATE
    // =========================================================

    stage14Panel.style.display =
        "none";


    stage14UpdateStatus();


    // =========================================================
    // FINISHED
    // =========================================================

    console.log(
        "📐 Stage 14 Advanced Measure Tool READY."
    );

})();

























































// ============================================================
// 🧭 STAGE 15 — FUNCTIONAL NORTH SYMBOL
// OpenLayers
// ============================================================

(function () {

    // --------------------------------------------------------
    // Create North Symbol element
    // --------------------------------------------------------

    const northElement = document.createElement("div");

    northElement.className = "stage15-north-symbol";

    northElement.title = "Reset map to North";

    northElement.innerHTML = `
        <div class="stage15-north-arrow">

            <div class="stage15-north-letter">
                N
            </div>

            <div class="stage15-arrow-head"></div>

            <div class="stage15-arrow-line"></div>

        </div>
    `;


    // --------------------------------------------------------
    // Make it behave like a button
    // --------------------------------------------------------

    northElement.setAttribute(
        "role",
        "button"
    );

    northElement.setAttribute(
        "aria-label",
        "Reset map orientation to North"
    );

    northElement.setAttribute(
        "tabindex",
        "0"
    );


    // --------------------------------------------------------
    // Create OpenLayers control
    // --------------------------------------------------------

    const northControl = new ol.control.Control({
        element: northElement
    });


    // --------------------------------------------------------
    // Add to map
    // --------------------------------------------------------

    map.addControl(northControl);


    // --------------------------------------------------------
    // Reset map rotation
    // --------------------------------------------------------

    function resetNorth() {

        if (!map || !map.getView()) {
            return;
        }

        map.getView().animate({
            rotation: 0,
            duration: 300
        });

    }


    // --------------------------------------------------------
    // Click
    // --------------------------------------------------------

    northElement.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            resetNorth();

        }
    );


    // --------------------------------------------------------
    // Keyboard
    // --------------------------------------------------------

    northElement.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                resetNorth();

            }

        }
    );


    // --------------------------------------------------------
    // Pressed effect
    // --------------------------------------------------------

    northElement.addEventListener(
        "mousedown",
        function () {

            northElement.classList.add(
                "stage15-north-active"
            );

        }
    );


    northElement.addEventListener(
        "mouseup",
        function () {

            northElement.classList.remove(
                "stage15-north-active"
            );

        }
    );


    northElement.addEventListener(
        "mouseleave",
        function () {

            northElement.classList.remove(
                "stage15-north-active"
            );

        }
    );


    // --------------------------------------------------------
    // Touch effect
    // --------------------------------------------------------

    northElement.addEventListener(
        "touchstart",
        function () {

            northElement.classList.add(
                "stage15-north-active"
            );

        },
        {
            passive: true
        }
    );


    northElement.addEventListener(
        "touchend",
        function () {

            northElement.classList.remove(
                "stage15-north-active"
            );

        },
        {
            passive: true
        }
    );


    // ========================================================
    // 🧭 UPDATE NORTH SYMBOL
    // ========================================================

    function updateNorthSymbol() {

        if (!map || !map.getView()) {
            return;
        }

        const rotation =
            map.getView().getRotation() || 0;


        // ====================================================
        // IMPORTANT:
        // Use POSITIVE rotation.
        //
        // This makes the North symbol rotate in the
        // SAME direction as the map.
        // ====================================================

        northElement.style.transform =
            "rotate(" + rotation + "rad)";

    }


    // --------------------------------------------------------
    // Listen for map rotation
    // --------------------------------------------------------

    map.getView().on(
        "change:rotation",
        updateNorthSymbol
    );


    // --------------------------------------------------------
    // Initial update
    // --------------------------------------------------------

    updateNorthSymbol();


    // --------------------------------------------------------
    // Global access
    // --------------------------------------------------------

    window.stage15NorthControl =
        northControl;

    window.stage15NorthElement =
        northElement;

    window.stage15ResetNorth =
        resetNorth;


    // --------------------------------------------------------
    // Console
    // --------------------------------------------------------

    console.log(
        "🧭 Stage 15 Functional North Symbol loaded."
    );

})();























































// ============================================================
// 📍 STAGE 16 — UTM 43N + LAT/LON COORDINATE READOUT
// ============================================================
// Map CRS      : EPSG:3857
// UTM 43N      : EPSG:32643
// Latitude/Lon  : EPSG:4326
// ============================================================

(function () {

    "use strict";

    // --------------------------------------------------------
    // REMOVE EXISTING COORDINATE READOUT IF ANY
    // --------------------------------------------------------

    const oldReadout =
        document.querySelector(".coordinates-readout");

    if (oldReadout) {
        oldReadout.remove();
    }


    // --------------------------------------------------------
    // CREATE COORDINATE READOUT
    // --------------------------------------------------------

    const readout = document.createElement("div");

    readout.className = "coordinates-readout";

    readout.innerHTML = `

        <!-- UTM 43N -->

        <div class="coord">

            <div class="coord-label">
                UTM 43N
            </div>

            <div
                id="stage16-utm"
                class="coord-value utm">
                E: —<br>
                N: —
            </div>

        </div>


        <!-- LAT / LON -->

        <div class="coord">

            <div class="coord-label">
                LAT / LON
            </div>

            <div
                id="stage16-latlon"
                class="coord-value latlon">
                —<br>
                —
            </div>

        </div>

    `;


    // --------------------------------------------------------
    // ADD TO BODY
    // --------------------------------------------------------

    document.body.appendChild(readout);


    // --------------------------------------------------------
    // GET ELEMENTS
    // --------------------------------------------------------

    const utmElement =
        document.getElementById("stage16-utm");

    const latLonElement =
        document.getElementById("stage16-latlon");


    // --------------------------------------------------------
    // UPDATE COORDINATES
    // --------------------------------------------------------

    function updateCoordinates(coordinate) {

        if (
            !coordinate ||
            coordinate.length < 2
        ) {
            return;
        }


        try {

            // =================================================
            // EPSG:3857 → EPSG:32643
            // =================================================

            const utm =
                ol.proj.transform(
                    coordinate,
                    "EPSG:3857",
                    "EPSG:32643"
                );


            // =================================================
            // EPSG:3857 → EPSG:4326
            // =================================================

            const lonLat =
                ol.proj.transform(
                    coordinate,
                    "EPSG:3857",
                    "EPSG:4326"
                );


            // =================================================
            // UTM
            // =================================================

            const easting =
                utm[0];

            const northing =
                utm[1];


            // =================================================
            // LAT / LON
            // =================================================

            const longitude =
                lonLat[0];

            const latitude =
                lonLat[1];


            // =================================================
            // DISPLAY
            // =================================================

            utmElement.innerHTML =
                "E: " +
                easting.toFixed(2) +
                "<br>N: " +
                northing.toFixed(2);


            latLonElement.innerHTML =
                latitude.toFixed(6) +
                "°<br>" +
                longitude.toFixed(6) +
                "°";


            // =================================================
            // SAVE LAST COORDINATE
            // =================================================

            window.stage16LastCoordinate = {

                utm43n: {
                    easting: easting,
                    northing: northing
                },

                latlon: {
                    latitude: latitude,
                    longitude: longitude
                }

            };

        }

        catch (error) {

            console.error(
                "Stage 16 coordinate error:",
                error
            );

        }

    }


    // ========================================================
    // MOUSE
    // ========================================================

    map.on(
        "pointermove",
        function (event) {

            updateCoordinates(
                event.coordinate
            );

        }
    );


    // ========================================================
    // TOUCH
    // ========================================================

    map.on(
        "pointerdown",
        function (event) {

            updateCoordinates(
                event.coordinate
            );

        }
    );


    // ========================================================
    // MOBILE DRAG
    // ========================================================

    map.on(
        "pointerdrag",
        function (event) {

            updateCoordinates(
                event.coordinate
            );

        }
    );


    // ========================================================
    // INITIALIZE USING MAP CENTER
    // ========================================================

    updateCoordinates(
        map.getView().getCenter()
    );


    // ========================================================
    // GLOBAL ACCESS
    // ========================================================

    window.stage16CoordinateElement =
        readout;

    window.stage16UpdateCoordinates =
        updateCoordinates;


    console.log(
        "✅ Stage 16 — Coordinate readout loaded"
    );

})();











































// ============================================================
// 📂 KML / KMZ IMPORT TOOL
// ============================================================
// Separate JavaScript for QGIS2Web + OpenLayers
//
// Features:
// ✔ Import KML
// ✔ Import KMZ
// ✔ Add imported data as OpenLayers vector layer
// ✔ Add imported layer to existing layer manager
// ✔ Zoom to imported data
// ✔ Checkbox visibility
// ✔ Move imported layer ↑ / ↓
// ✔ Remove imported layer
// ✔ Automatic layer name from filename
// ✔ Default styling
// ✔ Supports KML styles when available
// ✔ Works with local KML/KMZ files
//
// IMPORTANT:
// This file is designed to work with your existing
// vectorLayers / addOverlayToSwitcher() / rebuildLayerManager()
// functions.
// ============================================================


// ============================================================
// ⚙️ CONFIGURATION
// ============================================================

const KML_KMZ_IMPORT_CONFIG = {

    buttonText: "Import KML / KMZ",

    buttonTitle: "Import KML or KMZ file",

    // Maximum number of features allowed
    // Change to 0 for unlimited
    maxFeatures: 0

};


// ============================================================
// 📦 LOAD JSZIP
// ============================================================
// KMZ is a ZIP file containing KML.
//
// We load JSZip automatically from CDN only when a KMZ
// file is selected.
// ============================================================

let jsZipLoadingPromise = null;


function loadJSZip() {

    // Already available
    if (typeof JSZip !== "undefined") {

        return Promise.resolve();

    }


    // Already loading
    if (jsZipLoadingPromise) {

        return jsZipLoadingPromise;

    }


    jsZipLoadingPromise = new Promise(
        function (resolve, reject) {

            const script =
                document.createElement("script");

            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";

            script.onload =
                function () {

                    if (
                        typeof JSZip !==
                        "undefined"
                    ) {

                        resolve();

                    }

                    else {

                        reject(
                            new Error(
                                "JSZip loaded but is unavailable."
                            )
                        );

                    }

                };


            script.onerror =
                function () {

                    reject(
                        new Error(
                            "Could not load JSZip."
                        )
                    );

                };


            document.head.appendChild(
                script
            );

        }
    );


    return jsZipLoadingPromise;

}


// ============================================================
// 🧹 CLEAN FILE NAME
// ============================================================

function cleanImportedLayerName(
    fileName
) {

    if (!fileName) {

        return "Imported Layer";

    }


    return fileName
        .replace(
            /\.(kml|kmz)$/i,
            ""
        )
        .replace(
            /[_-]+/g,
            " "
        )
        .trim() ||

        "Imported Layer";

}


// ============================================================
// 🎨 DEFAULT STYLE
// ============================================================

function getImportedKMLStyle() {

    return new ol.style.Style({

        fill:
            new ol.style.Fill({

                color:
                    "rgba(255, 165, 0, 0.20)"

            }),


        stroke:
            new ol.style.Stroke({

                color:
                    "#ff6600",

                width:
                    2

            }),


        image:
            new ol.style.Circle({

                radius:
                    6,

                fill:
                    new ol.style.Fill({

                        color:
                            "#ff6600"

                    }),

                stroke:
                    new ol.style.Stroke({

                        color:
                            "#ffffff",

                        width:
                            2

                    })

            })

    });

}


// ============================================================
// 📍 CREATE VECTOR LAYER
// ============================================================

function createImportedKMLLayer(
    features,
    layerName,
    fileName
) {

    if (
        !features ||
        features.length === 0
    ) {

        alert(
            "No features were found in the KML/KMZ file."
        );

        return null;

    }


    // --------------------------------------------------------
    // MAX FEATURE CHECK
    // --------------------------------------------------------

    if (
        KML_KMZ_IMPORT_CONFIG.maxFeatures > 0 &&

        features.length >
        KML_KMZ_IMPORT_CONFIG.maxFeatures
    ) {

        alert(
            "The file contains " +
            features.length +
            " features.\n\n" +
            "Maximum allowed: " +
            KML_KMZ_IMPORT_CONFIG.maxFeatures
        );

        return null;

    }


    // --------------------------------------------------------
    // VECTOR SOURCE
    // --------------------------------------------------------

    const source =
        new ol.source.Vector({

            features:
                features

        });


    // --------------------------------------------------------
    // VECTOR LAYER
    // --------------------------------------------------------

    const layer =
        new ol.layer.Vector({

            source:
                source,

            visible:
                true,

            style:
                getImportedKMLStyle()

        });


    // --------------------------------------------------------
    // LAYER INFORMATION
    // --------------------------------------------------------

    layer.set(
        "title",
        layerName
    );


    layer.set(
        "name",
        layerName
    );


    layer.set(
        "file",
        fileName
    );


    layer.set(
        "kmlImported",
        true
    );


    layer.set(
        "dynamicSearchHighlight",
        false
    );


    // --------------------------------------------------------
    // ADD TO GLOBAL VECTOR LAYERS ARRAY
    // --------------------------------------------------------

    if (
        typeof vectorLayers !==
        "undefined" &&

        Array.isArray(vectorLayers)
    ) {

        vectorLayers.push(
            layer
        );

    }


    // --------------------------------------------------------
    // ADD TO MAP
    // --------------------------------------------------------

    if (
        typeof map !==
        "undefined" &&
        map
    ) {

        map.addLayer(
            layer
        );

    }


    // --------------------------------------------------------
    // ADD TO EXISTING LAYER MANAGER
    // --------------------------------------------------------

    if (
        typeof addOverlayToSwitcher ===
        "function"
    ) {

        addOverlayToSwitcher(
            layer
        );

    }


    // --------------------------------------------------------
    // ZOOM TO IMPORTED DATA
    // --------------------------------------------------------

    zoomToImportedLayer(
        layer
    );


    console.log(
        "KML/KMZ imported:",
        layerName,
        "Features:",
        features.length
    );


    return layer;

}


// ============================================================
// 🔍 ZOOM TO IMPORTED LAYER
// ============================================================

function zoomToImportedLayer(
    layer
) {

    if (
        !layer ||
        !map
    ) {

        return;

    }


    const source =
        layer.getSource();


    if (!source) {

        return;

    }


    const extent =
        source.getExtent();


    if (
        !extent ||
        extent[0] === Infinity ||
        extent[1] === Infinity ||
        extent[2] === -Infinity ||
        extent[3] === -Infinity
    ) {

        return;

    }


    map.getView().fit(
        extent,
        {

            padding: [
                80,
                80,
                80,
                80
            ],

            duration:
                800,

            maxZoom:
                19

        }
    );

}


// ============================================================
// 📄 READ KML
// ============================================================

function readKMLText(
    kmlText,
    layerName,
    fileName
) {

    try {

        const format =
            new ol.format.KML({

                extractStyles:
                    true,

                showPointNames:
                    false

            });


        const features =
            format.readFeatures(
                kmlText,
                {

                    dataProjection:
                        "EPSG:4326",

                    featureProjection:
                        MAP_PROJECTION

                }
            );


        // ----------------------------------------------------
        // CREATE LAYER
        // ----------------------------------------------------

        return createImportedKMLLayer(
            features,
            layerName,
            fileName
        );

    }

    catch (error) {

        console.error(
            "KML parsing error:",
            error
        );


        alert(
            "Could not read the KML file.\n\n" +
            error.message
        );


        return null;

    }

}


// ============================================================
// 📄 READ KML FILE
// ============================================================

function readKMLFile(
    file
) {

    const reader =
        new FileReader();


    reader.onload =
        function (event) {

            const kmlText =
                event.target.result;


            const layerName =
                cleanImportedLayerName(
                    file.name
                );


            readKMLText(
                kmlText,
                layerName,
                file.name
            );

        };


    reader.onerror =
        function () {

            alert(
                "Could not read the KML file."
            );

        };


    reader.readAsText(
        file
    );

}


// ============================================================
// 📦 READ KMZ FILE
// ============================================================

async function readKMZFile(
    file
) {

    try {

        // ----------------------------------------------------
        // LOAD JSZIP
        // ----------------------------------------------------

        await loadJSZip();


        // ----------------------------------------------------
        // READ ZIP
        // ----------------------------------------------------

        const zip =
            await JSZip.loadAsync(
                file
            );


        // ----------------------------------------------------
        // FIND KML FILE
        // ----------------------------------------------------

        let kmlFile =
            null;


        // First try doc.kml
        if (
            zip.files[
                "doc.kml"
            ]
        ) {

            kmlFile =
                zip.files[
                    "doc.kml"
                ];

        }


        // ----------------------------------------------------
        // IF DOC.KML NOT FOUND
        // SEARCH FOR ANY KML
        // ----------------------------------------------------

        if (!kmlFile) {

            const names =
                Object.keys(
                    zip.files
                );


            for (
                let i = 0;
                i < names.length;
                i++
            ) {

                const name =
                    names[i];


                if (
                    name
                        .toLowerCase()
                        .endsWith(
                            ".kml"
                        )
                ) {

                    kmlFile =
                        zip.files[
                            name
                        ];

                    break;

                }

            }

        }


        // ----------------------------------------------------
        // NO KML FOUND
        // ----------------------------------------------------

        if (!kmlFile) {

            alert(
                "The KMZ file does not contain a KML file."
            );

            return;

        }


        // ----------------------------------------------------
        // READ KML TEXT
        // ----------------------------------------------------

        const kmlText =
            await kmlFile.async(
                "text"
            );


        const layerName =
            cleanImportedLayerName(
                file.name
            );


        // ----------------------------------------------------
        // PARSE KML
        // ----------------------------------------------------

        readKMLText(
            kmlText,
            layerName,
            file.name
        );

    }

    catch (error) {

        console.error(
            "KMZ parsing error:",
            error
        );


        alert(
            "Could not read the KMZ file.\n\n" +
            error.message
        );

    }

}


// ============================================================
// 📂 IMPORT FILE
// ============================================================

function importKMLKMZFile(
    file
) {

    if (!file) {

        return;

    }


    const fileName =
        file.name.toLowerCase();


    // --------------------------------------------------------
    // KML
    // --------------------------------------------------------

    if (
        fileName.endsWith(
            ".kml"
        )
    ) {

        readKMLFile(
            file
        );

        return;

    }


    // --------------------------------------------------------
    // KMZ
    // --------------------------------------------------------

    if (
        fileName.endsWith(
            ".kmz"
        )
    ) {

        readKMZFile(
            file
        );

        return;

    }


    alert(
        "Please select a KML or KMZ file."
    );

}


// ============================================================
// 📂 CREATE FILE INPUT
// ============================================================

function createKMLKMZFileInput() {

    const input =
        document.createElement(
            "input"
        );


    input.type =
        "file";


    input.accept =
        ".kml,.kmz,application/vnd.google-earth.kml+xml,application/vnd.google-earth.kmz";


    input.style.display =
        "none";


    input.addEventListener(
        "change",
        function () {

            if (
                input.files &&
                input.files.length > 0
            ) {

                importKMLKMZFile(
                    input.files[0]
                );

            }


            // Allow selecting the same file again
            input.value = "";

        }
    );


    document.body.appendChild(
        input
    );


    return input;

}


// ============================================================
// 🔘 CREATE IMPORT BUTTON
// ============================================================

function createKMLKMZImportButton() {

    // --------------------------------------------------------
    // FILE INPUT
    // --------------------------------------------------------

    const fileInput =
        createKMLKMZFileInput();


    // --------------------------------------------------------
    // BUTTON
    // --------------------------------------------------------

    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";


    button.className =
        "kml-kmz-import-button";


    button.title =
        KML_KMZ_IMPORT_CONFIG.buttonTitle;


    button.innerHTML =
        "📂";


    // --------------------------------------------------------
    // CLICK
    // --------------------------------------------------------

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            fileInput.click();

        }
    );


    // --------------------------------------------------------
    // ADD TO MAP
    // --------------------------------------------------------

    document.body.appendChild(
        button
    );


    return button;

}


// ============================================================
// 🎨 CSS
// ============================================================

function addKMLKMZImportCSS() {

    if (
        document.getElementById(
            "kml-kmz-import-css"
        )
    ) {

        return;

    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "kml-kmz-import-css";


    style.textContent = `

        /* ====================================================
           KML / KMZ IMPORT BUTTON
           ==================================================== */

        .kml-kmz-import-button {

            position: fixed;

            right: 15px;

            top: 150px;

            width: 42px;

            height: 42px;

            border: none;

            border-radius: 8px;

            background: rgba(255,255,255,0.95);

            box-shadow:
                0 2px 8px rgba(0,0,0,0.30);

            cursor: pointer;

            font-size: 20px;

            z-index: 10000;

            display: flex;

            align-items: center;

            justify-content: center;

            transition:
                transform 0.15s ease,
                background 0.15s ease;

        }


        .kml-kmz-import-button:hover {

            transform:
                scale(1.05);

            background:
                #ffffff;

        }


        .kml-kmz-import-button:active {

            transform:
                scale(0.95);

        }


        /* ====================================================
           MOBILE
           ==================================================== */

        @media (max-width: 600px) {

            .kml-kmz-import-button {

                right: 12px;

                top: 145px;

                width: 40px;

                height: 40px;

                font-size: 19px;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}


// ============================================================
// 🗑️ OPTIONAL REMOVE SUPPORT
// ============================================================
// This function can be called by your layer manager if you
// later want a delete button for imported KML/KMZ layers.
// ============================================================

function removeImportedKMLLayer(
    layer
) {

    if (!layer) {

        return;

    }


    // Only remove layers imported by this tool
    if (
        layer.get(
            "kmlImported"
        ) !== true
    ) {

        return;

    }


    // --------------------------------------------------------
    // REMOVE FROM MAP
    // --------------------------------------------------------

    if (
        typeof map !==
        "undefined" &&
        map
    ) {

        map.removeLayer(
            layer
        );

    }


    // --------------------------------------------------------
    // REMOVE FROM VECTOR ARRAY
    // --------------------------------------------------------

    if (
        typeof vectorLayers !==
        "undefined" &&

        Array.isArray(vectorLayers)
    ) {

        const index =
            vectorLayers.indexOf(
                layer
            );


        if (index !== -1) {

            vectorLayers.splice(
                index,
                1
            );

        }

    }


    // --------------------------------------------------------
    // REBUILD MANAGER
    // --------------------------------------------------------

    if (
        typeof rebuildLayerManager ===
        "function"
    ) {

        rebuildLayerManager();

    }

}


// ============================================================
// 🚀 INITIALIZE
// ============================================================

(function initializeKMLKMZImport() {

    function start() {

        addKMLKMZImportCSS();

        createKMLKMZImportButton();

        console.log(
            "📂 KML/KMZ Import Tool loaded."
        );

    }


    // --------------------------------------------------------
    // WAIT FOR DOM
    // --------------------------------------------------------

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            start
        );

    }

    else {

        start();

    }

})();
