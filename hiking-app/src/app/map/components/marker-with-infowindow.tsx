'use client';

import { AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { Box, Heading, Text } from '@chakra-ui/react';
import type { Event } from '../eventinfo';

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
  return (
    <AdvancedMarker position={{ lat: event.latitude, lng: event.longitude }} onClick={handleMarkerClick}>
      {isCardOpen && (
        <InfoWindow>
          <Box p={2}>
            <Heading size="sm" mb={1}>
              {event.title}
            </Heading>
            <Text fontSize="xs" color="gray.500">
              Time: {event.time.toLocaleString()}
            </Text>
          </Box>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
}
