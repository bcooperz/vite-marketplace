import React, { Suspense, useEffect, useState } from "react";
import bootstrap from "@/bootstrap";

const ModalProvider = React.lazy(() => import("@/context/ModalProvider.tsx"));
const RouteProvider = React.lazy(() => import("@/components/RouteProvider.tsx"));

const AppWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    bootstrap()
      .then(() => setIsLoading(false))
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModalProvider>
        <RouteProvider />
      </ModalProvider>
    </Suspense>
  );
};

export default AppWrapper;
