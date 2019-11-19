const express = require("express");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const { s3Url } = require("./config.json");

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

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const { title, description, username } = req.body;
    const imageUrl = `${s3Url}${req.file.filename}`;
    db.addImage(imageUrl, username, title, description)
        .then(({ rows }) => {
            //console.log(rows[0]);
            res.json({
                image: rows[0]
            });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get("/images", (req, res) => {
    db.getImages(12)
        .then(result => {
            //let images = result.rows;
            res.json(result.rows);
        })
        .catch(err => {
            console.log("error on the image rout: ", err);
        });
});

app.listen(8080, () => console.log("image board on port 8080"));
