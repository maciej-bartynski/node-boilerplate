const router = require('express').Router();
const { 
    productCreate, 
    productById, 
    productRead, 
    productRemove, 
    productUpdate, 
    productByQuery, 
    productRelated, 
    productCategories,
    productsBySearchparams,
    productImage
} = require('./../controllers/product');
const { requireSignin, requireSigninError, userById, isAdmin, isAuth } = require('../controllers/user');

router.delete('/del/:productId/:userId', requireSignin, requireSigninError, isAuth, isAdmin, productRemove);
router.put('/update/:productId/:userId', requireSignin, requireSigninError, isAuth, isAdmin, productUpdate);
router.post('/new/:userId', requireSignin, requireSigninError, isAuth, isAdmin, productCreate);
router.get('/read/:productId', productRead);
router.get('/read-sorted', productByQuery);
router.get('/read-related/:productId', productRelated);
router.get('/categories', productCategories);
router.get("/image/:productId", productImage);
router.post("/search", productsBySearchparams);

router.param('productId', productById);
router.param('userId', userById);

module.exports = router;