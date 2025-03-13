"use client";
import { ButtonBackProvider } from "./providers/ButtonBackProvider";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "./ui/tooltip";
import { AppProgressBar } from "next-nprogress-bar";
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
            <AppProgressBar
              height="4px"
              color="#fffd00"
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
