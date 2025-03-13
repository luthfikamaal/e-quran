import { createContext, useContext, useState } from "react";
import { Tafsir } from "@/types/tafsir";
import { Verse } from "@/types/chapter";

interface TafsirV2 {
  verse: Verse;
  tafsir: Tafsir;
}

const TafsirDialogContext = createContext<{
  isTafsirDialogOpen: boolean;
  setIsTafsirDialogOpen: (isOpen: boolean) => void;
  verseTafsir: TafsirV2 | null;
  setVerseTafsir: (value: TafsirV2 | null) => void;
}>({
  isTafsirDialogOpen: false,
  setIsTafsirDialogOpen: () => {},
  verseTafsir: null,
  setVerseTafsir: () => {},
});

export function ButtonBackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [verseTafsir, setVerseTafsir] = useState<TafsirV2 | null>(null);
  const [isTafsirDialogOpen, setIsTafsirDialogOpen] = useState<boolean>(false);

  return (
    <TafsirDialogContext.Provider
      value={{
        isTafsirDialogOpen,
        setIsTafsirDialogOpen,
        verseTafsir,
        setVerseTafsir,
      }}
    >
      {children}
    </TafsirDialogContext.Provider>
  );
}

export function useButtonBack() {
  return useContext(TafsirDialogContext);
}
