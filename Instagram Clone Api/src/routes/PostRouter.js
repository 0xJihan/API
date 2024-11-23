const {validateToken} = require("../middlewares/Auth");

const uploadFile = require("../middlewares/UploadFile");
const {DELETE} = require("../controllers/PostController/DELETE");
const {POST} = require("../controllers/PostController/POST");
const {GetALlPost} = require("../controllers/PostController/ALlPost");
const {getAllReels} = require("../controllers/PostController/Reels");

const postRouter = require("express").Router();

postRouter.post("/post", validateToken,uploadFile('file'),POST)
postRouter.get("/post", validateToken,GetALlPost)
postRouter.get("/reels", validateToken,getAllReels)
postRouter.delete("/post", validateToken,DELETE)



module.exports = {postRouter};