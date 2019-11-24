var mysql = require('mysql');


class MySQLConnection {
    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "kaching"
        });

        this.con.connect(function (err) {
            if (err) throw err;
        });
    }

    query(sql) {
        return new Promise((resolve, reject) => {
            this.con.connect((err2) => {
                this.con.query(sql, function (err, result, fields) {
                    resolve(result)
                })
            })

        })
    }

    command(sql) {
        return new Promise((resolve, reject) => {
            this.con.connect((err2) => {
                this.con.query(sql, function (err, result) {
                    if (err) throw err;
                    resolve(true)
                });
            })
        })
    }

}

module.exports = MySQLConnection