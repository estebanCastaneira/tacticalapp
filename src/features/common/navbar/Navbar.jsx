import "./navbar.css";
import FieldSelector from "../../options/FieldSelector";
import TeamSelector from "../../options/TeamSelector";
import Formation from "../../options/Formation";
import ColorOfPLayers from "../../options/ColorOfPlayers";
import questionMark from "../../../assets/icons/question-mark.png";
import { useDispatch, useSelector } from "react-redux";
import { setAbout } from "../../../redux/teamsSlice";

function Navbar({ clicked, setClicked }) {
  const dispatch = useDispatch();
  const handleOnClick = (e) => {
    dispatch(setAbout());
  };
  const about = useSelector((state) => state.teams.about);
  return (
    <>
      <nav>
        <FieldSelector about={about} />
        <TeamSelector about={about} />
        <Formation about={about} />
        <div className="d-flex gap-2">
          <label>Select color of players: </label>
          <div
            className="drop-down"
            onClick={() => {
              setClicked(!clicked);
              about && handleOnClick();
            }}
          >
            <div
              className={clicked ? "drop-down-colorpicker" : "display-none"}
              onClick={(e) => e.stopPropagation()}
            >
              <ColorOfPLayers />
            </div>
          </div>
          <div className="questionmark" onClick={handleOnClick}>
            <img
              src={questionMark}
              alt="question-mark"
              typeof="png/img"
              width={25}
              height={30}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
