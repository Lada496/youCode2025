"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  Center,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";

interface FormProps {
  loginHandler: (formData: FormData) => Promise<void>;
  signupHandler: (formData: FormData) => Promise<void>;
}

export default function Form({ loginHandler, signupHandler }: FormProps) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Center minH="100vh" bg="blue.50" px={4}>
      <Box
        bg="white"
        p="32px"
        borderRadius="xl"
        boxShadow="xl"
        width="100%"
        maxW="400px"
      >
        <form>
          <Text fontSize="2xl" fontWeight="bold" color="blue.700" mb="8px">
            {isLogin ? "Log in" : "Sign up"}
          </Text>

          <Text fontSize="sm" color="gray.600" mb="24px">
            {isLogin
              ? "Welcome back! Enter your credentials to log in."
              : "Fill in the form below to create an account."}
          </Text>

          <Box mb="20px">
            <Text fontSize="sm" color="gray.600" mb="6px" fontWeight="medium">
              Email:
            </Text>
            <Input
              name="email"
              type="email"
              required
              borderColor="blue.200"
              _focus={{ borderColor: "blue.500", boxShadow: "none" }}
            />
          </Box>

          <Box mb="24px">
            <Text fontSize="sm" color="gray.600" mb="6px" fontWeight="medium">
              Password:
            </Text>
            <Input
              name="password"
              type="password"
              required
              borderColor="blue.200"
              _focus={{ borderColor: "blue.500", boxShadow: "none" }}
            />
          </Box>

          <Flex justify="flex-end">
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
              }}
              formAction={isLogin ? loginHandler : signupHandler}
              bg="blue.500"
              color="white"
              px="20px"
              py="8px"
              _hover={{ bg: "blue.600" }}
              borderRadius="md"
              fontWeight="medium"
            >
              {isLogin ? "Log in" : "Sign up"}
            </Button>
          </Flex>
        </form>

        <HStack mt="28px" justify="center">
          <Text fontSize="sm" color="gray.600">
            {isLogin
              ? "Need a new account?"
              : "Do you already have an account?"}
          </Text>
          <Button
            onClick={() => setIsLogin(!isLogin)}
            fontSize="sm"
            height="auto"
            padding="0"
            color="blue.500"
            fontWeight="medium"

          >
            {isLogin ? "Sign up" : "Log in"}
          </Button>
        </HStack>
      </Box>
    </Center>
  );
}
