var express = require('express');
var router = express.Router();



var Data = require('./Routes/Authentication/Data')


router.use('/Order',Data);

module.exports = router;
