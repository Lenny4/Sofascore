class App {
    constructor(scraper) {
        this.scraper = scraper;
    }

    run() {
        this.scraper.init();
    }
}

module.exports = App;