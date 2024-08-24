
import { Autocomplete, TextField, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const CustomAutocomplete = ({
  label,
  options,
  value,
  onChange,
  getOptionLabel = (option) => option.title,
  disableCloseOnSelect = true,
  style = { width: "80%" },
  multiple = true,
}) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      value={value}
      disableCloseOnSelect={disableCloseOnSelect}
      getOptionLabel={getOptionLabel}
      onChange={onChange}
      style={style}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {getOptionLabel(option)}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={label} />
      )}
    />
  );
};

export default CustomAutocomplete;
