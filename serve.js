const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts')
const {
    spawn
} = require('child_process')
var bodyParser = require('body-parser');
var multer = require('multer');
app.use(express.static("./public")); //all request from customer are taken on public folder
app.set("view engine", "ejs");
app.set("views", "./views");
const fs = require('fs');
app.use(expressLayouts);
app.use(bodyParser.json());
const server = require('http').Server(app);

server.listen(process.env.PORT || 3000);

//upload file
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
var upload = multer({ //multer settings
    storage: storage
}).single('file');
/** API path that will upload the files */
app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            res.json({
                error_code: 1,
                err_desc: err
            });
            return;
        } else {
            res.render("/")
        }
    });
});
app.get("/", function (req, res) {
    res.render("index")
})

app.post("/getlistfiles", function (req, res) {
    var list = [];
    fs.readdir('./public/uploads/', (err, files) => {
        files.forEach(file => {
            list.push(file)
        });
        res.send(list)
    });
})
app.get("/ana", function(req, res){
    var process = spawn('python', ["./model.py", req.query.filename]);

    process.stdout.on('data', function (data) {
        
        fs.readFile('data.json', 'utf8', function (err, d) {
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
