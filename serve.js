const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts')
const fs = require('fs');

const {
    spawn
} = require('child_process')
var bodyParser = require('body-parser');
const axios = require('axios')
app.use(express.static("./public")); //all request from customer are taken on public folder
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayouts);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
const server = require('http').Server(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
  });
var user = [{
    "username": "admin",
    "password": 123
}]


/** API path that will upload the files */

app.get("/", function (req, res) {
    res.render("index")
})


app.post("/ana", function (req, res) {
    const getdata = async () => {
        try {
            return await axios.get('http://127.0.0.1:5000/getresult')
        } catch (error) {
            console.error(error)
        }
    }
    const data = async () => {
        const result = getdata()
            .then(response => {
                response.data.predict = jsontoarray(JSON.parse(response.data.predict)["0"]);
                response.data.y_test = jsontoarray(JSON.parse(response.data.y_test)["Yearly Amount Spent"]);
                // response.data.data.predict = jsontoarray(response.data.data.predict["0"]);
                // response.data.data.y_test = jsontoarray(response.data.data.y_test["Yearly Amount Spent"]);
                res.send(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    data()
});

app.post("/data", function (req, res) {
    list = []
    let rawdata = fs.readFileSync('./data/data.json');
    let data = JSON.parse(rawdata);
    data = data[req.body.name];
    list = jsontoarray(data);
    res.send(list)
});

function jsontoarray(data) {
    list = []
    let length = Object.keys(data).length;
    for (i = 0; i < length; i++) {
        d = data[Object.keys(data)[i]].toFixed(2)
        list.push(parseFloat(d))
    }
    return list
}


app.post("/getaverage", function (req, res) {
    // var process = spawn('python', ["./mean.py"]);

    // process.stdout.on('data', function (data) {
    //     fs.readFile('./data/mean.json', 'utf8', function (err, d) {
    //         sd = []
    //         if (err) {
    //             res.json({
    //                 error_code: 1,
    //                 err_desc: err
    //             });
    //             return;
    //         }
    //         let rawdata = fs.readFileSync('./data/week.json');
    //         var c = JSON.parse(rawdata);
    //         sd.push(c)
    //         var obj = JSON.parse(d);
    //         sd.push(obj)
    //         res.send(sd);
    //     });
    // })
});