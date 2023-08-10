import { useState } from "react";
import { setTeam } from "../../redux/teamsSlice";
import { useDispatch } from "react-redux";
import Select from "react-select";

function TeamSelector() {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("Team A");
  const options = [
    { value: "teamA", label: "Team A" },
    { value: "teamB", label: "Team B" },
  ];
  const handleOnChange = (o) => {
    setSelectedOption(o.label);
    dispatch(setTeam(o.value));
  };
  return (
    <div className="select">
      <label>Select a Team:</label>
      <Select
        options={options}
        placeholder={selectedOption}
        onChange={handleOnChange}
        className="w150px"
      />
    </div>
  );
}

export default TeamSelector;
