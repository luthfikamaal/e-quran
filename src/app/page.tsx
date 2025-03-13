import Image from "next/image";
import chapters from "../data/chapters.json";
import HomeComponent from "./homecomponent";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="container mx-auto p-6">
        <HomeComponent />
      </div>
    </div>
  );
}
