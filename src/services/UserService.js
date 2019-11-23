var UserRepository = require("../repositories/UserRepository")

class UserService {
    constructor(mysqlConnection) {
        this.userRepository = new UserRepository(mysqlConnection);
    }

    async register(login, password, saving) {
        await this.userRepository.add(login, password, password, saving)
    }

    async login(login, password) {
        var user = await this.userRepository.getSingleByLogin(login)
        return {
            isLogged: user.login == login && user.hash == password,
            token: user.login == login && user.hash == password ? user.login + user.saving + user.password : null,
            id: user.login == login && user.hash == password ? user.id : null
        }
    }

    async setSaving(userId, saving) {
        var user = await this.userRepository.getSingleById(userId);
        if (user == null) {
            return {
                error: "user does not exists"
            }
        }
        user.saving = saving;
        await this.userRepository.update(user);
    }

    async get(userId) {
        return await this.userRepository.getSingleById(userId)
    }
}

module.exports = UserService;