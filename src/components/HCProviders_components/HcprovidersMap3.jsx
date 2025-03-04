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
import ReactDOM from "react-dom";
import PopUpInfo from "./PopUpInfo";
import selHospital from "../../icons/selHospital3.png"
import selHC from "../../icons/selHC2.png"
import selTOMY from "../../icons/selTOMY2.png"

// Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoiY210cHJvb3B0aWtpIiwiYSI6ImNtNzBhcDhodTAwMjAyanBjdXhza29wNmsifQ.4iT6Z7akhzlh0S2Tqj7P8g";

export const HcprovidersMap3 = ({ data ,center ,radius }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    //  const mappop =useRef(null);
    const GREECE_BOUNDS = [
        [19.0, 34.5], // Southwest corner (longitude, latitude)
        [30.0, 42.0]  // Northeast corner (longitude, latitude)
    ];
    //   console.log("center:",center)
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [visible, setVisible] = useState(false);
    // const [visiblepop, setvisiblepop] = useState(false);
    const [mappop, setPopup] = useState(null); // Store the popup referenc

    //const radiusInMeters = radius * 1000 ;


////////////////////
    const centerLat = center.lat; // Your center latitude
    const centerLon = center.lon; // Your center longitude
    
    
//////////////////
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
            region:hcp.ype,
            name: hcp.Name_GR,
            Type_Of_hcp: hcp.type_Of_Hcp,
            name_en: hcp.Name_EN ,
            Category: hcp.category_As_Per_HealthAtlas ,
            Category_Elstat:hcp.category_As_Per_Sha_2011_Elstat,
            Idika:hcp.Idika_Ehr,
            Odipy:hcp.Odipy_Indicator_Collection,
            Drug:hcp.Drg_Mature_Usage,
            HCenterNetwork:hcp.HEALTH_Center_In_The_Network,
            address: hcp.address,
            post: hcp.post_Code,
            email: hcp.email_Contact,
            g_email: hcp.general_Email_Contact,
            website:hcp.website ,
            icon: getIconName(hcp.type_Of_Hcp,hcp.Q4ALL_code,center.Q4ALL_code), // Dynamically assign the icon name
        },
        geometry: {
            type: "Point",
            coordinates: [hcp.lon, hcp.lat],
        },
      })),
    };

    // console.log(geojsonData)

    // map.current = new mapboxgl.Map({
    //   container: mapContainer.current,
    //   style: "mapbox://styles/mapbox/light-v11",
    //   center: [centerLon, centerLat],
    //   zoom: 5.2,
    //   maxBounds: GREECE_BOUNDS,
    // });

    const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [centerLon, centerLat],
        zoom: 5.2,
        maxBounds: GREECE_BOUNDS,
      });

    map.on("load", () => {
        // const zoomLevel = map.current.getZoom(); // Get the current zoom level


        const radiusInMeters = radius+1;

        // Define the circle center in GeoJSON format
        const circleCenter = [centerLon, centerLat];

        // Create a point at the center of the circle
        const circlePoint = map.project(circleCenter);

        // Use the radius to generate points around the circle at a fixed distance (1000m)
        const circleCoords = [];
        const numberOfPoints = 360; // Number of points to form the circle (360 for a full circle)

        for (let i = 0; i < numberOfPoints; i++) {
            const angle = (i * 2 * Math.PI) / numberOfPoints;
            const dx = Math.cos(angle) * radiusInMeters;
            const dy = Math.sin(angle) * radiusInMeters;
            const point = map.unproject([circlePoint.x + dx, circlePoint.y + dy]);
            circleCoords.push(point);
        }

        //const radiusInPixels = metersToPixels(radiusInMeters, zoomLevel, center[0].lat);
        map.addSource("hcp-clusters", {
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
            selHospital:selHospital,
            selHC:selHC,
            selTOMY:selTOMY
        };

        Object.keys(markers).forEach((key) => {
            map.loadImage(markers[key], (error, image) => {
            if (!error && !map.hasImage(key)) {
                map.addImage(key, image);
            }
            });
        });



        map.addLayer({
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
        map.addLayer({
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
        map.addLayer({
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
        map.addLayer({
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
        map.addLayer({
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
        map.on("click", "clusters", (e) => {
            const features = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
            });
            const clusterId = features[0].properties.cluster_id;
            map.getSource("hcp-clusters").getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) return;
                map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
                });
            }
            );
        });
    
        map.addLayer({
            id: 'circle-layer',
            type: 'fill',
            source: {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates: [circleCoords.map(p => [p.lng, p.lat])],
                    },
                },
            },
            paint: {
                'fill-color': '#ff0000',
                'fill-opacity': 0.2,
            },
        });

  

   
  
    // // Add the GeoJSON source
    // map.current.addSource('circle-source', geojsonSource);

    // map.current.addLayer({
    //     'id': 'radius-circle',
    //     'type': 'circle',
    //     'source': {
    //         'type': 'geojson',
    //         'data': {
    //             'type': 'FeatureCollection',
    //             'features': [
    //                 {
    //                     'type': 'Feature',
    //                     'geometry': {
    //                         'type': 'Point',
    //                         'coordinates': [center[0].lon, center[0].lat]
    //                     }
    //                 }
    //             ]
    //         }
    //     },
    //     'paint': {
    //         'circle-radius': radiusInPixels, // Set the radius in meters
    //         'circle-color': 'rgba(0, 0, 255, 0.4)', // Optional: Circle color
    //         'circle-stroke-width': 2, // Optional: Circle border width
    //         'circle-stroke-color': 'rgba(0, 0, 255, 1)' // Optional: Circle border color
    //     },
    // })

    // Add the circle layer with a radius based on zoom
    // map.current.addLayer({
    //     id: 'circle-layer',
    //     type: 'circle',
    //     source: 'circle-source',
    //     paint: {
    //       // Calculate circle radius based on zoom level
    //       'circle-radius': [
    //         'interpolate',
    //         ['linear'],
    //         ['zoom'],
    //         0, radiusInPixels / 500, // Scale for lower zoom levels
    //         22, radiusInPixels / 20, // Scale for higher zoom levels
    //       ],
    //       'circle-color': 'rgba(0, 0, 255, 0.4)', // Color of the circle
    //       'circle-stroke-width': 2, // Border width
    //       'circle-stroke-color': 'rgba(0, 0, 255, 1)', // Border color
    //     },
    //   });

      

/////////////////////////////////////
// map.current.on('zoom', function() {
//     const zoomLevel = map.current.getZoom();
//     const radiusInPixels = metersToPixels(radiusInMeters, zoomLevel, center[0].lat);

//     map.current.getSource('radius-circle').setData({
//         'type': 'FeatureCollection',
//         'features': [
//             {
//                 'type': 'Feature',
//                 'geometry': {
//                     'type': 'Point',
//                     'coordinates': [center[0].lon, center[0].lat]
//                 }
//             }
//         ]
//     });

//     map.current.setPaintProperty('radius-circle', 'circle-radius', radiusInPixels);
// });

///////////////////////////////////

        map.on("click", "unclustered-point", (e) => {
            const properties = e.features[0].properties;
            const coordinates = e.features[0].geometry.coordinates;
            const point = map.project(coordinates);
            
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            
            const popupNode = document.createElement("div")

            ReactDOM.render(
                <PopUpInfo
                properties={properties} onClose={() => mappop.remove()}
                />,
                popupNode
            )
  

            const mappop=new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setDOMContent(
                popupNode
                )
    // .setHTML( `<div style="max-height: 150px; overflow-y:auto; padding: 5px; width: 250px;">
    //   <div>
    //     <strong>Name (${properties.name_en})</strong><br/>
    //     <span><strong>Id:</strong> ${properties.id}</span><br/>
    //     <span><strong>HCP:</strong> ${properties.Type_Of_hcp}</span><br/>
    //   </div>
    // </div>`)
            .addTo(map);


  // if (popup) {
  //   popup.remove(); // Remove previous popup
  // }
  // // Update selected marker state
            setSelectedMarker({
                name: properties.name,
                name_en: properties.name_en,
                region:properties.region,
                id: properties.id,
                Type_Of_hcp: properties.Type_Of_hcp,
                Category: properties.Category,
                Category_Elstat:properties.Category_Elstat,
                Idika:properties.Idika,
                Odipy:properties.Odipy,
                Drug:properties.Drug,
                HCenterNetwork:properties.HCenterNetwork,
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

            setVisible(true);
  // setvisiblepop(true);
 
  
            // Handle popup close event
            mappop.on("close", () => {
                setVisible(false); // Hide dialog when popup closes
                setPopup(null); // Clear popup reference
            });
        });
      
  
       
          

        
        // Cursor change on hover
        map.on("mouseenter", "clusters", () => {
            map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "clusters", () => {
            map.getCanvas().style.cursor = "";
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


        .dialog {
            position: relative;
            float:right;
            margin:10px;
            height:-webkit-fill-available;
            z-index:100;
            overflow: auto;
            background: rgb(255, 255, 255);
            border-radius: 16px;
            font-size: 14px;
            box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
        }
        .p-scrollpanel-wrapper{
            height:auto;
        }
        .p-scrollpanel-content{
            padding:10px;
        }

        .mapboxgl-popup-close-button {
            display:none;
        }

        .mapboxgl-popup-content {
            width: fit-content;
            background: transparent;
            box-shadow: none;
        }
        .mapboxgl-pop-content-wrapper{
            padding:1%;
        }
        .mapboxgl-popup{
            max-width:unset;

        } 
        .mapboxgl-popup-anchor-top {
            max-width:unset;
        }

        .MuiPaper-root{
            width:auto;
        }

        strong {
            color: #292d3299;
            font-weight: 500;
            font-size: 17px;
            font-family: 'Poppins';

        }

        .mb-3 div{
            color: #292D32;
            font-weight: 300;
            font-size: 14px;
            font-family: 'Poppins';

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
   map.zoomIn();
 });

 document.getElementById("zoom-out").addEventListener("click", () => {
   map.zoomOut();
 });


 
 document.head.appendChild(style);


    });
/////////////


    

    return () => map && map.remove();
  }, [data]);

  // Function to dynamically assign an icon based on Name_GR
  const getIconName = (name,id,centerid) => {
    if(id===centerid){
      if (name.includes("Hospital")) return "selHospital";
      if (name.includes("Health Centre")) return "selHC";
    return "selTOMY"; // Default marker
    }
    if (name.includes("Hospital")) return "marker1";
    if (name.includes("Health Centre")) return "marker2";
    return "marker3"; // Default marker
  };

  return (
    <>
      <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} >
      <div className="dialog"   hidden={!visible}      

        header="Healthcare Provider Info"
        
      >
        {selectedMarker && (
          <ScrollPanel style={{ width: '30vw', height: '200px' }}>
 <div className="container mt-4 p-4 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins' }}>
        HCP Provider
      </h1>
      <div className="row">
        <div className="col-md-6 mb-3">
          <strong >YPE (Region):</strong>
          <div>{selectedMarker.region}</div>
        </div>
        <div className="col-md-6 mb-3">
          <strong>Q4ALL_code:</strong>
          <div>{selectedMarker.id}</div>
        </div>
        <div className="col-md-6 mb-3">
          <strong>Type of HCP:</strong>
          <div>{selectedMarker.Type_Of_hcp}</div>
        </div>
        <div className="col-md-6 mb-3">
          <strong>Name (GR):</strong>
          <div>{selectedMarker.name}</div>
        </div>
        <div className="col-md-6 mb-3">
          <strong>Name (EN):</strong>
          <div>{selectedMarker.name_en}</div>
        </div>
        <div className="col-md-6 mb-3">
          <strong>Category as per HealthAtlas:</strong>
          <div>{selectedMarker.category}</div>
        </div>
        <div className="col-md-6 mb-3">
          <strong>Category as per SHA 2011 ELSTAT:</strong>
          <div>{selectedMarker.Category_Elstat}</div>
        </div>
        <div className="col-md-6 mb-3">
          <strong>IDIKA EHR:</strong>
          <div>{selectedMarker.Idika}</div>
        </div>
        <div className="col-md-6 mb-3">
          <strong>ODIPY Indicator Collection:</strong>
          <div>{selectedMarker.Odipy}</div>
        </div>
        <div className="col-md-6 mb-3">
          <strong>DRG Mature Usage:</strong>
          <div>{selectedMarker.Drug}</div>
        </div>
        <div className="col-md-6 mb-3">
          <strong>HEALTH Center in the Network:</strong>
          <div>{selectedMarker.HCenterNetwork}</div>
        </div>
      </div>
      <div className="mt-4 border-top pt-3">
      <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins' }}>Contact Details</h3>
        <div className="row">
          <div className="col-md-6 mb-3">
            <strong>Address:</strong>
            <div>{selectedMarker.address}</div>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Post Code:</strong>
            <div>{selectedMarker.post}</div>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Email:</strong>
            <div>{selectedMarker.email}</div>
          </div>
          <div className="col-md-6 mb-3">
            <strong>General Email:</strong>
            <div>{selectedMarker.g_email}</div>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Website:</strong>
            <div>
              <a href={selectedMarker.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {selectedMarker.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
          </ScrollPanel>
        )}
      </div>
      
      
      </div>

     

    </>
  );
};





