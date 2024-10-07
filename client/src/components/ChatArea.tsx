import { HStack, Input, Button, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { WebsocketService } from '../services/WebSocket.service';
import { IMessage } from '../types/message.type';
import { Message } from './Message';

interface IProps {
  nickname: string;
}

export const ChatArea: React.FC<IProps> = ({ nickname }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  // const [isConnected, setIsConnected] = useState<boolean>(false);
  useEffect(() => {
    WebsocketService.connect(nickname, "http://localhost:8080/websocket",
      (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    // setIsConnected(response);
  }, [nickname]);
  return (
    <VStack
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, gray.200, gray.50)">

      <VStack bg="white" height="80vh" width="80vw" borderRadius="10px" scrollBehavior="smooth" overflowY="auto" padding="4">
        {
          messages.map((v, k) => (
            <Message key={k} author={v.author} content={v.content} nickname={nickname} />
          ))
        }
      </VStack>
      <HStack mt={4} width="80vw">
        <Input
          borderRadius="10px"
          bg="white"
          placeholder="Escribe un mensaje..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              WebsocketService.sendMessage(nickname, e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
        <Button colorScheme="teal" onClick={() => {
          const input = document.querySelector<HTMLInputElement>('input');
          if (input && input.value.trim()) {
            WebsocketService.sendMessage(nickname, input.value);
            input.value = '';
          }
        }}>
          Enviar
        </Button>
      </HStack>
    </VStack>
  );
};
