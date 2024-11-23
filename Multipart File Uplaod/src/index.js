const express = require("express");
const cors = require("cors");
const {userRouter} = require("./router/userRouter");
const {connectDB} = require("./db");


const app = express();

const port = process.env.PORT || 5000;

//! middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.use('/api/users', userRouter);


//! Start the application
const startApplication = async () => {
    try {
        await connectDB(); // Connect to the database
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
};


startApplication().catch((err) => {
    console.error("Failed to start the server:", err);
});