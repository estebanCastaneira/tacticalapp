import "./player.css";
import { useState } from "react";
import Draggable from "react-draggable";
import React from "react";
import { useDispatch } from "react-redux";
import { setPlayer, setDeltaPosition } from "../../redux/teamsSlice";

function Player({ player, color, team }) {
  const nodeRef = React.useRef(null);
  const dispatch = useDispatch();
  const [name, setName] = useState(player.name);
  const [number, setNumber] = useState(player.number);
  const [toggleInput, setToggleInput] = useState(false);
  const [drag, setOnDrag] = useState(false);

  const handleOnStart = (e, data) => {
    const x = Math.round(data.lastX);
    const y = Math.round(data.lastY);
    //console.log(`{x:${x} , y:${y}},`);

    return dispatch(setDeltaPosition({ team, id: player.id, x, y }));
  };
  const handleDoubleClick = () => setToggleInput(true);
  const handleOnDrag = () => setOnDrag(true);

  const handleOnChangeName = (content) => {
    setName(content);
  };
  const handleOnChangeNumber = (content) => {
    setNumber(content);
  };
  const handleOnKeyDown = (keyValue) => {
    keyValue === "Enter" &&
      (setToggleInput(false),
      dispatch(
        setPlayer({
          id: player.id,
          position: player.position,
          number,
          name,
          team,
        })
      ));
  };
  return (
    <Draggable
      nodeRef={nodeRef}
      positionOffset={{ x: player.position.x, y: player.position.y }}
      onStart={handleOnStart}
      onDrag={handleOnDrag}
      onStop={() => setOnDrag(false)}
    >
      <div
        ref={nodeRef}
        className={`player-container ${drag ? "drag" : "playerCH"}`}
        onDoubleClick={(e) => {
          handleDoubleClick(e.target.textContent);
        }}
      >
        <div className="player" style={{ backgroundColor: `${color}` }}>
          {!toggleInput && <p>{number}</p>}
          {toggleInput && (
            <input
              className="player-input"
              type="number"
              value={number}
              onChange={(e) => handleOnChangeNumber(e.target.value)}
              onKeyDown={(e) => handleOnKeyDown(e.key)}
            />
          )}
        </div>
        {!toggleInput && <p>{name}</p>}
        {toggleInput && (
          <input
            className="player-input"
            type="text"
            value={name}
            onChange={(e) => handleOnChangeName(e.target.value)}
            onKeyDown={(e) => handleOnKeyDown(e.key)}
          />
        )}
      </div>
    </Draggable>
  );
}

export default Player;
