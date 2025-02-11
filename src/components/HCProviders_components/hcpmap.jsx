import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import apiBaseUrl from "../../apiConfig";
import marker from "../../cursor.png"
// Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoiY210cHJvb3B0aWtpIiwiYSI6ImNtNzBhcDhodTAwMjAyanBjdXhza29wNmsifQ.4iT6Z7akhzlh0S2Tqj7P8g";

export const HcprovidersMap2 = ({ data }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!mapContainer.current || !data) return;

    mapContainer.current.style.width = "100%";
    mapContainer.current.style.height = "500px";

    const geojsonData = {
      type: "FeatureCollection",
      features: data.map((hcp) => ({
        type: "Feature",
        properties: {
          id: hcp.Q4ALL_code,
          name: hcp.Name_GR,
        },
        geometry: {
          type: "Point",
          coordinates: [hcp.lon, hcp.lat],
        },
      })),
    };

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [data[0]?.lon || 0, data[0]?.lat || 0],
      zoom: 12,
    });

    map.current.on("load", () => {
      map.current.addSource("hcp-clusters", {
        type: "geojson",
        data: geojsonData,
        cluster: true,
        clusterMaxZoom: 14, 
        clusterRadius: 50, 
      });

      // Clustered layer (groups close markers)
      map.current.addLayer({
        id: "clusters",
        type: "circle",
        source: "hcp-clusters",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#f28cb1",
          "circle-radius": [
            "step",
            ["get", "point_count"],
            15,  
            10, 20,
            50, 25
          ],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });

      // Cluster count (number of markers in a cluster)
      map.current.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "hcp-clusters",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      // Custom SVG Marker for individual points
      map.current.addLayer({
        id: "unclustered-point",
        type: "symbol",
        source: "hcp-clusters",
        filter: ["!", ["has", "point_count"]],
        layout: {
          "icon-image": "custom-marker", 
          "icon-size": 0.1, 
          "icon-allow-overlap": true,
        },
      });

      // Add the SVG as an icon in Mapbox
      map.current.loadImage(`${marker}`, (error, image) => {
        if (error) throw error;
        map.current.addImage("custom-marker", image);
      });

      // Click event for clusters (zoom in)
      map.current.on("click", "clusters", (e) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        const clusterId = features[0].properties.cluster_id;
        map.current.getSource("hcp-clusters").getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
            if (err) return;
            map.current.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          }
        );
      });

      // Click event for individual markers
      map.current.on("click", "unclustered-point", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const { name, id } = e.features[0].properties;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<div><strong>${name}</strong><br/>Code: ${id}</div>`)
          .addTo(map.current);
      });

      // Cursor change on hover
      map.current.on("mouseenter", "clusters", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });
      map.current.on("mouseleave", "clusters", () => {
        map.current.getCanvas().style.cursor = "";
      });
    });

    return () => map.current && map.current.remove();
  }, [data]);

  return <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />;
};
