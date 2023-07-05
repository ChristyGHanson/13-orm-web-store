// import models
// building associations here. see README

// Then work on routes folder
// fill in category, product-routes, tag-routes.

const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
})


// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey:
    through: ProductTag
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey:
    through: ProductTag
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
