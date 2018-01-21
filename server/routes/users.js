var express = require('express');
var router = express.Router();
const { signup,login,lookupUsername } = require('../actions/users');

router.get('/id/:id',lookupUsername);

router.post('/login',login);

router.post('/',signup);

module.exports = router;
