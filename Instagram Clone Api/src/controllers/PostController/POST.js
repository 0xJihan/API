const {getConnection} = require("../../db/database");
const {writeFile} = require("../../middlewares/WriteFile");
const POST = async function (req, res) {

    const data = req.body.data ? JSON.parse(req.body.data) : null;

    const {category, caption, author} = data;

    if (!data) {
        return res.status(400).json({
            "message": "Invalid Request. Data missing", "success": false
        })
    }

    const dbConnection = getConnection();


    writeFile(`post/${category}`, req.file.buffer)(req, res);

   await dbConnection.query('INSERT INTO posts_info (author,category, caption, postedFile,uid) VALUES (?,?, ?, ?,?)', [author, category, caption, req.filePath, req.uid]);

   const result = await dbConnection.query('SELECT * FROM posts_info WHERE postedFile = ?', [req.filePath]);


    res.json(result[0]);
}

module.exports = {POST};