import { Input, Button, VStack, Heading, Container, Text, Flex } from "@chakra-ui/react";
import { ChatArea } from "./ChatArea";
import { useState } from "react";

export const Home: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [isNicknameSet, setIsNicknameSet] = useState<boolean>(false);
  const handleNicknameSubmit = () => {
    if (nickname.trim()) {
      setIsNicknameSet(true);
    }
  };

  return (
    <>
      {!isNicknameSet ? (
        <Flex
          height="100vh"
          alignItems="center"
          justifyContent="center"
          bgGradient="linear(to-r, gray.200, gray.50)"
        >
          <Container maxW="md" bg="white" p={8} borderRadius="md" boxShadow="xl">
            <VStack spacing={6}>
              <Heading as="h2" size="lg" color="black">
                ¡Welcome!
              </Heading>
              <Text fontSize="md" color="black" textAlign="center">
                Please, enter your nickname to join the chat.
              </Text>
              <Input
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                size="lg"
                focusBorderColor="black"
              />
              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleNicknameSubmit}
                w="full"
                mt={4}
              >
                Join
              </Button>
            </VStack>
          </Container>
        </Flex>
      ) : (
        <ChatArea nickname={nickname} />
      )}
    </>
  );
};
