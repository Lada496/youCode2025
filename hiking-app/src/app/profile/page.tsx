import EditProfileForm from "./edit-profile-form";
import { createClient } from "../utils/supabase/server";

export default async function Profile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <EditProfileForm user={user} />;
}
