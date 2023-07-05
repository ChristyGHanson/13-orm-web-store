const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
// http://localhost:3001/api/products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    var data = await Product.findAll({
      include: [{ model: Category }, { model: Tag }]
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get one product from the id column in product table
// http://localhost:3001/api/products/2
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    var data = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }]
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create new product, send data to db
// TO DO - edit the code so it's the original starter code 
// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
// Product, Category, Tag, ProductTag
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          // what we want to have 
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});


router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    var data = await Product.findByPk(req.params.id, {
    });
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
