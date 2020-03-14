import React from "react";
import {
  Button,
  Grid,
  Paper,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import DColumn from "./Ds/DColumn";
import GoalColumns from "./Goals/GoalColumns";
import DDialogContainer from "./Ds/DDialogContainer";
import GoalDialogContainer from "./Goals/GoalDialogContainer";
import Scoreboard from "./Scoreboard/Index.js";
import UserSpeedDial from "../UserSpeedDial";
import GameContext from "../../Assets/GameContext";
import Firestore from "../../Utils/Firebase2";

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

  //Scoreboard Manipulation
  const [homeScore, setHomeScore] = React.useState(
    points.filter(
      point => point.teamColor === matchData.homeTeamData.colorPrimary
    ).length
  );
  const [awayScore, setAwayScore] = React.useState(
    points.filter(
      point => point.teamColor === matchData.awayTeamData.colorPrimary
    ).length
  );

  //Firestore References
  const pointsRef = Firestore.firestore().collection("pointsScorekeeper");
  const dRef = Firestore.firestore().collection("dsScorekeeper");
  const byTimestamp = (a, b) => a.timestamp.toDate() - b.timestamp.toDate();
  React.useEffect(() => {
    //Import Stats

    dRef.where("matchId", "==", matchData.id).onSnapshot(querySnapshot => {
      var dbDs = [];
      querySnapshot.forEach(doc => {
        dbDs.push({ id: doc.id, ...doc.data() });
        //dbDs = dbDs.sort(byTimeStamp);
      });
      setDs(dbDs);
    });
    pointsRef.where("matchId", "==", matchData.id).onSnapshot(querySnapshot => {
      var dbPoints = [];
      querySnapshot.forEach(doc => {
        dbPoints.push({ id: doc.id, ...doc.data() });
      });
      //update Scoreboard
      const newHomeScore = dbPoints.filter(
        point => point.teamColor === matchData.homeTeamData.colorPrimary
      ).length;
      const newAwayScore = dbPoints.filter(
        point => point.teamColor === matchData.awayTeamData.colorPrimary
      ).length;
      setHomeScore(newHomeScore);
      setAwayScore(newAwayScore);
      setPoints(dbPoints);
    });
  }, []);

  //Point Manipulation
  const choosePointIdToUpdate = goal => {
    setPointIdToUpdate(goal.id);
    setAssistIdToUpdate(goal.assistDBref);
    togglePointDialog(true);
  };

  const handlePointDelete = id => () => {
    Firestore.firestore()
      .collection("pointEvents")
      .doc(id)
      .delete();
    pointsRef.doc(id).delete();
    togglePointDialog(false);
    Firestore.firestore()
      .collection("points")
      .doc(id)
      .delete();
    pointsRef.doc(id).delete();
    togglePointDialog(false);
  };

  //D Manipulation
  const chooseDIdToUpdate = id => () => {
    setDIdToUpdate(id);
    toggleDDialog(true);
  };

  const handleDDelete = id => () => {
    Firestore.firestore()
      .collection("matchEvents")
      .doc(id)
      .delete();
    dRef.doc(id).delete();
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
        padding: 20
      }}
    >
      <Grid spacing={5} container direction="column" wrap="nowrap">
        <Grid item>
          <Scoreboard
            stuff={{
              homeScore: homeScore,
              awayScore: awayScore
            }}
          />
        </Grid>
        <Grid
          xs
          item
          container
          justify="center"
          style={{ height: "10px" }} //NO IDEA WHY THIS WORKS, but if you remove it all hell breaks lose with the scrollable content
        >
          <Grid item xs={7} style={{ height: "100%" }}>
            <Paper style={{ height: "100%" }}>
              <TableContainer style={{ height: "100%" }}>
                <GoalColumns
                  points={points.sort(byTimestamp)}
                  handlePointDelete={handlePointDelete}
                  choosePointIdToUpdate={choosePointIdToUpdate}
                />
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={5} style={{ height: "100%" }}>
            <Paper style={{ height: "100%" }}>
              <TableContainer style={{ height: "100%" }}>
                <DColumn
                  ds={ds.sort(byTimestamp)}
                  handleDDelete={handleDDelete}
                  chooseDIdToUpdate={chooseDIdToUpdate}
                />
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        <Grid item>
          <Button color="secondary" onClick={() => setPage("Schedule")}>
            Back
          </Button>
        </Grid>
      </Grid>
      <UserSpeedDial
        options={[
          { title: "Goal", action: () => togglePointDialog(true) },
          { title: "D", action: () => toggleDDialog(true) }
        ]}
      />
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
    </div>
  );
}
