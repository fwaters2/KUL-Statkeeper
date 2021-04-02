import React from "react";
import "./Scoreboard.css";
import Title from "./Title";
import Timer from "./Timer";

export default function ScoreboardContainer({
  title,
  homeTeam = "Home error",
  awayTeam = "Away Error",
  homeScore = 0,
  awayScore = 0,
}) {
  const homeScoreTens = Math.floor(homeScore / 10);
  const homeScoreOnes = homeScore % 10;
  const awayScoreTens = Math.floor(awayScore / 10);
  const awayScoreOnes = awayScore % 10;

  return (
    <div className="Scoreboard">
      <div className="Scores">
        <div className="Panel Border">
          <div className="TeamName">{homeTeam}</div>
          <div className="Score">
            <div className="Digit">{homeScoreTens}</div>
            <div className="Digit">{homeScoreOnes}</div>
          </div>
        </div>
        <div className="Panel Center-Panel">
          <Title title={title} homeTeam={homeTeam} awayTeam={awayTeam} />
          <Timer />
          {/* <Timer2 />
          {/* <div className="HalfSection">
            <div className="Digit Half Border">{stuff.half}</div>
            <div className="smallFont">{"Half"}</div>
          </div>
           
          <div className="Time Border" style={{ display: "flex" }}>
            <div className="Digit">{timeDigits[0]}</div>
            <div className="Digit Attempt">8</div>
            <div className="Digit">{timeDigits[1]}</div>
            <div className="Digit Attempt">8</div>
            <div>:</div>
            <div className="Digit">
              <div className="Digit Time Attempt">8</div>
              {timeDigits[3]}
            </div>

            <div className="Digit">{timeDigits[4]}</div>
          </div>{" "}
          */}
        </div>
        <div className="Panel Border">
          <div className="TeamName">{awayTeam}</div>
          <div className="Score">
            <div className="Digit">{awayScoreTens}</div>
            <div className="Digit">{awayScoreOnes}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
