import { useState } from "react";
import { createContext } from "react";

export const themeContaxt = createContext();

const ThemeProvider = themeContaxt.Provider;

const DeviceContaxt = ({ children }) => {
  const [deviceDetails, setDeviceDetails] = useState();

  return (
    <ThemeProvider value={{ deviceDetails, setDeviceDetails }}>
      {children}
    </ThemeProvider>
  );
};

export default DeviceContaxt;
