import React, { useEffect, useRef, useState } from 'react';
import MapboxGL from 'mapbox-gl';

const CircleLayerComponent = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const center = [-74.5, 40]; // Longitude, Latitude of the center point

  useEffect(() => {
    MapboxGL.accessToken = 'pk.eyJ1IjoiY210cHJvb3B0aWtpIiwiYSI6ImNtNzBhcDhodTAwMjAyanBjdXhza29wNmsifQ.4iT6Z7akhzlh0S2Tqj7P8g';

    const map = new MapboxGL.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: 12, // initial zoom
    });

    setMap(map);

    map.on('load', () => {
      // Draw the circle with a 1000 meters radius
      const radiusInMeters = 1000;

      // Define the circle center in GeoJSON format
      const circleCenter = center;

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

      // Add the circle layer to the map
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
          'fill-opacity': 0.6,
        },
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ height: '100vh', width: '100%' }} />;
};

export default CircleLayerComponent;
