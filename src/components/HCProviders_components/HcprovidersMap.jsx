import React, { useRef, useEffect,useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from 'axios';
import ReactDOM from "react-dom";
import apiBaseUrl from "../../apiConfig";
// Grab the access token from your Mapbox account
// I typically like to store sensitive things like this
// in a .env file
// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
mapboxgl.accessToken = "pk.eyJ1IjoiY210cHJvb3B0aWtpIiwiYSI6ImNtNzBhcDhodTAwMjAyanBjdXhza29wNmsifQ.4iT6Z7akhzlh0S2Tqj7P8g";

// const coordinates = [
//   { lng: 23.65545900, lat: 38.068968, dbh: 10 },
//   { lng:  23.64825380, lat:38.06584070 , dbh: 45},
//   { lng:  23.65248102	, lat:38.06472785 , dbh: 50},
// ];

export const HcprovidersMap = ({data}) => {
//   const dataHcp=props.data;
//     console.log(dataHcp);
    const mapContainer = useRef(null);
  const map = useRef(null);
  
  // useEffect(() => {
  //   if (!mapContainer.current) return;

  //   // Initialize the map
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v12",
  //     center: [0, 0], // Default center
  //     zoom: 2,
  //   });

  //   return () => map.current && map.current.remove(); // Cleanup on unmount
  // }, []);

  // return <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />;
  useEffect(() => {
    if (!mapContainer.current || !data) return;

    // Ensure the map container has dimensions
    mapContainer.current.style.width = "100%";
    mapContainer.current.style.height = "500px";

    // Initialize the map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [data[0]?.lon || 0, data[0]?.lat || 0], // Default to first point
      zoom: 12,
    });

    // Ensure map resizes properly
    setTimeout(() => {
      map.current.resize();
    }, 500);

    // Add markers to map
    data.forEach((hcp) => {
      const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat([hcp.lon, hcp.lat])
        .addTo(map.current);

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(
          `
          <div class="box">
            <h3 class="route-name"><strong>${hcp.Name_GR}</strong></h3>
            <div class="route-metric-row">
              <h4 class="row-title"><strong>Ρύπος: </strong>${hcp.Name_GR}</h4>
            </div>
            <div class="route-metric-row">
              <h4 class="row-title"><strong>Τιμή για την επιλεγμένη περίοδο: </strong>${hcp.Name_GR}</h4>
            </div>
          </div>
          <div style="font-size:14px;"><strong>${hcp.Name_GR}</strong><br/>Code: ${hcp.Q4ALL_code}</div>`
        );

      marker.setPopup(popup);
    });

    return () => map.current && map.current.remove(); // Cleanup on unmount
  }, [data]);

  return <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />;

//   function Popup({ buildingname, metricname, metricvalue }) {
//     return (
//       <div className="box">
        
  
//         {/* <h3 className="route-name"><strong>{buildingname}</strong></h3> */}
//         <div className="route-metric-row">
//           {/* <h4 className="row-title"><strong>Ρύπος: </strong>{metricname}</h4> */}
//         </div>
//         <div className="route-metric-row">
//           {/* <h4 className="row-title"><strong>Τιμή για την επιλεγμένη περίοδο: </strong>{metricvalue}</h4> */}
//         </div>
//         {/* <LineChartComponent selectedMetric={dataHcp} buildingname={buildingname} /> */}
//       </div>
//     );
//   }

  

//   // const [buildingmetricsGeo,setBuildingMetricsGeo]=useState([]);

//     // useEffect(()=>{
//     //   getBuildingMetricsGeo(dataHcp)
//     //   // console.log(getBuildingMetricsGeo())
      
//     // },[dataHcp]);

//     // const getBuildingMetricsGeo = async(dataHcp) =>{

//     //   try {
//     //     const response = await axios.get(`${apiBaseUrl}/hcproviders`);

       
        

//     //     setBuildingMetricsGeo(response.data);
//     //     // console.log(filterdata)
//     //   } catch (error) {
//     //     console.error('Error fetching data for Map:', error.message);
//     //   }
        

//     // }

    


//   const mapContainer = useRef();
//   const popUpRef = useRef(new mapboxgl.Popup({ maxWidth: '600px' }))

//   // this is where all of our map logic is going to live
//   // adding the empty dependency array ensures that the map
//   // is only created once
//   useEffect(() => {
//     // console.log(buildingmetricsGeo)
//     getMapPoints(dataHcp)
//     // create the map and configure it
//     // check out the API reference for more options
//     // https://docs.mapbox.com/mapbox-gl-js/api/map/
    

//   }, [dataHcp]);


//   const getMapPoints = async(dataHcp) =>{
//     const map = new mapboxgl.Map({
//       // container: "map",
//       // style: 'mapbox://styles/mapbox/dark-v11',
//       // center: [23.65545900, 38.068968],
//       // zoom: 12,
//       // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
// style: 'mapbox://styles/mapbox/satellite-streets-v12',
// center: [23.65545900, 38.068968],
// zoom: 12,
// pitch: 45,
// bearing: -17.6,
// container: 'map',
// antialias: true
//     });


//     map.on('style.load', () => {
//       // Insert the layer beneath any symbol layer.
//       const layers = map.getStyle().layers;
//       const labelLayerId = layers.find(
//       (layer) => layer.type === 'symbol' && layer.layout['text-field']
//       ).id;
       
//       // The 'building' layer in the Mapbox Streets
//       // vector tileset contains building height data
//       // from OpenStreetMap.
//       map.addLayer(
//       {
//       'id': 'add-3d-buildings',
//       'source': 'composite',
//       'source-layer': 'building',
//       'filter': ['==', 'extrude', 'true'],
//       'type': 'fill-extrusion',
//       'minzoom': 15,
//       'paint': {
//       'fill-extrusion-color': 'green',
       
//       // Use an 'interpolate' expression to
//       // add a smooth transition effect to
//       // the buildings as the user zooms in.
//       'fill-extrusion-height': [
//       'interpolate',
//       ['linear'],
//       ['zoom'],
//       15,
//       0,
//       15.05,
//       ['get', 'height']
//       ],
//       'fill-extrusion-base': [
//       'interpolate',
//       ['linear'],
//       ['zoom'],
//       15,
//       0,
//       15.05,
//       ['get', 'min_height']
//       ],
//       'fill-extrusion-opacity': 1
//       }
//       },
//       labelLayerId
//       );
//       });


//       map.on('style.load', () => {
//         map.addSource('mapbox-dem', {
//         'type': 'raster-dem',
//         'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
//         'tileSize': 512,
//         'maxzoom': 14
//         });
//         // add the DEM source as a terrain layer with exaggerated height
//         map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
//         });

//     map.on('load', () => {
//       // Add a source and layer for heatmap
//       map.addSource('trees', {
//         type: 'geojson',
//         data: {
//           type: 'FeatureCollection',
//           features: dataHcp.map(coord => ({
//             type: 'Feature',
//             geometry: {
//               type: 'Point',
//               coordinates: [coord.lon, coord.lat],
//             },
//             properties: {
//               name:coord.Name_GR,
//               Q4ALL_code:coord.Q4ALL_code,

//               value: coord.type_Of_Hcp,
//             },
//           })),
//         },
//       });
      
  
//       map.addLayer(
//         {
//           id: 'trees-point',
//           type: 'circle',
//           source: 'trees',
//           minzoom: 10,
       
//         },
//         'waterway-label'
//       );






      

//       // Add click event handler for points
//       map.on('click', 'trees-point', (event) => {

//         const popupNode = document.createElement("div")

//         ReactDOM.render(
//           <Popup
//             // buildingname={event.features[0]?.properties?.buildingId}
//             // metricname={event.features[0]?.properties?.name}
//             // metricvalue={event.features[0]?.properties?.value}
//           />,
//           popupNode
//         )

//         popUpRef.current
//         .setLngLat(event.lngLat)
//         .setDOMContent(popupNode)
//         .addTo(map)
        

//       });

      

//     });
//   }

//   return (
//     <div
//       id="map"
//       ref={mapContainer}
//       style={{ width: "100%", height: "100vh" }}
//     />
//   );
};
