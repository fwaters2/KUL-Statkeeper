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
    id,
    currentD
  } = props;
  const [value, setValue] = React.useState(0);
  const [d, setD] = React.useState("");
  const [roster, setRoster] = React.useState([]);
  const [team, setTeam] = React.useState("");

  const handleTeamChoice = team => () => {
    setValue(1);
    setRoster(team === "home" ? rosterHome : rosterAway);
    setTeam(team === "home" ? gameData.homeTeam : gameData.awayTeam);
  };
  const handleConfirm = () => {
    Firestore.firestore()
      .collection("Ds")
      .doc(id)
      .update({
        TeamID: team, //to do
        D: d, //to do
      });
    onClose();
    setValue(0);
    setD("");
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
            Update Goal #{currentD}
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
        <SingleRoster
          setD={setD}
          d={d}
          roster={roster}
          setValue={setValue}
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
            <Button fullWidth onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogActions>
        </AppBar>
      ) : null}
    </Dialog>
  );
}
