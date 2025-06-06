import { requestFn } from "@/api/axios";
import { createContext, useEffect, useState } from "react";

const ConfigContext = createContext<{
  sessionDuration: number;
}>({
  sessionDuration: 0,
});

export const ContextConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<{
    sessionDuration: number;
  }>({
    sessionDuration: 0,
  });

  useEffect(() => {
    requestFn<{
      sessionDuration: number;
    }>({
      method: "GET",
      path: "config",
    }).then((response) => {
      console.log("response", response.data);
      setConfig(response.data);
    });
  }, []);

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

export default ContextConfigProvider;
