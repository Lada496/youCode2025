import { Avatar, Button, Card } from "@chakra-ui/react"

const Demo = () => {
  return (
    <Card.Root width="320px">
      <Card.Body gap="2">
        <Avatar.Root size="lg" shape="rounded">
          <Avatar.Image src="https://www.flyovercanada.com/FlyOverCanada/media/FlyOver/Stories/2019/10/BL-Vancouver-Sunset-English-Bay-Beach.jpg" />
          <Avatar.Fallback name="Post run sunset hangout" />
        </Avatar.Root>
        <Card.Title mt="2">Post run sunset hangout</Card.Title>
        <Card.Description>
          Come watch the sunset with us!
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
        <Button>RSVP</Button>
      </Card.Footer>
    </Card.Root>
  );
};
export default Demo;