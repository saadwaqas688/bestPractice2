import React from "react";
import FlashCardView from "./../../../UI/FlashCardView/FlashCardView";

const FlashcardOpen = ({ selectedStack, sideEffect, flashCardIdSideEffect, getMenuState }) => {

  return (
    <div style={{ marginTop: "-8rem" }}>
      <FlashCardView
        controllerData={selectedStack.questions}
        sideEffect={sideEffect}
        flashCardIdSideEffect ={flashCardIdSideEffect}
        getMenuState ={getMenuState}
      />
    </div>
  );
};

export default FlashcardOpen;
