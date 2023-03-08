import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
const routes = require('./routes/index');
const app: Express = express();
const allowedDomains = ["http://localhost:4200", "http://localhost:55197", "http://"];
dotenv.config();

// middleware to handle CORS - bypassing the Access-Control-Allow-Origin headers
app.use(cors({
    origin: function (origin, callback) {
        // bypass the requests with no origin (like curl requests, mobile apps, etc )
        if (!origin) return callback(null, true);

        let domain = "";

        if (process.env["NODE_ENV"] == "LOCAL") {
            domain = "http://"
        } else {
            domain = origin;
        }

        if (allowedDomains.indexOf(domain) === -1) {
            const msg = `This site ${domain} does not have an access. Only specific domains are allowed to access it.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }, credentials: true
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "auth-token",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true
    })
);

// initialize route
app.use('/api/', routes);

//connect mongodb using mongoose
const mongoString = process.env.dbURI!;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error: any) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});