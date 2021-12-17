import express from "express";
import db from "./config/database.js";
//import productRoutes from "./routes/index.js";
import userRoutes from "./routes/index.js"; 
import cors from "cors";
import User from "./models/userModel.js";
import bodyParser from "body-parser"; 
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv  from "dotenv"

dotenv.config()

const app = express();
app.use(express.json());

const corsOptions ={
   origin: process.env.HEROKU_LINK, 
   methods: 'GET,POST,PATCH,DELETE,OPTIONS',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
// app.use(cors());
// const db = require("./models");
const port= process.env.DB_PORT
try {
    await db.authenticate();
    console.log('Database connected...');
    db.sync();
    console.log('Creating all the tables defined in user');
} catch (error) {
    console.error('Connection error:', error);
}

/*
db.sync({force: true}).then(() => {
    console.log("Drop and re-sync db.");
  });
*/
// app.use(cors({
//     origin: ["https://quantumquacks-frontend.herokuapp.com/"],
//     methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
//     credentials: true 
// }));




// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });



// app.use(cors({origin: '*'}));



app.use(cookieParser()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key: "emailID",
    secret: "asbadbbdbbh7",
    resave: false,
    saveUninitialize: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}));

//app.use('/', staticRoutes); 
//app.use(bodyParser.urlencoded({extended: false}));  
//app.use(bodyParser.json());
app.use('/', userRoutes); 
//app.use('/products', productRoutes);
// db.Sequelize.sync().then(() => {
    const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));