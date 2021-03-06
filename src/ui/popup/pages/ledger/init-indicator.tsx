import React, { FunctionComponent, useEffect } from "react";

import { useLoadingIndicator } from "../../../components/loading-indicator";
import { useLocation } from "react-router";

export const LedgerInitIndicator: FunctionComponent = ({ children }) => {
  const loadingIndicator = useLoadingIndicator();

  const location = useLocation();

  useEffect(() => {
    const startLoading = () => {
      // Indicate loading only if current page is not related to the ledger.
      if (!location.pathname.startsWith("/ledger-")) {
        loadingIndicator.setIsLoading("ledger", true);
      }
    };

    const endLoading = () => {
      loadingIndicator.setIsLoading("ledger", false);
    };

    window.addEventListener("ledgerInitFailed", startLoading);
    window.addEventListener("ledgerInitAborted", endLoading);
    window.addEventListener("ledgerInitResumed", endLoading);

    return () => {
      window.removeEventListener("ledgerInitFailed", startLoading);
      window.removeEventListener("ledgerInitAborted", endLoading);
      window.removeEventListener("ledgerInitResumed", endLoading);
    };
  }, [loadingIndicator, location.pathname]);

  return <React.Fragment>{children}</React.Fragment>;
};
