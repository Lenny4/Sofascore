// Setup basic express server
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

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

const mySql = new MySql();
const scraper = new Scraper(mySql);
const appSofascore = new App(scraper);

server.listen(port, () => {
    mySql.init();
    appSofascore.run();
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

if (appSofascore.allMatchs === null) {
    mySql.getAllMatchs((allMatchs) => {
        appSofascore.allMatchs = allMatchs;
    });
}

app.post('/matchs', (req, res) => {
    res.send(appSofascore.allMatchs);
});