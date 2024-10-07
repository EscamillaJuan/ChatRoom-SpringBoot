# Chat Room Application

This project is a real-time chat room application built using **Spring Boot** on the backend and **React** on the frontend. It leverages **WebSocket** for real-time messaging and **Stomp** for handling communication between users. Users can join the chat room by entering their nickname and can send messages that are broadcasted to all connected clients in real-time.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [WebSocket Endpoints](#websocket-endpoints)
- [Available Scripts](#available-scripts)
- [License](#license)

## Features

- Real-time communication using WebSockets.
- Users can join the chat with a nickname.
- Messages are broadcasted to all connected users.
- A simple, clean user interface built with Chakra UI.
- Nickname avatars are generated with random colors.
- Notification when a user joins or leaves the chat room.

## Technologies Used

### Backend
- **Spring Boot**: Java framework for building the backend server.
- **WebSocket**: Protocol for real-time messaging.
- **Stomp**: Simple Text Oriented Messaging Protocol for handling WebSocket connections.

### Frontend
- **React**: JavaScript library for building the user interface.
- **Chakra UI**: React component library for building accessible UIs.
- **TypeScript**: Typed superset of JavaScript for better code reliability.
- **SockJS**: WebSocket emulation to support a fallback for older browsers.

## Getting Started

### Prerequisites
To run this project locally, you will need to have the following installed:

- **Java 17+**
- **Node.js 18+**
- **npm** or **yarn**

## Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/chat-room-app.git
   ```
2. Move to correct folder
   ```bash
   cd ChatRoom-SpringBoot/server
   ```
3. Run server
   ```bash
   ./mvnw spring-boot:run
   ```
## Frontend Setup
1. Move to correct folder
   ```bash
   cd ../client
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the React development server
   ```bash
   npm run dev
   ```

## WebSocket Endpoints
- Subscribe: /topic/public – Receives messages sent to the chat room.
- Send Message: /app/chat.send – Sends a chat message to all connected clients.
- Join Chat: /app/chat.join – Notifies that a user has joined the chat room.

## Available Scripts
### Backend (Spring Boot)
- ./mvnw spring-boot:run - Runs the Spring Boot backend server.
### Frontend (React)
- npm run dev - Starts the development server for the React app.
- npm run build - Builds the app for production.
- npm run lint - Lints the codebase for issues.

## License 
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
