# Chat MQTT

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