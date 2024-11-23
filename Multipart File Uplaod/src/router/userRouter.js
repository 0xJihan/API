const {uploadFile} = require("../middlewares/multer");
const userRouter = require('express').Router();



userRouter.get('/upload',(req,res)=>{
    res.json({
        'message' : "Welcome to Your Upload End points"
    })
});


userRouter.post('/upload',uploadFile.single('image'),(req,res)=>{
    try{

        res.status(200).json({
            'message' : 'File uploaded successfully',
            'file' : req.file
        });
       // res.status(200).send(req.file)
    }catch(err){
        res.status(400).send({error:err});
    }
});

module.exports = {userRouter};