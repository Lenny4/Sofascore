const Const = require('./Const');
const mysql = require('mysql');

class MySql {
    constructor() {
        this.host = Const.mySql.host;
        this.user = Const.mySql.user;
        this.password = Const.mySql.password;
        this.database = Const.mySql.database;
        this.con = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
        });
    }

    // https://www.w3schools.com/nodejs/nodejs_mysql.asp
    init() {
        this.createTablesIfDoesntExist();
    }

    createTablesIfDoesntExist() {
        //compte le nombre de table dans la base de données
        const sqlNumberTable = "SELECT COUNT(*) AS nB FROM information_schema.tables WHERE table_schema = '" + this.database + "'";
        this.con.query(sqlNumberTable, (err, result) => {
            if (err) {
                throw err;
            } else {
                //si le nombre de table est inférieur à 1 alors on créer toutes les tables
                if (!result[0].nB >= 1) {
                    const sqls = [
                        "CREATE TABLE `event`( `id` int(11) NOT NULL, `name` varchar(255) NOT NULL, `sport` varchar(255) NOT NULL, `date` date NOT NULL, `json` text NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1;",
                        "ALTER TABLE `event` ADD PRIMARY KEY(`id`)",
                    ];
                    sqls.map((sql) => {
                        this.con.query(sql, (err, result) => {
                            if (err) throw err;
                        });
                    });
                    console.log("Les tables ont bien été crées");
                } else {
                    console.log("Les tables sont déjà crées. Pour les mettre à jour la structure faire un drop de toutes les tables ou un truncate de la base de donnée");
                }
            }
        });

    }

    saveEventInBdd(event) {
        //example
    }
}

module.exports = MySql;