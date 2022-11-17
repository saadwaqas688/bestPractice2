import React from "react";
import {
  Wrapper,
  DashboardIconWrapper,
  Image,
  HelpImage,
} from "./Sidebar.style";
import Stack from "../../../UI/Stack/Stack";
import logo from "../../../../assets/images/logo/octilear_MainLogo.png";
import * as DrawerComps from "./icons";
import IconButton from "./../../../UI/IconButton/IconButton";
import { useNavigate } from "react-router-dom";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

const Sidebar = ({ drawerwidth }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = React.useState({
    dashboard: false,
    message: false,
    settings: false,
    doubleArrows: false,
  });
  const enterHoverHandler = (e) => {
    let temp = { ...hovered };
    temp[e.currentTarget.getAttribute("id")] = true;
    setHovered(temp);
  };
  const leaveHoverHandler = (e) => {
    let temp = { ...hovered };
    temp[e.currentTarget.getAttribute("id")] = false;
    setHovered(temp);
  };
  return (
    <Wrapper drawerwidth={drawerwidth}>
      <Stack space={0} alignItems="center" sx={{ pt: "52px" }}>
        <Image src={logo} alt="logo" />

        <DashboardIconWrapper
          onMouseOut={leaveHoverHandler}
          onMouseOver={enterHoverHandler}
          id="dashboard"
        >
          <IconButton onClick={(e) => navigate("/dashboard")}>
            <DrawerComps.DashboardIcon focused={hovered.dashboard} />
          </IconButton>
        </DashboardIconWrapper>
        <div
          style={{ cursor: "pointer" }}
          onMouseOut={leaveHoverHandler}
          onMouseOver={enterHoverHandler}
          id="message"
        >
          <a
            href="https://octilearn.notion.site/Help-Center-64f410809b3847dab36c8d36af98a6e3"
            style={{ textDecoration: "none" }}
          >
            {/* <DrawerComps.MessageIcon focused={hovered.message} /> */}
            <HelpImage>
              <HelpRoundedIcon fontSize="small" />
            </HelpImage>
          </a>
        </div>
      </Stack>
    </Wrapper>
  );
};

export default Sidebar;
