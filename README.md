# Chatroom MQTT con Python y React para el Hacktoberfest 10 de Python Coruña

Este proyecto es una aplicación de chat en tiempo real desarrollada como parte del evento Hacktoberfest de Python Coruña. La aplicación utiliza tecnologías web modernas, incluyendo WebSocket para la comunicación en tiempo real y React para el frontend. La aplicación permite a los usuarios enviar mensajes en tiempo real y participar en conversaciones interactivas.

## Requirements

- Python 3.9.6
- Mosquitto latest
- Node v18.17.0
- Docker Desktop

## Installation

### MQTT (Broker or Server)

```sh
docker-compose up -d
```

Activate this configuration in the `/mosquitto/config/mosquitto.conf`

```conf
allow_anonymous false
listener 1883
listener 9001
protocol websockets
```

### Backend

```sh
cd chat-server
pip install -r requirements.txt 
python3 main.py
```

### Frontend

```sh
cd chat-web
npm install
npm run dev
```

## Uso de la Aplicación

Una vez que hayas seguido los pasos anteriores, puedes acceder a la aplicación de chat en tiempo real desde tu navegador. La aplicación te permitirá enviar mensajes en tiempo real a otros usuarios conectados al mismo chat.

## Contribuciones para el Hacktoberfest

Este proyecto es parte del Hacktoberfest de Python Coruña. Si deseas contribuir, asegúrate de leer las pautas de contribución en el repositorio. ¡Esperamos tus contribuciones y disfruta del Hacktoberfest!
