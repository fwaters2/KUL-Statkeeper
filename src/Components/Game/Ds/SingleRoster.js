import React from "react";
import RosterList from "../RosterList";

export default function SingleRoster(props) {
  const { d, setD, roster, setPlayerId } = props;
  const handleD = player => () => {
    setD(player.player);
    setPlayerId(player.id);
  };
  return <RosterList title="D" handleStat={handleD} roster={roster} stat={d} />;
}
