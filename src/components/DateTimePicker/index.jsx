import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { get } from "react-hook-form";

const DateTimePickerComponent = ({
  hookForm: {
    register,
    watch,
    setValue,
    formState: { errors, touchedFields },
  },
  label,
  name,
  required,
  ...dateTimePickerProps
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        id={name}
        value={watch(name)}
        onChange={(newValue) => {
          setValue(name, newValue, { shouldValidate: true });
        }}
        renderInput={(props) => (
          <TextField
            size="small"
            fullWidth
            error={get(errors, name)}
            helperText={_.get(get(errors, name), "message", "")}
            required={required}
            label={label}
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "30px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
            {...props}
          />
        )}
        inputFormat="dd/MM/yyyy HH:mm"
        disableMaskedInput={false}
        {...dateTimePickerProps}
      />
    </LocalizationProvider>
  );
};

export default DateTimePickerComponent;
