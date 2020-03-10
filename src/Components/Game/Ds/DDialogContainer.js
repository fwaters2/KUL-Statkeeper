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
import SingleRoster from "./SingleRoster";
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

export default function DDialogContainer(props) {
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

  const { onClose, open, dIdToUpdate } = props;
  const [d, setD] = React.useState("");
  const [roster, setRoster] = React.useState([]);
  const [team, setTeam] = React.useState(null);
  const [color, setColor] = React.useState("");

  const handleTeamChoice = team => () => {
    setRoster(team === homeTeam ? rosterHome : rosterAway);
    setTeam(team === homeTeam ? homeTeam : awayTeam);
    setColor(team === homeTeam ? homeColor : awayColor);
  };
  const handleConfirm = () => {
    const dbRef = firebase2.firestore().collection("dsScorekeeper");
    dIdToUpdate === null
      ? dbRef.add({
          matchId: MatchContext.matchData.id,
          teamColor: color,
          D: d,
          timestamp: new Date()
        })
      : dbRef.doc(dIdToUpdate).update({ teamColor: color, D: d });
    onClose();
    setTeam(null);
    setD(null);
  };
  const handleClose = () => {
    onClose();
    setTeam(null);
    setD(null);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <Grid container>
          {team ? (
            <Grid item xs={3} onClick={() => setTeam(null)}>
              <KeyboardArrowLeft /> Back
            </Grid>
          ) : null}
          <Grid item xs={9}>
            {dIdToUpdate ? "Update D" : team + "D!"}
          </Grid>
        </Grid>
      </DialogTitle>
      <TabPanel value={team === null ? 0 : 1} index={0}>
        <ButtonGroup>
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
        <SingleRoster
          setD={setD}
          d={d}
          roster={roster}
          onClose={onClose}
          team={team}
        />
      </TabPanel>
      {d !== "" ? (
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
