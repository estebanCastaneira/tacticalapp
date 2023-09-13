import { createSlice } from "@reduxjs/toolkit";
import initalPlayers from "../data/initialPlayers";
import formationsA from "../data/formationsA";
import formationsB from "../data/formationsB";

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    fieldSelected: "1",
    teamSelected: "teamA",
    teamA: {
      color: {
        hex: "#0000ff",
        rgb: { a: undefined, b: 0, g: 0, r: 255 },
        hsv: { a: undefined, h: 0, s: 100, v: 100 },
      },
      players: initalPlayers,
      formation: null,
    },
    teamB: {
      color: {
        hex: "#ff0000",
        rgb: { a: undefined, b: 255, g: 0, r: 0 },
        hsv: { a: undefined, h: 240, s: 100, v: 100 },
      },
      players: initalPlayers,
      formation: null,
    },
  },
  reducers: {
    setField(state, action) {
      state.fieldSelected = action.payload;
    },
    setTeam(state, action) {
      state.teamSelected = action.payload;
    },
    setPlayer(state, action) {
      state.teamSelected === "teamA"
        ? state.teamA.players.map((player) =>
            player.id !== action.payload.id
              ? player
              : ((player.id = action.payload.id),
                (player.number = action.payload.number),
                (player.name = action.payload.name))
          )
        : state.teamB.players.map((player) =>
            player.id !== action.payload.id
              ? player
              : ((player.id = action.payload.id),
                (player.number = action.payload.number),
                (player.name = action.payload.name),
                (player.position = action.payload.position))
          );
    },
    setColorOfPlayers(state, action) {
      const team = state.teamSelected;
      const color = action.payload.color;
      team === "teamA"
        ? (state.teamA.color = color)
        : (state.teamB.color = color);
    },
    setFormation(state, action) {
      const team = state.teamSelected;
      const formationA = formationsA[action.payload];
      const formationB = formationsB[action.payload];
      if (team === "teamA") {
        (state.teamA.formation = action.payload),
          state.teamA.players.map(
            (player) =>
              (player.position = {
                x: formationA[player.id - 1].x - player.deltaP.x,
                y: formationA[player.id - 1].y - player.deltaP.y,
              })
          );
      } else {
        state.teamB.formation = action.payload;
        state.teamB.players.map(
          (player) =>
            (player.position = {
              x: formationB[player.id - 1].x - player.deltaP.x,
              y: formationB[player.id - 1].y - player.deltaP.y,
            })
        );
      }
    },
    setDeltaPosition(state, action) {
      const team = action.payload.team;
      const playerId = action.payload.id;
      if (team === "teamA") {
        const playerUpdate = state.teamA.players.find(
          (player) => player.id === playerId
        );
        playerUpdate.deltaP = { x: action.payload.x, y: action.payload.y };
        state.teamA.players.filter((player) =>
          player.id === playerId ? playerUpdate : player
        );
      } else {
        const playerUpdate = state.teamB.players.find(
          (player) => player.id === playerId
        );
        playerUpdate.deltaP = { x: action.payload.x, y: action.payload.y };
        state.teamB.players.filter((player) =>
          player.id === playerId ? playerUpdate : player
        );
      }
    },
  },
});

const { actions, reducer } = teamsSlice;
export const {
  setPlayer,
  setTeam,
  setColorOfPlayers,
  setFormation,
  setField,
  setDeltaPosition,
} = actions;
export default reducer;
