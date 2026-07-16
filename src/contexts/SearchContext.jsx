import { createContext, useContext, useState, useEffect } from "react";
import { CommandPalette } from "../components/ui/CommandPalette";

const SearchContext = createContext(undefined);

export function SearchProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => setIsOpen(false);

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <SearchContext.Provider value={{ isOpen, openSearch, closeSearch }}>
      {children}
      <CommandPalette isOpen={isOpen} onClose={closeSearch} />
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
