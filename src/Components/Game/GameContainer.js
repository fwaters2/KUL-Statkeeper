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

const teamColors = require("../../Teams.json");

export default function StatkeeperContainer(props) {
  const gameData = React.useContext(GameContext);
  const { setPage } = props;
  //const [gameData, setGameData] = React.useState(props.gameData);
  const [ds, setDs] = React.useState([
    {
      DNo: 7,
      GameNO: 9,
      Player: 47,
      Season: "Spring 2019"
    }
  ]);
  const [goals, setGoals] = React.useState([
    {
      Assist: "John Kearle",
      GameNO: 2,
      Goal: "Suzy",
      GoalNo: 1,
      Season: "Fall 2019",
      TeamId: "DiscLex3ia"
    }
  ]);
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

  // React.useEffect(() => {
  //   const unsubscribe = Firestore.firestore()
  //     .collection("PlayoffGoals")
  //     .where("GameNO", "==", gameData.GameNO)
  //     .onSnapshot(snapshot => {
  //       const goals = snapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));
  //       setGoals(goals.sort((a, b) => a.GoalNo - b.GoalNo));
  //       setHomeScore(
  //         goals.filter(goal => goal.TeamID === gameData.homeTeam).length
  //       );
  //       setAwayScore(
  //         goals.filter(goal => goal.TeamID === gameData.awayTeam).length
  //       );
  //     });

  //   return () => unsubscribe;
  // }, []);
  // React.useEffect(() => {
  //   const unsubscribe = Firestore.firestore()
  //     .collection("PlayoffDs")
  //     .where("GameNO", "==", gameData.GameNO)
  //     .onSnapshot(snapshot => {
  //       const ds = snapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));
  //       setDs(ds.sort((a, b) => a.DNO - b.DNO));
  //     });

  //   return () => unsubscribe;
  // }, []);

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
              {/* <GoalColumns
                stats={goals}
                teamColors={teamColors}
                gameData={gameData}
              /> */}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper style={{ height: "100%", overflow: "auto" }}>
              <DColumn
                //addD={addD}
                stats={ds}
                gameData={gameData}
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
            { title: "Goal", action: handleGoalOpen },
            { title: "D", action: handleDOpen }
          ]}
        />
        {/* <DDialogContainer
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
        /> */}
      </Container>
    </div>
  );
}
