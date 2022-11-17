import { styled } from "@mui/system";
import Button from "../../../../../UI/Button/ButtonComp";
import Stack from "./../../../../../UI/Stack/Stack";
import palette from "./../../../../../../config/palette";

export const StackWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

export const HeaderButton = styled(Button)(({ theme, isActive }) => ({
  textTransform: "capitalize",
  color: isActive ? "white" : palette.colors.unselected,
  cursor: "pointer",
  background: isActive ? palette.colors.primaryModified : "white",
  paddingTop: "0.2rem",
  paddingBottom: "0.2rem",
  "&:hover": {
    color: isActive ? "white" : "black",
    background: isActive
      ? palette.colors.primaryModified
      : palette.colors.selectedColor,
  },
}));
export const ExpandButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  float: "left",
  background: "white",
  color: "black",
  "&:hover": {
    color: palette.colors.primaryModified,
    background: palette.colors.selectedColor,
  },
}));
export const HeaderDiv = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const SearchDiv = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: " space-between",
  alignItems: "flex-end",
  marginTop: "-20px !important",
  position: "relative",
}));
export const TagsDiv = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("lg")]: {
    flexWrap: "wrap-reverse",
    margin: "10px",
  },
}));

export const TagsButton = styled(Button)(({ theme, isselected }) => ({
  textTransform: "capitalize",
  color: isselected ? "white" : palette.colors.unselected,
  backgroundColor: isselected
    ? palette.colors.primaryModified
    : palette.colors.lightColor,
  borderRadius: "50px",
  marginRight: "0.4rem",
  marginLeft: "0.4rem",
  paddingTop: "0.2rem",
  paddingBottom: "0.2rem",
  "&:hover": {
    color: "unselected",
    backgroundColor: isselected
      ? palette.colors.primaryModified
      : palette.colors.lightColor,
  },
  // "&:focus": {
  //   color: "white",
  //   backgroundColor: palette.colors.primaryModified,
  // },
  [theme.breakpoints.down("lg")]: {
    margin: theme.spacing(0.5),
  },
}));
export const PhysicsImgae = styled("img")(({ theme }) => ({
  width: "16rem",
  height: "auto",
}));
