"use client";

import { MapView } from "./components/MapView";
import { events } from "./eventinfo"; 



export default function MapPage() {
  return (
    <div>
      Map Page
      <MapView events={events} />
    </div>
  );
}
