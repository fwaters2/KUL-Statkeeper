const admin = require("firebase-admin");

admin.initializeApp();
const functions = require("firebase-functions");

const db = admin.firestore();
const increment = admin.firestore.FieldValue.increment(1);
const decrement = admin.firestore.FieldValue.increment(-1);

exports.addGoal = functions.firestore
  .document("pointsScorekeeper/{pointId}")
  .onCreate((change, parameter) => {
    const { playerGoalId } = change.data();
    return db
      .collection("seasonStats")
      .doc(playerGoalId)
      .set(
        {
          goals: increment
        },
        { merge: true }
      )
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  });

exports.deleteGoal = functions.firestore
  .document("pointsScorekeeper/{pointId}")
  .onDelete((change, parameter) => {
    const { playerGoalId } = change.data();
    return db
      .collection("seasonStats")
      .doc(playerGoalId)
      .set(
        {
          goals: decrement
        },
        { merge: true }
      )
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  });

exports.updateGoal = functions.firestore
  .document("pointsScorekeeper/{pointId}")
  .onUpdate((change, parameter) => {
    const prevPlayer = change.before.data().playerGoalId;
    const newGoal = change.after.data().playerGoalId;

    function addRemove() {
      db.collection("seasonStats")
        .doc(prevPlayer)
        .set(
          {
            goals: decrement
          },
          { merge: true }
        )
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
      db.collection("seasonStats")
        .doc(newGoal)
        .set(
          {
            goals: increment
          },
          { merge: true }
        )
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    }

    return addRemove();
  });

exports.addAssist = functions.firestore
  .document("pointsScorekeeper/{pointId}")
  .onCreate((change, parameter) => {
    const { playerAssistId } = change.data();
    return db
      .collection("seasonStats")
      .doc(playerAssistId)
      .set(
        {
          assists: increment
        },
        { merge: true }
      )
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  });

exports.deleteGoal = functions.firestore
  .document("pointsScorekeeper/{pointId}")
  .onDelete((change, parameter) => {
    const { playerAssistd } = change.data();
    return db
      .collection("seasonStats")
      .doc(playerAssistd)
      .set(
        {
          assists: decrement
        },
        { merge: true }
      )
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  });

exports.updateGoal = functions.firestore
  .document("pointsScorekeeper/{pointId}")
  .onUpdate((change, parameter) => {
    const prevAssist = change.before.data().playerAssistd;
    const newAssist = change.after.data().playerAssistId;

    function addRemove() {
      db.collection("seasonStats")
        .doc(prevAssist)
        .set(
          {
            assists: decrement
          },
          { merge: true }
        )
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
      db.collection("seasonStats")
        .doc(newAssist)
        .set(
          {
            assists: increment
          },
          { merge: true }
        )
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    }

    return addRemove();
  });

exports.addD = functions.firestore
  .document("dsScorekeeper/{pointId}")
  .onCreate((change, parameter) => {
    const { playerId } = change.data();
    return db
      .collection("seasonStats")
      .doc(playerId)
      .set(
        {
          ds: increment
        },
        { merge: true }
      )
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  });

exports.deleteGoal = functions.firestore
  .document("dsScorekeeper/{pointId}")
  .onDelete((change, parameter) => {
    const { playerId } = change.data();
    return db
      .collection("seasonStats")
      .doc(playerId)
      .set(
        {
          ds: decrement
        },
        { merge: true }
      )
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  });

exports.updateGoal = functions.firestore
  .document("dsScorekeeper/{pointId}")
  .onUpdate((change, parameter) => {
    const prevD = change.before.data().playerId;
    const newD = change.after.data().playerId;

    function addRemove() {
      db.collection("seasonStats")
        .doc(prevD)
        .set(
          {
            ds: decrement
          },
          { merge: true }
        )
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
      db.collection("seasonStats")
        .doc(newD)
        .set(
          {
            ds: increment
          },
          { merge: true }
        )
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    }

    return addRemove();
  });
