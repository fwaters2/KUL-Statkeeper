import React from "react";
import { Button, Grid, Typography, Fab, Paper, Container } from "@material-ui/core";
import DColumn from "./Ds/DColumn";
import GoalColumns from "./Goals/GoalColumns";
import { Add } from "@material-ui/icons";
import DDialogContainer from "./Ds/DDialogContainer";
import GoalDialogContainer from "./Goals/GoalDialogContainer";
import Scoreboard from "../Scoreboard/Scoreboard";
import "../../Teams.json";
import Firestore from '../../Utils/Firebase'

const teamColors = require("../../Teams.json");

const exampleGoalData = [
  {
    season: "Fall 2019",
    gameID: "0001",
    gameNo: 1,
    goalNO: 1,
    team: "Big Dumps",
    assist: "Dinah",
    goal: "Forrest",
    time: ""
  },
  {
    goalNO: 2,
    team: "Disc Jockeys",
    assist: "Mike Huang",
    goal: "Mike Smith"
  }
];
const exampleDData = [
  {
    dNO: 1,
    team: "Big Dumps",
    d: "Toby Howes"
  },
  {
    season: "Fall 2019",
    gameID: "0001",
    gameNO: 1,
    dNO: 1,
    team: "Big Dumps",
    d: "Toby Howes",
    time: ""
  }
];

export default function GameContainer(props) {
  const { setPage, gameData } = props;
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
  const addGoal = newGoal => {
    setGoals([...goals, newGoal]);
    setHomeScore(goals.filter(goal => goal.team === gameData.homeTeam).length)
    setAwayScore(goals.filter(goal => goal.team === gameData.awayTeam).length)
    newGoal.team === gameData.homeTeam
      ? setHomeScore(homeScore + 1)
      : setAwayScore(awayScore + 1);
  };
  const handleCloseGoal = () => {
    setOpenGoal(false);
  };
  const handleCloseD = () => {
    setOpenD(false);
  };

  React.useEffect(() => {
    const unsubscribe = Firestore.firestore()
      .collection("Goals")
      .where("GameNO", "==", gameData.GameNO)
      .onSnapshot(snapshot => {
        const goals = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGoals(goals.sort((a,b)=>(a.GoalNo-b.GoalNo)))
      });

    return () => unsubscribe;
  }, []);
  React.useEffect(() => {
    const unsubscribe = Firestore.firestore()
      .collection("Ds")
      .where("GameNO", "==", gameData.GameNO)
      .onSnapshot(snapshot => {
        const ds = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDs(ds.sort((a,b)=>(a.DNO-b.DNO)))
      });

    return () => unsubscribe;
  }, []);

  return (
    <Container>

      {/* <Scoreboard
        stuff={{
          homeScore: homeScore,
          awayScore: awayScore,
          time: "12:34",
          half: "2",
          AwayTeam: gameData.awayTeam,
          HomeTeam: gameData.homeTeam
        }}
      /> */}
      <Paper>
      <Typography align='center' variant='h6'>
          StatSheet
        </Typography>

        <Typography align='center' variant='h4'>
          {gameData.homeTeam} vs {gameData.awayTeam}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <GoalColumns
            
              addGoal={addGoal}
              stats={goals}
              teamColors={teamColors}
              gameData={gameData}
            />
          </Grid>
          <Grid item xs={4}>
            <DColumn
              addD={addD}
              stats={ds}
              teamColors={teamColors}
              gameData={gameData}
            />
          </Grid>
        </Grid>
        <Fab
          variant="extended"
          style={{
            margin: 0,
            top: "auto",
            maxWidth: "500px",
            bottom: 20,
            left: 20,
            position: "fixed"
          }}
          onClick={handleGoalOpen}
        >
          <Add fontSize="large" />
          <Typography>GOAL</Typography>
        </Fab>

        <Button color='secondary' fullWidth onClick={() => setPage("Schedule")}>
          Back
        </Button>
        <Fab
          variant="extended"
          style={{
            margin: 0,
            top: "auto",
            maxWidth: "500px",
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
        nextDNO={ds.length+1}
        gameData={gameData}
          open={openD}
          onClose={handleCloseD}
     
          rosterHome={gameData.homeRoster}
          rosterAway={gameData.awayRoster}
          homeTeam={gameData.homeTeam}
          awayTeam={gameData.awayTeam}
        />
        <GoalDialogContainer
          nextGoalNO={goals.length+1}
          gameData={gameData}
          
          open={openGoal}
          onClose={handleCloseGoal}
          rosterHome={gameData.homeRoster}
          rosterAway={gameData.awayRoster}
          homeTeam={gameData.homeTeam}
          awayTeam={gameData.awayTeam}
        />
      </Paper>
    </Container>
  );
}
