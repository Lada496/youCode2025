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

// !!! Add filters
export default function AllEvents() {
  const supabase = createClient();
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, title, picture, description");
      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        setEvents(data || []);
      }
    };

    fetchEvents();
  }, [supabase]);
  return (
    <Center p="4">
      <VStack pb="20">
        {events.map(({ title, picture, description, id }) => (
          <EventCard
            key={id}
            title={title}
            picture={picture}
            description={description}
          />
        ))}
      </VStack>
    </Center>
  );
}
