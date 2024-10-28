// Objeto mapa
var mapa = L.map("mapaid", {
    center: [9.7, -84.0],
    zoom: 8,
});

// Capa base Positron de Carto
positromap = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
    {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
    }
).addTo(mapa);

// Capa base de OSM
osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

// Capa base de ESRI World Imagery
esriworld = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }
);

// Capas base
var mapasbase = {
    "Carto Positron": positromap,
    OpenStreetMap: osm,
    "ESRI WorldImagery": esriworld,
};

// Control de capas
control_capas = L.control
    .layers(mapasbase, null, { collapsed: false })
    .addTo(mapa);

// Control de escala
L.control.scale().addTo(mapa);

// Capa vectorial de puntos Municipalidades interesadas en formato GeoJSON
$.getJSON("datos/municipalidades_si.geojson", function (geodata) {
    var municipalidades_si = L.geoJson(geodata, {
        pointToLayer: function (feature, latlng) {
            var leafIcon = new L.Icon({
                iconUrl: 'bombillo-verde.png', 
                iconSize: [25, 25], // Set a uniform size without incline or shadow
                iconAnchor: [10, 10], // Adjust icon anchor to be centered
                popupAnchor: [-3, -10] // Adjust popup anchor to open above the icon
            });
            return L.marker(latlng, {icon: leafIcon});
        },
        onEachFeature: function (feature, layer) {
            var popupText = "<strong>Municipalidad:</strong> " + feature.properties.MUNICIPALIDAD +
                            "<br><strong>Región:</strong> " + feature.properties.REGIÓN;
            layer.bindPopup(popupText);

            layer.bindTooltip(feature.properties.MUNICIPALIDAD, {
                permanent: true,  
                direction: "top",  
                className: "text-only-tooltip"  
            }).openTooltip();  
        }
    }).addTo(mapa);

    control_capas.addOverlay(municipalidades_si, "Municipalidades interesadas");
});

   // Función para ajustar el tamaño de la letra según el zoom
   mapa.on('zoomend', function () {
    var zoom = mapa.getZoom();
    var fontSize = zoom < 10 ? '10px' : zoom < 13 ? '12px' : '14px';  // Ajuste según el zoom

    // Cambiar el tamaño de la letra de todos los tooltips
    $('.text-only-tooltip').css('font-size', fontSize);
});

// Capa de Municipalidades sin interés en formato GeoJSON
$.getJSON("datos/municipalidades_no.geojson", function (geodata) {
    var municipalidades_no = L.geoJson(geodata, {
        pointToLayer: function (feature, latlng) {
            var leafIcon = new L.Icon({
                iconUrl: 'bombillo-rojo.png', 
                iconSize: [25, 25], // Set a uniform size without incline or shadow
                iconAnchor: [10, 10], // Adjust icon anchor to be centered
                popupAnchor: [-3, -10] // Adjust popup anchor to open above the icon
            });
            return L.marker(latlng, {icon: leafIcon});
        },
        onEachFeature: function (feature, layer) {
            var popupText = "<strong>Municipalidad</strong>: " +
                feature.properties.MUNICIPALIDAD +
                "<br>" +
                "<strong>Región</strong>: " +
                feature.properties.REGIÓN;
            layer.bindPopup(popupText);

            layer.bindTooltip(feature.properties.MUNICIPALIDAD, {
                permanent: true,  
                direction: "top",  
                className: "text-only-tooltip"  
            }).openTooltip();  
        },
    }).addTo(mapa);

    control_capas.addOverlay(municipalidades_no, "Municipalidades sin interés");
});

// Función para ajustar el tamaño de la letra según el zoom
mapa.on('zoomend', function () {
    var zoom = mapa.getZoom();
    var fontSize = zoom < 10 ? '10px' : zoom < 13 ? '12px' : '14px';  // Ajuste según el zoom

    // Cambiar el tamaño de la letra de todos los tooltips
    $('.text-only-tooltip').css('font-size', fontSize);
});

// Capa de Municipalidades pendientes en formato GeoJSON
$.getJSON("datos/municipalidades_sin_respuesta.geojson", function (geodata) {
    var municipalidades_sin_respuesta = L.geoJson(geodata, {
        pointToLayer: function (feature, latlng) {
            var leafIcon = new L.Icon({
                iconUrl: 'bombillo-amarillo.png', 
                iconSize: [25, 25], // Set a uniform size without incline or shadow
                iconAnchor: [10, 10], // Adjust icon anchor to be centered
                popupAnchor: [-3, -10] // Adjust popup anchor to open above the icon
            });
            return L.marker(latlng, {icon: leafIcon});
        },
        onEachFeature: function (feature, layer) {
            var popupText = "<strong>Municipalidad</strong>: " +
                feature.properties.MUNICIPALIDAD +
                "<br>" +
                "<strong>Región</strong>: " +
                feature.properties.REGIÓN;
            layer.bindPopup(popupText);

            layer.bindTooltip(feature.properties.MUNICIPALIDAD, {
                permanent: true,  
                direction: "top",  
                className: "text-only-tooltip"  
            }).openTooltip();  
        },
    }).addTo(mapa);

    control_capas.addOverlay(municipalidades_sin_respuesta, "Municipalidades sin respuesta");
});

// Función para ajustar el tamaño de la letra según el zoom
mapa.on('zoomend', function () {
    var zoom = mapa.getZoom();
    var fontSize = zoom < 10 ? '10px' : zoom < 13 ? '12px' : '14px';  // Ajuste según el zoom

    // Cambiar el tamaño de la letra de todos los tooltips
    $('.text-only-tooltip').css('font-size', fontSize);
});


