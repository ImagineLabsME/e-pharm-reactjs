import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useCities from "../../../hooks/useCities";

const SelectCities = ({
  language,
  location,
  handleInputChange,
  locationError,
}) => {
  const cities = useCities();

  return (
    cities.length !== 0 && (
      <Autocomplete
        id="select-cities-field"
        value={location}
        onChange={(event, newValue) => {
          handleInputChange(newValue);
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        options={cities.map((city) =>
          language === "AR" ? city.NAME : city.NAME_EN
        )}
        className={locationError ? "select-cities-field-error" : ""}
        renderInput={(params) => <TextField {...params} />}
      />
    )
  );
};

export default SelectCities;
