var express = require("express")
const app = express();
app.use(express.json());
var cors = require('cors')
app.use(cors())
var MCCRepository = require("./repositories/MCCRepository")
var MySQLConnection = require("./repositories/MySQLConnection")
var UserService = require("./services/UserService")

app.post("/users/login", async (req, res) => {
    try {
        var command = req.body
        var mySqlConnection = new MySQLConnection();
        var userService = new UserService(mySqlConnection)
        var result = await userService.login(command.login, command.password)
        res.send(result)
    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
})

app.get("/users/:id", async (req, res) => {
    try {
        var id = req.params.id;
        var mySqlConnection = new MySQLConnection();
        var userService = new UserService(mySqlConnection)
        var result = await userService.get(id);
        res.send(result)
    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
})

app.put("/users/:id", async (req, res) => {
    try {
        var id = req.params.id;
        var command = req.body;
        var mySqlConnection = new MySQLConnection();
        var userService = new UserService(mySqlConnection)
        await userService.setSaving(id, command.saving)
        res.send("")
    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
})

var mccRepository = new MCCRepository();
app.get("/mcc/:id", (req, res) => {
    try {
        var id = req.params.id;
        res.send(mccRepository.getSingle(id))
    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
})

app.get("/mcc", (req, res) => {
    try {
        res.send(mccRepository.get());
    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
})


app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
);