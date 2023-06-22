// connect the route paths
// API routes
// Express library lets us build routes.
const router = require('express').Router();
const apiRoutes = require('./api');

// route path /api in Insomnia.
router.use('/api', apiRoutes);

// route path - this is the default route.
// grabs routes with '/' in APIs.
router.use((req, res) => {
  res.send("<h1>routes/index.js: Wrong Route!</h1>")
});

module.exports = router;