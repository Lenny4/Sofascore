class App {
    constructor(scraper) {
        this.scraper = scraper;
        this.allMatchs = null;
    }

    run() {
        this.scraper.init();
    }
}

module.exports = App;