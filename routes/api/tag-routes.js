const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    var data = await Tag.findAll({
      include: [{ model: Product }, { model: ProductTag }]
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/:id', async (req, res) => {
  console.log("tag-routes.js: " + req.params.id);
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    var data = await Tag.findByPk(req.params.id, {
      include: [{ model: ProductTag }]
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
// BROKEN!!
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
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
