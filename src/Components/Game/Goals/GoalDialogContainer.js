import React from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  ButtonGroup,
  Typography,
  Box,
  DialogActions,
  AppBar,
  Grid
} from "@material-ui/core";
import DoubleRoster from "./DoubleRoster";
import { KeyboardArrowLeft } from "@material-ui/icons";
import firebase2 from "../../../Utils/Firebase2";
import GameContext from "../../../Assets/GameContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

export default function GoalDialogContainer(props) {
  const MatchContext = React.useContext(GameContext);
  const {
    name: homeTeam,
    roster: rosterHome,
    colorPrimary: homeColor
  } = MatchContext.matchData.homeTeamData;
  const {
    name: awayTeam,
    roster: rosterAway,
    colorPrimary: awayColor
  } = MatchContext.matchData.awayTeamData;

  const { onClose, open, pointIdToUpdate, assistIdToUpdate } = props;
  const [assist, setAssist] = React.useState("");
  const [goal, setGoal] = React.useState("");
  const [roster, setRoster] = React.useState([]);
  const [team, setTeam] = React.useState(null);
  const [color, setColor] = React.useState("");
  const [playerGoalId, setPlayerGoalId] = React.useState(null);
  const [playerAssistId, setPlayerAssistId] = React.useState(null);

  const handleTeamChoice = team => () => {
    setRoster(team === homeTeam ? rosterHome : rosterAway);
    setTeam(team === homeTeam ? homeTeam : awayTeam);
    setColor(team === homeTeam ? homeColor : awayColor);
  };
  const handleClose = () => {
    setPlayerAssistId(null);
    setPlayerGoalId(null);
    onClose();
    setTeam(null);
    setAssist("");
    setGoal("");
  };
  const handleConfirm = () => {
    const pointUIRef = firebase2.firestore().collection("pointsScorekeeper");

    //UI data
    const newPointUI = {
      matchId: MatchContext.matchData.id,
      teamColor: color,
      Assist: assist,
      Goal: goal,
      timestamp: new Date()
    };
    const updatePointUI = {
      teamColor: color,
      Assist: assist,
      Goal: goal
    };
    //Database Data
    //Goals
    const pointDBRef = firebase2.firestore().collection("points");
    const newPointDB = {
      matchId: MatchContext.matchData.id,
      playerId: playerGoalId,
      timestamp: new Date()
    };
    const updatePointDB = {
      matchId: MatchContext.matchData.id,
      playerId: playerGoalId
    };
    //Assists
    const assistDBRef = firebase2.firestore().collection("pointEvents");

    const updateAssistDB = {
      playerId: playerAssistId
    };

    const addPoint = () => {
      pointUIRef.add(newPointUI).then(docRef => {
        const newAssistDB = {
          pointId: docRef.id,
          playerId: playerAssistId,
          pointEventTypeId: "bUTPkFdC7KFTW7FfLOuh"
        };
        pointDBRef
          .doc(docRef.id)
          .set(newPointDB)
          .then(() => console.log("set new point db"))
          .catch(error => console.log(error));
        assistDBRef
          .add(newAssistDB)
          .then(assistRef =>
            pointUIRef.doc(docRef.id).update({ assistDBref: assistRef.id })
          )
          .then(() => console.log("set point event"))
          .catch(error => console.log(error));
      });
    };
    const updatePoint = () => {
      pointUIRef.doc(pointIdToUpdate).update(updatePointUI);
      pointDBRef.doc(pointIdToUpdate).update(updatePointDB);
      assistDBRef.doc(assistIdToUpdate).update(updateAssistDB);
    };

    pointIdToUpdate === null ? addPoint() : updatePoint();
    handleClose();
  };

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle>
        <Grid container>
          {team === null ? null : (
            <Grid item xs={3} onClick={() => setTeam(null)}>
              <KeyboardArrowLeft /> Back
            </Grid>
          )}
          <Grid item xs={9}>
            Goal!
          </Grid>
        </Grid>
      </DialogTitle>
      <TabPanel value={team === null ? 0 : 1} index={0}>
        <ButtonGroup fullWidth>
          <Button
            style={{
              backgroundColor: homeColor + "66",
              minWidth: "200px"
            }}
            onClick={handleTeamChoice(homeTeam)}
          >
            {homeTeam}
          </Button>
          <Button
            style={{
              backgroundColor: awayColor + "66",
              minWidth: "200px"
            }}
            onClick={handleTeamChoice(awayTeam)}
          >
            {awayTeam}
          </Button>
        </ButtonGroup>
      </TabPanel>

      <TabPanel value={team === null ? 0 : 1} index={1}>
        <DoubleRoster
          setAssist={setAssist}
          setGoal={setGoal}
          assist={assist}
          goal={goal}
          roster={roster}
          setPlayerGoalId={setPlayerGoalId}
          setPlayerAssistId={setPlayerAssistId}
        />
      </TabPanel>
      {assist && goal && assist !== goal ? (
        <AppBar
          style={{
            margin: 0,
            top: "auto",
            bottom: 0,
            position: "fixed"
          }}
        >
          <DialogActions>
            <Button
              fullWidth
              onClick={handleConfirm}
              variant="contained"
              color="secondary"
              style={{ height: "80px" }}
            >
              Confirm
            </Button>
          </DialogActions>
        </AppBar>
      ) : null}
    </Dialog>
  );
}
