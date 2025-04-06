"use client";

import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { Box, Heading, Text, Image, Link } from "@chakra-ui/react";
import type { Event } from "../eventinfo";

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

  return (
    <>
      <AdvancedMarker position={position}>
        <div
          onClick={(e) => {
            e.stopPropagation(); // prevents map click from closing it
            console.log("Clicked marker for:", event.title);
            handleMarkerClick();
          }}
          style={{
            backgroundColor: "green",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
      </AdvancedMarker>

      {isCardOpen && (
        <InfoWindow position={position} onCloseClick={handleMarkerClick}>
          <Box p={2} maxW="250px" bg="white">
            <Heading size="sm" mb={1}>
              {event.title}
            </Heading>

            <Text fontSize="xs" color="gray.500">
              Time: {new Date(event.time).toLocaleString()}
            </Text>

            <Text fontSize="xs" color="gray.500">
              Host: {event.host}
            </Text>

            {event.sponsor && (
              <Text fontSize="xs" color="gray.500">
                Sponsor: {event.sponsor}
              </Text>
            )}

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
                  mt={2}
                />
              </Link>
            )}
          </Box>
        </InfoWindow>
      )}
    </>
  );
}
