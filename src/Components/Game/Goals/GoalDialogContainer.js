import React, { useState, useContext } from "react";

import DoubleRoster from "./DoubleRoster";
import {
  assistDBRef,
  pointDBRef,
  pointUIRef,
} from "../../../Assets/firestoreCollections";
import StatDialog from "../components/StatDialog";
import { MatchContext } from "../../../Contexts/MatchContext";

export default function GoalDialogContainer(props) {
  const { id } = useContext(MatchContext);

  const { onClose, open, pointIdToUpdate, assistIdToUpdate } = props;
  const [assist, setAssist] = useState("");
  const [goal, setGoal] = useState("");
  const [roster, setRoster] = useState([]);
  const [color, setColor] = useState("");
  const [playerGoalId, setPlayerGoalId] = useState(null);
  const [playerAssistId, setPlayerAssistId] = useState(null);

  const handleClose = () => {
    setPlayerAssistId(null);
    setPlayerGoalId(null);
    onClose();
    setAssist("");
    setGoal("");
  };
  const handleConfirm = () => {
    const matchId = id;
    const timestamp = new Date();
    const newData = {
      matchId,
      timestamp,
    };

    //UI data
    const newPointUI = {
      ...newData,
      teamColor: color,
      Assist: assist,
      Goal: goal,
      playerGoalId,
      playerAssistId,
    };
    const updatePointUI = {
      playerGoalId,
      playerAssistId,
      teamColor: color,
      Assist: assist,
      Goal: goal,
    };

    //Database Data
    //Goals
    const newPointDB = {
      ...newData,
      playerId: playerGoalId,
    };
    const updatePointDB = {
      playerId: playerGoalId,
    };

    const updateAssistDB = {
      playerId: playerAssistId,
    };

    const addPoint = () => {
      pointUIRef.add(newPointUI).then((docRef) => {
        //Assists
        const newAssistDB = {
          ...newData,
          pointId: docRef.id,
          playerId: playerAssistId,
          pointEventTypeId: "bUTPkFdC7KFTW7FfLOuh",
        };
        pointDBRef
          .doc(docRef.id)
          .set(newPointDB)
          .then(console.log("success adding point"))
          .catch((error) => console.log(error));

        assistDBRef
          .add(newAssistDB)
          .then((assistRef) => {
            return pointUIRef
              .doc(docRef.id)
              .update({ assistDBref: assistRef.id });
          })
          .then(console.log("successfully added assist"))
          .catch((error) => console.log(error));
      });
    };

    const updatePoint = () => {
      pointUIRef.doc(pointIdToUpdate).update(updatePointUI);
      pointDBRef.doc(pointIdToUpdate).update(updatePointDB);
      assistDBRef.doc(assistIdToUpdate).update(updateAssistDB);
    };

    pointIdToUpdate === null ? addPoint() : updatePoint();
    handleClose();
  };

  return (
    <StatDialog
      onClose={handleClose}
      open={open}
      setRoster={setRoster}
      setColor={setColor}
      validation={assist && goal && assist !== goal}
      handleConfirm={handleConfirm}
    >
      <DoubleRoster
        setAssist={setAssist}
        setGoal={setGoal}
        assist={assist}
        goal={goal}
        roster={roster}
        setPlayerGoalId={setPlayerGoalId}
        setPlayerAssistId={setPlayerAssistId}
      />
    </StatDialog>
  );
}
