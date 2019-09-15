const router = require('express').Router();
const { createCategory, categoryById, categoryRead, categoryRemove, categoryReadAll, categoryUpdate } = require('../controllers/category');
const { requireSignin, requireSigninError, userById, isAdmin, isAuth } = require('../controllers/user');

router.post('/new/:userId', requireSignin, requireSigninError, isAuth, isAdmin, createCategory);
router.get('/read/:categoryId', categoryRead);
router.get('/read-all', categoryReadAll);
router.put('/update/:categoryId/:userId', requireSignin, requireSigninError, isAuth, isAdmin, categoryUpdate);
router.delete('/del/:categoryId/:userId', requireSignin, requireSigninError, isAuth, isAdmin, categoryRemove);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;