"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createClient } from "../utils/supabase/client";

const MapView = dynamic(() => import("./components/MapView"), { ssr: false });

type Category = {
  id: string;
  name: string;
};

type HostProfile = {
  id: string;
  full_name: string;
};

type Event = {
  id: string;
  title: string;
  longitude: number;
  latitude: number;
  time: string;
  host: string;
  sponsor: string;
  picture: string;
  category: Category;
  host_profile: HostProfile | null;
};

export default function MapPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select(`
          id,
          title,
          longitude,
          latitude,
          time,
          host,
          sponsor,
          picture,
          category:categories (
            id,
            name
          ),
          host_profile:profiles (
          id,
          full_name
         )
        `);

      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        const mappedEvents = data.map((event: Event) => {
          return {
            id: event.id,
            title: event.title,
            longitude: event.longitude,
            latitude: event.latitude,
            time: event.time,
            host: event.host_profile?.full_name,
            sponsor: event.sponsor,
            picture: event.picture,
            category: event.category.name,
          };
        });
        setEvents(mappedEvents);
      }
    };

    fetchEvents();
  }, [supabase]);

  return (
    <div>
      <MapView events={events} />
    </div>
  );
}
