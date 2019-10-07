const Const = require('./Const');
const DateManager = require('./DateManager');

class Scraper {
    constructor() {
        this.sportsSlug = Const.scrapper.sportsSlug;
        this.lastDate = DateManager.stringToDate(Const.scrapper.lastDate);

        const date = new Date();
        const now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        this.today = new Date(now_utc);

        this.dateToGetDatas = null;
    }

    getUrlForSportAndDate(sportSlug, date) {
        let formatedDate = DateManager.dateToString(date);
        return Const.scrapper.baseUrlAPI + "/" + sportSlug + "//" + formatedDate + "/" + Const.scrapper.endUrlAPI;
    }

    init() {
        // vérifie dans la base de donnée à quelle date on c'est arrêté
        // pour changer la valeur de this.dateToGetDatas
    }

    run() {
        // la fonction qui va aller récupérer les données en continu
    }
}

module.exports = Scraper;