import React from 'react'
import { List, ListItemText, ListItem } from '@material-ui/core'

export default function SingleRoster(props) {
    const {addD, roster, onClose, setValue, team} = props

    const handleClick = (player)=>() =>{
        addD({ dNo: 1,
            team: team,
            d: player.Name})
            onClose()
            setValue(0)

    }

    return (
        <List>
            {roster.map(player=>(
            <ListItem onClick={handleClick(player)}>
                <ListItemText primary={player.Name} secondary="#" />
            </ListItem>
            ))}
        </List>
    )
}
