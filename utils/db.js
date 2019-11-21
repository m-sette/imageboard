const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/imageboard"
);

module.exports.getImages = function(limit) {
    return db.query(
        `SELECT * FROM images
        ORDER BY created_at DESC
        LIMIT $1`,
        [limit] //to limit the maxmum number of request
    );
};

module.exports.addImage = function(url, username, title, description) {
    return db.query(
        `INSERT INTO images (url, username, title, description)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [url, username, title, description]
    );
};

module.exports.getImageId = function(id) {
    return db.query(
        `
        SELECT * FROM images
        WHERE id=$1
        `,
        [id]
    );
};

module.exports.addComment = function(username, comment, id) {
    return db.query(
        `INSERT INTO comments (username, comment_text, image_id)
        VALUES ($1, $2, $3) RETURNING *
        `,
        [username, comment, id]
    );
};

module.exports.getComments = function(imageId) {
    return db.query(
        `SELECT * FROM comments
        WHERE image_id=$1
        ORDER BY created_at DESC
        `,
        [imageId]
    );
};

// SELECT * FROM comments WHERE image_id = 13
