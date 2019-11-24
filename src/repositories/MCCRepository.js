var data = require("./convertcsv.json");

class MCCRepository {
    getSingle(id) {
        return data.filter(x => x.mcc == id)[0]
    }
    get() {
        return data;
    }
}

module.exports = MCCRepository