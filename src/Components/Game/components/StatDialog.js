import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { KeyboardArrowLeft } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { MatchContext } from "../../../Contexts/MatchContext";
import SelectTeamButtonGroup from "./SelectTeamButtonGroup";
import TabPanel from "./TabPanel";

const StatDialog = ({
  onClose,
  open,
  setRoster,
  setColor,
  validation,
  handleConfirm,
  children,
}) => {
  const { homeTeamData, awayTeamData } = useContext(MatchContext);

  const [team, setTeam] = useState(null);

  const {
    name: homeTeam,
    roster: rosterHome,
    colorPrimary: homeColor,
  } = homeTeamData;
  const {
    name: awayTeam,
    roster: rosterAway,
    colorPrimary: awayColor,
  } = awayTeamData;
  const handleTeamChoice = (team) => () => {
    setRoster(team === homeTeam ? rosterHome : rosterAway);
    setTeam(team === homeTeam ? homeTeam : awayTeam);
    setColor(team === homeTeam ? homeColor : awayColor);
  };
  const currentTab = team === null ? 0 : 1;
  const handleClose = () => {
    onClose();
    setTeam(null);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <Grid container>
          {team && (
            <Grid item xs={3} onClick={() => setTeam(null)}>
              <KeyboardArrowLeft /> Back
            </Grid>
          )}
          {/* <Grid item xs={9}>
            {team !== null && dIdToUpdate ? "Update D" : team + " D!"}
          </Grid> */}
        </Grid>
      </DialogTitle>

      <TabPanel value={currentTab} index={0}>
        <SelectTeamButtonGroup
          handleAwayClick={handleTeamChoice(awayTeam)}
          handleHomeClick={handleTeamChoice(homeTeam)}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          homeColor={homeColor}
          awayColor={awayColor}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        {children}
      </TabPanel>
      {validation && (
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
      )}
    </Dialog>
  );
};

export default StatDialog;
