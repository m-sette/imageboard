const express = require("express");
const app = express();
const db = require("./utils/db");

app.use(express.static("./public"));

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
