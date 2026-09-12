// ============================================================
// 🎨 DYNAMIC LAYER STYLE EDITOR
// QGIS2Web + OpenLayers
// ============================================================

(function () {

    // --------------------------------------------------------
    // CREATE MAIN CONTROL
    // --------------------------------------------------------

    var styleElement = document.createElement('div');

    styleElement.className =
        'ol-unselectable ol-control dynamic-style-control';

    var styleButton = document.createElement('button');

    styleButton.type = 'button';
    styleButton.innerHTML = '🎨';
    styleButton.title = 'Layer Style Editor';

    styleElement.appendChild(styleButton);


    // --------------------------------------------------------
    // CREATE STYLE PANEL
    // --------------------------------------------------------

    var stylePanel = document.createElement('div');

    stylePanel.className = 'dynamic-style-panel';

    stylePanel.innerHTML = `

        <div class="dynamic-style-title">
            🎨 Layer Style Editor
        </div>

        <div class="dynamic-style-row">
            <label>Layer</label>
            <select id="ds-layer"></select>
        </div>

        <hr>

        <div class="dynamic-style-section">
            Polygon / Line
        </div>

        <div class="dynamic-style-row">
            <label>Fill Color</label>
            <input type="color"
                   id="ds-fill-color"
                   value="#ffffff">
        </div>

        <div class="dynamic-style-row">
            <label>Fill Opacity</label>
            <input type="range"
                   id="ds-fill-opacity"
                   min="0"
                   max="1"
                   step="0.05"
                   value="0.20">

            <span id="ds-opacity-value">0.20</span>
        </div>

        <div class="dynamic-style-row">
            <label>Border Color</label>
            <input type="color"
                   id="ds-stroke-color"
                   value="#000000">
        </div>

        <div class="dynamic-style-row">
            <label>Border Width</label>
            <input type="number"
                   id="ds-stroke-width"
                   min="0"
                   max="20"
                   step="0.5"
                   value="1">
        </div>

        <hr>

        <div class="dynamic-style-section">
            Label
        </div>

        <div class="dynamic-style-row">
            <label>Show Label</label>
            <input type="checkbox"
                   id="ds-label-enabled">
        </div>

        <div class="dynamic-style-row">
            <label>Label Field</label>
            <select id="ds-label-field"></select>
        </div>

        <div class="dynamic-style-row">
            <label>Label Color</label>
            <input type="color"
                   id="ds-label-color"
                   value="#000000">
        </div>

        <div class="dynamic-style-row">
            <label>Label Size</label>
            <input type="number"
                   id="ds-label-size"
                   min="6"
                   max="50"
                   value="13">
        </div>

        <div class="dynamic-style-row">
            <label>Label Rotation</label>
            <input type="number"
                   id="ds-label-rotation"
                   min="-180"
                   max="180"
                   value="0">
        </div>

        <div class="dynamic-style-buttons">

            <button type="button"
                    id="ds-apply">
                Apply
            </button>

            <button type="button"
                    id="ds-reset">
                Reset
            </button>

        </div>
    `;

    styleElement.appendChild(stylePanel);


    // --------------------------------------------------------
    // ADD CSS
    // --------------------------------------------------------

    var styleCSS = document.createElement('style');

    styleCSS.innerHTML = `

        .dynamic-style-control {
            position: relative !important;
            z-index: 10000 !important;
        }

        .dynamic-style-control > button {

            width: 35px !important;
            height: 35px !important;

            font-size: 18px !important;

            cursor: pointer !important;

            pointer-events: auto !important;

        }

        .dynamic-style-panel {

            position: absolute !important;

            right: 40px !important;
            top: 0px !important;

            width: 280px !important;

            max-height: 80vh !important;

            overflow-y: auto !important;

            background: #ffffff !important;

            border: 1px solid #888 !important;

            border-radius: 6px !important;

            padding: 12px !important;

            box-sizing: border-box !important;

            box-shadow:
                0 3px 15px rgba(0,0,0,0.35) !important;

            z-index: 10001 !important;

            font-family: Arial, sans-serif !important;

            font-size: 13px !important;

            color: #222 !important;

        }

        .dynamic-style-title {

            font-size: 16px !important;

            font-weight: bold !important;

            margin-bottom: 12px !important;

            padding-bottom: 8px !important;

            border-bottom: 1px solid #ddd !important;

        }

        .dynamic-style-section {

            font-weight: bold !important;

            margin:
                6px 0 10px 0 !important;

        }

        .dynamic-style-row {

            display: flex !important;

            align-items: center !important;

            justify-content: space-between !important;

            gap: 8px !important;

            margin-bottom: 9px !important;

        }

        .dynamic-style-row label {

            flex: 1 !important;

        }

        .dynamic-style-row select {

            width: 145px !important;

            max-width: 145px !important;

        }

        .dynamic-style-row input[type="number"] {

            width: 80px !important;

        }

        .dynamic-style-row input[type="color"] {

            width: 45px !important;

            height: 28px !important;

            padding: 1px !important;

        }

        .dynamic-style-row input[type="range"] {

            width: 100px !important;

        }

        .dynamic-style-buttons {

            display: flex !important;

            gap: 8px !important;

            margin-top: 12px !important;

        }

        .dynamic-style-buttons button {

            flex: 1 !important;

            padding: 7px !important;

            cursor: pointer !important;

            border: 1px solid #aaa !important;

            border-radius: 4px !important;

            background: #f5f5f5 !important;

        }

        .dynamic-style-buttons button:hover {

            background: #ddd !important;

        }

        .dynamic-style-panel hr {

            border: 0 !important;

            border-top: 1px solid #ddd !important;

            margin: 10px 0 !important;

        }

    `;

    document.head.appendChild(styleCSS);


    // --------------------------------------------------------
    // OPENLAYERS CONTROL
    // --------------------------------------------------------

    var styleControl =
        new ol.control.Control({
            element: styleElement
        });

    map.addControl(styleControl);


    // --------------------------------------------------------
    // REFERENCES
    // --------------------------------------------------------

    var layerSelect =
        stylePanel.querySelector('#ds-layer');

    var fillColor =
        stylePanel.querySelector('#ds-fill-color');

    var fillOpacity =
        stylePanel.querySelector('#ds-fill-opacity');

    var opacityValue =
        stylePanel.querySelector('#ds-opacity-value');

    var strokeColor =
        stylePanel.querySelector('#ds-stroke-color');

    var strokeWidth =
        stylePanel.querySelector('#ds-stroke-width');

    var labelEnabled =
        stylePanel.querySelector('#ds-label-enabled');

    var labelField =
        stylePanel.querySelector('#ds-label-field');

    var labelColor =
        stylePanel.querySelector('#ds-label-color');

    var labelSize =
        stylePanel.querySelector('#ds-label-size');

    var labelRotation =
        stylePanel.querySelector('#ds-label-rotation');

    var applyButton =
        stylePanel.querySelector('#ds-apply');

    var resetButton =
        stylePanel.querySelector('#ds-reset');


    var selectedLayer = null;


    // --------------------------------------------------------
    // GET ALL ACTUAL VECTOR LAYERS
    // --------------------------------------------------------

    function getVectorLayers() {

        var result = [];

        function scanLayers(collection) {

            collection.forEach(function(layer) {

                // Check groups recursively
                if (layer instanceof ol.layer.Group) {

                    scanLayers(layer.getLayers());

                    return;
                }

                // Only vector layers
                if (!(layer instanceof ol.layer.Vector)) {
                    return;
                }

                // Don't include temporary QGIS2Web layers
                if (layer === featureOverlay) {
                    return;
                }

                if (
                    typeof measureLayer !== 'undefined' &&
                    layer === measureLayer
                ) {
                    return;
                }

                if (
                    typeof geolocateOverlay !== 'undefined' &&
                    layer === geolocateOverlay
                ) {
                    return;
                }

                var source =
                    layer.getSource();

                if (
                    source &&
                    source instanceof ol.source.Vector
                ) {

                    result.push(layer);

                }

            });

        }

        scanLayers(map.getLayers());

        return result;
    }


    // --------------------------------------------------------
    // GET REAL LAYER NAME
    // --------------------------------------------------------

    function getLayerName(layer) {

        return (

            layer.get('popuplayertitle') ||

            layer.get('title') ||

            layer.get('name') ||

            layer.get('layerName') ||

            'Unnamed Layer'

        );

    }


    // --------------------------------------------------------
    // GET FIELDS
    // --------------------------------------------------------

    function getLayerFields(layer) {

        var fields = [];

        var source =
            layer.getSource();

        if (!source) {
            return fields;
        }

        var features =
            source.getFeatures();

        if (!features.length) {
            return fields;
        }

        var fieldSet = {};

        features.forEach(function(feature) {

            feature.getKeys().forEach(function(key) {

                if (
                    key !== 'geometry' &&
                    key !== 'layerObject' &&
                    key !== 'idO'
                ) {

                    fieldSet[key] = true;

                }

            });

        });

        fields =
            Object.keys(fieldSet);

        return fields;
    }


    // --------------------------------------------------------
    // POPULATE LAYER DROPDOWN
    // --------------------------------------------------------

    function populateLayers() {

        layerSelect.innerHTML = '';

        var layers =
            getVectorLayers();

        if (!layers.length) {

            var empty =
                document.createElement('option');

            empty.textContent =
                'No vector layers found';

            layerSelect.appendChild(empty);

            selectedLayer = null;

            return;
        }

        layers.forEach(function(layer, index) {

            var option =
                document.createElement('option');

            option.value = index;

            option.textContent =
                getLayerName(layer);

            layerSelect.appendChild(option);

        });

        selectedLayer =
            layers[0];

        loadLayer(selectedLayer);

    }


    // --------------------------------------------------------
    // POPULATE FIELDS
    // --------------------------------------------------------

    function populateFields(layer) {

        labelField.innerHTML = '';

        var fields =
            getLayerFields(layer);

        if (!fields.length) {

            var option =
                document.createElement('option');

            option.textContent =
                'No fields';

            labelField.appendChild(option);

            return;

        }

        fields.forEach(function(field) {

            var option =
                document.createElement('option');

            option.value = field;

            option.textContent = field;

            labelField.appendChild(option);

        });


        // Prefer Parcel_num
        var parcelField =
            fields.find(function(field) {

                return field.toLowerCase() ===
                    'parcel_num';

            });

        if (parcelField) {

            labelField.value =
                parcelField;

        }

    }


    // --------------------------------------------------------
    // GET FIRST FEATURE STYLE
    // --------------------------------------------------------

    function getCurrentStyle(layer) {

        var source =
            layer.getSource();

        if (!source) {
            return null;
        }

        var features =
            source.getFeatures();

        if (!features.length) {
            return null;
        }

        var feature =
            features[0];

        var style =
            layer.getStyle();

        if (!style) {
            return null;
        }

        if (typeof style === 'function') {

            var styles =
                style(feature, 1);

            if (
                styles &&
                styles.length
            ) {

                return styles[0];

            }

        }

        if (
            style instanceof ol.style.Style
        ) {

            return style;

        }

        if (
            Array.isArray(style) &&
            style.length
        ) {

            return style[0];

        }

        return null;
    }


    // --------------------------------------------------------
    // COLOR CONVERSION
    // --------------------------------------------------------

    function colorToHex(color) {

        if (!color) {
            return '#000000';
        }

        if (
            typeof color !== 'string'
        ) {
            return '#000000';
        }

        if (
            color.charAt(0) === '#'
        ) {

            if (color.length === 4) {

                return '#' +
                    color[1] + color[1] +
                    color[2] + color[2] +
                    color[3] + color[3];

            }

            return color.substring(0, 7);
        }

        var canvas =
            document.createElement('canvas');

        var ctx =
            canvas.getContext('2d');

        ctx.fillStyle = color;

        var converted =
            ctx.fillStyle;

        if (
            converted.charAt(0) === '#'
        ) {

            return converted;

        }

        return '#000000';
    }


    // --------------------------------------------------------
    // LOAD SELECTED LAYER
    // --------------------------------------------------------

    function loadLayer(layer) {

        selectedLayer = layer;

        if (!layer) {
            return;
        }

        populateFields(layer);

        var style =
            getCurrentStyle(layer);


        // Defaults
        var fc = '#ffffff';
        var fo = 0.20;
        var sc = '#000000';
        var sw = 1;


        if (style) {

            var fill =
                style.getFill();

            var stroke =
                style.getStroke();


            // Fill
            if (fill) {

                var color =
                    fill.getColor();

                if (
                    typeof color === 'string'
                ) {

                    if (
                        color.indexOf('rgba') === 0
                    ) {

                        var match =
                            color.match(
                                /rgba\\(([^)]+)\\)/
                            );

                        if (match) {

                            var parts =
                                match[1]
                                .split(',')
                                .map(function(v) {
                                    return parseFloat(v);
                                });

                            if (
                                parts.length >= 3
                            ) {

                                fc =
                                    '#' +
                                    parts[0]
                                        .toString(16)
                                        .padStart(2, '0') +

                                    parts[1]
                                        .toString(16)
                                        .padStart(2, '0') +

                                    parts[2]
                                        .toString(16)
                                        .padStart(2, '0');

                            }

                            if (
                                parts.length >= 4
                            ) {

                                fo =
                                    parts[3];

                            }

                        }

                    } else {

                        fc =
                            colorToHex(color);

                    }

                }

            }


            // Stroke
            if (stroke) {

                var strokeC =
                    stroke.getColor();

                if (
                    typeof strokeC === 'string'
                ) {

                    sc =
                        colorToHex(strokeC);

                }

                sw =
                    stroke.getWidth() || 1;

            }

        }


        fillColor.value = fc;
        fillOpacity.value = fo;

        opacityValue.textContent =
            Number(fo).toFixed(2);

        strokeColor.value = sc;
        strokeWidth.value = sw;


        // ----------------------------------------------------
        // LABEL
        // ----------------------------------------------------

        var labelOn = false;
        var lc = '#000000';
        var ls = 13;
        var lr = 0;

        if (style) {

            var text =
                style.getText();

            if (text) {

                labelOn = true;

                var tf =
                    text.getFill();

                if (tf) {

                    var tc =
                        tf.getColor();

                    if (
                        typeof tc === 'string'
                    ) {

                        lc =
                            colorToHex(tc);

                    }

                }

                var font =
                    text.getFont();

                if (font) {

                    var match =
                        font.match(
                            /([0-9.]+)px/
                        );

                    if (match) {

                        ls =
                            parseFloat(match[1]);

                    }

                }

                lr =
                    text.getRotation() *
                    180 / Math.PI;

            }

        }

        labelEnabled.checked =
            labelOn;

        labelColor.value =
            lc;

        labelSize.value =
            ls;

        labelRotation.value =
            Math.round(lr);

    }


    // --------------------------------------------------------
    // CREATE STYLE
    // --------------------------------------------------------

    function createNewStyle() {

        var fc =
            fillColor.value;

        var opacity =
            parseFloat(
                fillOpacity.value
            );

        var sc =
            strokeColor.value;

        var sw =
            parseFloat(
                strokeWidth.value
            ) || 0;


        var showLabel =
            labelEnabled.checked;

        var field =
            labelField.value;

        var lc =
            labelColor.value;

        var ls =
            parseFloat(
                labelSize.value
            ) || 13;

        var rotation =
            parseFloat(
                labelRotation.value
            ) || 0;


        return function(feature, resolution) {

            var styles = [];


            // ------------------------------------------------
            // FILL
            // ------------------------------------------------

            var r =
                parseInt(
                    fc.substring(1, 3),
                    16
                );

            var g =
                parseInt(
                    fc.substring(3, 5),
                    16
                );

            var b =
                parseInt(
                    fc.substring(5, 7),
                    16
                );


            var fill =
                new ol.style.Fill({

                    color:
                        'rgba(' +
                        r + ',' +
                        g + ',' +
                        b + ',' +
                        opacity +
                        ')'

                });


            // ------------------------------------------------
            // STROKE
            // ------------------------------------------------

            var stroke =
                new ol.style.Stroke({

                    color: sc,

                    width: sw

                });


            // ------------------------------------------------
            // LABEL
            // ------------------------------------------------

            var textStyle = null;

            if (
                showLabel &&
                field
            ) {

                var value =
                    feature.get(field);

                if (
                    value !== null &&
                    value !== undefined &&
                    String(value) !== ''
                ) {

                    textStyle =
                        new ol.style.Text({

                            text:
                                String(value),

                            font:
                                ls +
                                'px "Open Sans", sans-serif',

                            fill:
                                new ol.style.Fill({
                                    color: lc
                                }),

                            stroke:
                                new ol.style.Stroke({

                                    color:
                                        '#ffffff',

                                    width:
                                        3

                                }),

                            rotation:
                                rotation *
                                Math.PI / 180,

                            textAlign:
                                'center',

                            textBaseline:
                                'middle',

                            placement:
                                'point',

                            overflow:
                                false

                        });

                }

            }


            styles.push(

                new ol.style.Style({

                    fill: fill,

                    stroke: stroke,

                    text: textStyle

                })

            );


            return styles;

        };

    }


    // --------------------------------------------------------
    // APPLY
    // --------------------------------------------------------

    applyButton.addEventListener(
        'click',
        function(e) {

            e.preventDefault();
            e.stopPropagation();

            if (!selectedLayer) {

                alert(
                    'Please select a vector layer.'
                );

                return;

            }

            selectedLayer.setStyle(
                createNewStyle()
            );

            map.render();

        }
    );


    // --------------------------------------------------------
    // RESET
    // --------------------------------------------------------

    resetButton.addEventListener(
        'click',
        function(e) {

            e.preventDefault();
            e.stopPropagation();

            if (!selectedLayer) {
                return;
            }

            // Restore original QGIS2Web style
            selectedLayer.setStyle(null);

            map.render();

            loadLayer(selectedLayer);

        }
    );


    // --------------------------------------------------------
    // LAYER CHANGE
    // --------------------------------------------------------

    layerSelect.addEventListener(
        'change',
        function(e) {

            e.stopPropagation();

            var layers =
                getVectorLayers();

            var index =
                parseInt(
                    this.value,
                    10
                );

            if (
                layers[index]
            ) {

                selectedLayer =
                    layers[index];

                loadLayer(
                    selectedLayer
                );

            }

        }
    );


    // --------------------------------------------------------
    // OPACITY
    // --------------------------------------------------------

    fillOpacity.addEventListener(
        'input',
        function() {

            opacityValue.textContent =
                Number(this.value)
                .toFixed(2);

        }
    );


    // --------------------------------------------------------
    // OPEN / CLOSE
    // --------------------------------------------------------

    styleButton.addEventListener(
        'click',
        function(e) {

            e.preventDefault();
            e.stopPropagation();

            if (
                stylePanel.style.display ===
                'block'
            ) {

                stylePanel.style.display =
                    'none';

            } else {

                stylePanel.style.display =
                    'block';

                populateLayers();

            }

        }
    );


    // --------------------------------------------------------
    // PREVENT MAP EVENTS
    // --------------------------------------------------------

    stylePanel.addEventListener(
        'click',
        function(e) {

            e.stopPropagation();

        }
    );

    stylePanel.addEventListener(
        'mousedown',
        function(e) {

            e.stopPropagation();

        }
    );

    stylePanel.addEventListener(
        'touchstart',
        function(e) {

            e.stopPropagation();

        },
        { passive: true }
    );


    // --------------------------------------------------------
    // INITIAL STATE
    // --------------------------------------------------------

    stylePanel.style.display = 'none';

    populateLayers();


})();