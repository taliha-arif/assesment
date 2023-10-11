"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const url = 'mongodb+srv://TalihaArif:bscs0102@cluster0.divek.mongodb.net/searchdb'; //use your own url to connect
const app = express();
mongoose.connect(url);
const con = mongoose.connection;
con.on('open', () => {
    console.log('connected...');
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const routes_1 = __importDefault(require("./routes"));
app.use('/api', routes_1.default);
app.listen(5000, () => {
    console.log('Server started');
});
