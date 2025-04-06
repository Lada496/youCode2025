"use client";
import { useEffect, useState, useCallback } from "react";
import { type User } from "@supabase/supabase-js";
import { createClient } from "@/app/utils/supabase/client";
import { downloadImage } from "@/app/utils/download-image";
import { HiStar } from "react-icons/hi";
import Link from "next/link";
import {
  Avatar,
  Card,
  HStack,
  Stack,
  Strong,
  Text,
  Badge,
  Button,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";

export const Profile = ({ user }: { user: User | null }) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [numEvents, setNumEvents] = useState<number | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, avatar_url, num_events`)
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
        setNumEvents(data.num_events ?? 0);
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

  useEffect(() => {
    if (avatar_url) {
      const fetchImage = async () => {
        const data = await downloadImage(avatar_url);
        setUrl(data); // Set the image URL here
      };
      fetchImage();
    }
  }, [avatar_url]); // Only trigger when avatar_url changes

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Card.Root width="320px" p="4" mt="4">
            <Card.Body>
              <HStack mb="6" gap="3">
                <Avatar.Root>
                  {url ? <Avatar.Image src={url} /> : <Avatar.Fallback />}
                </Avatar.Root>
                <Stack gap="0">
                  <Text fontWeight="semibold" textStyle="sm">
                    {fullname}
                  </Text>
                  <Text color="fg.muted" textStyle="sm">
                    {username}
                  </Text>
                </Stack>
                <Badge variant="solid" colorPalette="blue" p="2">
                  <HiStar />
                  <HiStar />
                  <HiStar />
                </Badge>
              </HStack>
              <Card.Description>
                <Strong color="fg">Email: </Strong>
                {user?.email}
              </Card.Description>
              <Card.Description>
                <Strong color="fg">Category: </Strong>
                hiking
              </Card.Description>
              <Card.Description>
                <Strong color="fg">Events Attended: </Strong>
                {numEvents ?? "Loading..."}
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              {/* Align the button to the right corner */}
              <Flex justify="flex-end" width="100%">
                <Link
                  href={{ pathname: "/profile", query: { edit: "true" } }}
                  passHref
                >
                  <Button variant="outline" p="4" mt="2">
                    Edit your profile
                  </Button>
                </Link>
              </Flex>
            </Card.Footer>
          </Card.Root>
        </>
      )}
    </>
  );
};
