import React, { createContext } from "react";

export const MatchContext = createContext();

const MatchProvider = ({ children }) => {
  const matchData = { hmm: "in Business" };
  return (
    <MatchContext.Provider value={matchData}>{children}</MatchContext.Provider>
  );
};

export default MatchProvider;
