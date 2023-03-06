var express = require('express');
var router = express.Router();

const User = require("../models/user");

const authenticate = require("./auth");
const { getUser, updateUser, deleteUser,  } = require('../controllers/usersController');

router.get('/getUser', authenticate, getUser);
router.put('/updateUser', authenticate, updateUser);
router.delete('/deleteUser', authenticate, deleteUser);

module.exports = router;
