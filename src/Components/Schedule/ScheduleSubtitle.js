import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { ScheduleContext } from "../../Contexts/ScheduleContext";
import { getMatchDate } from "../../Utils/schedule_utils";

export default function ScheduleSubtitle() {
  const { allDates = [], currentDate, setCurrentDate } = useContext(
    ScheduleContext
  );

  const uniqueDates = allDates.map((date) => {
    return getMatchDate(date);
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    anchorEl ? setAnchorEl(null) : setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeDate = (newDate) => () => {
    setCurrentDate(newDate);
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="static"
      color="default"
      style={{ borderRadius: "16px 16px 0 0" }}
    >
      <Toolbar>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography>Spring</Typography>
            <Typography variant="caption">2021</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" align="center">
              Choose Game
            </Typography>
          </Grid>
          <Grid item onClick={handleClick}>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {uniqueDates.map((x, index) => (
                <MenuItem
                  key={x}
                  onClick={handleChangeDate({ weekNum: index + 1, date: x })}
                >
                  {x}
                </MenuItem>
              ))}
            </Menu>
            <Typography align="right">
              {"Week " + currentDate.weekNum}
            </Typography>
            <Typography variant="caption" alight="right">
              {currentDate.date}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
