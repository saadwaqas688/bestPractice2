import React from "react";
import Sidebar from "./../Sidebar/Sidebar";
import Nav from "./../Nav/Nav";
import { Outlet } from "react-router-dom";
import { AppContent, Main } from "./Home.style.js";

const appbarHeight = "64px";
const drawerWidth = "75px";

const Home = () => {
  return (
    <>
      <Nav appbarheight={appbarHeight} />
      <Sidebar drawerwidth={drawerWidth} />
      <AppContent
        backgroundColor={"#F8F8FC"}
        appbarheight={appbarHeight}
        drawerwidth={drawerWidth}
      >
        <Main>
          <Outlet />
        </Main>
      </AppContent>
    </>
  );
};

export default Home;
