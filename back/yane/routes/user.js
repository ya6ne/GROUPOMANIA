const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth')

router.post('/signup',multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/deleteUser', userCtrl.deleteAccount);
/* router.delete('/editUser', userCtrl.editAccount); */

module.exports = router;