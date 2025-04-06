"use client";
import { Center, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createClient } from "@/app/utils/supabase/client";
import EventCard from "@/app/components/event-card";

type Event = {
  id: string;
  title: string;
  picture: string;
  description: string;
};

export default function MyEvents() {
  const supabase = createClient();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        console.error("No user is logged in.");
        return;
      }

      const { data, error } = await supabase
        .from("events")
        .select("id, title, picture, description")
        .eq("host", user?.id);
      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        setEvents(data || []);
      }
    };

    fetchEvents();
  }, [supabase]);

  return (
    <>
      {events.length == 0 ? (
        "You didn't host events yet"
      ) : (
        <Center p="4">
          <VStack pb="20">
            {events.map(({ id, title, picture, description }) => (
              <EventCard
                key={id} // Use `id` as key for better uniqueness
                title={title}
                picture={picture}
                description={description}
              />
            ))}
          </VStack>
        </Center>
      )}
    </>
  );
}
