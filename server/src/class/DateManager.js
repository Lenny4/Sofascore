const DateManager = {
    //  2019-09-21 => object date
    stringToDate: (string) => {
        const result = string.split('-');
        return new Date(Date.UTC(parseInt(result[0]), parseInt(result[1]) - 1, parseInt(result[2])));
    },

    // object date => 2019-09-21
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

    // "01.01.2019." => "2019-01-01"
    sofaScoreStringToDate: (formatedStartDate) => {
        return formatedStartDate.split('.').reverse().join('-').slice(1);
    },

    addDays(date, numberOfDay) {
        let result = new Date(date);
        result.setDate(result.getDate() + numberOfDay);
        return result;
    },

    isSameDate(date1, date2) {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    },
};

module.exports = DateManager;