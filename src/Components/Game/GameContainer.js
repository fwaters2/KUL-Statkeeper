import React from "react";
import { Button, Grid, Paper, TableContainer, Fab } from "@material-ui/core";
import DColumn from "./Ds/DColumn";
import GoalColumns from "./Goals/GoalColumns";
import DDialogContainer from "./Ds/DDialogContainer";
import GoalDialogContainer from "./Goals/GoalDialogContainer";
import Scoreboard from "./Scoreboard/Index.js";

import GameContext from "../../Assets/GameContext";
import { ArrowLeft, Add, ArrowRight } from "@material-ui/icons";
import SubmissionConfirm from "./SubmissionConfirm";
import {
  assistDBRef,
  dUIRef,
  matchEventsRef,
  pointDBRef,
  pointUIRef,
  resultRef,
  completedGamesRef,
} from "../../Assets/firestoreCollections";

export default function GameContainer() {
  //Data
  const gameData = React.useContext(GameContext);
  const { setPage, matchData } = gameData;
  const [points, setPoints] = React.useState([]);
  const [ds, setDs] = React.useState([]);

  //Dialogs
  const [isPointDialogOpen, togglePointDialog] = React.useState(false);
  const [isDDialogOpen, toggleDDialog] = React.useState(false);
  const [pointIdToUpdate, setPointIdToUpdate] = React.useState(null);
  const [assistIdToUpdate, setAssistIdToUpdate] = React.useState(null);
  const [dIdToUpdate, setDIdToUpdate] = React.useState(null);
  const [isConfirming, toggleConfirmation] = React.useState(false);

  //Scoreboard Manipulation
  const [homeScore, setHomeScore] = React.useState(
    points.filter(
      (point) => point.teamColor === matchData.homeTeamData.colorPrimary
    ).length
  );
  const [awayScore, setAwayScore] = React.useState(
    points.filter(
      (point) => point.teamColor === matchData.awayTeamData.colorPrimary
    ).length
  );

  const handleGameSubmit = () => {
    if (homeScore === awayScore) {
      alert("Error: The score is tied");
      toggleConfirmation(false);
    } else {
      const winner =
        homeScore > awayScore
          ? matchData.homeTeamData.id
          : matchData.awayTeamData.id;
      const loser =
        homeScore < awayScore
          ? matchData.homeTeamData.id
          : matchData.awayTeamData.id;
      const winningScore = homeScore > awayScore ? homeScore : awayScore;
      const losingScore = homeScore < awayScore ? homeScore : awayScore;
      resultRef.doc(matchData.id).update({
        winner,
        loser,
        isComplete: true,
        timestamp: new Date(),
      });
      console.log("madataID", matchData.id);
      completedGamesRef.doc(matchData.id).set({
        winner,
        winningScore,
        loser,
        losingScore,
        timestamp: new Date(),
      });
      setPage("Schedule");
    }
  };

  //Firestore References
  const pointsRef = pointUIRef;
  const byTimestamp = (a, b) => a.timestamp.toDate() - b.timestamp.toDate();
  React.useEffect(() => {
    //Import Stats

    dUIRef.where("matchId", "==", matchData.id).onSnapshot((querySnapshot) => {
      var dbDs = [];
      querySnapshot.forEach((doc) => {
        dbDs.push({ id: doc.id, ...doc.data() });
        //dbDs = dbDs.sort(byTimeStamp);
      });
      setDs(dbDs);
    });
    pointsRef
      .where("matchId", "==", matchData.id)
      .onSnapshot((querySnapshot) => {
        var dbPoints = [];
        querySnapshot.forEach((doc) => {
          dbPoints.push({ id: doc.id, ...doc.data() });
        });
        //update Scoreboard
        const newHomeScore = dbPoints.filter(
          (point) => point.teamColor === matchData.homeTeamData.colorPrimary
        ).length;
        const newAwayScore = dbPoints.filter(
          (point) => point.teamColor === matchData.awayTeamData.colorPrimary
        ).length;
        setHomeScore(newHomeScore);
        setAwayScore(newAwayScore);
        setPoints(dbPoints);
      });
  }, []);

  //Point Manipulation
  const choosePointIdToUpdate = (goal) => {
    setPointIdToUpdate(goal.id);
    setAssistIdToUpdate(goal.assistDBref);
    togglePointDialog(true);
  };

  const handlePointDelete = (id, assistDBrefID) => () => {
    assistDBRef.doc(assistDBrefID).delete();

    pointsRef.doc(id).delete();
    togglePointDialog(false);
    pointDBRef.doc(id).delete();
    pointsRef.doc(id).delete();
    togglePointDialog(false);
  };

  //D Manipulation
  const chooseDIdToUpdate = (id) => () => {
    setDIdToUpdate(id);
    toggleDDialog(true);
  };

  const handleDDelete = (id) => () => {
    matchEventsRef
      .doc(id)
      .delete()
      .then(console.log("matchEvents d delete"))
      .catch((error) => console.log(error));
    dUIRef
      .doc(id)
      .delete()
      .then(console.log("ui d delete"))
      .catch((error) => console.log(error));
    toggleDDialog(false);
  };
  const handleClosePoint = () => {
    setPointIdToUpdate(null);
    togglePointDialog(false);
  };
  const handleCloseD = () => {
    setDIdToUpdate(null);
    toggleDDialog(false);
  };

  return (
    <div
      style={{
        height: "calc(100vh - 40px)",
        display: "flex",
        background: "#283895",
        padding: 20,
      }}
    >
      <Grid spacing={5} container direction="column" wrap="nowrap">
        <Grid item style={{ paddingBottom: 0 }}>
          <Grid container justify="space-between">
            <Grid item>
              <Fab
                variant="extended"
                style={{
                  backgroundColor: "#DF3E40",
                  paddingBottom: 0,
                  marginBottom: 0,
                }}
                onClick={() => setPage("Schedule")}
              >
                <ArrowLeft />
                Back to Schedule
              </Fab>
            </Grid>
            <Grid item>
              <Fab
                variant="extended"
                style={{
                  backgroundColor: "#DF3E40",
                  paddingBottom: 0,
                  marginBottom: 0,
                }}
                onClick={() => toggleConfirmation(true)}
              >
                Submit Game
                <ArrowRight />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Scoreboard
            stuff={{
              homeScore: homeScore,
              awayScore: awayScore,
            }}
          />
        </Grid>
        <Grid
          xs
          item
          container
          style={{ height: "10px" }} //NO IDEA WHY THIS WORKS, but if you remove it all hell breaks lose with the scrollable content
        >
          <Grid
            item
            xs={7}
            style={{ height: "100%" }}
            container
            justify="center"
            spacing={0}
          >
            <Paper
              style={{
                height: "85%",
                width: "100%",
                padding: "0 1em",
                margin: "0 1em",
              }}
            >
              <TableContainer style={{ height: "100%" }}>
                <GoalColumns
                  points={points.sort(byTimestamp)}
                  handlePointDelete={handlePointDelete}
                  choosePointIdToUpdate={choosePointIdToUpdate}
                />
              </TableContainer>
            </Paper>
            <Button
              variant="contained"
              style={{
                width: "85%",
                backgroundColor: "#DF3E40",
                color: "white",
              }}
              size="large"
              onClick={() => togglePointDialog(true)}
              startIcon={<Add />}
            >
              Add Goal
            </Button>
          </Grid>
          <Grid
            item
            xs={5}
            style={{ height: "100%" }}
            container
            justify="center"
            spacing={0}
          >
            <Paper
              style={{
                height: "85%",
                width: "100%",
                padding: "0 1em",
                margin: "0 1em",
              }}
            >
              <TableContainer style={{ height: "100%" }}>
                <DColumn
                  ds={ds.sort(byTimestamp)}
                  handleDDelete={handleDDelete}
                  chooseDIdToUpdate={chooseDIdToUpdate}
                />
              </TableContainer>
            </Paper>
            <Button
              variant="contained"
              style={{
                width: "85%",
                backgroundColor: "#DF3E40",
                color: "white",
              }}
              size="large"
              onClick={() => toggleDDialog(true)}
              startIcon={<Add />}
            >
              Add D
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <DDialogContainer
        open={isDDialogOpen}
        onClose={handleCloseD}
        dIdToUpdate={dIdToUpdate}
      />
      <GoalDialogContainer
        open={isPointDialogOpen}
        onClose={handleClosePoint}
        pointIdToUpdate={pointIdToUpdate}
        assistIdToUpdate={assistIdToUpdate}
      />
      <SubmissionConfirm
        open={isConfirming}
        handleClose={() => toggleConfirmation(false)}
        handleGameSubmit={handleGameSubmit}
      />
    </div>
  );
}
