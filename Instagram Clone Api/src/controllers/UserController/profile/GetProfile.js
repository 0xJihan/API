const {getConnection} = require("../../../db/database");

const getProfile = async (req, res) => {

    const uid = req.uid;

    const dbConnection = await getConnection();

    try {
        // Query the database to retrieve user information
        const [rows] = await dbConnection.query(`SELECT * FROM user_profile WHERE uid = ?`, [uid]);


        if (rows.length > 0) {
            return res.status(200).json({
                "message": "Profile successfully retrieved",
                "email" : req.email,
                "result": rows[0], // Return the first (and only) row
            });
        } else {
            return res.status(404).json({
                "message": "User not found", "id": uid
            });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({
            "message": "Internal Server Error"
        });
    }
};

module.exports = {getProfile};