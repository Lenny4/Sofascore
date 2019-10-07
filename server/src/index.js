// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('../')(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

/*
 ================================
           _____  _____
     /\   |  __ \|  __ \
    /  \  | |__) | |__) |
   / /\ \ |  ___/|  ___/
  / ____ \| |    | |
 /_/    \_\_|    |_|
 ================================
 */

const App = require('./class/App');
const Scraper = require('./class/Scraper');
const MySql = require('./class/MySql');

const scraper = new Scraper();
const mySql = new MySql();
mySql.init();

const appSofascore = new App(mySql, scraper);
appSofascore.run();


// Routing
// app.use(express.static(path.join(__dirname, 'public')));

// io.on('connection', (socket) => {
//     // example de d'event socket
//     socket.on('event', (data) => {
//         console.log("data");
//     });
// });
