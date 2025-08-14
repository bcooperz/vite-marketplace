import React, { Suspense, useEffect, useState } from "react";
import bootstrap from "@/bootstrap";
import { toast } from "react-toastify";

const ModalProvider = React.lazy(() => import("@/context/ModalProvider.tsx"));
const RouteProvider = React.lazy(() => import("@/components/RouteProvider.tsx"));

const AppWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModalProvider, setShowModalProvider] = useState(true);

  useEffect(() => {
    bootstrap()
      .then(() => {
        toast.dismiss();
        toast.success("Loaded");
        setIsLoading(false);
      })
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
      {/* todo: remove this button after testing */}
      <button
        onClick={() => setShowModalProvider(!showModalProvider)}
        style={{ marginTop: "6rem" }}
      >
        {showModalProvider ? "Remove Modal Provider" : "Add Modal Provider"}
      </button>
      {showModalProvider ? (
        <ModalProvider>
          <RouteProvider />
        </ModalProvider>
      ) : (
        <RouteProvider />
      )}

      {/* // todo: Consider if toast should be in another microapp / react app */}
      {/* <ModalProvider>
        <RouteProvider />
      </ModalProvider> */}
    </Suspense>
  );
};

export default AppWrapper;
