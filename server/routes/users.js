var express = require('express');
var router = express.Router();
const { signup } = require('../actions/users');
router.post('/',signup);

module.exports = router;
