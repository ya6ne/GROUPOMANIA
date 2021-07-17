const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth')

router.post('/signup',multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/deleteuser', userCtrl.deleteAccount);
router.put('/edituser',multer, userCtrl.editAccount);

module.exports = router;