const DateManager = {
    stringToDate: (string) => {
        const result = string.split('-');
        return new Date(Date.UTC(parseInt(result[0]), parseInt(result[1]) - 1, parseInt(result[2])));
    },

    dateToString: (date) => {
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
    },
};

module.exports = DateManager;