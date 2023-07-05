// Continue testing routes in Insomnia - Tutoring
// server is connected already

// fill in category, product, tag
const router = require('express').Router();
// Used in routers
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// try...catch statements for each router.get below
// error code is 500
// async and await promises
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    var data = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// :id is a param. Signifies an int value.
// :id acts like a variable
router.get('/:id', async (req, res) => {
  console.log("category-routes.js" + req.params.id);
  // find one category by its `id` value
  // be sure to include its associated Products in the 'Product' table.
  try {
    var data = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


// POST adds data to the db.
// DONE - verified by BCS tutoring
router.post('/', (req, res) => {
  // create a new category
  console.log(req.body);
  Category.create(req.body)
    // where i want to return the res.status
    .then((category) => {
      res.status(200).json(category)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


// Update a category - send it json and update the name of the category
//  try/catch is for error handling
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    var data = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// deletes a route 
router.delete('/:id', async (req, res) => {
  try {
    var data = await Category.findByPk(req.params.id);
    if (data) {
      data.destroy();
    } else {
      res.status(404).json({ message: 'Data not found!' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
