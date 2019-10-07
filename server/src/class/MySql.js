const Const = require('./Const');
const mysql = require('mysql');

class MySql {
    constructor() {
        this.host = Const.mySqlHost;
        this.user = Const.mySqlUser;
        this.password = Const.mySqlPassword;
        this.database = Const.mySqlDatabase;
        this.con = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
        });
    }

    // https://www.w3schools.com/nodejs/nodejs_mysql.asp
    init() {
        this.con.connect((err) => {
            if (err) {
                throw err;
            } else {
                this.createDatabaseAndTableIfDoesntExist();
            }
        });
    }

    createDatabaseAndTableIfDoesntExist() {
        const sqlNumberTable = "SELECT COUNT(*) AS nB FROM information_schema.tables WHERE table_schema = '" + this.database + "'";
        this.con.query(sqlNumberTable, (err, result) => {
            if (err) {
                throw err;
            } else {
                if (!result[0].nB >= 1) {
                    const sqls = [
                        "CREATE TABLE `event` ( `id` int(11) NOT NULL, `name` varchar(255) NOT NULL, `json` text NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=latin1;",
                        "ALTER TABLE `event` ADD PRIMARY KEY (`id`);",
                        "ALTER TABLE `event` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;",
                    ];
                    sqls.map((sql) => {
                        this.con.query(sql, (err, result) => {
                            if (err) throw err;
                        });
                    });
                    console.log("All Tables and Datas created successfully!");
                } else {
                    console.log("All Tables and Datas already created. To have a new database just drop all the tables or truncate the database");
                }
            }
        });

    }

    saveEventInBdd(event) {
        //example
    }
}

module.exports = MySql;