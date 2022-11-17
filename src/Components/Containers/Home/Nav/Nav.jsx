import React from "react";
import Stack from "../../../UI/Stack/Stack";
import * as Icons from "./icons";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../../redux/reducers/auth.js";
import api from "./../../../../Services";
import { Link } from "react-router-dom";
import defaultImg from "./../../../../assets/images/user/default.png";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  StyledNav,
  NavContent,
  Img,
  UserName,
  UserCategory,
  ImgContainer,
  StackWrapper,
  IconButtonWrapper,
} from "./Nav.style";
import Loader from "./../../../UI/Loader/Loader";
import { userActions } from "../../../../redux/reducers/user";
import ToolTip from "./../../../UI/Tooltip/ToolTip";

const Nav = ({ appbarheight }) => {
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(authActions.loginHandler({ loggedIn: "false" }));
    dispatch(userActions.logOutHandler());
    localStorage.removeItem("auth");
  };

  const userData = useSelector((state) => state.user);

  const [loading, setLoading] = React.useState(false);

  const fullUserNameCallFromDB = async (token) => {
    let temp = await api.getUser(token);
    return temp;
  };
  const apiCall = async () => {
    let token = localStorage.getItem("auth");
    fullUserNameCallFromDB(token)
      .then((el) => {
        dispatch(userActions.getUserData(el.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  const loadInitialData = () => {
    apiCall();
  };
  React.useEffect(() => {
    setLoading(true);
    loadInitialData();
  }, []);
  return (
    <>
      <StyledNav appbarheight={appbarheight}>
        <NavContent
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          {/* <Stack direction="row" justifyContent="center" alignItems="center"> */}
          {/* <IconButtonWrapper>
           
              <Icons.Settings />
           
            </IconButtonWrapper> */}
          {/* </Stack> */}

          <StackWrapper
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {loading ? (
              <Loader />
            ) : (
              <ToolTip title="User Profile">
                <Link to="/user">
                  <ImgContainer>
                    <Img
                      src={userData?.img ? userData.img : defaultImg}
                      alt="user-dp"
                    />
                  </ImgContainer>
                </Link>
              </ToolTip>
            )}
            <Stack direction="row" justifyContent="center" alignItems="center">
              <UserName variant="h6">
                {userData?.fName}

                <span style={{ paddingLeft: "3px", paddingRight: "6px" }}>
                  {userData?.lName}
                </span>
              </UserName>

              <UserCategory style={{ margin: 0 }} variant="subtitle2">
                Student
              </UserCategory>
            </Stack>
            <ToolTip title="LogOut">
              <IconButtonWrapper onClick={logoutHandler}>
                <LogoutIcon />
              </IconButtonWrapper>
            </ToolTip>
          </StackWrapper>
        </NavContent>
      </StyledNav>
    </>
  );
};

export default Nav;
