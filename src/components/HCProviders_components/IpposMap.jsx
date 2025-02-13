import React, { useRef, useEffect,useState  } from "react";
import mapboxgl from "mapbox-gl";
import apiBaseUrl from "../../apiConfig";

// Import marker images
import marker1 from "../../icons/hospitalicon.png";
import marker2 from "../../icons/health-center.png";
import marker3 from "../../icons/tomyicon.png";
import { Category } from "@mui/icons-material";
import { Dialog } from "primereact/dialog";
import { ScrollPanel } from 'primereact/scrollpanel';

// Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoiY210cHJvb3B0aWtpIiwiYSI6ImNtNzBhcDhodTAwMjAyanBjdXhza29wNmsifQ.4iT6Z7akhzlh0S2Tqj7P8g";

export const HcprovidersMap2 = ({ data }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const GREECE_BOUNDS = [
    [19.0, 34.5], // Southwest corner (longitude, latitude)
    [30.0, 42.0]  // Northeast corner (longitude, latitude)
  ];

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !data) return;

    mapContainer.current.style.width = "100%";
    mapContainer.current.style.height = "700px";
    mapContainer.current.style.borderRadius="25px";
    mapContainer.current.style.top="30px";


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
      style: "mapbox://styles/mapbox/light-v11",
      center: [23.7, 38.5],
      zoom: 5.2,
      maxBounds: GREECE_BOUNDS,
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



      map.current.addLayer({
        id: "clusters",
        type: "circle",
        source: "hcp-clusters",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#1010A0", // Deep blue core
          "circle-radius": 15, // Size of the inner circle
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });
      
      // First outer glow layer
      map.current.addLayer({
        id: "cluster-glow-1",
        type: "circle",
        source: "hcp-clusters",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#1010A0", // Same base color
          "circle-radius": 30, // Expanding outward
          "circle-opacity": 0.1, // Lower opacity for smooth transition
        },
      });
      
      // Second outer glow layer
      map.current.addLayer({
        id: "cluster-glow-2",
        type: "circle",
        source: "hcp-clusters",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#1010A0", // Same base color
          "circle-radius": 40, // Larger spread
          "circle-opacity": 0.1, // Even lower opacity
        },
      });
      
   
      
      // Cluster count (number inside the cluster circle)
      map.current.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "hcp-clusters",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
          "text-size": 16,
        },
        paint: {
          "text-color": "#FFFFFF", // White text in the center
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
          "icon-size": 0.60,
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
/////////////////////////////////////


///////////////////////////////////

      map.current.on("click", "unclustered-point", (e) => {
        const properties = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates;
        const point = map.current.project(coordinates);
        setSelectedMarker({
          name: properties.name,
          name_en: properties.name_en,
          id: properties.id,
          Type_Of_hcp: properties.Type_Of_hcp,
          Category: properties.Category,
          address: properties.address,
          post: properties.post,
          email: properties.email,
          g_email: properties.g_email,
          website: properties.website,
          latitude: coordinates[1], // Extract latitude
          longitude: coordinates[0], // Extract longitude
          x: point.x,  // Store x position
          y: point.y,  // Store y position
        });
        console.log("Properties: ", properties)
        setVisible(true);
        setVisible2(true);
      });
      // Click event for individual markers
      // map.current.on("click", "unclustered-point", (e) => {
      //   const coordinates = e.features[0].geometry.coordinates.slice();
      //   const { name, id,Type_Of_hcp,name_en,Category,address,post,email,g_email,website } = e.features[0].properties;
      //   setSelectedMarker({
      //     name: properties.name,
      //     name_en: properties.name_en,
      //     id: properties.id,
      //     Type_Of_hcp: properties.Type_Of_hcp,
      //     Category: properties.Category,
      //     address: properties.address,
      //     post: properties.post,
      //     email: properties.email,
      //     g_email: properties.g_email,
      //     website: properties.website,
      //   });
      //   setVisible(true);
        
       
          

        // new mapboxgl.Popup()
        //   .setLngLat(coordinates)
        //   .setHTML(`
        //     <div style="max-height: 150px; overflow-y:auto; padding: 5px; width: 250px;">
        //       <div>
        //         <strong>${name} (${name_en})</strong><br/>
        //         <span><strong>Code:</strong> ${id}</span><br/>
        //         <span><strong>HCP:</strong> ${Type_Of_hcp}</span><br/>
        //         <span><strong>Category:</strong> ${Category}</span><br/>
        //       </div>
        //       <div style="margin-top: 5px; border-top: 1px solid #ccc; padding-top: 5px;">
        //         <strong>Contact details:</strong><br/>
        //         <span><strong>Address:</strong> ${address}</span><br/>
        //         <span><strong>Post:</strong> ${post}</span><br/>
        //         <span><strong>Email:</strong> ${email}</span><br/>
        //         <span><strong>General Email:</strong> ${g_email}</span><br/>
        //         <span><strong>Website:</strong> <a href="${website}" target="_blank">${website}</a></span>
        //       </div>
        //     </div>
        //   `)
          
        //   .addTo(map.current);
      //});

      // Cursor change on hover
      map.current.on("mouseenter", "clusters", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });
      map.current.on("mouseleave", "clusters", () => {
        map.current.getCanvas().style.cursor = "";
      });


 // Legend Implementation
 const legend = document.createElement("div");
 legend.id = "map-legend";
 legend.innerHTML = `
   <div class="legend-item">
     <img src="${marker1}" width="20" height="20" alt="Hospital" /> Hospital
   </div>
   <div class="legend-item" style="margin-left:12px;">
     <img src="${marker2}" width="20" height="20" alt="Health Centre" /> Health Centre
   </div>
   <div class="legend-item" style="margin-left:12px;">
     <img src="${marker3}" width="20" height="20" alt="Other" /> TOMY
   </div>
 `;
 mapContainer.current.appendChild(legend);

 // CSS for the legend
 const style = document.createElement("style");
 style.innerHTML = `
   #map-legend {
     display:flex;
     position: absolute;
     bottom: 20px;
     left: 20px;
     background: rgba(255, 255, 255, 0.8);
     padding: 10px;
     border-radius: 16px;
     font-size: 14px;
     box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
   }
   .legend-item {
     display: flex;
     align-items: center;
     margin-bottom: 5px;
   }
   .legend-item img {
     margin-right: 5px;
   }

           #zoom-controls {
          position: absolute;
          bottom: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px; /* Small space between buttons */
          background: rgba(255, 255, 255, 0);
        }
        #zoom-controls button {
          width: 45px;
          height: 45px;
          font-size: 20px;
          font-weight: bold;
          border: none;
          background: white;
          border-radius: 50%; /* Circular shape */
          cursor: pointer;
          outline: none;
          box-shadow: 0px 2px 5px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #zoom-controls button:hover {
          background: #f0f0f0;
        }
        #zoom-controls button:active {
          background: #ddd;
        }

 `;

 // Create Zoom Controls
 const zoomControl = document.createElement("div");
 zoomControl.id = "zoom-controls";
 zoomControl.innerHTML = `
   <button id="zoom-in">+</button>
   <button id="zoom-out">-</button>
 `;
 mapContainer.current.appendChild(zoomControl);

 // Add event listeners for zoom buttons
 document.getElementById("zoom-in").addEventListener("click", () => {
   map.current.zoomIn();
 });

 document.getElementById("zoom-out").addEventListener("click", () => {
   map.current.zoomOut();
 });


 
 document.head.appendChild(style);


    });

    



    return () => map.current && map.current.remove();
  }, [data]);

  // Function to dynamically assign an icon based on Name_GR
  const getIconName = (name) => {
    if (name.includes("Hospital")) return "marker1";
    if (name.includes("Health Centre")) return "marker2";
    return "marker3"; // Default marker
  };

  return (
    <>
      <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />

      <Dialog
        header="Healthcare Provider Info"
        visible={visible2}
        style={{ width: "30vw" , position: "absolute",
        left: selectedMarker ? `${selectedMarker.x + 20}px` : "50%",
        top: selectedMarker ? `${selectedMarker.y - 50}px` : "50%", // Position above the marker
        transform: "translate(-50%, -100%)"}}
        onHide={() => {setVisible(false); setVisible2(false);}}
        // position="left"
        dismissableMask
        draggable
        modal={false} // Ensure both are active
      >
        {selectedMarker && (
         
          <div>
            <p><strong>{selectedMarker.name} ({selectedMarker.name_en})</strong></p>
            <p><strong>Id:</strong> {selectedMarker.id}</p>
            <p><strong>HCP:</strong> {selectedMarker.Type_Of_hcp}</p>
            {/* <p><strong>Category:</strong> {selectedMarker.Category}</p>
            <p><strong>Address:</strong> {selectedMarker.address}</p>
            <p><strong>Post Code:</strong> {selectedMarker.post}</p>
            <p><strong>Email:</strong> {selectedMarker.email}</p>
            <p><strong>General Email:</strong> {selectedMarker.g_email}</p>
            <p><strong>Website:</strong> <a href={selectedMarker.website} target="_blank" rel="noopener noreferrer">{selectedMarker.website}</a></p> */}

            
          </div>
        )}
      </Dialog>

      <Dialog
        header="Healthcare Provider Info"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={() => {setVisible(false); setVisible2(false);}}
        position="right"
        dismissableMask
        modal={false} // Ensure both are active
      >
        {selectedMarker && (
          <ScrollPanel style={{ width: '100%', height: '200px' }}>

          <div>
            <p><strong>{selectedMarker.name} ({selectedMarker.name_en})</strong></p>
            <p><strong>Code:</strong> {selectedMarker.id}</p>
            <p><strong>HCP:</strong> {selectedMarker.Type_Of_hcp}</p>
            <p><strong>Category:</strong> {selectedMarker.Category}</p>
            <p><strong>Address:</strong> {selectedMarker.address}</p>
            <p><strong>Post Code:</strong> {selectedMarker.post}</p>
            <p><strong>Email:</strong> {selectedMarker.email}</p>
            <p><strong>General Email:</strong> {selectedMarker.g_email}</p>
            <p><strong>Website:</strong> <a href={selectedMarker.website} target="_blank" rel="noopener noreferrer">{selectedMarker.website}</a></p>

            
          </div>
          </ScrollPanel>
        )}
      </Dialog>
    </>
  );
};



