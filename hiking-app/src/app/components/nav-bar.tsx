import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <Box
      background="blue.500"
      width="100%"
      padding="4"
      color="white"
      position="fixed"
      bottom="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text mx="4">
        <Link href="/login">Login</Link>
      </Text>
      <Text mx="4">
        <Link href="/profile">Profile</Link>
      </Text>
      <Text mx="4">
        <Link href="/map">Map</Link>
      </Text>
      <Text mx="4">
        <Link href="/event">Add Event</Link>
      </Text>
    </Box>
  );
}
