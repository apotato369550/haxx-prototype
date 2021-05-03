import React, { Component } from 'react';

// add stuff here
const Prompt = ({hello, sayHello, commands, setCommands, inputCommand, setInputCommand}) => {

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
        // this should empty the input
        setInputCommand("");
        setCommands([
            ...commands,
            {text: inputCommand, id: Math.random() * 100}
        ])
        // add stuff here
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

// convert terminal to stateless
// figure out how to alert input

export default Prompt;

