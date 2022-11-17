import React, { useState } from "react";
import Typography from "../../UI/Typography/TypographyCompo";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import Separator from "./icons/BreadCrumpSeparator";
import capitalize from "../../../helpers/capitalize";
import constants from "./../../../config/constants";
import { useSelector, useDispatch } from "react-redux";
import { breadCrumbStatsActions } from './../../../redux/reducers/breadCrumbStats';


const BreadCrumb = ({ baseVeiw }) => {
  const { name, id } = useParams();

  const dispatch = useDispatch();
  const breadCrumbHandler = () => {
    dispatch(breadCrumbStatsActions.visitMyLibFlashCardStat());
  };
  return (
    <div role="presentation">
      <Breadcrumbs
        color="#ADB4C5"
        aria-label="breadcrumb"
        separator={<Separator />}
      >
        <Typography variant="body2">{constants.courses}</Typography>
        {/* <> */}
          {/* {baseVeiw ? ( */}
            <Link to="/dashboard" style={{ color: "#ADB4C5", font: "6px" }}>
              <Typography variant="body2">{capitalize(name)}</Typography>
            </Link>
          {/* ) : ( */}
            {/* <Typography variant="body2">{capitalize(name)}</Typography> */}
          {/* )} */}
        {/* </> */}
        {/* {!baseVeiw ? (
          // <Link to="/dashboard" style={{ color: "#ADB4C5", font: "6px" }}>
          <div onClick={breadCrumbHandler} style={{cursor:"pointer", textDecoration: "underline"}}>
            <Typography variant="body2">All My Saved Flashcards</Typography>
          </div>
        ) : // </Link>
        null} */}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumb;
