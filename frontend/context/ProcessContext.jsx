import { createContext, useState, useContext } from "react";

const ProcessContext = createContext();

export function ProcessProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [responseOverlayVisible, setResponseOverlayVisible] = useState(false);

  return (
    <ProcessContext.Provider
      value={{
        loading,
        setLoading,
        responseData,
        setResponseData,
        responseOverlayVisible,
        setResponseOverlayVisible,
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
}

export function useProcess() {
  return useContext(ProcessContext);
}
