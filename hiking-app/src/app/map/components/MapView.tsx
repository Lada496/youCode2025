"use client";

import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";
//import { env } from "@/env";
import { center } from "../constants";
import { MarkerWithInfoWindow } from "./marker-with-infowindow";
import { useEffect, useState } from "react";
import type { Event } from "../eventinfo";

interface MapViewProps {
  events: Event[];
}

export default function MapView({ events }: MapViewProps) {
  console.log({ events });
  const [openInfoWindowId, setOpenInfoWindowId] = useState<string | null>(null);

  const handleCloseInfoWindow = () => {
    setOpenInfoWindowId(null);
  };

  useEffect(() => {
    window.addEventListener("click", handleCloseInfoWindow);
    return () => window.removeEventListener("click", handleCloseInfoWindow);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 50px)",
      }}
    >
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}>
        <GoogleMap
          mapId={"your-map-id"}
          style={{ width: "100%", height: "100%" }}
          defaultCenter={center}
          defaultZoom={11}
          gestureHandling="greedy"
          disableDefaultUI
          onClick={handleCloseInfoWindow}
        >
          {events.map((event) => {
            console.log(
              "Rendering marker:",
              event.title,
              event.latitude,
              event.longitude
            );
            return (
              <MarkerWithInfoWindow
                key={event.title}
                event={event}
                isCardOpen={openInfoWindowId === event.title}
                handleMarkerClick={() => setOpenInfoWindowId(event.title)}
              />
            );
          })}
        </GoogleMap>
      </APIProvider>
    </div>
  );
}
