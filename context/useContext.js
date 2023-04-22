import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [foods, setFoods] = useState({});
  const [users, setUsers] = useState({});

  return (
    <AppContext.Provider
      value={{ foods: [foods, setFoods], users: [users, setUsers] }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
