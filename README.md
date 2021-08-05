# yane
<h3>Getting started</h3>
git clone https://github.com/ya6ne/yane.git
<h3>Back-end: setup</h3>
cd back</br>
cd yane</br>
then: </br>
npm install</br>
start server: nodemon server
<h3>Front-end: setup</h3>
cd front</br>
cd groupomania</br>
then:</br>
npm install</br>
start server : npm start
<h3>Database :</h3>
Make sure you have MySQL installed globally </br>
cd back</br>
cd yane</br>
You'll need to verify that the username and password in the config config.js file, match your local MySQL credentials.</br>
npx sequelize-cli db:create</br>
npx sequelize-cli db:migrate
<h3>What is this project ?</h3>
I have created a corporate social network, for a fictive company. For this project, I used below techs :

For the server : Node.js and Express framework</br>
For the database : MySQL language and Sequelize ORM</br>
For the frontend : ReactJs and bootstrap


