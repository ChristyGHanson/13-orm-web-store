// paths between the routes
// do not touch this
// connects the routes inside the api folder
const router = require('express').Router();
// Require the other files in the routes/api folder.
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// Insomnia testing
// Add these to the route paths in Insomnia /api/categories, and so on
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
