import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ButtonBackContext = createContext<{
  useNavbarBottom: boolean;
  setUseNavbarBottom: (value: boolean) => void;
}>({
  useNavbarBottom: true,
  setUseNavbarBottom: () => {},
});

export function NavbarBottomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [useNavbarBottom, setUseNavbarBottom] = useState<boolean>(true);

  return (
    <ButtonBackContext.Provider value={{ useNavbarBottom, setUseNavbarBottom }}>
      {children}
    </ButtonBackContext.Provider>
  );
}

export function useBottomNavbar() {
  return useContext(ButtonBackContext);
}
