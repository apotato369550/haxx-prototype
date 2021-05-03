import React, { Component } from 'react';

const Command = ({text, id}) => {
    return (
        <li className="list-group-item" id={id} >
            {text}
        </li>
    )
}
// test this out??/
export default Command;