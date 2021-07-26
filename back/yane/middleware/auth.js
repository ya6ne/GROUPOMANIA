const jwt = require('jsonwebtoken');
var db = require('../models');

module.exports = (req, res, next) => {
  try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN);
      const userId = decodedToken.userId;
      db.User.findOne({where :{id:userId}})
      .then(data => { next()})
      .catch(e => console.log(e))
      

  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

