const admin = require("firebase-admin");

admin.initializeApp();
const functions = require("firebase-functions");

const db = admin.firestore();
const increment = admin.firestore.FieldValue.increment(1);
const decrement = admin.firestore.FieldValue.increment(-1);

exports.addGoal = functions.firestore
  .document("points/{pointId}")
  .onCreate(change => {
    const { playerId } = change.data();
    return db
      .collection("seasonStats")
      .doc(playerId)
      .set(
        {
          goals: increment,
          points: increment
        },
        { merge: true }
      )
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  });

exports.deleteGoal = functions.firestore
  .document("points/{pointId}")
  .onDelete(change => {
    const { playerId } = change.data();
    return db
      .collection("seasonStats")
      .doc(playerId)
      .set(
        {
          goals: decrement,
          points: decrement
        },
        { merge: true }
      )
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  });

exports.updateGoal = functions.firestore
  .document("points/{pointId}")
  .onUpdate(change => {
    const prevPlayer = change.before.data().playerId;
    const newGoal = change.after.data().playerId;

    const deleteGoal = db
      .collection("seasonStats")
      .doc(prevPlayer)
      .set(
        {
          goals: decrement,
          points: decrement
        },
        { merge: true }
      );

    const addGoal = db
      .collection("seasonStats")
      .doc(newGoal)
      .set(
        {
          goals: increment,
          points: increment
        },
        { merge: true }
      );

    return Promise.all([deleteGoal, addGoal])
      .then(() => console.log("Goal Updated!"))
      .catch(error => console.log(error));
  });

exports.addAssist = functions.firestore
  .document("pointEvents/{pointId}")
  .onCreate(change => {
    const { playerId } = change.data();
    return db
      .collection("seasonStats")
      .doc(playerId)
      .set(
        {
          assists: increment,
          points: increment
        },
        { merge: true }
      )
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  });

exports.deleteAssist = functions.firestore
  .document("pointEvents/{pointId}")
  .onDelete(change => {
    const { playerId } = change.data();
    return db
      .collection("seasonStats")
      .doc(playerId)
      .set(
        {
          assists: decrement,
          points: decrement
        },
        { merge: true }
      )
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  });

exports.updateAssist = functions.firestore
  .document("pointEvents/{pointId}")
  .onUpdate(change => {
    const prevAssist = change.before.data().playerId;
    const newAssist = change.after.data().playerId;

    const deleteAssist = db
      .collection("seasonStats")
      .doc(prevAssist)
      .set(
        {
          assists: decrement,
          points: decrement
        },
        { merge: true }
      );

    const addAssist = db
      .collection("seasonStats")
      .doc(newAssist)
      .set(
        {
          assists: increment,
          points: increment
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
  .document("matchEvents/{pointId}")
  .onCreate(change => {
    const { playerId } = change.data();
    console.log("d player Id", playerId);
    return db
      .collection("seasonStats")
      .doc(playerId)
      .set(
        {
          ds: increment,
          points: increment
        },
        { merge: true }
      )
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  });

exports.deleteD = functions.firestore
  .document("matchEvents/{pointId}")
  .onDelete(change => {
    const { playerId } = change.data();
    return db
      .collection("seasonStats")
      .doc(playerId)
      .set(
        {
          ds: decrement,
          points: decrement
        },
        { merge: true }
      )
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  });

exports.updateD = functions.firestore
  .document("matchEvents/{pointId}")
  .onUpdate(change => {
    const prevD = change.before.data().playerId;
    const newD = change.after.data().playerId;

    const deleteD = db
      .collection("seasonStats")
      .doc(prevD)
      .set(
        {
          ds: decrement,
          points: decrement
        },
        { merge: true }
      );

    const addD = db
      .collection("seasonStats")
      .doc(newD)
      .set(
        {
          ds: increment,
          points: increment
        },
        { merge: true }
      );

    return Promise.all([deleteD, addD])
      .then(() => {
        console.log("D updated!");
      })
      .catch(error => console.log(error));
  });

// exports.addPlayerInfo = functions.firestore
//   .document("seasonStats/{playerId}")
//   .onCreate(change => {
//     const playerId = change.id;

//     return db
//       .firestore()
//       .collection("users")
//       .doc(playerId)
//       .get()
//       .then(doc => {
//         const displayName = doc.data().firstName + " " + doc.data().lastName;
//         const gender = doc.data().gender;

//         change.after.ref.set(
//           {
//             displayName, //playerName
//             //team: "placeholder for team",
//             gender
//           },
//           { merge: true }
//         );
//       });
//   });
