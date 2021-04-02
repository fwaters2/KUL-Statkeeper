import React, { createContext, useEffect, useState } from "react";
import { playersRef } from "../Assets/firestoreCollections";
import { createFBObject } from "../Utils/general_utils";
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [page, setPage] = useState("Schedule");
  const [matchData, setMatchData] = useState({});
  const [playerData, setPlayerData] = useState({});

  // Get All Player Data
  useEffect(() => {
    playersRef.get().then((data) => {
      const playersObj = createFBObject(data);
      setPlayerData(playersObj);
    });
  }, []);

  const data = {
    page,
    setPage,
    playerData,
    matchData,
    setMatchData,
  };
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default AppProvider;
