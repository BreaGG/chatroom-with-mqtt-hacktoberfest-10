import "./App.css";
import "../src/components/Chat/Chat.jsx";
import Chat from "../src/components/Chat/Chat.jsx";
import Home from "./components/Home";
import React, { useEffect, useState } from "react";

function App() {
  const [username, setUsername] = useState(undefined);

  useEffect(() => {
    const stored_username = localStorage.getItem('username');
    if (stored_username) {
      setUsername(stored_username)
    }
  }, []);

  const onUsernameChange = (value) => {
    setUsername(value);
    localStorage.setItem('username', value);
  };

  return (
    <div className="App">
      {!username ? (
        <Home onUsernameChange={onUsernameChange} />
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

export default App;
