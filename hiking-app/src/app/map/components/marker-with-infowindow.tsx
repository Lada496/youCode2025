"use client";

import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { Box, Heading, Text, Image, Link, Button } from "@chakra-ui/react";
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
          <Box position="relative" bg="transparent" p={0} m={0}>
            <Box
              p={4}
              maxW="280px"
              bg="blue.50"
              borderRadius="lg"
              boxShadow="xl"
              border="1px solid #3182ce"
              display="flex"
              flexDirection="column"
              gap={2}
            >
              {event.picture && (
                <Link
                  href={event.picture}
                  target="_blank"
                  rel="noopener noreferrer"
                  borderRadius="md"
                  overflow="hidden"
                >
                  <Image
                    src={event.picture}
                    alt={event.title}
                    objectFit="cover"
                    maxH="140px"
                    borderRadius="md"
                    mb={1}
                  />
                </Link>
              )}

              <Heading
                size="sm"
                fontSize="20"
                color="blue.700"
                fontWeight="bold"
              >
                {event.title}
              </Heading>

              <Text fontSize="sm" color="gray.600">
                🕒 Time: {new Date(event.time).toLocaleString()}
              </Text>

              <Text fontSize="sm" color="gray.600">
                👤 Host: {event.host}
              </Text>

              {event.sponsor && (
                <Text fontSize="sm" color="gray.600">
                  💼 Sponsor: {event.sponsor}
                </Text>
              )}

              <Button
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600" }}
                size="sm"
                loading={isSubmitting}
                onClick={handleAttend}
                mt={2}
                px={4}
                py={2}
                borderRadius="md"
                fontWeight="medium"
              >
                Attended!
              </Button>
            </Box>
          </Box>
        </InfoWindow>
      )}
    </>
  );
}
