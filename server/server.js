const express = require("express");
const app = express();
// installed 'sql' instead of 'mysql'
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");

const {
    PORT = 3000,
    NODE_ENV = "development",
    SESSION_NAME = "sid",
    SESSION_LIFETIME = 1000 * 60 * 60 * 2,
    SESSION_SECRET = "be quiet"
} = process.env

const IN_PROD = NODE_ENV === 'production';

app.use(cors());
app.use(express.json());

app.use(session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookies: {
        maxAge: SESSION_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "haxx_database"
})

const requirePerms = (req, res, next) => {
    if(!req.session.userId){
        res.send("You do not have access to this command");
    } else {
        next();
    }
}

// make middleware that says if user is logged in

function commandHandler(sender, arguments){

    if(arguments.length <= 0){
        return "";
    } 
    // says its invalid
    let mainArgument = arguments[0]

    if(mainArgument.toLowerCase() == "print"){
        if(sender == null){
            return "You do not have access to this command.";
        }
        let print = "";
        for(let i = 1; i < arguments.length; i++){
            print += arguments[i];
        }
        return print;
    } else if(mainArgument.toLowerCase() == "register"){ 
        // do this shit
        let username = arguments[1];
        let password = arguments[0];

        if(username == "" || username == undefined || password == "" || password == undefined){
            return "Please enter a valid username and password"
        } else {
            // learn to see if username and password already exist

            db.query(
                "SELECT * FROM users WHERE username=?",
                [username],
                (err, result) => {
                    if(err){
                        console.log(err);
                        return "An error has occurred: " + err;
                    }

                    console.log("Result: " + result);

                    if(result){
                        return "This username is already in use. Please enter a different username."
                    } 
                }
            )
            // IT WORKS!!

            db.query(
                "INSERT INTO users (username, password) VALUES (?, ?)",
                [username, password],
                (err, result) => {
                    console.log(err);
                }
            )
        }
    } else if(mainArgument.toLowerCase() == "login"){
        // do this shit
    } else {
        return "Invalid command, please enter a valid command. Command given: " + mainArgument;
    }
}

// work on this now
// work on this toms

// figure out a working system
// draw one out

app.post("/command", (req, res) => {
    const command = req.body.command;
    const tokens = command.split(" ");
    const { userId } = req.session;

    // parse username from command
    // add username at the start of the command
    // receive an array with username and command

    let param = [];
    if(userId){
        param = ["apotato369", command, 'true']
    } else {
        param = ["null", command, 'false']
    }

    console.log(command);
    console.log("Yeeeee");
    // check if this works
    db.query(
        "INSERT INTO command_log (username, command, status) VALUES (?, ?, ?)",
        param,
        (err, result) => {
            if(err){
                console.log(err);
            } else {
                res.send(commandHandler("apotato369", tokens));
            }
        }
    )
    // this does not work
})

// temporary^^^

// check out learning express and compare
// test the logic above
// do this next week

// copypaste the route from employee project
// refactor prompt code
// re-runn the tign

app.listen(3001, () => {
    console.log("Server is running on port 3001 lmao")
})