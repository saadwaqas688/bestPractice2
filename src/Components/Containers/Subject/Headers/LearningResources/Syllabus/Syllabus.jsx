import * as React from "react";
import Divider from "@mui/material/Divider";
import Stack from "../../../../../UI/Stack/Stack";
import Typography from "../../../../../UI/Typography/TypographyCompo";
import ToolTip from "../../../../../UI/Tooltip/ToolTip";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HighlightSvg from "../../../icons/HighlightSvg";
import CommentSvg from "../../../icons/CommentSvg";
import PrintSvg from "../../../icons/PrintOutSvg";
import { useParams } from "react-router-dom";
import capitalize from "../../../../../../helpers/capitalize";
import { subjectActions } from "../../../../../../redux/reducers/subject";
import { useDispatch, useSelector } from "react-redux";
import constants from "../../../../../../config/constants";
import {
  StackWrapper,
  HeaderButton,
  ExpandButton,
  HeaderDiv,
} from "./Syllabus.style";

const Header = ({ handlePrint }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const allExpanded = useSelector((state) => state.subject.unitsValue);
  const expandHandler = () => {
    dispatch(subjectActions.accordianExpandHandler());
  };
  const { syllabus } = constants.learningResources;

  return (
    <StackWrapper>
      <Typography sx={{ fontWeight: "600" }}>
        {capitalize(params.name)} {syllabus.syllabus} ({allExpanded} Units)
      </Typography>
      <Divider light style={{ marginBottom: "-12px" }} />
      <HeaderDiv>
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 2, md: 3 }}
          divider={
            <Divider
              orientation="vertical"
              variant="string"
              flexItem
              style={{ marginBottom: "16px", marginTop: "16px" }}
            />
          }
        >
          <ToolTip title={syllabus.highlightTooltip}>
            <HeaderButton variant="text" startIcon={<HighlightSvg />}>
              {constants.HighlightText}
            </HeaderButton>
          </ToolTip>
          <ToolTip title={syllabus.commentTooltip}>
            <HeaderButton variant="text" startIcon={<CommentSvg />}>
              {constants.CommentText}
            </HeaderButton>
          </ToolTip>
          <ToolTip title={syllabus.downloadTooltip}>
            <HeaderButton
              variant="text"
              onClick={handlePrint}
              startIcon={<PrintSvg />}
            >
              {constants.Download}
            </HeaderButton>
          </ToolTip>
          <ToolTip title={syllabus.printTooltip}>
            <HeaderButton
              variant="text"
              onClick={handlePrint}
              startIcon={<PrintSvg />}
            >
              {constants.Print}
            </HeaderButton>
          </ToolTip>
        </Stack>
        <ExpandButton
          variant="text"
          onClick={expandHandler}
          endIcon={<KeyboardArrowDownIcon sx={{ transform: "scale(1.3)" }} />}
        >
          {constants.ExpandAllUnits}
        </ExpandButton>
      </HeaderDiv>
      <Divider light style={{ marginTop: "2px" }} />
    </StackWrapper>
  );
};

export default Header;
