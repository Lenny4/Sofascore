const Const = require('./Const');
const mysql = require('mysql');

class MySql {
    constructor() {
        this.host = Const.mySqlHost;
        this.user = Const.mySqlUser;
        this.password = Const.mySqlPassword;
        this.con = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password
        });
    }

    // https://www.w3schools.com/nodejs/nodejs_mysql.asp
    init() {
        this.con.connect(function (err) {
            if (err) throw err;
            console.log("MySql Connected");
        });
    }

    saveEventInBdd(event) {
        //example
    }
}

module.exports = MySql;