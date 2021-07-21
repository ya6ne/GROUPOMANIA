const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth =  require('../middleware/auth');
const multer = require('../middleware/multerPost-config');



router.post('/',multer, postCtrl.createPost);
router.get('/', postCtrl.getAllPosts);
router.delete('/', postCtrl.deletePost);
/* router.put('/:id', postCtrl.updatePost); */

module.exports = router;