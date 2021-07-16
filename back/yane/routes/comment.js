const express = require('express');
const router = express.Router();
const comsCtrl = require('../controllers/comment');
const auth =  require('../middleware/auth');

router.post('/',auth, comsCtrl.createComs);
router.get('/',auth, comsCtrl.getAllComs);

module.exports = router;