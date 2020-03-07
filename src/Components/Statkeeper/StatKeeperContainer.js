import React from "react";
import {
  Button,
  Grid,
  Typography,
  Fab,
  Paper,
  Container
} from "@material-ui/core";
import DColumn from "./Ds/DColumn";
import GoalColumns from "./Goals/GoalColumns";
import { Add } from "@material-ui/icons";
import DDialogContainer from "./Ds/DDialogContainer";
import GoalDialogContainer from "./Goals/GoalDialogContainer";
import Scoreboard from "../Scoreboard/Scoreboard";
import "../../Teams.json";
import Firestore from "../../Utils/Firebase";
import UserSpeedDial from "../UserSpeedDial";

const teamColors = require("../../Teams.json");

export default function StatkeeperContainer(props) {
  const { setPage } = props;
  const [gameData, setGameData] = React.useState(props.gameData);
  const [ds, setDs] = React.useState([]);
  const [goals, setGoals] = React.useState([]);
  const [openGoal, setOpenGoal] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);

  const [homeScore, setHomeScore] = React.useState(
    goals.filter(goal => goal.team === gameData.homeTeam).length
  );
  const [awayScore, setAwayScore] = React.useState(
    goals.filter(goal => goal.team === gameData.awayTeam).length
  );
  const handleGoalOpen = () => {
    setOpenGoal(true);
  };
  const handleDOpen = () => {
    setOpenD(true);
  };
  const addD = newD => {
    setDs([...ds, newD]);
  };

  const title = () => {
    return (
      <React.Fragment>
        <Typography align="center" variant="h5">
          {gameData.title}
        </Typography>
        <Typography align="center" variant="h4">
          {gameData.homeTeam}
        </Typography>
        <Typography align="center" variant="h6">
          vs
        </Typography>
        <Typography align="center" variant="h4">
          {gameData.awayTeam}
        </Typography>
      </React.Fragment>
    );
  };
  const updateScoreboard = () => {
    setHomeScore(
      goals.filter(goal => goal.TeamID === gameData.homeTeam).length
    );
    setAwayScore(
      goals.filter(goal => goal.TeamID === gameData.awayTeam).length
    );
  };
  const handleCloseGoal = () => {
    setOpenGoal(false);
  };
  const handleCloseD = () => {
    setOpenD(false);
  };

  React.useEffect(() => {
    const unsubscribe = Firestore.firestore()
      .collection("PlayoffGoals")
      .where("GameNO", "==", gameData.GameNO)
      .onSnapshot(snapshot => {
        const goals = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGoals(goals.sort((a, b) => a.GoalNo - b.GoalNo));
        setHomeScore(
          goals.filter(goal => goal.TeamID === gameData.homeTeam).length
        );
        setAwayScore(
          goals.filter(goal => goal.TeamID === gameData.awayTeam).length
        );
      });

    return () => unsubscribe;
  }, []);
  React.useEffect(() => {
    const unsubscribe = Firestore.firestore()
      .collection("PlayoffDs")
      .where("GameNO", "==", gameData.GameNO)
      .onSnapshot(snapshot => {
        const ds = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDs(ds.sort((a, b) => a.DNO - b.DNO));
      });

    return () => unsubscribe;
  }, []);

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
          title={title}
          stuff={{
            homeScore: homeScore,
            awayScore: awayScore,
            time: "12:34",
            half: "2",
            AwayTeam: gameData.awayTeam,
            HomeTeam: gameData.homeTeam
          }}
        />
        <Grid style={{ flex: 1 }} container spacing={2}>
          <Grid item xs={8}>
            <Paper style={{ height: "100%", overflow: "auto" }}>
              <GoalColumns
                stats={goals}
                teamColors={teamColors}
                gameData={gameData}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper style={{ height: "100%", overflow: "auto" }}>
              <DColumn
                addD={addD}
                stats={ds}
                teamColors={teamColors}
                gameData={gameData}
              />
            </Paper>
          </Grid>
        </Grid>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setPage("Schedule")}
          style={{ marginBottom: "90px", marginTop: "5px" }}
        >
          Back
        </Button>
        <UserSpeedDial
          options={[
            { title: "Goal", action: handleGoalOpen },
            { title: "D", action: handleDOpen }
          ]}
        />
        <DDialogContainer
          nextDNO={ds.length + 1}
          gameData={gameData}
          open={openD}
          onClose={handleCloseD}
          rosterHome={gameData.homeRoster}
          rosterAway={gameData.awayRoster}
          homeTeam={gameData.homeTeam}
          awayTeam={gameData.awayTeam}
        />
        <GoalDialogContainer
          nextGoalNO={goals.length + 1}
          gameData={gameData}
          open={openGoal}
          onClose={handleCloseGoal}
          rosterHome={gameData.homeRoster}
          rosterAway={gameData.awayRoster}
          homeTeam={gameData.homeTeam}
          awayTeam={gameData.awayTeam}
          updateScoreboard={updateScoreboard}
        />
      </Container>
    </div>
  );
}
