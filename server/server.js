require('dotenv').config();
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const exp = require('constants');

const app = express();
let server = http.createServer(app);

const publicPath =  path.resolve(__dirname,'../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

module.exports.io = socketIO(server);
require('./socketS/socket');



server.listen(port, (err)=>{
    if(err){
        console.log('error en el servidor comuniquese con el administrador',err);
    }

    console.log(`servidor corrriendo en el puerto ${port}`)
})
