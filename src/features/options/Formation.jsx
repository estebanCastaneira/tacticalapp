import { useDispatch, useSelector } from "react-redux";
import {
  setAbout,
  setAnimate,
  setFormation,
  setPrevPosition,
} from "../../redux/teamsSlice";
import Select from "react-select";

function Formation({ about }) {
  const teamSelected = useSelector((state) => state.teams.teamSelected);
  const formation = useSelector((state) =>
    teamSelected === "teamA"
      ? state.teams.teamA.formation
      : state.teams.teamB.formation
  );
  const dispatch = useDispatch();
  const handleFormation = (e) => {
    return (
      dispatch(setPrevPosition()),
      dispatch(setAnimate(true)),
      dispatch(setFormation(e.value))
    );
  };

  const options = [
    { value: "none", label: "None" },
    { value: "3232", label: "3-2-3-2" },
    { value: "343", label: "3-4-3" },
    { value: "4312", label: "4-3-1-2" },
    { value: "4321", label: "4-3-2-1" },
    { value: "442", label: "4-4-2" },
    { value: "532", label: "5-3-2" },
    { value: "541", label: "5-4-1" },
  ];
  return (
    <div className="select" onClick={() => about && dispatch(setAbout())}>
      <label>Select The Squad Formation: </label>
      <Select
        options={options}
        placeholder={
          formation && formation !== "none"
            ? formation.split("").join("-")
            : "None"
        }
        value={
          formation && formation !== "none"
            ? formation.split("").join("-")
            : "None"
        }
        onChange={handleFormation}
      />
    </div>
  );
}

export default Formation;
