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
    id,
    currentGoal
  } = props;
  const [value, setValue] = React.useState(0);
  const [assist, setAssist] = React.useState("");
  const [goal, setGoal] = React.useState("");
  const [roster, setRoster] = React.useState([]);
  const [team, setTeam] = React.useState("");

  const handleTeamChoice = team => () => {
    setValue(1);
    setRoster(team === "home" ? rosterHome : rosterAway);
    setTeam(team === "home" ? gameData.homeTeam : gameData.awayTeam);
    console.log(gameData);
  };
  const handleConfirm = () => {
    // addGoal({
    //   goalNo: 2,
    //   team: team,
    //   assist: assist,
    //   goal: goal
    // });
    console.log(gameData);
    Firestore.firestore()
      .collection("PlayoffGoals")
      .doc(id)
      .update({
        TeamID: team, //to do
        Assist: assist, //to do
        Goal: goal //to do
      });
    onClose();
    setValue(0);
    setAssist("");
    setGoal("");
  };

  return (
    <Dialog fullWidth onClose={onClose} open={open}>
      <DialogTitle fullWidth>
        <Grid container>
          {value === 1 ? (
            <Grid item xs={3} onClick={() => setValue(0)}>
              <KeyboardArrowLeft /> Back
            </Grid>
          ) : null}
          <Grid item xs={9}>
            Update Goal #{currentGoal}
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
          //addGoal={addGoal}
          setAssist={setAssist}
          setGoal={setGoal}
          assist={assist}
          goal={goal}
          roster={roster}
          onClose={onClose}
          setValue={setValue}
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
