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
import Firestore from "../../../Utils/Firebase";

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
  const {
    gameData,
    onClose,
    open,
    rosterHome,
    rosterAway,
    homeTeam,
    awayTeam,
    nextGoalNO
  } = props;
  const [value, setValue] = React.useState(0);
  const [assist, setAssist] = React.useState("");
  const [assistID, setAssistID] = React.useState("")
  const [goal, setGoal] = React.useState("");
  const [goalID, setGoalID] = React.useState("")
  const [roster, setRoster] = React.useState([]);
  const [team, setTeam] = React.useState("");
  const [teamID, setTeamID] = React.useState("")

  const handleTeamChoice = team => () => {
    setValue(1);
    setRoster(team === "home" ? rosterHome : rosterAway);
    setTeam(team === "home" ? gameData.homeTeam : gameData.awayTeam);
  };
  const handleConfirm = () => {
    Firestore.firestore()
      .collection("Points")
      .add({
        Season: "Fall 2019",
        GameNO: gameData.GameNO,
        GoalNo: nextGoalNO,
        TeamID: teamID,
        Assist: assistID,
        Goal: goalID,
        Time: Firestore.firestore.FieldValue.serverTimestamp()
      });
    Firestore.firestore()
      .collection("Goals")
      .add({
        Season: "Fall 2019",
        GameNO: gameData.GameNO,
        GoalNo: nextGoalNO,
        TeamActualID: teamID, //to do
        TeamID: team,
        Assist: assist, //to do
        AssistID: assistID,
        Goal: goal, //to do
        GoalID: goalID,
        Time: Firestore.firestore.FieldValue.serverTimestamp()
      });
    onClose();
    setValue(0);
    setAssist("");
    setAssistID("")
    setGoal("");
    setGoalID("")

  };
  const handleClose = ()=>{
    onClose()
    setTeam("")
    setTeamID("")
    setValue(0);
    setAssist("");
    setAssistID("")
    setGoal("");
    setGoalID("")
  }

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle fullWidth>
        <Grid container>
          {value === 1 ? (
            <Grid item xs={3} onClick={() => setValue(0)}>
              <KeyboardArrowLeft /> Back
            </Grid>
          ) : null}
          <Grid item xs={9}>
            Goal!
          </Grid>
        </Grid>
      </DialogTitle>
      <TabPanel value={value} index={0}>
        <ButtonGroup fullWidth>
          <Button onClick={handleTeamChoice("home")}>{homeTeam}</Button>
          <Button onClick={handleTeamChoice("away")}>{awayTeam}</Button>
        </ButtonGroup>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DoubleRoster
          setAssist={setAssist}
          setAssistID={setAssistID}
          setGoal={setGoal}
          setGoalID={setGoalID}
          assist={assist}
          assistID={assistID}
          goal={goal}
          goalID={goalID}
          roster={roster}
          setValue={setValue}
          setTeamID={setTeamID}
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
            <Button fullWidth onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogActions>
        </AppBar>
      ) : null}
    </Dialog>
  );
}
