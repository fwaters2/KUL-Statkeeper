import React from 'react'
import './Rosters.json'
import './players.json'
import './Teams.json'
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core'


const Rosters = require("./Rosters.json")
const players= require('./players.json')

const teams =require('./Teams.json')

export default function () {
    const [season, setSeason] = React.useState("Spring 2019")

    const currentPlayers = Rosters.filter(player=>player.season===season)

     const currentPlayerNames = currentPlayers.map(index=>{
         const playerNames = players.find(player=>player.playerID===index.playerID)

         const name = playerNames.firstName + " " + playerNames.lastName
         const team = teams.find(team=>team.teamID===index.teamID).team
         return {
            name: name,
            team: team
         }
        }
     )

    return (
        <div>
            Hello from stat upload
            <Table>
                
                <TableBody>
                    {currentPlayerNames.filter(player=>player.team==="Galaxy").map((player,index)=>(
                        <TableRow key={index}>
                
                            <TableCell>{player.name}</TableCell>
                            <TableCell>{player.team}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
