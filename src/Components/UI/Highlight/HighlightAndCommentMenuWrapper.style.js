import { styled } from "@mui/system";
import  TextField from '@mui/material/TextField';


export const Input = styled(TextField)(({ theme }) => ({
    backgroundColor: "transparent",
    color:"white",

    "& .MuiOutlinedInput-root": {
        color:"white",
        padding: theme.spacing(0.5),
        
      "& fieldset": {
        borderColor: "transparent",
        color:"white",
       
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&:hover ": {
        color:"white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
      
      },
      "&.Mui-focused ": {
        color: 'white'
      
      },
    },
  }));