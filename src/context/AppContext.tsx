import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AppContextType = {
  destinationPhone: string;

  saveDestinationPhone: (phone: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [destinationPhone, setDestinationPhone] = useState<string>(() => {
    const saved = localStorage.getItem("destinationPhone");
    return saved ? saved.toString() : "";
  });

  useEffect(() => {
    localStorage.setItem("destinationPhone", destinationPhone);
  }, [destinationPhone]);

  function saveDestinationPhone(phone: string) {
    setDestinationPhone(phone);
  }

  return (
    <AppContext.Provider value={{ destinationPhone, saveDestinationPhone }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("No puedes usar el contexto aqui");
  return ctx;
};
