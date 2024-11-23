const {getConnection} = require("../../db/database");

const GetALlPost = async (req, res) => {
    const dbConnection = await getConnection();

    const [result] = await dbConnection.query('SELECT * FROM posts_info order by id desc');

    res.json(result)
}

module.exports = {GetALlPost};
