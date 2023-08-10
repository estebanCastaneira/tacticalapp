import "./options.css";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { useDispatch } from "react-redux";
import { setColorOfPlayers } from "../../redux/teamsSlice";
import { useState } from "react";

function ColorOfPLayers() {
  const dispatch = useDispatch();
  const [team, setTeam] = useState("teamA");
  const [color, setColor] = useColor("hex", "#121212");

  const handleSetColor = (color) => {
    setColor(color);
    dispatch(setColorOfPlayers({ color: color.hex }));
  };

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
