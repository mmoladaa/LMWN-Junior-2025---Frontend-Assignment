import React, { createContext, useContext, useState, ReactNode } from "react";

interface HeaderContextType {
  imageUrl: string;
  title: string;
  isOpen: boolean;
  hours: string;
  setImageUrl: (url: string) => void;
  setTitle: (title: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setHours: (hours: string) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

interface HeaderProviderProps {
  children: ReactNode;
}

export function HeaderProvider({ children }: HeaderProviderProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState("");

  const value = {
    imageUrl,
    title,
    isOpen,
    hours,
    setImageUrl,
    setTitle,
    setIsOpen,
    setHours,
  };

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
}
