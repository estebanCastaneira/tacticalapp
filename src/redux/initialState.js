import initalPlayers from "../data/initialPlayers";
const initialState = {
  fieldSelected: "1",
  teamSelected: "teamA",
  animate: false,
  about: false,
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
};

export default initialState;
