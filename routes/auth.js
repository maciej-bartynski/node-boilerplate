const router = require('express').Router();
const { signup, signin, signout } = require('../controllers/auth');
const { signUpValidator } = require('../util');

router.post('/signup', signUpValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;