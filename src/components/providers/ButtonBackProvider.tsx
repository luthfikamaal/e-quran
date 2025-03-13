import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ButtonBackContext = createContext<{
  previousUrl: string | null;
  setPreviousUrl: (url: string | null) => void;
}>({
  previousUrl: null,
  setPreviousUrl: () => {},
});

export function ButtonBackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);

  return (
    <ButtonBackContext.Provider value={{ previousUrl, setPreviousUrl }}>
      {children}
    </ButtonBackContext.Provider>
  );
}

export function useButtonBack() {
  return useContext(ButtonBackContext);
}
