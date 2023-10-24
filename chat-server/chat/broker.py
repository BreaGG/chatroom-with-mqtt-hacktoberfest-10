class Broker:
    def __init__(self, client, topic):
        self.connections = set()
        self.client = client
        self.topic = topic

    def publish(self, message: str):
        result = self.client.publish(self.topic, message)
        if result[0] == 0:
            print(f"Send `{message}` to topic `{self.topic}`")
        else:
            print(f"Failed to send message to topic {self.topic}")

    def subscribe(self, on_message) -> None:
        self.client.subscribe(self.topic)
        self.client.on_message = on_message
