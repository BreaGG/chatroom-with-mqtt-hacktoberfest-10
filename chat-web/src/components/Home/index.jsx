import React, { useState } from "react";

function Home({ onUsernameChange }) {
  const [username, seUsername] = useState(undefined);

  const handleUsernmaeChange = (event) => {
    seUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUsernameChange(username);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Bienvenido al Chat</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-lg">Ingresa tu nombre:</label>
        <input
          type="text"
          value={username}
          onChange={handleUsernmaeChange}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Comenzar a chatear
        </button>
      </form>
    </div>
  );
}

export default Home;
