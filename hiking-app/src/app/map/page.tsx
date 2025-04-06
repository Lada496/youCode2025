"use client";

//import { MapView } from "./components/MapView";
import dynamic from "next/dynamic";
import { events } from "./eventinfo"; 

const MapView = dynamic(() => import("./components/MapView"), { ssr: false });

export default function MapPage() {
  return (
    <div>
      Map Page
      <MapView events={events} />
    </div>
  );
}
