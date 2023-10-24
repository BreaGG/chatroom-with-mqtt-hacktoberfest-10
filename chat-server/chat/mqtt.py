import random

from paho.mqtt import client as mqtt_client

broker = '127.0.0.1'
port = 1883
client_id = f'python-mqtt-{random.randint(0, 1000)}'


def connect_mqtt(on_connect):
    client = mqtt_client.Client(client_id)

    def on_disconnect(client, userdata, rc):
        if rc != 0:
            print("Unexpected disconnection.")

    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.connect(broker, port)
    client.loop_start()
