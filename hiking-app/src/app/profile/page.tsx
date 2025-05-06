import EditProfileForm from "./components/edit-profile-form";
import { Profile } from "./components/profile";
import { createClient } from "../utils/supabase/server";
import { Center, Tabs, Box, Flex, Text } from "@chakra-ui/react";
import AllEvents from "./components/all-events";
import MyEvents from "./components/my-events";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ProfilePage(props: {
  searchParams: SearchParams;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const searchParams = await props.searchParams;
  const query = searchParams.edit;
  const isEdit = query && query === "true";

  const isEmailVerified = !!user?.email_confirmed_at;

  return (
    <Tabs.Root defaultValue="upcoming">
      <Tabs.List>
        <Box background="blue.500" width="100%">
          <Flex direction="row" justify="space-evenly" align="center">
            <Tabs.Trigger
              value="upcoming"
              color="white"
              _selected={{ color: "blue.900", fontWeight: "bold" }}
            >
              Upcoming
            </Tabs.Trigger>
            <Tabs.Trigger
              value="yours"
              color="white"
              _selected={{ color: "blue.900", fontWeight: "bold" }}
            >
              Yours
            </Tabs.Trigger>
            <Tabs.Trigger
              value="past"
              color="white"
              _selected={{ color: "blue.900", fontWeight: "bold" }}
            >
              Past
            </Tabs.Trigger>
            <Tabs.Trigger
              value="profile"
              color="white"
              _selected={{ color: "blue.900", fontWeight: "bold" }}
            >
              Profile
            </Tabs.Trigger>
          </Flex>
        </Box>
      </Tabs.List>
      <Tabs.Content value="upcoming">
        <AllEvents />
      </Tabs.Content>
      <Tabs.Content value="yours">
        <MyEvents />
      </Tabs.Content>
      <Tabs.Content value="past">Past events</Tabs.Content>
      <Tabs.Content value="profile">
        <Center flexDirection="column">
          {!isEmailVerified && (
            <Box
              background="yellow.200"
              padding="4"
              borderRadius="md"
              mb="4"
              mt="4"
            >
              <Text color="yellow.800" fontWeight="bold">
                ⚡ Please verify your email to access all features.
              </Text>
            </Box>
          )}
          {isEdit ? <EditProfileForm user={user} /> : <Profile user={user} />}
        </Center>
      </Tabs.Content>
    </Tabs.Root>
  );
}
