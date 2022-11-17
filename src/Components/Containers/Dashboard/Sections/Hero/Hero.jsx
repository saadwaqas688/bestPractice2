import React from "react";
import heroImg from "../../../../../assets/images/dashboard/hero_image.png";
import Typography from "../../../../UI/Typography/TypographyCompo";
import Stack from "../../../../UI/Stack/Stack";
import constants from "../../../../../config/constants";
import Loader from "./../../../../UI/Loader/Loader";
import api from "./../../../../../Services";
import {
  StyledSection,
  DashboardHeroText,
  HeroImg,
  CardWrapper,
} from "./../../Dashboard.style";

const Hero = () => {
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");

  const userNameCallFromDB = async (token) => {
    let temp = await api.getUser(token);
    return temp;
  };
  const apicall = async () => {
    let token = localStorage.getItem("auth");
    userNameCallFromDB(token)
      .then((el) => {
        const { firstName, ...rest } = el.data;
        if (el.error) {
          return console.error(rest.error.message);
        }

        setName(firstName);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };
  const loadInitialData = () => {
    apicall();
  };
  React.useEffect(() => {
    setLoading(true);
    loadInitialData();
  }, []);
  return (
    <StyledSection item xs={12}>
      <CardWrapper>
        <HeroImg src={heroImg} alt="hero" />
        <Stack sx={{ pl: "137px" }} spacing={1}>
          {/* {loading ? (
            <Loader />
          ) : (
            <> */}
              <Typography variant="h6">
                {constants.dashboard.greeting} {name}
              </Typography>
              <DashboardHeroText variant="subtitle">
                {constants.dashboard.heroText}
              </DashboardHeroText>
            {/* </>
          )} */}
        </Stack>
      </CardWrapper>
    </StyledSection>
  );
};

export default Hero;
