const mongoose = require('mongoose');
const express = require('express');
const dbRoutes = require('./routes/databaseAccess.js');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express()

app.use(cors()) // Use this after the variable declaration


mongoose.connect(process.env.MONGODBURI)
app.use(express.static('build'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/db', dbRoutes);

app.listen(3000,() => {
  console.log('Server for React Native Listening at Port 3000!')
});
