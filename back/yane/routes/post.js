const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth =  require('../middleware/auth');
const multer = require('../middleware/multerPost-config');



router.post('/',multer, postCtrl.createPost);
router.get('/', postCtrl.getAllPosts);
router.delete('/:id', postCtrl.deletePost);
router.put('/:id', postCtrl.updatePost);
/* router.put('/:id', postCtrl.updatePost);


router.get('/:id' ,postCtrl.getOnePost); */

module.exports = router;