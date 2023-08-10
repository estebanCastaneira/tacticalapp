import "./football.css";
import Player from "../../player/Player";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Bench({ local }) {
  const color = useSelector((state) =>
    local ? state.teams.teamA.color : state.teams.teamB.color
  );
  const players = useSelector((state) =>
    local ? state.teams.teamA.players : state.teams.teamB.players
  );

  return (
    <div className={local ? "bench bench-local" : "bench"}>
      {players.map((player, index) => {
        return (
          <Player
            key={index}
            player={player}
            color={color}
            team={local ? "teamA" : "teamB"}
          />
        );
      })}
    </div>
  );
}

export default Bench;
