const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var db = require('../models');
var reg = require('../regex');
const fs = require('fs');


exports.signup = (req, res, next) => {
  const user = JSON.parse(req.body.user)
  delete user.userPhoto;
  /* ****************************************************** */ 
  if(!user.email){
    return res.status(400).json({ 'error': 'Attention: veuillez renseigner votre email' });
  }
  if(!user.password){
    return res.status(400).json({ 'error': 'Attention: veuillez renseigner un mot de passe valable' });
  }
  if(!user.firstname){
    return res.status(400).json({ 'error': 'Attention: veuillez renseigner votre prénom' });
  }
  if(!user.lastname){
    return res.status(400).json({ 'error': 'Attention: veuillez renseigner votre nom' });
  }
  if(!reg.xmail.test(user.email)){
    return res.status(400).json({ 'error': 'Attention: format email non valide' });
  }
  if(!reg.xnames.test(user.lastname)){
    return res.status(400).json({ 'error': 'Attention: votre nom ne doit pas contenir de caractères spéciaux ni de chiffres' });
  }
  if(!reg.xnames.test(user.firstname)){
    return res.status(400).json({ 'error': 'Attention: votre prénom ne doit pas contenir de caractères spéciaux ni de chiffres' });
  }
  if(!reg.xpw.test(user.password)){
    return res.status(400).json({ 'error': 'Attention: le mot de passe doit être de 8 caractères minimum et doit contenir au moins 1 majuscule 1 minuscule 1 chiffre 1 caractère spécial' });
  }
  /* ****************************************************** */
  bcrypt.hash(user.password, 10)
  .then( hash => {
  /* ****************************************************** */
    if(req.file){
      db.User.create({
        isAdmin: 0,
        ...user,
        password: hash,
        userPhoto:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      })
      .then(user => res.status(201).json(user))
      .catch(e => res.status(500).json("veuillez remplir tous les champs!"))
    } 
  /* ****************************************************** */
    else if (!req.file){
      db.User.create({
        isAdmin: 0,
        ...user,
        password: hash,
        userPhoto:`http://localhost:3000/images/random-user.png`
      })
      .then(user => res.status(201).json(user))
      .catch(e => res.status(500).json("veuillez remplir tous les champs!"))
    }
  /* ****************************************************** */

  })
  .catch(error => res.status(500).json(error))
};

  

  exports.login = (req, res, next) => {
    /* ****************************************************** */
    if(!req.body.email){
      return res.status(400).json({ 'error': 'Attention: veuillez renseigner votre email' });
    }
    if(!req.body.password){
      return res.status(400).json({ 'error': 'Attention: veuillez renseigner un mot de passe valide' });
    }
    if(!reg.xmail.test(req.body.email)){
      return res.status(400).json({ 'error': 'Attention: format email non valide' });
    }
    if(!reg.xpw.test(req.body.password)){
      return res.status(400).json({ 'error': 'Attention: le mot de passe doit être de 8 caractères minimum et doit contenir au moins 1 majuscule 1 minuscule 1 chiffre 1 caractère spécial' });
    }
    /* ****************************************************** */
    db.User.findOne({where : { email: req.body.email}})
    .then( user => {
      if (!user) {
        return res.status(401).json({ error: 'Attention: Utilisateur non trouvé !' });
      }
    /* ****************************************************** */
      bcrypt.compare(req.body.password, user.password)
      .then( valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
          user,
          token: jwt.sign(
            {userId: user.id},
            "secret_key",
            {expiresIn: '1h'})
        })
      })
      .catch(e => res.status(500).json(e))
    })
    .catch(e => res.status(500).json({e}))
  };


  exports.deleteAccount = (req, res, next) => {
  /* ****************************************************** */
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "secret_key"); 
    const Id = decodedToken.userId; 
    db.User.findOne({where : { id: Id}})
    .then( user => {
      const filename = user.userPhoto.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        db.User.destroy({where : { id: Id}})
        .then(user => {
          if(user){
            return  res.status(201).json("compte supprimé")
        } else {
          return res.status(404).json("utilisateur non trouvé")
        }})
        .catch(e => res.status(500).json({e}))


      })
    })
    .catch(e => res.status(500).json({e}))
  }

  exports.editAccount = (req, res, next) => {
    const user = JSON.parse(req.body.user);
    /* ****************************************************** */
    if(!user.email){
      return res.status(400).json({ 'error': 'Attention: veuillez renseigner votre email' });
    }
    if(!user.password){
      return res.status(400).json({ 'error': 'Attention: veuillez renseigner un mot de passe valable' });
    }
    if(!user.firstname){
      return res.status(400).json({ 'error': 'Attention: veuillez renseigner votre prénom' });
    }
    if(!user.lastname){
      return res.status(400).json({ 'error': 'Attention: veuillez renseigner votre nom' });
    }
    if(!reg.xmail.test(user.email)){
      return res.status(400).json({ 'error': 'Attention: format email non valide' });
    }
    if(!reg.xnames.test(user.lastname)){
      return res.status(400).json({ 'error': 'Attention: votre nom ne doit pas contenir de caractères spéciaux ni de chiffres' });
    }
    if(!reg.xnames.test(user.firstname)){
      return res.status(400).json({ 'error': 'Attention: votre prénom ne doit pas contenir de caractères spéciaux ni de chiffres' });
    }
    if(!reg.xpw.test(user.password)){
      return res.status(400).json({ 'error': 'Attention: le mot de passe doit être de 8 caractères minimum et doit contenir au moins 1 majuscule 1 minuscule 1 chiffre 1 caractère spécial' });
    }
  /* ****************************************************** */
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "secret_key"); 
    const Id = decodedToken.userId;
    
    
    bcrypt.hash(user.password, 10)
    .then( hash => {
  /* ****************************************************** */
    if(req.file){
      db.User.update({
        isAdmin: 0,
        ...user,
        password: hash,
        userPhoto:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      },
      {where: {id:Id}})
      .then(user => res.status(201).json("Votre profil a été modifié"))
      .catch(e => res.status(500).json("veuillez remplir tous les champs!"))
    } 
  /* ****************************************************** */
    else if (!req.file){
      db.User.update({
        isAdmin: 0,
        ...user,
        password: hash,
        userPhoto:`http://localhost:3000/images/random-user.png1626109420426.png`
      },
      {where: {id:Id}})
      .then(user => res.status(201).json("Votre profil a été modifié"))
      .catch(e => res.status(500).json("veuillez remplir tous les champs!"))
    }
  /* ****************************************************** */

  })
  .catch(error => res.status(500).json(error))
}
 



  