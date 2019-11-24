const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts')
const fs = require('fs');
const {spawn} = require('child_process')
var bodyParser = require('body-parser');
var multer = require('multer');
app.use(express.static("./public")); //all request from customer are taken on public folder
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const server = require('http').Server(app);

server.listen(process.env.PORT || 3000);
var user = [{"username": "admin", "password": 123}]

/** API path that will upload the files */

app.get("/", function (req, res) {
    res.render("index")
})


app.post("/ana", function(req, res){
    var process = spawn('python', ["./model.py"]);
    process.stdout.on('data', function (data) {
        
        fs.readFile('./data/resuilt.json', 'utf8', function (err, d) {
            if (err) {
                res.json({
                    error_code: 1,
                    err_desc: err
                });
                return;
            }
            var obj = JSON.parse(d);
            res.send(obj);
        });
    })
});

app.post("/data",function(req, res){
    list = []
    let rawdata = fs.readFileSync('./data/data.json');
    let data = JSON.parse(rawdata);
    data = data[req.body.name];
    let length = Object.keys(data).length;
    for (i = 0; i < length; i++) {
        d = data[Object.keys(data)[i]].toFixed(2)
        list.push(parseFloat(d))
    }
    res.send(list)
});



app.post("/getaverage", function(req, res){
    var process = spawn('python', ["./mean.py"]);

    process.stdout.on('data', function (data) {
        fs.readFile('./data/mean.json', 'utf8', function (err, d) {
            if (err) {
                res.json({
                    error_code: 1,
                    err_desc: err
                });
                return;
            }
            var obj = JSON.parse(d);
            res.send(obj);
        });
    })
});