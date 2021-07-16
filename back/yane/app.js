const express = require('express');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const comsRoute = require('./routes/comment');
const path = require('path');
const { Sequelize } = require('sequelize');

const app = express();



app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json()); 

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/coms', comsRoute);


/* app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoute);
app.use('/api/sauces', sauceRoute); */

module.exports = app;