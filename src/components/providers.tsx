"use client";
import { ButtonBackProvider } from "./providers/ButtonBackProvider";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "./ui/tooltip";
import { AppProgressBar } from "next-nprogress-bar";
import { ProgressProvider } from "@bprogress/next/app";
import { NavbarBottomProvider } from "./providers/NavbarBottomProvider";
export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ButtonBackProvider>
          <NavbarBottomProvider>
            <TooltipProvider>
              <ProgressProvider
                height="4px"
                color="#3b82f6"
                options={{ showSpinner: false }}
                shallowRouting
              />
              {children}
            </TooltipProvider>
          </NavbarBottomProvider>
        </ButtonBackProvider>
      </ThemeProvider>
    </>
  );
}
