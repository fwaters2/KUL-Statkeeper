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
    .then(console.log("updated relevant scores"))
    .catch(error => console.log(error));
}

function handleFantasy(event, categories) {
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
}

const goalCategories = ["goalsF", "goalsM", "rookieF", "rookieM"];
exports.handleFantasyGoals = functions.firestore
  .document("points/{pointId}")
  .onWrite(event => handleFantasy(event, goalCategories));

const assistCategories = ["assistsF", "assistsM", "rookieF", "rookieM"];
exports.handleFantasyAssists = functions.firestore
  .document("pointEvents/{pointEventsId}")
  .onWrite(event => handleFantasy(event, assistCategories));

const dCategories = ["dsF", "dsM", "rookieF", "rookieM"];
exports.handleFantasyDs = functions.firestore
  .document("matchEvents/{matchEventsId}")
  .onWrite(event => handleFantasy(event, dCategories));

function handleStat(event, stat) {
  const seasonTableRef = db.collection("seasonStat");
  function updatePlayersStats(player, operation) {
    return seasonTableRef.doc(player).set(
      {
        [stat]: operation,
        points: operation
      },
      { merge: true }
    );
  }
  //ADDING
  const weDidntHaveDataBefore = !event.before.exists;
  if (weDidntHaveDataBefore) {
    const { playerId } = event.after.data();

    return updatePlayersStats(playerId, increment)
      .then(console.log(stat + " Added"))
      .catch(error => {
        console.log("Error getting documents: ", error);
      });
  }
  const newDataDoesntExist = !event.after.exists;
  if (newDataDoesntExist) {
    const { playerId } = event.before.data();
    return updatePlayersStats(playerId, decrement)
      .then(console.log(stat + "  Deleted"))
      .catch(error => {
        console.log("Error getting documents: ", error);
      });
  } else {
    const playerToDeduct = event.before.data().playerId;
    const playerToAdd = event.after.data().playerId;
    return Promise.all([
      updatePlayersStats(playerToDeduct, decrement),
      updatePlayersStats(playerToAdd, increment)
    ])
      .then(console.log("updated " + stat + " in Table"))
      .catch(error => console.log(error));
  }
}
exports.handleGoals = functions.firestore
  .document("points/{pointId}")
  .onWrite(event => handleStat(event, "goals"));

exports.handleAssists = functions.firestore
  .document("points/{pointId}")
  .onWrite(event => handleStat(event, "assists"));

exports.handleDs = functions.firestore
  .document("points/{pointId}")
  .onWrite(event => handleStat(event, "ds"));
