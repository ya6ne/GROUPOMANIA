var db = require('../models');
const jwt = require('jsonwebtoken');
var reg = require('../regex');

exports.createComs = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN); 
    const Id = decodedToken.userId;
    console.log(req.body.content);
    if(!reg.xtxt.test(req.body.content)){
        return res.status(400).json({ 'error': 'CHAMPS INVALIDE' });
    }
    db.Comment.create({
        ...req.body,
        UserId:Id   
    })
    .then(coms => {
        db.Comment.findOne({ where : {id:coms.dataValues.id},
            include: [{
                model: db.User,
                attributes : ['id','firstname','lastname']
            }]
        }).then(com =>  res.status(201).json(com) )
        .catch(e => res.status(500).json(e))
    })
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


