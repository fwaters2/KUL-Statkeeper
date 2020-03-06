import React from "react";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";
import { FormatListBulleted } from "@material-ui/icons";

export default function UserSpeedDial(props) {
  const { options } = props;
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <SpeedDial
      style={{ position: "fixed", right: "1em", bottom: "1em" }}
      ariaLabel="SpeedDial example"
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      FabProps={{ style: { backgroundColor: "#DF3E40" } }}
      //direction={direction}
    >
      {options.map(option => (
        <SpeedDialAction
          key={option.title}
          icon={<FormatListBulleted />}
          tooltipOpen
          tooltipTitle={option.title}
          onClick={option.action}
        />
      ))}
    </SpeedDial>
  );
}
