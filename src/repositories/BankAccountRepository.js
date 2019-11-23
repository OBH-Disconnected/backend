class BankAccountRepository {
    constructor(mysqlConnection) {
        this.mysqlConnection = mysqlConnection;
    }

    async getByUserId(userId) {
        var sql = "SELECT * FROM accountnumbers WHERE userId=" + userId;
        var result = await this.mysqlConnection.query(sql)
        return result;
    }

    async getSingleById(id) {
        var sql = "SELECT * FROM accountnumbers WHERE id=" + id;
        var result = await this.mysqlConnection.query(sql)
        return result[0];
    }

    async add(userId, balance, accountNumber, name, surname) {
        var sql = "INSERT INTO accountnumbers (userId,balance,accountNumber,name,surname) VALUES ('" + userId + "','" + balance + "','"
            + accountNumber + "','" + name + "', '" + surname + "')";
        await this.mysqlConnection.command(sql);
    }

    async update(bankAccount) {
        var sql = "UPDATE accountnumbers SET balance=" + bankAccount.balance + " WHERE id=" + bankAccount.id;
        await this.mysqlConnection.command(sql);
    }

    async remove(id) {
        var sql = "DELETE FROM accountnumbers WHERE id=" + id;
        await this.mysqlConnection.command(sql);
    }
}
module.exports = BankAccountRepository