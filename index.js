const express = require("express");
const shortid = require("shortid");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
    res.render("app", { shortenurl: sec });

});
var sec = "";

//Mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/urldb");

const urlschema = mongoose.mongoose.Schema({
    shorturl: String,
    longurl: String
});
const mapper = mongoose.model("mapper", urlschema);










app.post("/shortenurl", function(req, res) {

    var url = req.body.longurl;
    var shorturl = shortid.generate();
    sec = "localhost:3000/" + shorturl;
    var doc = new mapper({
        shorturl: shorturl,
        longurl: url

    });
    doc.save();
    res.redirect("/");





});


//redirection
app.get("/:url", function(req, res) {
    var d = req.params.url;
    if (d.length >= 7) {
        var req = mapper.findOne({ shorturl: d }, function(err, result) {
            res.redirect(result.longurl);
        });

    }




});





app.listen(3000, function(err) {
    if (err) {
        console.log("not working");

    } else {
        console.log("workinga te 3000");
    }

});