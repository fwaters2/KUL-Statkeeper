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

  const { onClose, open, updateScoreboard, pointIdToUpdate } = props;
  const [assist, setAssist] = React.useState("");
  const [goal, setGoal] = React.useState("");
  const [roster, setRoster] = React.useState([]);
  const [team, setTeam] = React.useState(null);
  const [color, setColor] = React.useState("");

  const handleTeamChoice = team => () => {
    setRoster(team === homeTeam ? rosterHome : rosterAway);
    setTeam(team === homeTeam ? homeTeam : awayTeam);
    setColor(team === homeTeam ? homeColor : awayColor);
  };

  const handleConfirm = () => {
    const pointRef = firebase2.firestore().collection("pointsScorekeeper");
    pointIdToUpdate === null
      ? pointRef.add({
          matchId: MatchContext.matchData.id,
          teamColor: color,
          Assist: assist,
          Goal: goal,
          timestamp: new Date()
        })
      : pointRef.doc(pointIdToUpdate).update({
          teamColor: color,
          Assist: assist,
          Goal: goal
        });
    onClose();
    setAssist("");
    setGoal("");
    updateScoreboard();
  };
  const handleClose = () => {
    onClose();
    setTeam(null);
    setAssist("");
    setGoal("");
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
            style={{ backgroundColor: homeColor + "66" }}
            onClick={handleTeamChoice(homeTeam)}
          >
            {homeTeam}
          </Button>
          <Button
            style={{ backgroundColor: awayColor + "66" }}
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
          team={team}
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
