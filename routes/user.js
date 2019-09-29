const router = require('express').Router();
const { protected } = require('./../controllers/others');

const {
    isAdmin,
    isAuth,
    userById,
    requireSignin,
    requireSigninError,
    userRead,
    userUpdate
} = require('./../controllers/user')

router.get('/protected/:userId', requireSignin, requireSigninError, isAuth, isAdmin, protected);
router.get('/read/:userId', requireSignin, requireSigninError, isAuth, userRead)
router.post('/edit/:userId', requireSignin, requireSigninError, isAuth, userUpdate)
router.param("userId", userById)

module.exports = router;