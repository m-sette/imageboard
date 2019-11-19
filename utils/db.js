const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/imageboard"
);

module.exports.getImages = function() {
    return db.query(
        `SELECT * FROM images
        ORDER BY created_at DESC`
        //LIMIT $1`,
    );
};