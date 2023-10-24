import "./Chat.css";
import React, { useState, useEffect, useCallback } from "react";
import Modal from "../ModalPhoto.jsx";
import useMQTT from "../../hooks/useMQTT";

const MESSAGE_URL = "http://127.0.0.1:5001/messages";

function Chat({ username }) {
  const [showPhoto, setShowPhoto] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(undefined);
  const [element, setElement] = useState(null);

  const { connectStatus } = useMQTT({
    onMessage: (payload) => {
      const messageReceived = JSON.parse(payload.message);
      const { user, data, time } = messageReceived;
      if (username && user !== username) {
        setMessages((prev) => [...prev, { data, user, time }]);
        executeScroll();
      }
    },
  });

  useEffect(() => {
    getMessages();
  }, []);

  const executeScroll = () => {
    element?.scrollIntoView();
  };

  const chatRef = useCallback((node) => {
    if (node !== null) {
      setElement(node);
      node?.scrollIntoView();
    }
  }, []);

  const getMessages = () => {
    fetch(MESSAGE_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMessages(data); // Actualizar el estado con los datos del JSON
      })
      .catch((error) => {
        console.error("Error al cargar los datos del JSON:", error);
      });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    // Enviar el nuevo mensaje usando una solicitud POST con fetch
    fetch(MESSAGE_URL, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: message,
        user: username,
        time: Date.now(),
      }),
    })
      .then((data) => {
        // Actualizar los mensajes locales con el nuevo mensaje
        const msg = { data: message, user: username, time: Date.now() };
        setMessages(messages.concat(msg));
        // Limpiar el campo del nuevo mensaje
        setMessage((prev) => "");
      })
      .catch((error) => {
        // Manejar los errores de la solicitud
        console.error("Error al enviar el mensaje:", error);
      });
  };

  if (connectStatus !== "Connected" && username)
    return `${connectStatus} Loading ...`;

  const isLocalUsername = (message) => username && message?.user === username;

  return (
    <div className="">
      {/* <h2>Bienvenido, {username}!</h2> */}
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <span className="absolute text-green-500 right-0 bottom-0">
                <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
              </span>
              <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt=""
                className="w-10 sm:w-16 h-10 sm:h-16 rounded-full cursor-pointer"
                onClick={() => setShowPhoto(!showPhoto)} // Toggle el estado al hacer clic en la imagen
              />
              {showPhoto && (
                <Modal
                  imageUrl="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  onClose={() => setShowPhoto(false)}
                />
              )}
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-2xl mt-1 flex items-center">
                <span className="text-gray-700 mr-3">{username} </span>
              </div>
              <span className="text-lg text-gray-600">Junior Developer</span>
            </div>
          </div>
        </div>

        <div
          id="messages"
          className="flex-col p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {/* Mapeo de los mensajes para mostrarlos en la interfaz */}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message flex ${
                isLocalUsername(message) ? "justify-end" : "justify-start"
              }`}
            >
              {/* Estructura del mensaje */}
              <div
                className={`flex flex-col space-y-0 text-xs max-w-xs mx-2 order-2 items-${
                  isLocalUsername(message) ? "end" : "start"
                }`}
              >
                <div ref={chatRef}>
                  <span
                    className={`px-4 py-2 rounded-lg inline-block ${
                      isLocalUsername(message)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {message.data}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{message.user}</div>
                <div className="text-xs text-gray-500">
                  {new Date(message.time * 1000).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => sendMessage(e)}>
          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div className="relative flex">
              <input
                autoFocus
                type="text"
                placeholder="Write your message!"
                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                >
                  <span className="font-bold">Send</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 ml-2 transform rotate-90"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
