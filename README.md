# Chatroom MQTT with Python and React for the Hacktoberfest 10 from Python Coruña

This project is a real-time chat application developed as part of the Python Coruña Hacktoberfest event. The application uses modern web technologies, including WebSocket for real-time communication and React for the frontend. The app allows users to send messages in real time and participate in interactive conversations. Developed with my partnerers Mark(Desing) and Harold(Backend) in less than 8 hours.

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

Once you have followed the steps above, you can access the real-time chat app from your browser. The application will allow you to send messages in real time to other users connected to the same chat.

## Contribuciones para el Hacktoberfest

This project is part of the Python Coruña Hacktoberfest 10. If you want to contribute, be sure to read the contribution guidelines in the repository. We look forward to your contributions and enjoy Hacktoberfest!
