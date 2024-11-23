const {getConnection} = require("../../../db/database");
const bcrypt = require("bcrypt");
const {v4: uuid} = require("uuid");
const jwt = require("jsonwebtoken");
const {writeFile} = require("../../../middlewares/WriteFile");
const os = require("os");

const signup = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({message: "Image is required", success: false});
    }

    const data = req.body.data ? JSON.parse(req.body.data) : null;
    const {email, password, userProfile} = data;

    //! Check if the data is in the correct format
    if (data === null || !email || !password || !userProfile) {
        return res.status(400).json({message: "Invalid Data Format", success: false});
    }

    else {
        try {
            const dbConnection = await getConnection();

            //! Check if the user already exists
            const [oldResult] = await dbConnection.query(`SELECT * FROM user_info WHERE email = ?`, [email]);
            if (oldResult.length > 0) {
                return res.status(409).json({message: "User already exists", success: false});
            }

            //! Uploading file
            writeFile('profile/image', req.file.buffer)(req, res)

            //! Hash password and generate token
            const hashedPassword = await bcrypt.hash(password, 10);
            const randomId = uuid().replace(/-/g, '');
            const token = await jwt.sign({email, uid: randomId}, process.env.SECRET_KEY);


            // Store user info in the database
            await dbConnection.query(`INSERT INTO user_info (uid, email, password, token) VALUES (?, ?, ?, ?)`, [randomId, email, hashedPassword, token]);

            //! Store user profile in the database
            const query = `INSERT INTO user_profile (name, username, bio, website, phone, gender,image,uid) VALUES (?, ?, ?, ?, ?, ?,?,?)`;
            const params = [userProfile.name, userProfile.username, userProfile.bio, userProfile.website, userProfile.phone, userProfile.gender, req.filePath,randomId];
            await dbConnection.query(query, params);

            return res.status(200).json({
                message: "User created successfully", success: true, token: token
            });


        } catch (err) {
            res.status(500).json({message: "Invalid request", success: false});
            console.log(err);
        }
    }
}




function getLocalIpAddress() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        const addresses = networkInterfaces[interfaceName];
        for (const address of addresses) {
            if (address.family === 'IPv4' && !address.internal) {
                return address.address;
            }
        }
    }
    return null;
}
module.exports = {signup};