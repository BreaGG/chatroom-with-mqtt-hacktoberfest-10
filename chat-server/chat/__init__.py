import json

from quart import Quart, request

from chat.broker import Broker
from chat.data import Message, ComplexEncoder
from chat.mqtt import connect_mqtt

broker = None

messages = []


def on_connect(client, userdata, flags, rc):
    global broker
    if rc == 0:
        print(f"Connected {client.is_connected()}")
        broker = Broker(client, "/test/message")

        def on_message(client, userdata, message):
            print('on_message', client, userdata, message.payload)

        broker.subscribe(on_message)
    else:
        print("Failed to connect, return code %d\n", rc)
        exit(0)


connect_mqtt(on_connect)
app = Quart(__name__)


@app.get("/messages")
async def get_message():
    return (json.dumps(messages, cls=ComplexEncoder),
            {"Content-Type": "application/json",
             "Access-Control-Allow-Origin": "*"})


@app.route('/messages', methods=['POST'])
async def send_message():
    json_str = await request.get_data()
    message = Message.map(json_str)
    messages.append(message)
    broker.publish(json_str)
    return "", {"Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Request-Method": "*",
                "Access-Control-Allow-Headers": "*"}
