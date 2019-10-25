import React from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  ButtonGroup,
  Typography,
  Box
} from "@material-ui/core";
import SingleRoster from "./SingleRoster";

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

export default function StatDialogContainer(props) {
  const {
    onClose,
    open,
    addD,
    rosterHome,
    rosterAway,
    homeTeam,
    awayTeam
  } = props;
  const [value, setValue] = React.useState(0);
  const [roster, setRoster] = React.useState([]);
  const [dteam, setDTeam] = React.useState("");


  
  const handleTeamChoice = (roster, team) => () => {
    setValue(1);
    setRoster(roster);
    setDTeam(team);
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>D</DialogTitle>
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
          addD={addD}
          roster={roster}
          onClose={onClose}
          setValue={setValue}
          team={dteam}
        />
      </TabPanel>
    </Dialog>
  );
}
