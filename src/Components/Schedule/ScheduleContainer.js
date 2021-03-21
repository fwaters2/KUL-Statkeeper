import React, { useState } from "react";
import { Paper, Box, Button } from "@material-ui/core";
import Title from "./Title";
import ScheduleSubtitle from "./ScheduleSubtitle";
import SchedTable from "./SchedTable";
import moment from "moment";
import firebase2 from "../../Utils/Firebase2";

export default function ScheduleContainer() {
  const [uniqueDates, setUniqueDates] = useState([]);
  const [currentDate, setCurrentDate] = useState({
    weekNum: 1,
    date: "Broken",
  });
  const handleFULLRESET = () => {
    const db = firebase2.firestore();
    console.log("HandlingFULLRESET");
    const collectionsToDelete = [
      // "fantasyUsers",
      // "fantasySubscores",
      // "fantasyPicks",
      // "pointsScorekeeper",
      // "matchEvents",
      // "dsScorekeeper",
      // "pointEvents",
      // "points",
      // "seasonStats",
    ];
    const myPromises = collectionsToDelete.map((x) =>
      db
        .collection(x)
        .get()
        .then((docs) => docs.forEach((doc) => doc.ref.delete()))
        .catch((error) => console.log(error))
    );
    return Promise.all(myPromises)
      .then(alert("database wiped"))
      .catch((error) => console.log(error));
  };

  const getClosestDate = (dates) => {
    const now = moment();
    let closest = Infinity;
    let closestDate = null;
    let weekNum = 0;

    dates.forEach((d, index) => {
      const date = moment(d, "MMMM Do YYYY");
      if (Math.abs(now.diff(date, "days")) < closest) {
        closest = now.diff(date, "days");
        weekNum = index + 1;
        closestDate = d;
      }
    });
    const currentDate = { weekNum, date: closestDate };

    return currentDate;
  };

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
      <Title currentSeason={"Fall 2020"} />
      <Paper
        style={{ margin: "0 2em 6em 2em", flex: 1, borderRadius: "16px" }}
        elevation={10}
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
        <Box mt="1em">
          <SchedTable
            setCurrentDate={setCurrentDate}
            currentDate={currentDate}
            setUniqueDates={setUniqueDates}
            getClosestDate={getClosestDate}
          />
        </Box>
      </Paper>
      {process.env.NODE_ENV === "development" ? (
        <Button
          variant="contained"
          onClick={handleFULLRESET}
          fullWidth
          style={{ background: "darkRed" }}
        >
          FULL RESET
        </Button>
      ) : null}
    </div>
  );
}
