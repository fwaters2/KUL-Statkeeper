export function getPlayerIdsFromRoster(array, teamId) {
  return array
    .filter((rosterDoc) => rosterDoc.team_id === teamId)
    .map((doc) => doc.player_id);
}

export function populatePlayerData(allPlayerData, playerId) {
  const { first_name, last_name, ch_name } = allPlayerData[playerId];

  const playerData = {
    [playerId]: {
      ...allPlayerData[playerId],
      player: `${first_name} ${last_name}`,
      chName: ch_name,
    },
  };
  return playerData;
}
