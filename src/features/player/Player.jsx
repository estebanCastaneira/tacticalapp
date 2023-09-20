import { useState, useEffect } from "react";
import React from "react";
import Draggable from "react-draggable";
import { useSpring, animated } from "@react-spring/web";
import { useDispatch, useSelector } from "react-redux";
import {
  setAnimate,
  setPlayer,
  setDeltaPosition,
} from "../../redux/teamsSlice";
import "./player.css";

function Player({ player, color, team }) {
  const animate = useSelector((state) => state.teams.animate);
  const nodeRef = React.useRef(null);
  const dispatch = useDispatch();
  const [name, setName] = useState(player.name);
  const [number, setNumber] = useState(player.number);
  const [toggleInput, setToggleInput] = useState(false);
  const [drag, setOnDrag] = useState(false);

  const handleOnStop = (e, data) => {
    const x = Math.round(data.lastX);
    const y = Math.round(data.lastY);

    return dispatch(setDeltaPosition({ team, id: player.id, x, y }));
  };
  const handleOnDrag = () => {
    setOnDrag(true);
  };

  const handleDoubleClick = () => setToggleInput(true);
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

  const [springs, api] = useSpring(() => ({
    from: {
      x: player.prevPosition.x + player.deltaP.x,
      y: player.prevPosition.y + player.deltaP.y,
    },
  }));
  useEffect(() => {
    if (animate) {
      api.start({
        from: {
          x: player.prevPosition.x,
          y: player.prevPosition.y,
        },
        to: {
          x: player.position.x,
          y: player.position.y,
        },
      });
      setAnimate(false);
    }
  }, [player.position]);

  return (
    <animated.div style={{ ...springs }}>
      <Draggable
        nodeRef={nodeRef}
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
          id={team === "teamA" ? player.id : player.id + 11}
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
    </animated.div>
  );
}

export default Player;
