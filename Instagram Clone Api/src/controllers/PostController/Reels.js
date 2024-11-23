const {getConnection} = require("../../db/database");

const getAllReels = async (req, res) => {
    const dbConnection = await getConnection();
    const [result] = await dbConnection.query('SELECT * FROM posts_info WHERE category = ? ORDER BY id DESC', ['reels']);
    res.json(result)
}

module.exports = {getAllReels};