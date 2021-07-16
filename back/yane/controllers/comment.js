var db = require('../models');
const jwt = require('jsonwebtoken');

exports.createComs = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "secret_key"); 
    const Id = decodedToken.userId;
    console.log(req.body)
    
    
    db.Comment.create({
        ...req.body,
        UserId:Id   
    })
    .then(post => res.status(201).json("commentaire créé"))
    .catch(e => res.status(500).json(e))
}

exports.getAllComs = (req, res, next) => {
    db.Comment.findAll({
        include: [{
            model: db.User,
            attributes : ['firstname','lastname']
        }]
    })
    .then(post => res.status(201).json(post))
    .catch(e => res.status(500).json(e))
}


