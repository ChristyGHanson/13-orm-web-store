// import models
// building associations here. see README

// Then work on routes folder
// fill in category, product-routes, tag-routes.

const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// foreignKey: 
// A foreign key (FK) is a column or 
// combination of columns that is used to establish and 
// enforce a link between the data in two tables to control the 
// data that can be stored in the foreign key table.

// Products belongsTo Category
// The A.belongsTo(B) association means 
// that a One-To-One relationship exists 
// between A and B, with the foreign key being 
// defined in the source model (A).
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
})

// Categories have many Products
// The A.hasMany(B) association means that a 
// One-To-Many relationship exists between A and B,
//  with the foreign key being defined in the 
// target model (B).
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
})

// Products belongsToMany Tags (through ProductTag)
// Foreign key is a field in your table, in your model. 
// this foreignKey connects to another table to another 
// model here.
// a Many-To-Many relationship exists 
// between A and B, using table C as junction table,
// which will have the foreign keys (aId and bId, for example).
Product.belongsToMany(Tag, {
  foreignKey: tag_name,
  through: ProductTag
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: product_name,
  through: ProductTag
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
