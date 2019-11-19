const express = require("express");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const app = express();

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
const db = require("./utils/db");

app.use(express.static("./public"));
app.post("/upload", uploader.single("file"), (req, res) => {
    console.log("this is the upload route");
    console.log("Input ......", req.body);
    console.log("req.file....", req.file);
    if (req.file) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get("/images", (req, res) => {
    db.getImages()
        .then(result => {
            //let images = result.rows;
            res.json(result.rows);
        })
        .catch(err => {
            console.log("error on the image rout: ", err);
        });
});

app.listen(8080, () => console.log("image board on port 8080"));
