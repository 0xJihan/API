const {getConnection} = require("../../../db/database");
const {writeFile} = require("../../../middlewares/WriteFile");
const setProfile = async (req, res) => {


    const imageFile = req.file;


    const userProfile = req.body.data ? JSON.parse(req.body.data) : null;


    //! checking if the request body contains the data
    if (!userProfile) {
        return res.status(400).json({
            "message": "Invalid Request. Data missing", "success": false
        })
    }


    const {username, name, website, bio, phone, gender} = userProfile;

    try {

        const dbConnection = await getConnection();

        let query;
        let params;

        if (imageFile) {
            writeFile('profile/image', imageFile.buffer)(req, res);

            query = 'UPDATE user_profile SET `username` = ?, `name` = ?, `website` = ?, `bio` = ?, `phone` = ?, `gender` = ? , `image` = ? WHERE `uid` = ?';
            params = [username, name, website, bio, phone, gender, req.filePath, req.uid];
        } else {
            query = 'UPDATE user_profile SET `username` = ?, `name` = ?, `website` = ?, `bio` = ?, `phone` = ?, `gender` = ? WHERE `uid` = ?';
            params = [username, name, website, bio, phone, gender, req.uid];
        }


        const [result] = await dbConnection.query(query, params);


        //! checking if update was successful
        if (result.affectedRows > 0) {

            const [rows] = await dbConnection.query(`SELECT * FROM user_profile WHERE uid = ?`, [req.uid]);

            //! retrieving all user information

            res.status(200).json({
                "message": "Profile successfully updated", "success": true, "result": rows[0],
            })
        } else {
            console.log('No rows were updated');
        }


    } catch (err) {
        console.log(err)
        res.status(400).json({
            "message": "Invalid Request", "success": false
        })
    }


}


module.exports = {setProfile: setProfile};