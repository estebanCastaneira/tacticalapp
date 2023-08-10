const initalPlayers = [];

for(let i = 1; i <= 11; i++){
    const player = {id: i, number: i, name: `Player ${i}`, position : {x: 0, y:0}, deltaP: {x: 0, y:0}}
    initalPlayers.push(player);
}

export default initalPlayers;