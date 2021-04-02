import React from "react";

import AppProvider from "./Contexts/AppContext";
import Router from "./Router";

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}
