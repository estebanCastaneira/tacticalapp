import "./options.css";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setColorOfPlayers } from "../../redux/teamsSlice";

function ColorOfPLayers() {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.teams.teamSelected);
  const colorO = useSelector((state) =>
    team === "teamA" ? state.teams.teamA.color : state.teams.teamB.color
  );
  const [color, setColor] = useColor("hex", "000000");

  const handleSetColor = (color) => {
    setColor(color);

    dispatch(setColorOfPlayers({ color }));
  };
  useEffect(() => {
    colorO && setColor(colorO);
  }, [team]);
  return (
    <div className="color-picker">
      <ColorPicker
        width={300}
        height={150}
        color={color}
        onChange={(color) => {
          handleSetColor(color);
        }}
        hideHSV
        dark
      />
    </div>
  );
}

export default ColorOfPLayers;
