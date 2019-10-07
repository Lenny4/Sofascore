const Const = require('./Const');

class Scraper {
    constructor() {
        this.sportsSlug = Const.scrapper.sportsSlug;
        this.lastDate = this.stringToDate(Const.scrapper.lastDate);

        const date = new Date();
        const now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        this.today = new Date(now_utc);
    }

    getUrlForSportAndDate(sportSlug, date) {
        let formatedDate = this.dateToString(date);
        return Const.scrapper.baseUrlAPI + "/" + sportSlug + "//" + formatedDate + "/" + Const.scrapper.endUrlAPI;
    }

    stringToDate(string) {
        const result = string.split('-');
        return new Date(Date.UTC(parseInt(result[0]), parseInt(result[1]) - 1, parseInt(result[2])));
    }

    dateToString(date) {
        let month = date.getMonth();
        month++;
        let day = date.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        return date.getFullYear() + "-" + month + "-" + day;
    }
}

module.exports = Scraper;