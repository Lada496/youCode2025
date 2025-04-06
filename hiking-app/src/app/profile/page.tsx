import EditProfileForm from "./components/edit-profile-form";
import { Profile } from "./components/profile";
import { createClient } from "../utils/supabase/server";
import { Center, Tabs, Box, Flex } from "@chakra-ui/react";
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
        <Center>
          {isEdit ? <EditProfileForm user={user} /> : <Profile user={user} />}
        </Center>
      </Tabs.Content>
    </Tabs.Root>
  );
}
