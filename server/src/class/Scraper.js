const request = require('request');

const Const = require('./Const');
const DateManager = require('./DateManager');

class Scraper {
    constructor(mySql) {
        this.sportsSlug = Const.scraper.sportsSlug;
        this.firstDate = DateManager.stringToDate(Const.scraper.firstDate);

        const date = new Date();
        const now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        this.today = new Date(now_utc);

        this.dateToGetDatas = null;

        this.mySql = mySql;
    }

    getUrlForSportAndDate(sportSlug, date) {
        let formatedDate = DateManager.dateToString(date);
        return Const.scraper.baseUrlAPI + "/" + sportSlug + "//" + formatedDate + "/" + Const.scraper.endUrlAPI;
    }

    getUrlForEvent(eventId) {
        return Const.scraper.baseUrlAPI + "/" + eventId + "/" + Const.scraper.endUrlAPI;
    }

    init() {
        // vérifie dans la base de donnée à quelle date on c'est arrêté
        // pour changer la valeur de this.dateToGetDatas
        //si aucune donnée dans la bdd alors this.dateToGetDatas = this.firstDate (le début de l'année)
        //puis appelle le run()
        this.mySql.getDateToGetDatas((result) => {
            (result === null) ? this.dateToGetDatas = this.firstDate : this.dateToGetDatas = result;
            this.run();
        });
    }

    run() {
        // la fonction qui va aller récupérer les données en continu, elle s'auto appelle

        //on commence par this.firstDate (le début de l'année) et on remonte jusqu'à this.today

        //tous les évènements pour une date donnée doivent être sauvegardé en même temps pour
        // être sûre qu'on n'oublie aucun match lorsque l'on stop le programme

        this.sportsSlug.map((sportSlug) => {
            // parfois la request ne répond pas il faut redémarrer le serveur
            request(this.getUrlForSportAndDate(sportSlug, this.dateToGetDatas), {json: true}, (err, res, body) => {
                this.mySql.saveEventsInBdd(body, () => {
                    this.dateToGetDatas = DateManager.addDays(this.dateToGetDatas, 1);
                    if (DateManager.isLowerDate(this.dateToGetDatas, this.today) === false) {
                        this.run();
                    } else {
                        console.log("pas de match supplémentaire à ajouter");
                    }
                });
            });
        });
    }
}

module.exports = Scraper;