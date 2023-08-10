import "./football.css";
import Bench from "./Bench";
import { useSelector } from "react-redux";

function Football() {
  const field = useSelector((state) => state.teams.fieldSelected);
  const formTeamA = useSelector((state) => state.teams.teamA.formation);
  const formTeamB = useSelector((state) => state.teams.teamB.formation);
  return (
    <>
      <div className="field-container">
        <div className="d-flex flex-column">
          <div className="field-aside">
            <Bench local={true} />
            <p className="formation formation-local">
              {formTeamA &&
                formTeamA !== "none" &&
                formTeamA.split("").join("-")}
            </p>
          </div>

          <div
            className={
              field === "1"
                ? "field-one"
                : field === "2"
                ? "field-two"
                : field === "3"
                ? "field-three"
                : ""
            }
          ></div>

          <div className="field-aside">
            <p className="formation formation-visit">
              {formTeamB &&
                formTeamB !== "none" &&
                formTeamB.split("").join("-")}
            </p>
            <Bench />
          </div>
        </div>
      </div>
    </>
  );
}

export default Football;
