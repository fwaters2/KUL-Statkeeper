import React from "react";
import Firebase from "../../Utils/Firebase";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Container
} from "@material-ui/core";

export default function TableView(props) {
  const { setPage } = props;
  const [data, setData] = React.useState([]);
  const [headers, setHeaders] = React.useState([]);
  React.useEffect(() => {
    const unsubscribe = Firebase.firestore()
      .collection("Ds")
      .where("Season", "==", "Fall 2019")
      .where("GameNO", ">=", 22)
      .onSnapshot(snapshot => {
        const stat = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(
          stat
            .sort((a, b) => a.GoalNO - b.GoalNO)
            .sort((a, b) => a.GameNO - b.GameNO)
        );
        setHeaders(
          Object.keys(stat[0]).filter(item => item !== "Time" && item !== "id")
        );
        console.log(stat);
      });
    return () => unsubscribe;
  }, []);

  return (
    <Container>
      <Button color="secondary" onClick={() => setPage("Schedule")}>
        Back
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(stat => (
            <TableRow>
              {headers.map(header => (
                <TableCell>{stat[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
