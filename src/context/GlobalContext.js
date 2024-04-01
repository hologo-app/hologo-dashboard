import React, { createContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalUserProvider = ({ children }) => {
  const [fetch, setFetch] = useState(0);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [showBackdrop, setShowBackDrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        showDeleteSuccess,
        setShowDeleteSuccess,
        showError,
        setShowError,
        showSuccess,
        setShowSuccess,
        fetch,
        setFetch,
        showLoginSuccess,
        setShowLoginSuccess,
        showLoginError,
        setShowLoginError,
        showBackdrop,
        setShowBackDrop,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => React.useContext(GlobalContext);
