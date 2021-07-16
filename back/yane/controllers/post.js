var db = require('../models');
var reg = require('../regex');
const jwt = require('jsonwebtoken');



exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "secret_key"); 
    const Id = decodedToken.userId; 
    const post = JSON.parse(req.body.post);
    console.log(post , Id)
    
    db.Post.create({
        ...post,
        UserId:Id,
        attachement:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    })
    .then(post => res.status(201).json("objet crée"))
    .catch(e => res.status(500).json(e))
}

exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        include: [{
            model: db.User,
            attributes : ['firstname','lastname','isAdmin','userPhoto']
        }]
    })
    .then(post => res.status(201).json(post))
    .catch(e => res.status(500).json(e))
}

exports.deletePost = (req, res, next) => {
    db.Post.destroy({where : {id:9}})
    .then(e => res.status(201).json("le post a été supprimé"))
    .catch(e => res.status(500).json("impossible de supprimer de post"))
}

exports.updatePost = (req, res, next) => {
    db.post.update({})
    .then(post => res.status(201).json("votre post a été modifié"))
    .catch(e => res.status(500).json("impossible de modifier ce post"))
}

