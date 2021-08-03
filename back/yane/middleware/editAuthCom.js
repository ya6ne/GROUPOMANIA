const jwt = require('jsonwebtoken');
var db = require('../models');

module.exports = (req, res, next) => {
  try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN); 
      const userId = decodedToken.userId;
      db.Comment.findOne({where : { id : req.body.id}})
      .then( data => {
        console.log(req.body , data)
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