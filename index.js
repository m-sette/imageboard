const express = require("express");
const app = express();
const db = require("./utils/db");

app.use(express.static("./public"));

// app.get("/animals", (req, res) => {
//     let array = [
//         {
//             name: "First",
//             second: "###"
//         },
//         {
//             name: "Second",
//             second: 2222222
//         }
//     ];
//     res.json(array);
// });

app.get("/images", (req, res) => {
    db.getImages().then(result => {
        let images = result.rows;
        res.json(images);
    });
});

app.listen(8080, () => console.log("image bord on port 8080"));
