const router = require('express').Router();
const { protected } = require('./../controllers/others');

const {
    isAdmin,
    isAuth,
    userById,
    requireSignin,
    requireSigninError
} = require('./../controllers/user')

router.get('/protected/:userId', requireSignin, requireSigninError, isAuth, isAdmin, protected);
router.param("userId", userById)

module.exports = router;