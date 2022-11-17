import React from "react";
import TypographyCompo from "./../../../../../UI/Typography/TypographyCompo";
import GridComp from "./../../../../../UI/Grid/Grid";
import FlashcardCreate from "./../../../../../UI/FlashcardCreate/FlashcardCreate";
import { TextWrapper, DivText } from "./MyLibFlashCard.style";
import {MyLibraryFlashCardData as mockData}  from "./../../../../../../config/MockData/FlashCardData";
import FlashCardStack from "./../../../../../UI/FlashCardStack/FlashCardStack";
import {
  TypographyStarted,
  DivHeading,
  TopicTitle,
  IconTextWrapper,
  ImageDic,
} from "./../../../../../UI/FlashCard/FlashCard.style";
import StackCompo from "./../../../../../UI/Stack/Stack";
import Divider from "@mui/material/Divider";
import pallete from "./../../../../../../config/palette.js";
import DashboardSvg from "./../../../Headers/LearningResources/icons/DashboardSvg";
import IconButton from "@mui/material/IconButton";
import StarSvg from "./../../../Headers/LearningResources/icons/StarSvg";
import { useMediaQuery } from "@mui/material";

const MyLibFlashCard = ({ clicked ,MyLibraryFlashCardData, loadFlashCardStacks}) => {
  const _1000px = useMediaQuery("(min-width: 1000px)");
  const _750px = useMediaQuery("(max-width: 750px)");
  const [show, setShow] = React.useState(false);
  // const saveHandler = () => {
  //   setShow(!show);
  // };
  const eachSize = _1000px ? 4 : _750px ? 12 : 6;

  console.log('second', MyLibraryFlashCardData );

  return (
    <div>
      <TextWrapper>
        <TypographyCompo variant="body1">
          <strong> My Saved Flashcards ({MyLibraryFlashCardData.length > 0 ? MyLibraryFlashCardData.length: 0} Stacks)</strong>
        </TypographyCompo>
      </TextWrapper>
      <GridComp container spacing={3}>
        <GridComp item xs={eachSize}>
          <FlashcardCreate loadFlashCardStacks={loadFlashCardStacks}/>
        </GridComp>
        {MyLibraryFlashCardData.map((item, index) => (
          <GridComp item xs={eachSize} key={index} sx={{ padding: "1rem" }}>
            <FlashCardStack
              onClick={(e) => clicked(item)}
              key={item.index}
              paddingTop={0}
            >
              <DivText>
                <TypographyStarted variant="body2">
                  Not yet started
                </TypographyStarted>
                <StackCompo
                  direction="row"
                  divider={
                    <Divider
                      orientation="vertical"
                      flexItem
                      style={{ background: pallete.unselected }}
                    />
                  }
                >
                  <TypographyCompo variant="body2">
                    Unit No
                    {/* Unit {item.unit} */}
                  </TypographyCompo>
                  <TypographyCompo variant="body2">
                    {item.chapterName}
                  </TypographyCompo>
                </StackCompo>
              </DivText>
              <GridComp container spacing={0}>
                <GridComp item xs={6}>
                  <DivHeading style={{ height: "13.775rem" }}>
                    <div>
                      <TopicTitle
                        variant="h5"
                        sx={{ marginBottom: "0.938rem" }}
                      >
                        {item.chapterName}
                      </TopicTitle>
                      <IconTextWrapper>
                        <DashboardSvg />
                        <TypographyCompo variant="body2">
                          {item.flashcards.length} Questions
                        </TypographyCompo>
                      </IconTextWrapper>
                    </div>
                    <IconTextWrapper>
                      {/* <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        onClick={saveHandler}
                      > */}
                        <StarSvg show={true} />
                      {/* </IconButton> */}
                      <TypographyCompo variant="body2" color="#624ba2">
                        Saved
                      </TypographyCompo>
                    </IconTextWrapper>
                  </DivHeading>
                </GridComp>
                <GridComp item xs={6}>
                  <ImageDic>
                    <img src={mockData[index].image} alt="flashcardImage" />
                  </ImageDic>
                </GridComp>
              </GridComp>
            </FlashCardStack>
          </GridComp>
        ))}
      </GridComp>
    </div>
  );
};

export default MyLibFlashCard;
