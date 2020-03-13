const admin = require("firebase-admin");

admin.initializeApp();
const functions = require("firebase-functions");

const db = admin.firestore();
const increment = admin.firestore.FieldValue.increment(1);
const decrement = admin.firestore.FieldValue.increment(-1);

exports.handleMatches = functions.firestore
  .document("pointsScorekeeper/{pointId}")
  .onCreate((change, parameter) => {
    const { playerGoalId, playerAssistId } = change.data();

    // const scoreData = {
    //   id: change.id,
    //   playerGoalId,
    //   playerAssistId
    // };

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
