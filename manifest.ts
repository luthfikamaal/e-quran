import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "E-Quran",
    short_name: "E-Quran",
    description:
      "E-Quran App is a beautifully designed and feature-rich application that brings the Holy Quran to your fingertips. Whether you are a beginner or an advanced reader, this app is your perfect companion for reading, understanding, and memorizing the Quran.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
