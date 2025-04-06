"use client";
import { useState } from "react";
import {
  Button,
  Card,
  Field,
  Input,
  Stack,
  Center,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";

interface FormProps {
  loginHandler: (formData: FormData) => Promise<void>;
  signupHandler: (formData: FormData) => Promise<void>;
}

export default function Form({ loginHandler, signupHandler }: FormProps) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <Center mt="10">
      <VStack>
        <Card.Root maxW="sm" p="4">
          <form>
            <Card.Header>
              <Card.Title>Sign up</Card.Title>
              <Card.Description>
                Fill in the form below to create an account
              </Card.Description>
            </Card.Header>

            <Card.Body>
              <Stack gap="4" w="full">
                <Field.Root>
                  <Field.Label htmlFor="email">Email:</Field.Label>
                  <Input id="email" name="email" type="email" required />
                </Field.Root>
                <Field.Root>
                  <Field.Label htmlFor="password">Password:</Field.Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </Field.Root>
              </Stack>
            </Card.Body>
            <Card.Footer justifyContent="flex-end" pt="4">
              {isLogin ? (
                <Button
                  type="submit"
                  variant="outline"
                  pl="4"
                  pr="4"
                  formAction={loginHandler}
                >
                  Log in
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="solid"
                  pl="4"
                  pr="4"
                  formAction={signupHandler}
                >
                  Sign up
                </Button>
              )}
            </Card.Footer>
          </form>
        </Card.Root>
        {isLogin ? (
          <HStack>
            <Text textStyle="sm">Do you need a new account?</Text>
            <Button variant="ghost" p="4" onClick={() => setIsLogin(false)}>
              Signup
            </Button>
          </HStack>
        ) : (
          <HStack>
            <Text textStyle="sm">Do you already have account?</Text>
            <Button variant="ghost" p="4" onClick={() => setIsLogin(true)}>
              Login
            </Button>
          </HStack>
        )}
      </VStack>
    </Center>
  );
}
