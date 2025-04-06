import { login, signup } from "./actions";
import { Button, Card, Field, Input, Stack, Center } from "@chakra-ui/react";
import Form from "./components/form";
export default function LoginPage() {
  return <Form loginHandler={login} signupHandler={signup} />;
}
