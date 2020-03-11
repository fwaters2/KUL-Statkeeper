import React from "react";
import "./Scoreboard.css";
import Title from "./Title";
import GameContext from "../../../Assets/GameContext";
import Timer from "./Timer";
//import Timer2 from "../Statkeeper/Timer2";

export default function ScoreboardContainer(props) {
  const { stuff, title } = props;
  const matchData = React.useContext(GameContext);
  const homeTeam = matchData.matchData.homeTeamData.name;
  const awayTeam = matchData.matchData.awayTeamData.name;
  const homeScoreTens = Math.floor(stuff.homeScore / 10);
  const homeScoreOnes = stuff.homeScore % 10;
  const awayScoreTens = Math.floor(stuff.awayScore / 10);
  const awayScoreOnes = stuff.awayScore % 10;
  //const timeDigits = stuff.time.split("");

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
