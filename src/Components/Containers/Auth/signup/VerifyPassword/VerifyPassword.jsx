import React, { useEffect } from "react";
import verifyPass from "../../../../../assets/images/auth/verify_password.png";
import Logo from "../../../../../assets/images/auth/logo.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import constants from "../../../../../config/constants";
import {
  LinkResetImage,
  LogoImage,
  SignupAccoutn,
  Wrapper,
} from "./VerifyPassword.style";

const VerifyPassword = () => {
  let navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const backToSignInHandler = () => {
    navigate("/");
  };
  return (
    <Wrapper>
      <LogoImage src={Logo} alt="logo_image" />

      <LinkResetImage src={verifyPass} alt="logo_image_link" />
      <SignupAccoutn>
        <span style={{ opacity: "0.6" }}>{constants.BackTo}</span>
        <Button
          variant="text"
          sx={{ color: "#624BA2", textTransform: "capitalize" }}
          onClick={backToSignInHandler}
        >
          {constants.SignIn}
        </Button>
      </SignupAccoutn>
    </Wrapper>
  );
};

export default VerifyPassword;
