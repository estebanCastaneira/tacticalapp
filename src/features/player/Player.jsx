import "./player.css";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAnimate,
  setPlayer,
  setDeltaPosition,
  setPrevPosition,
} from "../../redux/teamsSlice";

function Player({ player, color, team }) {
  const animate = useSelector((state) => state.teams.animate);
  const nodeRef = React.useRef(null);
  const dispatch = useDispatch();
  const [name, setName] = useState(player.name);
  const [number, setNumber] = useState(player.number);
  const [toggleInput, setToggleInput] = useState(false);
  const [drag, setOnDrag] = useState(false);
  const [keyFrame, setKeyFrame] = useState("");

  const handleOnStop = (e, data) => {
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
  const keyframeAnimation = `
  @keyframes movePlayer {
    from {
      transform: translate(0,0);
    }
   to {
      transform: translate(${player.position.x}, ${player.position.y});
    }
  }
`;

  useEffect(() => {
    const element = document.getElementById(`${player.id}`);
    element.style.animation = "movePlayer 1s ease forwards";
    setKeyFrame(keyframeAnimation);
    const handleAnimationEnd = () => {
      element.style.animation = "";
    };

    element.addEventListener("animationend", handleAnimationEnd);

    return () => {
      element.removeEventListener("animationend", handleAnimationEnd);
      setAnimate(false);
    };
  }, [player.position]);
  player.id === 8 && console.log(keyFrame);
  return (
    <Draggable
      nodeRef={nodeRef}
      positionOffset={{ x: player.position.x, y: player.position.y }}
      onDrag={handleOnDrag}
      onStop={(e, data) => {
        handleOnStop(e, data);
        setOnDrag(false);
      }}
    >
      <div
        ref={nodeRef}
        className={`player-container ${drag ? "drag" : "playerCH"}`}
        onDoubleClick={(e) => {
          handleDoubleClick(e.target.textContent);
        }}
        id={player.id}
      >
        <style>{keyframeAnimation}</style>
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
