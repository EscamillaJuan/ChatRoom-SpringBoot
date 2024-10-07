import { Card, CardBody, CardHeader, Flex, Heading, Text, Avatar } from "@chakra-ui/react";


interface IProps {
  nickname: string;
  content: string;
  author: string;
}


export const Message: React.FC<IProps> = ({ nickname, content, author }) => {
  console.log(content);
  return (
    <Card
      maxW='md'
      minW="50%"
      alignSelf={nickname.toLowerCase() === author.toLowerCase() ? "end" : "start"}
      margin="15px 15px 0 15px"
      bg="whitesmoke"
      borderRadius="5px">
      <CardHeader padding="10px 10px 0 10px">
        <Flex flex='1' gap='2' alignItems='center' flexWrap='wrap'>
          <Avatar name={author} />
          <Heading size='sm'>{author}</Heading>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          {content}
        </Text>
      </CardBody>
    </Card>
  );
}