const Const = require('./Const');
const DateManager = require('./DateManager');

class Scraper {
    constructor(mySql) {
        this.sportsSlug = Const.scraper.sportsSlug;
        this.lastDate = DateManager.stringToDate(Const.scraper.lastDate);

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

    init() {
        // vérifie dans la base de donnée à quelle date on c'est arrêté
        // pour changer la valeur de this.dateToGetDatas
        //puis appelle le run()
        console.log(this.lastDate, this.today, this.dateToGetDatas);
    }

    run() {
        // la fonction qui va aller récupérer les données en continu, elle s'auto appelle

        //tous les évènements pour une date donnée doivent être sauvegardé en même temps pour
        // être sûre qu'on n'oublie aucun match lorsque l'on stop le programme
    }
}

module.exports = Scraper;