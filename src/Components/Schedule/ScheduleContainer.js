import React, { useState, useEffect } from "react";
import { Paper, Box } from "@material-ui/core";
import Title from "./Title";
import ScheduleSubtitle from "./ScheduleSubtitle";
import SchedTable from "./SchedTable";
import moment from "moment";
import {
  getDates,
  getMatches,
  getUnique,
  getClosestDate,
} from "./schedule_utils";

export default function ScheduleContainer() {
  const [uniqueDates, setUniqueDates] = useState([]);
  const [currentDate, setCurrentDate] = useState({
    weekNum: 1,
    date: "Loading...",
  });

  useEffect(() => {
    getMatches.then((matches) => {
      let dateArray = getDates(matches);
      let uniqueDatesFromDB = getUnique(dateArray);
      setUniqueDates(uniqueDatesFromDB);
      const closestDate = getClosestDate(uniqueDatesFromDB);
      setCurrentDate(closestDate);
    });
  }, []);

  // const handleFULLRESET = () => {
  //   const db = firebase2.firestore();
  //   console.log("HandlingFULLRESET");
  //   const collectionsToDelete = [
  //     // "fantasyUsers",
  //     // "fantasySubscores",
  //     // "fantasyPicks",
  //     // "pointsScorekeeper",
  //     // "matchEvents",
  //     // "dsScorekeeper",
  //     // "pointEvents",
  //     // "points",
  //     // "seasonStats",
  //   ];
  //   const myPromises = collectionsToDelete.map((x) =>
  //     db
  //       .collection(x)
  //       .get()
  //       .then((docs) => docs.forEach((doc) => doc.ref.delete()))
  //       .catch((error) => console.log(error))
  //   );
  //   return Promise.all(myPromises)
  //     .then(alert("database wiped"))
  //     .catch((error) => console.log(error));
  // };

  return (
    <div
      id="root"
      style={{
        minHeight: "100vh",
        background: "#283895",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title currentSeason={"Spring 2021"} />
      <Paper
        style={{
          margin: "0 2em 6em 2em",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          backgroundColor: "#ffffff95",
        }}
        //elevation={10}
      >
        <ScheduleSubtitle
          currentDate={currentDate}
          uniqueDates={uniqueDates}
          setCurrentDate={setCurrentDate}
          currentSeason={"Fall 2020"}
          currentWeek={{
            week: `Week ${currentDate.weekNum}`,
            date: moment(currentDate.date).format("MMM Do"),
          }}
        />
        <Box
          mt="1em"
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <SchedTable
            setCurrentDate={setCurrentDate}
            currentDate={currentDate}
            setUniqueDates={setUniqueDates}
          />
        </Box>
      </Paper>
      {/* {process.env.NODE_ENV === "development" ? (
        <Button
          variant="contained"
          onClick={handleFULLRESET}
          fullWidth
          style={{ background: "darkRed" }}
        >
          FULL RESET
        </Button>
      ) : null} */}
    </div>
  );
}
