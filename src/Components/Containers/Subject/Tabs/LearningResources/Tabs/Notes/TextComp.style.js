import { styled } from "@mui/system";
import BoxComp from "./../../../../../../UI/Box/Box";
import pallete from "./../../../../../../../config/palette.js";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material/Tooltip";
import Left from "./../../../../../../UI/Calender/icons/Left";

export const Stack = styled(BoxComp)(({ theme }) => ({
  // background: pallete.colors.primaryModified,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  // top: 0,
  // left: 0,
  zIndex: 1000,
}));
export const Box = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  background: '#3d2862',
  display: "flex",
  justifyContent:"space-around",
  alignItems: "center",
  borderRadius: "5px",
  padding: theme.spacing(0, 1,0,1),
height: '50px',
width: '100px'
}));

export const IconButtonWrapper = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
}));
export const CommentBox = styled("div")(({ theme, showComments }) => ({
  top: '-134px',
  position: "relative",
  height: "120px",
  width: "190px",
  border: '1px solid white',
  background: '#3d2862',
  borderRadius: "5px",
  left: "38%",
  marginBottom: theme.spacing(1.2),
  display: showComments ? "block" : "none",
  color: "white",
  padding: "2px",
  

  "&::before": {
    position: "absolute",
    content: '""',
    top: "100%",
    left: "6%",
    height:'9px',
    width:'18px',
    backgroundColor:'#3d2862',
    clipPath: 'polygon(48% 99%, 0 0, 100% 0)'
  },
}));
export const HighlightBox = styled("div")(({ theme, showHighlight }) => ({
  top: '-78px',
  // Left: 0,
  border: '1px solid white',
  position: "relative",
  height: "64px",
  width: "130px",
  background: '#3d2862',
  borderRadius: "5px",
  right: "70%",
  marginBottom: theme.spacing(1.2),
  display: showHighlight ? "block" : "none",
  padding: "2px",
  "&::before": {
    position: "absolute",
    content: '""',
    top: "100%",
    right: "10%",
    height:'9px',
    width:'19px',
    backgroundColor: '#3d2862',
    clipPath: 'polygon(48% 99%, 0 0, 100% 0)'
  },
}));
