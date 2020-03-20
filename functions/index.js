const admin = require("firebase-admin");

admin.initializeApp();
const functions = require("firebase-functions");

const db = admin.firestore();
const increment = admin.firestore.FieldValue.increment(1);
const decrement = admin.firestore.FieldValue.increment(-1);

function deriveWeekId(grabWeekId) {
  const week1Ids = [
    "0JQoXVXV2vTZPdQe50H0",
    "jR68oLSb074YDAuXBM4Z",
    "UGxaVnYa6QNhyRiovNuX",
    "sSkKLvF78J3Ak49quwGt",
    "HQN2wMsA5ninTKNpCS5u",
    "hDGLGUN6kODC1SDrMV89",
    "11DSqA0DP4DB804maDI4",
    "BfWIm7v0vV2Tn90eFRQk",
    "3EHYJ5yPET7UuBw8KEkP",
    "AFNQQw64zjzhSqxPEKl3"
  ];
  const week2Ids = [
    "DJ4Mv3nC7PRdldmFkAEJ",
    "fI1BmRta6b4aTfrISaAd",
    "Z1TgnKHKkC1egpuIhOF6",
    "cSeRusry0gIarRH9AD5P",
    "19fdZdU35ahW6Dc8dyHa",
    "jCygeVYUmaGpSwUBMlEo",
    "fygc5J2UJ7YzeX6JhCQS",
    "JTfFF2XLIdkjrx2K5I0x",
    "xrWkzcM96gFqh56RoUow",
    "AxsS1UlCLrxYFZEydemB",
    "iZGGClk1uSA5nhy7rMXK"
  ];
  const week3Ids = [];
  const week4Ids = [];
  const finalsIds = ["hello"];
  const theDifferentWeeks = [
    { id: "eZ0gUhQIkfVrtlbQsHL0", matchIds: week1Ids },
    { id: "bCfgLs0voveSpwrZNJYT", matchIds: week2Ids },
    { id: "A34XCpBjQ3XKsaHXHVWL", matchIds: week3Ids },
    { id: "lItofLYvkDj9THti2R60", matchIds: week4Ids },
    { id: "chZebvikPqgLzF2OrxBZ", matchIds: finalsIds }
  ];
  const filterResult = theDifferentWeeks.filter(x =>
    x.matchIds.includes(grabWeekId)
  );
  return filterResult[0].id;
}

function updateFantasyPoints(operation, userToUpdate, timeframe, thisCategory) {
  const subscoreId = userToUpdate + timeframe;
  const subscoreRef = db.collection("fantasySubscores").doc(subscoreId);
  const userDocRef = db.collection("fantasyUsers").doc(userToUpdate);
  const weekDocRef = userDocRef.collection("deadlines").doc(timeframe);
  const categoryDocRef = weekDocRef.collection("picks").doc(thisCategory);

  const setSubscore = subscoreRef.set(
    { deadline: timeframe, subscore: operation, userToUpdate },
    { merge: true }
  );

  const setTotal = userDocRef.set({ total: operation }, { merge: true });
  const setWeekTotal = weekDocRef.set({ subTotal: operation }, { merge: true });
  const setCategoryTotal = categoryDocRef.set(
    { pts: operation },
    { merge: true }
  );
  return Promise.all([setSubscore, setTotal, setWeekTotal, setCategoryTotal])
    .then(console.log("updated relevat scores"))
    .catch(error => console.log(error));
}

exports.handleFantasyDs = functions.firestore
  .document("matchEvents/{matchEventsId}")
  .onWrite(event => {
    //what categories will be affected by any changes to this collection?
    const categories = ["dsF", "dsM", "rookieF", "rookieM"];

    //defines how we'd go about getting the correct picks (to be used later)
    function getPicksAffected(player, timeframe) {
      const fantasyPicksQuery = db
        .collection("fantasyPicks")
        .where("playerId", "==", player)
        .where("weekId", "==", timeframe);

      return fantasyPicksQuery.where("category", "in", categories).get();
    }

    //ADDING
    const weDidntHaveDataBefore = !event.before.exists;
    if (weDidntHaveDataBefore) {
      //then this is a new document
      const { playerId, matchID } = event.after.data();
      const deadlineId = deriveWeekId(matchID);

      return getPicksAffected(playerId, deadlineId)
        .then(docs => {
          //now we need to increment each one of these docs
          return docs.forEach(doc => {
            const { userId, category } = doc.data();
            updateFantasyPoints(increment, userId, deadlineId, category);
            //updating fantasyuser collections
          });
        })
        .catch(function(error) {
          console.log("Error adding documents: ", error);
        });
    }

    //DELETING
    const newDataDoesntExist = !event.after.exists;
    if (newDataDoesntExist) {
      //the statkeeper deleted that stat
      const { matchID } = event.before.data();
      const deadlineId = deriveWeekId(matchID);
      const deletedPlayerId = event.before.data().playerId;

      return getPicksAffected(deletedPlayerId, deadlineId)
        .then(docs => {
          //now we need to decrement each one of these docs
          return docs.forEach(doc => {
            const { userId, category } = doc.data();
            updateFantasyPoints(decrement, userId, deadlineId, category);
          });
        })
        .catch(function(error) {
          console.log("Error deleting documents: ", error);
        });
    } else {
      //UPDATING
      const { playerId, matchID } = event.after.data();
      const deadlineId = deriveWeekId(matchID);
      const deletedPlayerId = event.before.data().playerId;
      return Promise.all([
        getPicksAffected(playerId, deadlineId),
        getPicksAffected(deletedPlayerId, deadlineId)
      ])
        .then(docs => {
          //now we need to decrement each one of these docs
          docs[0].forEach(doc => {
            const { userId, category } = doc.data();
            updateFantasyPoints(increment, userId, deadlineId, category);
          });
          docs[1].forEach(doc => {
            const { userId, category } = doc.data();
            updateFantasyPoints(decrement, userId, deadlineId, category);
          });
        })
        .catch(function(error) {
          console.log("Error updating documents: ", error);
        });
    }

    //Step 2: get all Fantasy picks affected by update
  });
// exports.addFantasyPtFromStatkeeperD = functions.firestore
// .document("matchEvents/{matchEventsId}")
// .onCreate(change => {
//   //Step 1: Grab info from trigger
//   const { playerId, matchID } = change.data();
//   const deadlineId = deriveWeekId(matchID);
//   //Step 2: get approptiate picks
//   console.log("without trigger", deadlineId);
//   return db
//     .collection("fantasyPicks")
//     .where("playerId", "==", playerId)
//     .where("weekId", "==", deadlineId)
//     .where("category", "in", ["dsF","dsM","rookieF","rookieM"])
//     .get()
//     .then(docs => {
//       //now we need to increment each one of these docs
//       docs.forEach(doc => {
//         const { userId, weekId, category } = doc.data();

//         //creating document for subscore collection
//         const subscoreId = userId + weekId;
//         db.collection("fantasySubscores")
//           .doc(subscoreId)
//           .set(
//             {
//               deadline: weekId,
//               subscore: increment,
//               userId
//             },
//             { merge: true }
//           )
//           .then(console.log("added subscore"))
//           .catch(error => console.log(error));
//         //updating fantasyuser collections
//         const userDocRef = db.collection("fantasyUsers").doc(userId);
//         userDocRef.set({ total: increment }, { merge: true });

//         const weekDocRef = userDocRef.collection("deadlines").doc(weekId);
//         weekDocRef.set({ subTotal: increment }, { merge: true });

//         const categoryDocRef = weekDocRef.collection("picks").doc(category);
//         categoryDocRef.set({ pts: increment }, { merge: true });
//       });
//     })

//     .catch(function(error) {
//       console.log("Error getting documents: ", error);
//     });
// });

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
