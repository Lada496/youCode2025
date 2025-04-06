"use client";

import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { Box, Heading, Text, Image, Link, Button as ChakraButton } from "@chakra-ui/react";
import type { Event } from "../eventinfo";
import { createClient } from "@/app/utils/supabase/client";
import { useState } from "react";

interface MarkerWithInfoWindowProps {
  event: Event;
  isCardOpen: boolean;
  handleMarkerClick: () => void;
}

export function MarkerWithInfoWindow({
  event,
  isCardOpen,
  handleMarkerClick,
}: MarkerWithInfoWindowProps) {
  const position = { lat: event.latitude, lng: event.longitude };
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAttend = async () => {
    setIsSubmitting(true);

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      alert("You must be logged in to attend events.");
      setIsSubmitting(false);
      return;
    }

    const { data, error: fetchError } = await supabase
      .from("profiles")
      .select("num_events")
      .eq("id", user.id)
      .single();

    if (fetchError || !data) {
      alert("Failed to fetch current event count.");
      setIsSubmitting(false);
      return;
    }

    const currentCount = data.num_events ?? 0;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ num_events: currentCount + 1 })
      .eq("id", user.id);

    if (updateError) {
      alert("Error updating event count.");
    } else {
      alert("Your attendance was recorded! 🎉");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <AdvancedMarker position={position}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            console.log("Clicked marker for:", event.title);
            handleMarkerClick();
          }}
          style={{
            backgroundColor: "green",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
      </AdvancedMarker>

      {isCardOpen && (
        <InfoWindow position={position} onCloseClick={handleMarkerClick}>
          <Box p={2} maxW="250px" bg="white" borderRadius="md" boxShadow="md">
            {event.picture && (
              <Link
                href={event.picture}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={event.picture}
                  alt={event.title}
                  borderRadius="md"
                  objectFit="cover"
                  maxH="120px"
                  mb={2}
                />
              </Link>
            )}

            <Heading size="sm" mb={1} color="black" fontWeight="semibold">
              {event.title}
            </Heading>

            <Text fontSize="xs" color="black">
              Time: {new Date(event.time).toLocaleString()}
            </Text>

            <Text fontSize="xs" color="black">
              Host: {event.host}
            </Text>

            {event.sponsor && (
              <Text fontSize="xs" color="black">
                Sponsor: {event.sponsor}
              </Text>
            )}

            <ChakraButton
              colorScheme="blue"
              size="sm"
              loading={isSubmitting}
              onClick={handleAttend}
              mt={2}
            >
              Attended!
            </ChakraButton>
          </Box>
        </InfoWindow>
      )}
    </>
  );
}
