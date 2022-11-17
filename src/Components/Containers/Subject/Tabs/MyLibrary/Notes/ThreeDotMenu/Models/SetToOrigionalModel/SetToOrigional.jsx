import React from "react";
import {
  DeleteWrapper,
  CancelDeleteWrapper,
  Typorgraphy,
  ButtonTypo,
  NoteIconButton,
} from "./../DeleteModal/DeleteModel.style.js";

import palette from "./../../../../../../../../../config/palette.js";
import ButtonCompo from "./../../../../../../../../UI/Button/ButtonComp";
import NotesSvg from "./../../icons/NotesSvg";
const SetToOrigional = ({ handleResetNotes, setOpen }) => {
  const deleteHandler = () => {
    handleResetNotes();
    setOpen(false);
  };
  return (
    <div>
      <DeleteWrapper>
        <NoteIconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <NotesSvg
            color={palette.colors.secondaryModified}
            width="20"
            height="20"
          />
        </NoteIconButton>
        <Typorgraphy>
          <strong>Are you sure you want to Set all Notes to origional?</strong>
        </Typorgraphy>
        <Typorgraphy color={palette.colors.unselected}>
          <i>You will lose your editing on these selected notes, if any </i>
        </Typorgraphy>
        <CancelDeleteWrapper>
          <ButtonTypo
            variant="text"
            size="small"
            color1={palette.colors.unselected}
            onClick={() => setOpen(false)}
          >
            Cancel
          </ButtonTypo>
          <ButtonCompo size="small" onClick={deleteHandler}>
            Delete
          </ButtonCompo>
        </CancelDeleteWrapper>
      </DeleteWrapper>
    </div>
  );
};

export default SetToOrigional;
