"use client";

import { useSearchParams } from "next/navigation";
import NextLink from "next/link";
import { Heading, Text, Button, Container, VStack } from "@chakra-ui/react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "Something went wrong.";

  return (
    <Container centerContent py={20}>
      <VStack m={6}>
        <Heading color="red.500">Login / Signup Error</Heading>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          {message}
        </Text>
        <NextLink href="/login" passHref>
          <Button colorScheme="blue" p={4}>
            Go back to Login/Signup
          </Button>
        </NextLink>
      </VStack>
    </Container>
  );
}
