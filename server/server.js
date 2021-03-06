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

// work on this now
// work on this toms

// figure out a working system
// draw one out

const redirectSession = (req, res, next) => {
    console.log("Session's Id: " + req.session.userId);
    next()
}

// test this
app.post(redirectSession, "/command", (req, res) => {
    let command = req.body.command;
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
            }
        }
    )

    const sender = "apotato369";
    const arguments = command.split(" ");
    
    if(arguments.length == 0){
        res.send("Empty argument. Please use commands like this: '<command> <argument1> <argument2>'");
        return;
    }

    command = arguments[0].toLowerCase();

    // convert to if-else?

    if(command == "print"){
        // make this command only accessible to people who are logged in
        if(sender == null){
            res.send("You do not have access to this command");
            return;
        }
        let text = "";
        for(let i = 1; i < tokens.length; i++){
            text += tokens[i] + " ";
        }
        res.send(text);
        return;

    } else if(command == "register"){
        let username = tokens[1];
        let password = tokens[2];

        if(!username || !password){
            res.send("Please enter a valid username and password");
            return
        } else {
            // learn to see if username and password already exist

            db.query(
                "SELECT * FROM users WHERE username=?",
                [username],
                (err, result) => {
                    if(err){
                        console.log(err);
                        res.send("An error has occured: " + err);
                        return;
                    }

                    console.log("Result: " + result);

                    if(result){
                        res.send("This username is already in use. Please enter a different username.")
                        return
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
            
            res.send("Register Successful");
            return;
        }
    } else if(command == "login"){
        let username = tokens[1];
        let password = tokens[2];

        if(username && password){
            db.query(
                "SELECT * FROM users WHERE username=?",
                [username, password],
                (err, result) => {
                    if(err){
                        console.log("Error: " + err);
                        res.send("An error has occurred.");
                        return;
                    }

                    if(!result){
                        res.send("We could not find an account with that username");
                        return;
                    }

                    console.log("Result: " + result);

                    // get result's password and compare
                    // figure this out tomorrow
                    // convert result to json
                    // ohhh it returns as an object
                    // i can't think right now i'm sorry

                    let userPassword = result[0].password;

                    if(password == userPassword){
                        // req is not defined??
                        // set a session variable herer
                        // why is req not defined??
                        // i might have to restructure everything here...

                        // req is not a parameter that's why
                        // re-structure command route and command function
                        console.log("User's ID: " + result[0].id)
                        req.session.userId = result[0].id;
                        res.send("Logged in Successfully");
                        console.log(req.session)
                        return;
                    } else {
                        res.send("Incorrect password.");
                        return;
                    }
                }
            )
        }
    } else if("getsesh"){
        // can't seem to access id variables in session??
        console.log(req.session);
        //
        console.log("User Id" + req.session.userId);
        return;
    } else {
        res.send("Please enter a valid command: " + command);
        return;
    }
    // continue here
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