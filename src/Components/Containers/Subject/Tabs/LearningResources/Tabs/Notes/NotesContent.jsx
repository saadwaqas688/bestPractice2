import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Typography from "../../../../../../UI/Typography/TypographyCompo";
import Button from "../../../../../../UI/Button/ButtonComp";
import ToolTips from "../../../../../../UI/Tooltip/ToolTip";
import Palette from "../../../../../../../config/palette.js";
import RightBarAccordian from "../../../../../../UI/RightBarAccordian/RightBarAccordian";
import capitalize from "../../../../../../../helpers/capitalize";
import MoveLibrarySvg from "../../../../LeftSideBar/Icons/MoveLibrarySvg";
import Stack from "../../../../../../UI/Stack/Stack";
import RenderNote from "./RenderNote";

const Wrapper = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  background: "white",
  width: "100%",
}));
export const MoveToLibraryButton = styled(Button)(({ theme }) => ({
  background: theme.palette.secondary.main,
  height: "40px",
  borderRadius: "10px",
  color: "white",
  "&:hover": {
    background: theme.palette.secondary.main,
  },
}));

export const MoveToLibraryButtonStyled = styled(MoveToLibraryButton)(
  ({ theme }) => ({
    alignSelf: "flex-end",
    background: "#fff",
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.light}`,
    boxShadow: "none",
    "&:hover": {
      background: "#fff",
    },
  })
);

const NotesContent = ({
  chapterId,
  selection,
  data,
  tags,
  addToLibraryHandler,
}) => {
  const [controller, setController] = useState([]);
  const buildController = (tagsArr, payload) => {
    const filteredTags = tagsArr.filter((eachTag) =>
      payload.some((eachNote) => eachNote.tagId === eachTag.id)
    );
    let tempController = filteredTags.map((each) => {
      const bodyIsFound = payload.find((el) => el.tagId === each.id);
      if (bodyIsFound) {
        return {
          title: each.title,
          content: (
            <>
              <RenderNote
                type={selection.type}
                tagId={bodyIsFound.tagId}
                noteId={bodyIsFound.id}
                snackId={bodyIsFound.snackId}
                chapterId={bodyIsFound.chapterId}
                addToLibraryHandler={addToLibraryHandler}
                data={bodyIsFound.body}
              />
            </>
          ),
        };
      }
    });
    setController([...tempController]);
  };

  useEffect(() => {
    if (tags.length > 0) {
      buildController(tags, data);
    }
  }, [selection, tags]);

  return (
    <React.Fragment>
      {selection.name !== "" && selection.name && (
        <Wrapper>
          <Stack
            direction="row"
            sx={{ width: "95%", padding: "1rem" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              {selection.name !== "" && selection.name
                ? capitalize(selection.name)
                : "Please choose a topic"}
            </Typography>
            {selection.name !== "" && selection.name && (
              <ToolTips
                backgroundColor={Palette.colors.lightColor}
                arrow={false}
                color="#E015A2"
                title="To Edit,Move to My Library "
              >
                <MoveToLibraryButton
                  onClick={(e) =>
                    addToLibraryHandler(
                      { ...selection, chapterId },
                      "full-content"
                    )
                  }
                  sx={{ float: "right" }}
                  startIcon={<MoveLibrarySvg />}
                >
                  Move to My Library
                </MoveToLibraryButton>
              </ToolTips>
            )}
          </Stack>
          {selection.name !== "" && selection.name && (
            <React.Fragment>
              {controller && controller.length > 0 && (
                <RightBarAccordian controller={controller} />
              )}
            </React.Fragment>
          )}
        </Wrapper>
      )}
    </React.Fragment>
  );
};

export default NotesContent;
