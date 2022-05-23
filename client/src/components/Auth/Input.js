import React from "react";
import { InputAdornment, Grid, TextField, IconButton } from "@mui/material";
import Visisblity from "@mui/icons-material/Visibility";
import VisisblityOff from "@mui/icons-material/VisibilityOff";

const Input = ({
  name,
  label,
  type,
  half,
  autoFocus,
  handleOnChange,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        type={type}
        autoFocus={autoFocus}
        required
        variant="outlined"
        fullWidth
        onChange={handleOnChange}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visisblity /> : <VisisblityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
