"use client";

import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { Box, Heading, Text, Image, Link, Button } from "@chakra-ui/react";
import type { Event } from "../eventinfo";
import { createClient } from "@/app/utils/supabase/client";
import { useState, useEffect } from "react";
import { IoIosPin } from "react-icons/io";

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
  const [hasAttended, setHasAttended] = useState(false);

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

    // Check if user already attended
    const { data: existing, error: existingError } = await supabase
      .from("user_events")
      .select("*")
      .eq("user_id", user.id)
      .eq("event_id", event.id)
      .single();

    if (existing) {
      alert("You already marked attendance for this event.");
      setIsSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase.from("user_events").insert({
      user_id: user.id,
      event_id: event.id,
      visited_at: new Date().toISOString(),
    });

    if (insertError) {
      alert("Error recording attendance.");
    } else {
      alert("Your attendance was recorded! 🎉");
    }

    setIsSubmitting(false);
  };

  const checkAttendance = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return;
    }

    const { data: existing } = await supabase
      .from("user_events")
      .select("*")
      .eq("user_id", user.id)
      .eq("event_id", event.id)
      .single();

    if (existing) {
      setHasAttended(true);
    } else {
      setHasAttended(false);
    }
  };

  useEffect(() => {
    if (isCardOpen) {
      checkAttendance();
    }
  }, [isCardOpen]);

  return (
    <>
      <AdvancedMarker position={position}>
        <IoIosPin
          size={30}
          color="green"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            console.log("Clicked marker for:", event.title);
            handleMarkerClick();
          }}
        />
      </AdvancedMarker>

      {isCardOpen && (
        <InfoWindow position={position} onCloseClick={handleMarkerClick}>
          <Box position="relative" bg="transparent" p={0} m={0} mt="-2">
            <Box
              p={4}
              maxW="280px"
              bg="gray.50"
              borderRadius="lg"
              boxShadow="xl"
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
                color="gray.600"
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

              {hasAttended ? (
                <Text fontSize="sm" mt={2}>
                  ✅ You already attended this event!
                </Text>
              ) : (
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
              )}
            </Box>
          </Box>
        </InfoWindow>
      )}
    </>
  );
}
