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

export default function DDialogContainer(props) {
  const {
    gameData,
    onClose,
    open,
    rosterHome,
    rosterAway,
    homeTeam,
    awayTeam,
    nextDNO
  } = props;
  const [value, setValue] = React.useState(0);
  const [d, setD] = React.useState("")
  const [roster, setRoster] = React.useState([]);
  const [dTeam, setDTeam] = React.useState("");


  
  const handleTeamChoice = (roster, team) => () => {
    setValue(1);
    setRoster(roster);
    setDTeam(team);
  };

  const handleConfirm = () => {
    Firestore.firestore()
      .collection("Ds")
      .add({
        Season: "Fall 2019",
        GameNO: gameData.GameNO,
        DNo: nextDNO,
        TeamID: dTeam, //to do
        D: d, //to do
        Time: new Date()
      });
    onClose();
    setValue(0);
    setD("");
  };
  const handleClose = ()=>{
    onClose()
    setDTeam("")
    setValue(0);
    setD("")
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle><Grid container>
          {value === 1 ? (
            <Grid item xs={3} onClick={() => setValue(0)}>
              <KeyboardArrowLeft /> Back
            </Grid>
          ) : null}
          <Grid item xs={9}>
            D!
          </Grid>
        </Grid></DialogTitle>
      <TabPanel value={value} index={0}>
        <ButtonGroup>
          <Button onClick={handleTeamChoice(rosterHome, homeTeam)}>
            {homeTeam}
          </Button>
          <Button onClick={handleTeamChoice(rosterAway, awayTeam)}>
            {awayTeam}
          </Button>
        </ButtonGroup>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SingleRoster
          setD={setD}
          d={d}
          roster={roster}
          onClose={onClose}
          setValue={setValue}
          team={dTeam}
        />
      </TabPanel>
      {d !=="" ? (
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
