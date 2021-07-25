const jwt = require('jsonwebtoken');
var db = require('../models');

module.exports = (req, res, next) => {
  try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'secret_key'); /* variable d'envirenement */
      const userId = decodedToken.userId;
      db.Post.findOne({where : { id : req.body.postId}})
      .then( data => {
        if(data.userId == userId){
          next()
        } else {
          throw 'erreur'
        }
      })
      .catch(e => console.log(e))
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
