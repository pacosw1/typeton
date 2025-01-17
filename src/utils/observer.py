from abc import abstractmethod
from typing import Dict, List


class Event:
    def __init__(self, type_, payload):
        self.type_ = type_
        self.payload = payload


class Subscriber:
    """Class that wants to receive a message implements this"""

    @abstractmethod
    def handle_event(self, event: Event):
        """Subscriber handles event however he wants here"""
        pass

    def disable(self):
        """Disable the subscriber"""
        self.disabled = True


class Publisher:
    """Class that wants to publish messages to subscribers implements this"""

    def __init__(self):
        self.__subscribers: List[(Subscriber, Dict)] = []
        self.__temp_subscribers: List[Subscriber] = []

    def add_subscriber(self, subscriber: Subscriber, events):
        """enable subscriber to receive messages"""
        self.__subscribers.append((subscriber, events))

    def delete_subscribers(self):
        """Delete all subscribers"""
        self.__subscribers = []

    def add_temp_subscriber(self, subscriber: Subscriber):
        """Add a subscriber to the list of temporary subscribers"""
        self.__temp_subscribers.append(subscriber)

    def remove_temp_subscribers(self):
        """Remove all temporary subscribers"""
        self.__temp_subscribers = []

    def broadcast(self, event):
        """Push message to all subscribers"""
        for subscriber, events in self.__subscribers:
            if event.type_ in events or len(events) == 0:
                subscriber.handle_event(event)

        for temp_sub in self.__temp_subscribers:
            temp_sub.handle_event(event)
