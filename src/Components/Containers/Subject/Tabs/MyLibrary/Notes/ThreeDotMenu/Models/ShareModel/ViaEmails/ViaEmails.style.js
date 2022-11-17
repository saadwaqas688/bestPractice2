import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import TypographyCompo from "./../../../../../../../../../UI/Typography/TypographyCompo";

export const SearchField = styled(TextField)(({ theme }) => ({
  borderRadius: "35px",
  // backgroundColor: palette.colors.lightColor,
  // width: "20.75rem",

  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      // borderColor: "white",
      borderRadius: "10px",
    },
    "&:hover fieldset": {
      // borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      // borderColor: "white",
    },
  },
}));

export const ButtonWrappeer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));
export const Typography = styled(TypographyCompo)(({ theme }) => ({
  marginTop: "10px",
}));
