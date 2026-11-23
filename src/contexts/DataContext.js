import { createContext, useContext } from "react";

const DataContext = createContext(null);

export function useData() {
  const context = useContext(DataContext);
  if (context === null) {
    throw new Error("useData must be used within a DataProvider.");
  }
  return context;
}

export default DataContext;
