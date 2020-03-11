import React from "react";
import ScoreboardContainer from "./ScoreboardContainer";

export default function DummyTimer() {
  const stuff = { homeScore: 10, awayScore: 11 };
  return (
    <div>
      <ScoreboardContainer stuff={stuff} />
    </div>
  );
}
