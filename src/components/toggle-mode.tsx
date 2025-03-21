"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ToogleMode() {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <Button
      onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
      className="flex items-center justify-center"
      variant={"outline"}
      size={"icon"}
    >
      {theme == "dark" ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        // <i className="fa-solid fa-moon"></i>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        // <i className="fa-solid fa-sun"></i>
      )}
    </Button>
  );
}
