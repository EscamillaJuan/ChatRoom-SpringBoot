"use strict";

let nicknamePage = document.querySelector("#nickname-page");
let chatPage = document.querySelector("#chat-page");
let nicknameForm = document.querySelector("#nicknameForm");
let messageForm = document.querySelector("#messageForm");
let messageInput = document.querySelector("#message");
let messageArea = document.querySelector("#messageArea");
let connectingElement = document.querySelector(".connecting");

let stompClient = null;
let nickname = null;

let colors = [
  "#2196F3",
  "#32c787",
  "#00BCD4",
  "#ff5652",
  "#ffc107",
  "#ff85af",
  "#FF9800",
  "#39bbb0",
];

function connect(event) {
  nickname = document.querySelector("#name").value.trim();

  if (nickname) {
    nicknamePage.classList.add("hidden");
    chatPage.classList.remove("hidden");

    const socket = new SockJS("/websocket");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
  }
  event.preventDefault();
}

function onConnected() {
  stompClient.subscribe("/topic/public", onMessageReceived);

  stompClient.send(
    "/app/chat.join",
    {},
    JSON.stringify({ author: nickname, type: "JOIN" })
  );

  connectingElement.classList.add("hidden");
}

function onError(error) {
  connectingElement.textContent =
    "Could not connect to WebSocket server. Please refresh this page to try again!";
  connectingElement.style.color = "red";
}

function sendMessage(event) {
  let messageContent = messageInput.value.trim();
  if (messageContent && stompClient) {
    let chatMessage = {
      author: nickname,
      content: messageInput.value,
      type: "CHAT",
    };
    stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
    messageInput.value = "";
  }
  event.preventDefault();
}

function onMessageReceived(payload) {
  let message = JSON.parse(payload.body);

  let messageElement = document.createElement("li");

  if (message.type === "JOIN") {
    messageElement.classList.add("event-message");
    message.content = message.author + " joined!";
  } else if (message.type === "QUITE") {
    messageElement.classList.add("event-message");
    message.content = message.author + " left!";
  } else {
    messageElement.classList.add("chat-message");

    let avatarElement = document.createElement("i");
    let avatarText = document.createTextNode(message.author[0]);
    avatarElement.appendChild(avatarText);
    avatarElement.style["background-color"] = getAvatarColor(message.author);

    messageElement.appendChild(avatarElement);

    let nicknameElement = document.createElement("span");
    let nicknameText = document.createTextNode(message.author);
    nicknameElement.appendChild(nicknameText);
    messageElement.appendChild(nicknameElement);
  }

  let textElement = document.createElement("p");
  let messageText = document.createTextNode(message.content);
  textElement.appendChild(messageText);

  messageElement.appendChild(textElement);

  messageArea.appendChild(messageElement);
  messageArea.scrollTop = messageArea.scrollHeight;
}

function getAvatarColor(messageAuthor) {
  let hash = 0;
  for (let i = 0; i < messageAuthor.length; i++) {
    hash = 31 * hash + messageAuthor.charCodeAt(i);
  }
  let index = Math.abs(hash % colors.length);
  return colors[index];
}

nicknameForm.addEventListener("submit", connect, true);
messageForm.addEventListener("submit", sendMessage, true);
