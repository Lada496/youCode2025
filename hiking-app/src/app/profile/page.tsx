import EditProfileForm from "./edit-profile-form";
import { createClient } from "../utils/supabase/server";
import { Center } from "@chakra-ui/react"


export default async function Profile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <Center><EditProfileForm user={user} /></Center>;
}


