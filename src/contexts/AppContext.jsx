import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const AppContext = createContext();

function AppProvider({ children }) {
  const location = useLocation();
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);

  return (
    <AppContext.Provider
      value={{ location, isOpenSearchBar, setIsOpenSearchBar }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;

export function useApp() {
  return useContext(AppContext);
}
