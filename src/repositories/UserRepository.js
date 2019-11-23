class UserRepository {
    constructor(mysqlConnection) {
        this.mysqlConnection = mysqlConnection;
    }

    async getSingleById(id) {
        var sql = "SELECT * FROM users WHERE id=" + id;
        var result = await this.mysqlConnection.query(sql)
        return result[0];
    }

    async getSingleByLogin(login) {
        var sql = "SELECT * FROM users WHERE login='" + login + "'";
        var result = await this.mysqlConnection.query(sql)
        return result[0];
    }

    async add(login, hash, salt, saving) {
        var sql = "INSERT INTO users (login,hash,salt,saving) VALUES ('" + login + "','" + hash + "','" + salt + "','" + saving + "')";
        await this.mysqlConnection.command(sql);
    }

    async update(user) {
        var sql = "UPDATE users SET saving='" + user.saving + "' WHERE id=" + user.id;
        await this.mysqlConnection.command(sql);
    }

}

module.exports = UserRepository