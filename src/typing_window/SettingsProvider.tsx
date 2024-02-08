import React, { createContext, useContext, useState } from "react";

interface SettingProviderProps {
  initialState: any;
  children?: React.ReactNode; // Make children prop optional
}

interface SettingContextValue {
  settingContext: any; // Change to appropriate type if needed
  setSettingContext: React.Dispatch<React.SetStateAction<any>>; // Change to appropriate type if needed
}

const SettingContext = createContext<SettingContextValue | undefined>(
  undefined
);

export const SettingProvider: React.FC<SettingProviderProps> = ({
  children,
  initialState,
}) => {
  const [SettingContextValue, setSettingContextValue] = useState(initialState);

  return (
    <SettingContext.Provider
      value={{
        settingContext: SettingContextValue,
        setSettingContext: setSettingContextValue,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export const useSettingContext = () => {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("useSettingContext must be used within a SettingProvider");
  }
  return context;
};
