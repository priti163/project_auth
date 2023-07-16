// src/controllers/intersectionsController.js
const turf = require('@turf/turf');
const lines = require('../data/lines.json');

exports.findIntersections = (req, res) => {
  try {
    const { linestring } = req.body;

    // Validate the linestring and perform intersection calculations
    const result = []; // Array to store intersecting lines and points

    // Perform intersection calculations using turf.js
    // Iterate over lines and check for intersections with the linestring

    // Return the result
    if (result.length === 0) {
      res.json([]);
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};
