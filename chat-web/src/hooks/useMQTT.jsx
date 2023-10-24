import React, { useState, useEffect } from "react";
import * as mqtt from "mqtt/dist/mqtt.min";

const TOPIC = "/test/message";
const HOST = "ws://127.0.0.1:9001";
const OPTIONS = {
  host: "127.0.0.1",
  port: 9001,
  clientId: "chat-web-client",
  protocolId: "MQTT",
  protocolVersion: 4,
  connectTimeout: 1000,
  clean: true,
  debug: true,
};

export default function useMQTT({onMessage}) {
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState("Connect");

  useEffect(() => {
    setConnectStatus("Connecting");
    setClient(mqtt.connect(HOST));
  }, []);

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus("Connected");
        client.subscribe(TOPIC);
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        onMessage(payload);
      });
    }
  }, [client]);

  return { client, connectStatus };
}
