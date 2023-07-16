import React, { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { featureCollection, intersect } from '@turf/turf';

const IntersectionsAPI = () => {
  const [linestring, setLinestring] = useState('');
  const [response, setResponse] = useState([]);

  const handleInputChange = (event) => {
    setLinestring(event.target.value);
  };

  const handleFindIntersections = async () => {
    try {
      const response = await fetch('http://localhost:8000/IntersectionsAPI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AUTH_TOKEN' // Replace with your actual auth token
        },
        body: JSON.stringify({ linestring })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data);
      drawMap(JSON.parse(linestring), data);
    } catch (error) {
      console.error('Error:', error);
      setResponse([]);
    }
  };

  const drawMap = (linestringGeoJSON, intersections) => {
    // Create a Leaflet map
    const map = L.map('map').setView([0, 0], 2);

    // Add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Create the LineString layer and add it to the map
    L.geoJSON(linestringGeoJSON).addTo(map);

    // Create a feature collection from the intersections data
    const intersectionsFC = featureCollection(intersections.map((inter) => inter.geometry));

    // Create the intersection layer and add it to the map
    L.geoJSON(intersectionsFC, {
      pointToLayer: (_, latlng) => {
        return L.marker(latlng, { icon: L.divIcon({ className: 'intersection-marker' }) });
      },
    }).addTo(map);

    // Fit the map to the bounds of the LineString layer
    map.fitBounds(L.geoJSON(linestringGeoJSON).getBounds());
  };

  return (
    <div className="container">
      <h1>Intersections API Frontend</h1>
      <div className="input-container">
        <label htmlFor="linestringInput">Enter LineString (GeoJSON format):</label>
        <textarea
          id="linestringInput"
          value={linestring}
          onChange={handleInputChange}
          placeholder='{"type": "LineString", "coordinates": []}'
        />
        <button onClick={handleFindIntersections}>Find Intersections</button>
      </div>
      <div className="response-container">
        <h2>Response:</h2>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
      <div id="map" className="map" />
    </div>
  );
};

export default IntersectionsAPI;
