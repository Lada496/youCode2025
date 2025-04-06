"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { Button, Card, Field, Input, Stack } from "@chakra-ui/react";

import Avatar from "./avatar";

// ...

export default function EditProfileForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const router = useRouter();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
      setLoading(false);
      router.push("/profile");
    } catch (error) {
      alert("Error updating the data!");
      setLoading(false);
    }
  }

  return (
    <Card.Root w="360px" p="4" mt="4">
      <Card.Header textAlign="center">
        <Card.Title color="blue.500">Your Profile</Card.Title>
      </Card.Header>
      <Card.Body>
        <Stack gap="3" w="full">
          <div className="form-widget">
            <Avatar
              uid={user?.id ?? null}
              url={avatar_url}
              size={200}
              onUpload={(url) => {
                setAvatarUrl(url);
                updateProfile({ fullname, username, avatar_url: url });
              }}
            />
          </div>
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input id="email" type="text" value={user?.email} disabled pl="4" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Full Name</Field.Label>
            <Input
              id="fullName"
              type="text"
              value={fullname || ""}
              onChange={(e) => setFullname(e.target.value)}
              pl="4"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Username</Field.Label>
            <Input
              id="username"
              type="text"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
              pl="4"
            />
          </Field.Root>
          <Card.Footer justifyContent="flex-end">
            <form action="/auth/signout" method="post">
              <Button
                className="button block"
                type="submit"
                variant="outline"
                p="4"
              >
                Sign out
              </Button>
            </form>
            <Button
              colorPalette="blue"
              className="button primary block"
              onClick={() => updateProfile({ fullname, username, avatar_url })}
              disabled={loading}
              p="4"
            >
              {loading ? "Loading ..." : "Update"}
            </Button>
          </Card.Footer>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
