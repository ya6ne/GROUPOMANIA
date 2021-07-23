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
    .then(coms => res.status(201).json("commentaire créé"))
    .catch(e => res.status(500).json(e))
}

exports.getAllComs = (req, res, next) => {
    db.Comment.findAll({
        include: [{
            model: db.User,
            attributes : ['id','firstname','lastname']
        }]
    })
    .then(coms => res.status(201).json(coms))
    .catch(e => res.status(500).json(e))
}

exports.deleteCom = (req, res, next) => {
    let comId = req.body.id
    console.log(comId)
    db.Comment.destroy({where : {id:comId}})
    .then(coms => res.status(201).json("le commentaire a été supprimé"))
    .catch(e => res.status(500).json("impossible de supprimer le commentaire"))
}


