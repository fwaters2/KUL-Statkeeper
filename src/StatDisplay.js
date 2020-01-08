import React from "react";
import Firebase from "./Utils/Firebase";
import moment from "moment";

export default function StatDisplay() {
  const [data, setData] = React.useState([]);
  const [players, setPlayers] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = Firebase.firestore()
      .collection("PlayoffDs")

      .orderBy("GameNO")
      .orderBy("DNo")
      .onSnapshot(snapshot => {
        const fbData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(fbData);
      });
    Firebase.firestore()
      .collection("Players")
      .onSnapshot(snapshot => {
        const player = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPlayers(
          player.sort((a, b) => {
            if (a.Name < b.Name) {
              return -1;
            }
            if (a.Name > b.Name) {
              return 1;
            }
            return 0;
          })
        );
      });
    return unsubscribe;
  }, []);
  return (
    <div>
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            <td>Season</td>
            <td>GameNO</td>
            <td>DNo</td>
            <td>TeamID</td>
            <td>D</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {players
            ? data.map(stat => (
                <tr>
                  <td style={{ border: "1px black solid" }}>{stat.Season}</td>
                  <td style={{ border: "1px black solid" }}>{stat.GameNO}</td>
                  <td style={{ border: "1px black solid" }}>{stat.DNo}</td>
                  <td style={{ border: "1px black solid" }}>{stat.TeamID}</td>
                  <td style={{ border: "1px black solid" }}>
                    {players.find(x => x.Name === stat.D).PlayerID}
                  </td>
                  {/* <td>
                {moment(new Date(stat.Time)).format("YYYY-MM-DD hh:mm:ss")}
              </td> */}
                  <td style={{ border: "1px black solid" }}>
                    {moment(stat.Time.toDate()).format("YYYY-MM-DD hh:mm:ss")}
                  </td>
                  {console.log(players)}
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
