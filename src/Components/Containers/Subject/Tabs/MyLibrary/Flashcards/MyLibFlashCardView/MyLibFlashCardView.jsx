import React, { useState } from "react";
import FlashCardView from "./../../../../../../UI/FlashCardView/FlashCardView";
import GridComp from "./../../../../../../UI/Grid/Grid";
import { Container, LeftGrid, RightGrid } from "./MyLibFlashCardView.style";
import IconButton from "@mui/material/IconButton";
import StarSvg from "./../../../../Headers/LearningResources/icons/StarSvg";
import TypographyCompo from "./../../../../../../UI/Typography/TypographyCompo";
import Modal from "./../../../../../../UI/Modal/Modal";
import FlashcardDeleteModel from "./FlashcardDeleteModel/FlashcardDeleteModel";

const MyLibFlashCardView = ({ controllerData }) => {
  const [show, setShow] = useState(true);
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const saveHandler = () => {
    setOpenDeleteModel(true);
    // setShow(!show);
  };

  return (
    <Container>
      <GridComp container spacing={3}>
        <GridComp item xs={2}>
          <LeftGrid>
            <TypographyCompo variant="h6">Topic Title</TypographyCompo>
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={saveHandler}
            >
              <StarSvg show={show} />
            </IconButton>
          </LeftGrid>
        </GridComp>

        <GridComp item xs={8}>
          <FlashCardView controllerData={controllerData} />
        </GridComp>
        <RightGrid item xs={2}>
          {/* hello right */}
        </RightGrid>
      </GridComp>
      <Modal open={openDeleteModel} setOpen={setOpenDeleteModel}>
        <FlashcardDeleteModel setOpen={setOpenDeleteModel} setShow={setShow} />
      </Modal>
    </Container>
  );
};

export default MyLibFlashCardView;
