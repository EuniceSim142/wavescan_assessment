var express = require('express');
var router = express.Router();

const User = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  console.log("running")
  User.findAll().then(users => res.json(users));
});



module.exports = router;
