const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const cors = require("cors");

const {connectDB} = require("./db/database");
const {userRouter} = require("./routes/userRouter");
const {postRouter} = require("./routes/PostRouter");

//! Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Default port to 3000 if not specified in .env

//! Middleware configurations
// const rateLimitOptions = {
//     windowMs: 2 * 60 * 1000, //? 100 request per 2 minutes
//     max: 100,
//     message: {'message':'Too many requests from this IP, please try again later.'}
// };
// const requestLimiter = rateLimit(rateLimitOptions);

//! Constants
const apiRoutes = [
    {path: '/users', handler: userRouter},
    {path: '/api', handler: postRouter}
];
const welcomeMessage = {"message": "Welcome to the Instagram Clone Api Server"};

//! Apply middleware
app.use(cors());
app.use(helmet()); // For securing http headers
//app.use(requestLimiter);
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//! Setup API routes
apiRoutes.forEach(route => app.use(route.path, route.handler));

//! Root route handler
const handleRootRoute = (req, res) => {
    res.json(welcomeMessage);
};

app.get("/", handleRootRoute);

//! Start the application
const startApplication = async () => {
    try {
        await connectDB(); // Connect to the database
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
};

startApplication().catch(err => {
    console.error(err);
});