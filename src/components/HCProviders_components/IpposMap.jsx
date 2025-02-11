import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import apiBaseUrl from "../../apiConfig";

// Import marker images
import marker1 from "../../icons/hospitalmarker.png";
import marker2 from "../../icons/healthcenters.png";
import marker3 from "../../icons/tomymarker.png";
import { Category } from "@mui/icons-material";

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
          Type_Of_hcp: hcp.type_Of_Hcp,
          name_en: hcp.Name_EN ,
          Category: hcp.category_As_Per_HealthAtlas ,
          address: hcp.address,
          post: hcp.post_Code,
          email: hcp.email_Contact,
          g_email: hcp.general_Email_Contact,
          website:hcp.website ,
          icon: getIconName(hcp.type_Of_Hcp), // Dynamically assign the icon name
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

      // Load multiple icons
      const markers = {
        marker1: marker1,
        marker2: marker2,
        marker3: marker3,
      };

      Object.keys(markers).forEach((key) => {
        map.current.loadImage(markers[key], (error, image) => {
          if (!error && !map.current.hasImage(key)) {
            map.current.addImage(key, image);
          }
        });
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
            10,
            20,
            50,
            25,
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

      // Individual points with dynamic icons
      map.current.addLayer({
        id: "unclustered-point",
        type: "symbol",
        source: "hcp-clusters",
        filter: ["!", ["has", "point_count"]],
        layout: {
          "icon-image": ["get", "icon"], // Use the dynamic icon assigned in properties
          "icon-size": 0.22,
          "icon-allow-overlap": true,
        },
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
        const { name, id,Type_Of_hcp,name_en,Category,address,post,email,g_email,website } = e.features[0].properties;
        
       
          

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`
            <div style="max-height: 150px; overflow-y: auto; padding: 5px; width: 250px;">
              <div>
                <strong>${name} (${name_en})</strong><br/>
                <span><strong>Code:</strong> ${id}</span><br/>
                <span><strong>HCP:</strong> ${Type_Of_hcp}</span><br/>
                <span><strong>Category:</strong> ${Category}</span><br/>
              </div>
              <div style="margin-top: 5px; border-top: 1px solid #ccc; padding-top: 5px;">
                <strong>Contact details:</strong><br/>
                <span><strong>Address:</strong> ${address}</span><br/>
                <span><strong>Post:</strong> ${post}</span><br/>
                <span><strong>Email:</strong> ${email}</span><br/>
                <span><strong>General Email:</strong> ${g_email}</span><br/>
                <span><strong>Website:</strong> <a href="${website}" target="_blank">${website}</a></span>
              </div>
            </div>
          `)
          
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

  // Function to dynamically assign an icon based on Name_GR
  const getIconName = (name) => {
    if (name.includes("Health Centre")) return "marker1";
    if (name.includes("Hospital")) return "marker2";
    return "marker3"; // Default marker
  };

  return <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />;
};
