var express = require('express');
var router = express.Router();

const usersLogic = require('../controllers/usersController');

const { register, login } = require("../controllers/usersController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * Registers a user.
 */
router.post('/register', register);
router.post('/login', login);

module.exports = router;
