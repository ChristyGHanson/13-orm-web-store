const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    var data = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// 
router.get('/:id', async (req, res) => {
  console.log("tag-routes.js: " + req.params.id);
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    var data = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.post('/', (req, res) => {
  // create a new tag --Product, ProductTag
  console.log(req.body);
  Tag.create(req.body)
    // where i want to return the res.status
    .then((tag) => {
      res.status(200).json(tag)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update tag
// --Product, ProductTag
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      if (req.body.productIds && req.body.productIds.length) {

        ProductTag.findAll({
          where: { tag_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ product_id }) => product_id);
          // what we want to have 
          const newProductTags = req.body.productIds
            .filter((product_id) => !productTagIds.includes(product_id))
            .map((product_id) => {
              return {
                tag_id: req.params.id,
                product_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ product_id }) => !req.body.productIds.includes(product_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(tag);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });

});

// This works! It now deletes a tag by its 'id' value
router.delete('/:id', async (req, res) => {
  try {
    var data = await Tag.findByPk(req.params.id);
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
