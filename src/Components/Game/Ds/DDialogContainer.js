import React from "react";

import SingleRoster from "./SingleRoster";
import StatDialog from "../components/StatDialog";
import { MatchContext } from "../../../Contexts/MatchContext";
import { dBDRef, dUIRef } from "../../../Assets/firestoreCollections";

export default function DDialogContainer(props) {
  const { id } = React.useContext(MatchContext);

  const { onClose, open, dIdToUpdate } = props;
  const [d, setD] = React.useState("");
  const [roster, setRoster] = React.useState([]);
  const [color, setColor] = React.useState("");
  const [playerId, setPlayerId] = React.useState(null);

  const handleClose = () => {
    onClose();
    setD(null);
    setPlayerId(null);
  };

  const handleConfirm = () => {
    const newDUI = {
      matchId: id,
      teamColor: color,
      D: d,
      playerId,
      timestamp: new Date(),
    };
    const updateDUI = { teamColor: color, D: d, playerId };

    const newDDB = {
      matchId: id,
      matchEventType: "CBW4Mh0k0BFqVK05WPjS",
      playerId,
      timestamp: new Date(),
    };

    const updateDDB = {
      playerId,
    };

    const addData = () => {
      dBDRef
        .add(newDDB)
        .then((docRef) =>
          dUIRef
            .doc(docRef.id)
            .set(newDUI)
            .then(() => {
              console.log("Set dUI doc with same id as db doc");
            })
            .catch((error) => console.log(error))
        )
        .then(console.log("added db Ds doc"))
        .catch((error) => console.log(error));
    };
    const updateData = () => {
      dUIRef.doc(dIdToUpdate).update(updateDUI);
      dBDRef.doc(dIdToUpdate).update(updateDDB);
    };

    dIdToUpdate === null ? addData() : updateData();
    handleClose();
  };

  return (
    <StatDialog
      onClose={handleClose}
      open={open}
      setRoster={setRoster}
      setColor={setColor}
      validation={d !== ""}
      handleConfirm={handleConfirm}
    >
      <SingleRoster
        setD={setD}
        d={d}
        roster={roster}
        setPlayerId={setPlayerId}
      />
    </StatDialog>
  );
}
