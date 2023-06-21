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

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
  // create a new category
  try {
    var data = await Category.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

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
