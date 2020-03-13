const admin = require("firebase-admin");

admin.initializeApp();
const functions = require("firebase-functions");

const db = admin.firestore();
const increment = admin.firestore.FieldValue.increment(1);
const decrement = admin.firestore.FieldValue.increment(-1);

exports.addGoal = functions.firestore
  .document("pointsScorekeeper/{pointId}")
  .onCreate(change => {
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
  .onDelete(change => {
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
  .onUpdate(change => {
    const prevPlayer = change.before.data().playerGoalId;
    const newGoal = change.after.data().playerGoalId;

    const deleteGoal = db
      .collection("seasonStats")
      .doc(prevPlayer)
      .set(
        {
          goals: decrement
        },
        { merge: true }
      );

    const addGoal = db
      .collection("seasonStats")
      .doc(newGoal)
      .set(
        {
          goals: increment
        },
        { merge: true }
      );

    return Promise.all([deleteGoal, addGoal])
      .then(() => console.log("Goal Updated!"))
      .catch(error => console.log(error));
  });

exports.addAssist = functions.firestore
  .document("pointsScorekeeper/{pointId}")
  .onCreate(change => {
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

exports.deleteAssist = functions.firestore
  .document("pointsScorekeeper/{pointId}")
  .onDelete(change => {
    const { playerAssistId } = change.data();
    return db
      .collection("seasonStats")
      .doc(playerAssistId)
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

exports.updateAssist = functions.firestore
  .document("pointsScorekeeper/{pointId}")
  .onUpdate(change => {
    const prevAssist = change.before.data().playerAssistId;
    const newAssist = change.after.data().playerAssistId;

    const deleteAssist = db
      .collection("seasonStats")
      .doc(prevAssist)
      .set(
        {
          assists: decrement
        },
        { merge: true }
      );

    const addAssist = db
      .collection("seasonStats")
      .doc(newAssist)
      .set(
        {
          assists: increment
        },
        { merge: true }
      );

    return Promise.all([deleteAssist, addAssist])
      .then(() => {
        console.log("Assist updated!");
      })
      .catch(error => console.log(error));
  });

exports.addD = functions.firestore
  .document("dsScorekeeper/{pointId}")
  .onCreate(change => {
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

exports.deleteD = functions.firestore
  .document("dsScorekeeper/{pointId}")
  .onDelete(change => {
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

exports.updateD = functions.firestore
  .document("dsScorekeeper/{pointId}")
  .onUpdate(change => {
    const prevD = change.before.data().playerId;
    const newD = change.after.data().playerId;

    const deleteD = db
      .collection("seasonStats")
      .doc(prevD)
      .set(
        {
          ds: decrement
        },
        { merge: true }
      );

    const addD = db
      .collection("seasonStats")
      .doc(newD)
      .set(
        {
          ds: increment
        },
        { merge: true }
      );

    return Promise.all([deleteD, addD])
      .then(() => {
        console.log("D updated!");
      })
      .catch(error => console.log(error));
  });
