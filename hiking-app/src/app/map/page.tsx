"use client";

//import { MapView } from "./components/MapView";
import dynamic from "next/dynamic";
import { events } from "./eventinfo"; 
import Navbar from "../components/nav-bar"; // relative path from /app/map/page.tsx

const MapView = dynamic(() => import("./components/MapView"), { ssr: false });

export default function MapPage() {
    return (
      <>
        <div style={{ paddingBottom: "70px" }}>
          <h1 style={{ padding: "1rem" }}>Map Page</h1>
          <MapView events={events} />
        </div>
      </>
    );
  }
