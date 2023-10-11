const express = require('express')
var cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const url = 'mongodb+srv://TalihaArif:bscs0102@cluster0.divek.mongodb.net/searchdb' //use your own url to connect

const app = express()

mongoose.connect(url)
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})



app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


import routes from './routes';
app.use('/api', routes);


app.listen(5000, () => {
    console.log('Server started')
})