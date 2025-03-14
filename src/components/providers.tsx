"use client";
import { ButtonBackProvider } from "./providers/ButtonBackProvider";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "./ui/tooltip";
import { AppProgressBar } from "next-nprogress-bar";
import { ProgressProvider } from "@bprogress/next/app";
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
          <TooltipProvider>
            <ProgressProvider
              height="4px"
              color="#3b82f6"
              options={{ showSpinner: false }}
              shallowRouting
            />
            {children}
          </TooltipProvider>
        </ButtonBackProvider>
      </ThemeProvider>
    </>
  );
}
