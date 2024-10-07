import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { IMessage } from '../types/message.type';

class Service {
  private stompClient: CompatClient | null = null;
  private isConnected: boolean = false;
  private messageCallback: ((message: IMessage) => void) | null = null;


  connect(nickname: string, url: string, messageCallback: (message: IMessage) => void) {
    const socketFactory = () => new SockJS(url);
    this.stompClient = Stomp.over(socketFactory);
    this.messageCallback = messageCallback;
    this.stompClient.connect(
      {},
      () => this.onConnect(nickname),
      () => this.onError()
    );
    console.log(this.isConnected);
    return this.isConnected;
  }

  private onConnect(nickname: string) {
    if (this.stompClient) {
      this.stompClient.subscribe("/topic/public", this.onMessageReceived.bind(this));
      this.stompClient.send(
        "/app/chat.join",
        {},
        JSON.stringify({ author: nickname, type: "JOIN" })
      );
      this.isConnected = true;
    }
  }

  private onError() {
    this.isConnected = false;
  }

  onMessageReceived(payload: { body: string; }) {
    const message = JSON.parse(payload.body);
    if (this.messageCallback) {
      this.messageCallback(message);
    }
    if (message.type === "JOIN") {
      message.content = message.author + " joined!";
    } else if (message.type === "QUITE") {
      message.content = message.author + " left!";
    } else {
      console.log("Message received: ", message);
    }
  }

  sendMessage(author: string, messageContent: string) {
    if (messageContent && this.stompClient) {
      const chatMessage = {
        author: author,
        content: messageContent,
        type: "CHAT",
      };
      this.stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
    }
  }

}

export const WebsocketService = new Service();
