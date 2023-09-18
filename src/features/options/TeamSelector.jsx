import { setTeam, setAbout } from "../../redux/teamsSlice";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

function TeamSelector({ about }) {
  const dispatch = useDispatch();
  const teamSelected = useSelector((state) => state.teams.teamSelected);
  const options = [
    { value: "teamA", label: "Team A" },
    { value: "teamB", label: "Team B" },
  ];
  const handleOnChange = (o) => {
    dispatch(setTeam(o.value));
  };
  return (
    <div className="select" onClick={() => about && dispatch(setAbout())}>
      <label>Select Team:</label>
      <Select
        options={options}
        placeholder={teamSelected === "teamA" ? "Team A" : "Team B"}
        onChange={handleOnChange}
        className="w150px"
      />
    </div>
  );
}

export default TeamSelector;
