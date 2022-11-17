import React from "react";
import GridComponent from "./../../UI/Grid/Grid";
import Statistics from "./Sections/Statistics/Statistics";
import Hero from "./Sections/Hero/Hero";
import MyCourses from "./Sections/MyCourses/MyCourses";
import ContinueToLearn from "./Sections/ContinueToLearn/ContinueToLearn";

const Dashboard = () => {
  return (
    <GridComponent container spacing={3.125} sx={{ padding: "40px 30px" }}>
      <Hero />
      <Statistics />
      <MyCourses />
      <ContinueToLearn />
    </GridComponent>
  );
};

export default Dashboard;
