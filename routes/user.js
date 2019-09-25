const router = require('express').Router();
const { protected } = require('./../controllers/others');

const {
    isAdmin,
    isAuth,
    userById,
    requireSignin,
    requireSigninError,
    userRead,
} = require('./../controllers/user')

router.get('/protected/:userId', requireSignin, requireSigninError, isAuth, isAdmin, protected);
router.get('/read/:userId', requireSignin, isAuth, userRead)
router.param("userId", userById)

module.exports = router;