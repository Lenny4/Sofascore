// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('../')(server);
const port = process.env.PORT || 3000;

const App = require('./class/App');
const Scraper = require('./class/Scraper');
const MySql = require('./class/MySql');

const Const = require('./class/Const');

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

const scraper = new Scraper();
const mySql = new MySql();
mySql.init();

const sofascore = new App(mySql, scraper);


// Routing
// app.use(express.static(path.join(__dirname, 'public')));

// io.on('connection', (socket) => {
//     // example de d'event socket
//     socket.on('event', (data) => {
//         console.log("data");
//     });
// });
