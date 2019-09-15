const { productCreate } = require('./productCreate.js');
const { productUpdate } = require('./productUpdate.js');
const { productRemove } = require('./productRemove.js');
const { productRead } = require('./productRead.js');
const { productById } = require('./productById.js');
const { productByQuery } = require('./productByQuery');
const { productRelated } = require('./productRelated');
const { productCategories } = require('./productCategories');
const { productsBySearchparams } = require('./productsBySearchparams');
const { productImage } = require('./productImage');

module.exports = {
    productCreate,
    productUpdate,
    productRemove,
    productRead,
    productById,
    productByQuery,
    productRelated,
    productCategories,
    productsBySearchparams,
    productImage,
}