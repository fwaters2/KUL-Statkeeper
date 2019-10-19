import React from "react";
import "./Scoreboard.css";

export default function Scoreboard(props) {
  const { stuff } = props;

  const homeScoreTens = Math.floor(stuff.homeScore / 10);
  const homeScoreOnes = stuff.homeScore % 10;
  const awayScoreTens = Math.floor(stuff.awayScore / 10);
  const awayScoreOnes = stuff.awayScore % 10;
  const timeDigits = stuff.time.split("");

  return (
    <div className="Scoreboard">
      <div className="Scores">
        <div className="Panel Border">
          <div className="TeamName">{stuff.HomeTeam}</div>
          <div className="Score">
            <div className="Digit">{homeScoreTens}</div>
            <div className="Digit">{homeScoreOnes}</div>
          </div>
        </div>
        <div className="Panel">
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
          </div> */}
        </div>
        <div className="Panel Border">
          <div className="TeamName">{stuff.AwayTeam}</div>
          <div className="Score">
            <div className="Digit">{awayScoreTens}</div>
            <div className="Digit">{awayScoreOnes}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
