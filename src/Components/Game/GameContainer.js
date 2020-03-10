import React from "react";
import { Button, Grid, Paper, Container } from "@material-ui/core";
import DColumn from "./Ds/DColumn";
import GoalColumns from "./Goals/GoalColumns";
import DDialogContainer from "./Ds/DDialogContainer";
import GoalDialogContainer from "./Goals/Index";
import Scoreboard from "./Scoreboard/Index.js";
import "../../Teams.json";
import UserSpeedDial from "../UserSpeedDial";
import GameContext from "../../Assets/GameContext";
import Firestore from "../../Utils/Firebase2";

export default function StatkeeperContainer() {
  //Data
  const gameData = React.useContext(GameContext);
  const { setPage, matchData } = gameData;
  const [points, setPoints] = React.useState([]);
  const [ds, setDs] = React.useState([]);

  //Dialogs
  const [isPointDialogOpen, togglePointDialog] = React.useState(false);
  const [isDDialogOpen, toggleDDialog] = React.useState(false);
  const [pointIdToUpdate, setPointIdToUpdate] = React.useState(null);
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

  //Import Stats
  React.useEffect(() => {
    const unsubscribe = pointsRef
      .where("matchId", "==", matchData.id)
      .orderBy("timestamp")
      .onSnapshot(querySnapshot => {
        const goals = querySnapshot.docs.map(doc => ({
          id: doc.id,
          teamColor: doc.data().teamColor,
          Assist: doc.data().Assist,
          Goal: doc.data().Goal
        }));
        setPoints(goals);
      });
    return unsubscribe;
  }, [matchData.id, pointsRef]);
  React.useEffect(() => {
    const unsubscribe = dRef
      .where("matchId", "==", matchData.id)
      .orderBy("timestamp")
      .onSnapshot(querySnapshot => {
        const ds = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDs(ds);
      });
    return unsubscribe;
  }, [matchData.id, dRef]);

  //Point Manipulation
  const choosePointIdToUpdate = id => () => {
    setPointIdToUpdate(id);
    togglePointDialog(true);
  };

  const handlePointDelete = id => () => {
    pointsRef.doc(id).delete();
    togglePointDialog(false);
  };

  //D Manipulation
  const chooseDIdToUpdate = id => () => {
    setDIdToUpdate(id);
    toggleDDialog(true);
  };

  const handleDDelete = id => () => {
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

  const updateScoreboard = () => {
    setHomeScore(
      points.filter(
        point => point.teamColor === matchData.homeTeamData.colorPrimary
      ).length
    );
    setAwayScore(
      points.filter(
        point => point.teamColor === matchData.awayTeamData.colorPrimary
      ).length
    );
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#283895",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Container
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          marginTop: "10px"
        }}
      >
        <Scoreboard
          stuff={{
            homeScore: homeScore,
            awayScore: awayScore,
            time: "12:34",
            half: "2"
          }}
        />
        <Grid style={{ flex: 1 }} container spacing={2}>
          <Grid item xs={8}>
            <Paper style={{ height: "100%", overflow: "auto" }}>
              <GoalColumns
                points={points}
                handlePointDelete={handlePointDelete}
                choosePointIdToUpdate={choosePointIdToUpdate}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper style={{ height: "100%", overflow: "auto" }}>
              <DColumn
                ds={ds}
                handleDDelete={handleDDelete}
                chooseDIdToUpdate={chooseDIdToUpdate}
              />
            </Paper>
          </Grid>
        </Grid>

        <Button
          color="secondary"
          onClick={() => setPage("Schedule")}
          style={{ marginBottom: "90px", marginTop: "5px" }}
        >
          Back
        </Button>
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
          updateScoreboard={updateScoreboard}
        />
      </Container>
    </div>
  );
}
