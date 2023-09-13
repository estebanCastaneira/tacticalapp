import "./navbar.css";
import FieldSelector from "../../options/FieldSelector";
import TeamSelector from "../../options/TeamSelector";
import Formation from "../../options/Formation";
import ColorOfPLayers from "../../options/ColorOfPlayers";

function Navbar({ clicked, setClicked }) {
  return (
    <>
      <nav>
        <FieldSelector />
        <TeamSelector />
        <Formation />
        <div className="d-flex">
          <label>Select color of players: </label>
          <div className="drop-down" onClick={() => setClicked(!clicked)}>
            <div
              className={clicked ? "drop-down-colorpicker" : "display-none"}
              onClick={(e) => e.stopPropagation()}
            >
              <ColorOfPLayers />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
