const router = require('express').Router()
const { User } = require('../controllers')

router.post('/signup', User.signup)
router.post('/signin', User.signin)

module.exports = router