import { login, signup } from "./actions";

import Form from "./components/form";
export default function LoginPage() {
  return <Form loginHandler={login} signupHandler={signup} />;
}
