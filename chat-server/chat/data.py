import json
import time as t


class Message:
    def __init__(self, user='', data='', time='') -> None:
        self.user = user
        self.data = data
        self.time = time

    def get_user(self):
        return self.user

    def set_user(self, user):
        self.user = user

    def get_data(self):
        return self.data

    def set_data(self, data):
        self.data = data

    def get_time(self):
        return self.time

    def set_time(self, time):
        self.time = time

    @staticmethod
    def map(json_str):
        try:
            print(json_str)
            data = json.loads(json_str)
            return Message(user=data['user'], data=data['data'], time=data['time'])
        except Exception as e:
            print('Something went wrong', e)
            return None


class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        return obj.__dict__
