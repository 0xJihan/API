const {getConnection} = require("../../../db/database");
const bcrypt = require("bcrypt");


const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const dbConnection = await getConnection();

        //! Check if the user exists
        const [user] = await dbConnection.query(`SELECT * FROM user_info WHERE email = ?`, [email]);

        //! If no user found, return an error
        if (user.length === 0) {
            return res.status(401).json({
                "message": "User does not exist", "success": false
            });
        }

        //! Get the user record
        const {password: hashedPassword, token} = user[0];

        //! Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            return res.status(401).json({
                "message": "Invalid  password", "success": false
            });
        }


        //! Return success response with user details and token
        return res.status(200).json({
            "message": "Logged in Successfully", "success": true, "token": token
        });
    } catch (err) {
        console.error(err); //! Log error for debugging
        res.status(500).json({
            "message": "Server error", "success": false
        });
    }
};


module.exports = {login};