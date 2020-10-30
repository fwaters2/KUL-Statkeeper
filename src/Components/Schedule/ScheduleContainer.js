import React from "react";
import { Paper, Box, Button } from "@material-ui/core";
import Title from "./Title";
import ScheduleSubtitle from "./ScheduleSubtitle";
import SchedTable from "./SchedTable";
import moment from "moment";
import firebase2 from "../../Utils/Firebase2";

export default function ScheduleContainer() {
  const [uniqueDates, setUniqueDates] = React.useState([]);
  const [currentDate, setCurrentDate] = React.useState({
    weekNum: 1,
    date: moment("10/31/2020").format("MMMM Do YYYY"),
  });
  const handleFULLRESET = () => {
    const db = firebase2.firestore();
    console.log("HandlingFULLRESET");
    const collectionsToDelete = [
      "fantasyUsers",
      "fantasySubscores",
      "fantasyPicks",
      "pointsScorekeeper",
      "matchEvents",
      "dsScorekeeper",
      "pointEvents",
      "points",
      "seasonStats",
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
            currentDate={currentDate}
            setUniqueDates={setUniqueDates}
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
