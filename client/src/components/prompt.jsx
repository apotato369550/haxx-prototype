import React, { useState } from 'react';
import axios from 'axios';

// add stuff here
const Prompt = ({ commands, setCommands, inputCommand, setInputCommand }) => {

    // temporary ^^^

    const commandHandler = (event) => {
        console.log("eyy command handler " + event.target.value);
        // this should change the event value
        // pay attention to what comes next
        setInputCommand(event.target.value);
        return;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(event + "eyy submit handler woot woots");
        setInputCommand("");
        // watch all three videos on how to make http requests
        
        // learn to make a regular post request
        // learn from another tutorial on how to make a post request
        // start a subproject
        // response.data
        // work out a basic print command
        // throw an error if no keywords are detected
        // send user as well hereVVV 

        // send session and cookies information here as well
        // learn about sessions and cookies from video
        // create subproject about dealing with sessions and cookies
        // can't concentrate right now 

        // learn about react routers
        // add routse
        // continue watching videos about routes

        // install and learn how to use express-sessions
        // learn about and watch the vid toms

        // found a valid express-session tutorial
        // follow that and create another subproject
        axios.post("http://localhost:3001/command", {
            command: inputCommand
        }).then((response) => {
            alert("wut")
            console.log(response);
            setCommands([
                ...commands,
                {text: inputCommand, id: Math.random() * 100},
                {text: response.data, id: Math.random() * 100}
            ])
        }).catch(error => alert("An error occured..."))
        return;
    }
    // do this
    return (
        <div className="input-group w-50 m-auto">
            <div className="input-group-prepend">
                <button className="btn btn-success" type="button" onClick={submitHandler}>Enter</button>
            </div>
            <input 
                type="text" 
                className="form-control" 
                aria-describedby="basic-addon1"
                value={inputCommand}
                onChange={commandHandler}
            />
        </div>
    )
}

// ohhhh
// delete everything from the other project
// create a table for haxx database lmao
// re-do everything
// include a post request in the form
// do this tomorrow

export default Prompt;

