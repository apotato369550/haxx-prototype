import React, { useState, useEffect } from 'react';
import './css/neon-glow-theme.css';
import './App.css';
import Prompt from './components/prompt';
import Terminal from './components/terminal';
import Axios from 'axios';

// implement account creation system
// review code here

function App() {
  const [inputCommand, setInputCommand] = useState("");
  const [commands, setCommands] = useState([]);
  // learn useffect and re-watch video

  function sayHello(){
    alert("What's up motherfucker.");
  }
// i think it's the list thing
// i should probably double check the neon glow 
  return (
    <div className="container-fluid text-center m-auto">
      <div className="m-auto W-75">

        <Terminal 
          commands={commands}
          setCommands={setCommands}
        />
        <Prompt 
          hello={"hello"}
          commands={commands}
          setCommands={setCommands}
          inputCommand={inputCommand}
          setInputCommand={setInputCommand}
          sayHello={sayHello}
          // test it now
        />
      </div>
    </div>
  );
}

export default App;
// find a way to center everything
// create server files
// behavior that prints text onto console.
// add scrollbar to console

// figure out how to do handlers

