import React, { Component } from 'react';
import Command from './command';


const Terminal = ({commands, setCommands}) => {
    console.log(commands);
    // figure out how to center terminal
    // make routes for server
    // do this monday
    return (
        <div className="m-auto">
            <ul className="list-group text-left w-75 m-auto">
                {commands.map(command => (
                    <Command 
                        text={command.text}
                        id={command.id}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Terminal;
