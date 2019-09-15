const { createCategory } = require('./createCategory');
const { categoryById } = require('./categoryBiId');
const { categoryRead } = require('./categoryRead');
const { categoryUpdate } = require('./categoryUpdate');
const { categoryRemove } = require('./categoryRemove');
const { categoryReadAll } = require('./categoryReadAll');

module.exports = {
    createCategory,
    categoryById,
    categoryRead,
    categoryReadAll,
    categoryRemove,
    categoryUpdate,
}