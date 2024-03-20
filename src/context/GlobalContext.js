import React, { createContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalUserProvider = ({ children }) => {
  const [fetch, setFetch] = useState(0);

  
  return (
    <GlobalContext.Provider value={{ fetch , setFetch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => React.useContext(GlobalContext);
