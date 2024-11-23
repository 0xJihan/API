const {validateToken} = require("../middlewares/Auth");
const {signup} = require("../controllers/UserController/auth/Signup");
const {login} = require("../controllers/UserController/auth/Login");
const {getProfile} = require("../controllers/UserController/profile/GetProfile");
const {setProfile} = require("../controllers/UserController/profile/SetProfile");
const uploadFile = require("../middlewares/UploadFile");

const userRouter = require('express').Router();

//! User Routes

userRouter.post('/signup',uploadFile('image'),signup)
userRouter.post('/login',login)


userRouter.get('/profile',validateToken,getProfile)

userRouter.post('/profile' , validateToken ,uploadFile('image'), setProfile)



module.exports = {userRouter};