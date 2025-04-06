import { Avatar, Button, Card } from "@chakra-ui/react";

interface EventProps {
  title: string;
  description: string;
  picture: string;
}

const EventCard = ({ title, description, picture }: EventProps) => {
  return (
    <Card.Root width="320px">
      <Card.Body gap="2">
        <Avatar.Root size="lg" shape="rounded">
          {!!picture && <Avatar.Image src={picture} />}
          <Avatar.Fallback name="Post run sunset hangout" />
        </Avatar.Root>
        <Card.Title mt="2">{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
        <Button>RSVP</Button>
      </Card.Footer>
    </Card.Root>
  );
};
export default EventCard;
