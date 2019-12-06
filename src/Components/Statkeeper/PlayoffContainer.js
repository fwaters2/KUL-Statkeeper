import React from "react";
import {
  Button,
  Grid,
  Typography,
  Fab,
  Paper,
  Container,
  Select,
  MenuItem
} from "@material-ui/core";
import DColumn from "./Ds/DColumn";
import GoalColumns from "./Goals/GoalColumns";
import { Add } from "@material-ui/icons";
import DDialogContainer from "./Ds/DDialogContainer";
import GoalDialogContainer from "./Goals/GoalDialogContainer";
import Scoreboard from "../Scoreboard/Scoreboard";
import "../../Teams.json";
import Firestore from "../../Utils/Firebase";

const teamColors = require("../../Teams.json");

export default function PlayoffContainer(props) {
  const { setPage } = props;
  const [gameData, setGameData] = React.useState(props.gameData);
  const [ds, setDs] = React.useState([]);
  const [goals, setGoals] = React.useState([]);
  const [openGoal, setOpenGoal] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [newHomeTeam, setNewHomeTeam] = React.useState("");
  const [newAwayTeam, setNewAwayTeam] = React.useState("");
  const [homeScore, setHomeScore] = React.useState(
    goals.filter(goal => goal.team === gameData.homeTeam).length
  );
  const [awayScore, setAwayScore] = React.useState(
    goals.filter(goal => goal.team === gameData.awayTeam).length
  );
  //const realHomeTeam = gameData.homeTeam ? gameData.homeTeam : newHomeTeam;
  //const realAwayTeam = gameData.awayTeam ? gameData.awayTeam : newAwayTeam;
  const handleGoalOpen = () => {
    setOpenGoal(true);
  };
  const handleDOpen = () => {
    setOpenD(true);
  };
  const addD = newD => {
    setDs([...ds, newD]);
  };
  //const handleTeamUpdate = () => {};
  const PlayoffHomeSelect = e => {
    return (
      <Select
        value={newHomeTeam}
        onChange={e => {
          Firestore.firestore()
            .collection("PlayoffSched")
            .doc(gameData.id)
            .update({ HomeTeam: e.target.value });
          setPage("Schedule");
        }}
        autoWidth
        style={{ background: "lightGray", minWidth: "150px" }}
      >
        <MenuItem value="">
          <em>Select Team</em>
        </MenuItem>
        <MenuItem value={"Big Dumps"}>Big Dumps</MenuItem>
        <MenuItem value={"Disc Jockeys"}>Disc Jockeys</MenuItem>
        <MenuItem value={"Galaxy"}>Galaxy</MenuItem>
        <MenuItem value={"Hakuna Matata"}>Hakuna Matata</MenuItem>
        <MenuItem value={"Spirit Animals"}>Spirit Animals</MenuItem>
        <MenuItem value={"UP!"}>UP!</MenuItem>
        <MenuItem value={"Young Bloods"}>Young Bloods</MenuItem>
      </Select>
    );
  };
  const PlayoffAwaySelect = () => {
    return (
      <Select
        value={newAwayTeam}
        onChange={e => {
          Firestore.firestore()
            .collection("PlayoffSched")
            .doc(gameData.id)
            .update({ AwayTeam: e.target.value });
          setPage("Schedule");
        }}
        autoWidth
        style={{ background: "lightGray", minWidth: "150px" }}
      >
        <MenuItem value="">
          <em>Select Team</em>
        </MenuItem>
        <MenuItem value={"Big Dumps"}>Big Dumps</MenuItem>
        <MenuItem value={"Disc Jockeys"}>Disc Jockeys</MenuItem>
        <MenuItem value={"Galaxy"}>Galaxy</MenuItem>
        <MenuItem value={"Hakuna Matata"}>Hakuna Matata</MenuItem>
        <MenuItem value={"Spirit Animals"}>Spirit Animals</MenuItem>
        <MenuItem value={"UP!"}>UP!</MenuItem>
        <MenuItem value={"Young Bloods"}>Young Bloods</MenuItem>
      </Select>
    );
  };

  const title = () => {
    return (
      <React.Fragment>
        <Typography align="center" variant="h5">
          {gameData.title}
        </Typography>
        <Typography align="center" variant="h4">
          {gameData.homeTeam ? gameData.homeTeam : <PlayoffHomeSelect />}
        </Typography>
        <Typography align="center" variant="h6">
          vs
        </Typography>
        <Typography align="center" variant="h4">
          {gameData.awayTeam ? gameData.awayTeam : <PlayoffAwaySelect />}
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
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => setPage("Schedule")}
          style={{ marginBottom: "90px", marginTop: "5px" }}
        >
          Back
        </Button>
        <Fab
          variant="extended"
          style={{
            margin: 0,
            top: "auto",
            width: "300px",
            bottom: 20,
            left: 20,
            position: "fixed"
          }}
          onClick={handleGoalOpen}
        >
          <Add fontSize="large" />
          <Typography>GOAL</Typography>
        </Fab>
        <Fab
          variant="extended"
          style={{
            margin: 0,
            top: "auto",
            width: "300px",
            bottom: 20,
            right: 20,
            position: "fixed"
          }}
          onClick={handleDOpen}
        >
          <Add fontSize="large" />
          <Typography>D</Typography>
        </Fab>
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
        {/* </Paper> */}
      </Container>
    </div>
  );
}
