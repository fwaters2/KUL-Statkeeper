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
  Grid,
} from "@material-ui/core";
import DoubleRoster from "./DoubleRoster";
import { KeyboardArrowLeft } from "@material-ui/icons";
import GameContext from "../../../Assets/GameContext";
import {
  assistDBRef,
  pointDBRef,
  pointUIRef,
} from "../../../Assets/firestoreCollections";

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
    colorPrimary: homeColor,
  } = MatchContext.matchData.homeTeamData;
  const {
    name: awayTeam,
    roster: rosterAway,
    colorPrimary: awayColor,
  } = MatchContext.matchData.awayTeamData;

  const { onClose, open, pointIdToUpdate, assistIdToUpdate } = props;
  const [assist, setAssist] = React.useState("");
  const [goal, setGoal] = React.useState("");
  const [roster, setRoster] = React.useState([]);
  const [team, setTeam] = React.useState(null);
  const [color, setColor] = React.useState("");
  const [playerGoalId, setPlayerGoalId] = React.useState(null);
  const [playerAssistId, setPlayerAssistId] = React.useState(null);

  const handleTeamChoice = (team) => () => {
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
    const matchId = MatchContext.matchData.id;
    const timestamp = new Date();
    const newData = {
      matchId,
      timestamp,
    };

    //UI data
    const newPointUI = {
      ...newData,
      teamColor: color,
      Assist: assist,
      Goal: goal,
      playerGoalId,
      playerAssistId,
    };
    const updatePointUI = {
      playerGoalId,
      playerAssistId,
      teamColor: color,
      Assist: assist,
      Goal: goal,
    };

    //Database Data
    //Goals
    const newPointDB = {
      ...newData,
      playerId: playerGoalId,
    };
    const updatePointDB = {
      playerId: playerGoalId,
    };

    const updateAssistDB = {
      playerId: playerAssistId,
    };

    const addPoint = () => {
      pointUIRef.add(newPointUI).then((docRef) => {
        //Assists
        const newAssistDB = {
          ...newData,
          pointId: docRef.id,
          playerId: playerAssistId,
          pointEventTypeId: "bUTPkFdC7KFTW7FfLOuh",
        };
        pointDBRef
          .doc(docRef.id)
          .set(newPointDB)
          .then(console.log("success adding point"))
          .catch((error) => console.log(error));

        assistDBRef

          .add(newAssistDB)
          .then((assistRef) => {
            console.log("docref", docRef, "assistRef", assistRef);
            return pointUIRef
              .doc(docRef.id)
              .update({ assistDBref: assistRef.id });
          })
          .then(console.log("successfully added assist"))
          .catch((error) => console.log(error));
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
              padding: "2em 0",
              backgroundColor: homeColor + "66",
              minWidth: "200px",
            }}
            onClick={handleTeamChoice(homeTeam)}
          >
            {homeTeam}
          </Button>
          <Button
            style={{
              padding: "2em 0",
              backgroundColor: awayColor + "66",
              minWidth: "200px",
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
            position: "fixed",
          }}
        >
          <DialogActions>
            <Button
              fullWidth
              onClick={handleConfirm}
              variant="contained"
              style={{
                height: "80px",
                backgroundColor: "#DF3E40",
                color: "white",
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </AppBar>
      ) : null}
    </Dialog>
  );
}
