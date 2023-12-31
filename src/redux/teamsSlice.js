import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import formationsA from "../data/formationsA";
import formationsB from "../data/formationsB";

const teamsSlice = createSlice({
  name: "teams",
  initialState: initialState,
  reducers: {
    setAnimate(state, action) {
      state.animate = action.payload;
    },
    setField(state, action) {
      state.fieldSelected = action.payload;
    },
    setTeam(state, action) {
      state.teamSelected = action.payload;
    },
    setPlayer(state, action) {
      action.payload.team === "teamA"
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
                (player.name = action.payload.name))
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
        state.teamA.formation = action.payload;
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
    setPrevPosition(state, action) {
      const team = state.teamSelected;
      if (team === "teamA") {
        state.teamA.players.map(
          (player) =>
            (player.prevPosition = {
              x: player.position.x,
              y: player.position.y,
            })
        );
      } else {
        state.teamB.players.map(
          (player) =>
            (player.prevPosition = {
              x: player.position.x,
              y: player.position.y,
            })
        );
      }
    },
    restartPoistions(state, action) {
      state.teamA.players.map((player) => {
        player.position = { x: 0, y: 0 };
        player.prevPosition = { x: 0, y: 0 };
        player.deltaP = { x: 0, y: 0 };
        return player;
      });
      state.teamA.formation = null;
      state.teamB.players.map((player) => {
        player.position = { x: 0, y: 0 };
        player.prevPosition = { x: 0, y: 0 };
        player.deltaP = { x: 0, y: 0 };
        return player;
      });
      state.teamB.formation = null;
    },
    setAbout(state, action) {
      state.about = !state.about;
    },
  },
});

const { actions, reducer } = teamsSlice;
export const {
  setAnimate,
  setField,
  setTeam,
  setPlayer,
  setColorOfPlayers,
  setFormation,
  setDeltaPosition,
  setPrevPosition,
  restartPoistions,
  setAbout,
} = actions;
export default reducer;
