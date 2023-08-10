import Select from "react-select";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setField } from "../../redux/teamsSlice";
import field1 from "../../assets/img/pitch1.png";
import field2 from "../../assets/img/pitch2.png";
import field3 from "../../assets/img/pitch3.png";
function FieldSelector() {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState({
    value: "1",
    label: "Field #1",
    image: field1,
  });
  const options = [
    { value: "1", label: "Field #1", image: field1 },
    { value: "2", label: "Field #2", image: field2 },
    { value: "3", label: "Field #3", image: field3 },
  ];
  const formatOptionLabel = (option) => {
    return (
      <div className="option">
        <img src={option.image} alt={option.label} className="option-image" />
        <p className="option-text">{option.label}</p>
      </div>
    );
  };
  const handleChange = (o) => {
    setSelectedOption(o);
    dispatch(setField(o.value));
  };
  return (
    <div className="select">
      <label>Select a field:</label>
      <Select
        defaultValue={selectedOption}
        options={options}
        onChange={handleChange}
        formatOptionLabel={formatOptionLabel}
        className="react-select__control react-select__option"
      />
    </div>
  );
}

export default FieldSelector;