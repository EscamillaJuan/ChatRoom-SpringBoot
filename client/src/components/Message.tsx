import { Card, CardBody, CardHeader, Flex, Heading, Text, Avatar } from "@chakra-ui/react";

interface IProps {
  nickname: string;
  content: string;
  author: string;
}

export const Message: React.FC<IProps> = ({ nickname, content, author }) => {
  const isEventMessage = content.includes("joined!") || content.includes("left!");

  return (
    !isEventMessage ? (
      <Card
        maxW='md'
        minW="50%"
        alignSelf={nickname.toLowerCase() === author.toLowerCase() ? "end" : "start"}
        margin="10px 10px 0 10px"
        bg={isEventMessage ? "gray.100" : "whitesmoke"}
        borderRadius="5px"
        textAlign={isEventMessage ? "center" : "left"}>
        <CardHeader padding="10px 10px 0 10px">
          <Flex flex='1' gap='2' alignItems='center' flexWrap='wrap'>
            <Avatar name={author} size="sm" />
            <Heading size='sm'>{author}</Heading>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{content}</Text>
        </CardBody>
      </Card>
    ) : (
      <Text fontStyle="italic" color="gray.500">
        {content}
      </Text>
    )
  );
};
