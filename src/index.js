var express = require("express")
const app = express();
var MCCRepository = require("./repositories/MCCRepository")

var mccRepository = new MCCRepository();
app.get("/mcc/:id", (req, res) => {
    var id = req.params.id;
    res.send(mccRepository.getSingle(id))
})

app.get("/mcc", (req, res) => {
    res.send(mccRepository.get());
})


app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
);