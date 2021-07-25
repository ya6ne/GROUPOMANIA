const express = require('express');
const router = express.Router();
const comsCtrl = require('../controllers/comment');
const comAuth = require('../middleware/editAuthCom');
const auth = require('../middleware/auth');

router.post('/',auth, comsCtrl.createComs);
router.get('/',auth, comsCtrl.getAllComs);
router.delete('/',comAuth,comsCtrl.deleteCom)

module.exports = router;