var express=require('express');
var router = express.Router();

var _data=require('../../Controllers/Authentication/Data.Controllers');


router.post('/placeorder',_data.placeorder);
router.get('/showorder',_data.showorder);
router.delete('/cancelorder',_data.cancelorder);
router.put('/modifyorder',_data.modifyorder);
router.get('/showorders',_data.showorders);

module.exports = router;
