import React from "react";
import Divider from "@mui/material/Divider";
import { StackWrapper, ColDiv } from "./FlashCardView.style";
import Pallete from "./../../../config/palette.js";
import TypographyCompo from "./../Typography/TypographyCompo";
import StackCompo from "./../Stack/Stack";

// remaining,notLearned, knownWell, notSure
const StackNumbers = ({remaining,notLearned, knownWell, notSure}) => {
  return (
    <StackWrapper>
      <StackCompo
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <ColDiv>
          <TypographyCompo
            variant="h6"
            sx={{ color: Pallete.colors.unselected, weight: 900 }}
          >
            {remaining}
          </TypographyCompo>
          <TypographyCompo sx={{ color: Pallete.colors.unselected }}>
            Remaining
          </TypographyCompo>
        </ColDiv>
        <ColDiv>
          <TypographyCompo
            variant="h6"
            sx={{ color: Pallete.colors.secondaryModified }}
          >
            <strong>{notLearned}</strong>
          </TypographyCompo>
          <TypographyCompo sx={{ color: Pallete.colors.unselected }}>
            Not Learned
          </TypographyCompo>
        </ColDiv>
        <ColDiv>
          <TypographyCompo
            variant="h6"
            sx={{ color: Pallete.colors.aquaColor }}
          >
            {knownWell}
          </TypographyCompo>
          <TypographyCompo sx={{ color: Pallete.colors.unselected }}>
            Known Well
          </TypographyCompo>
        </ColDiv>
        <ColDiv>
          <TypographyCompo
            variant="h6"
            sx={{ color: Pallete.colors.lightOrange }}
          >
            {notSure}
          </TypographyCompo>
          <TypographyCompo sx={{ color: Pallete.colors.unselected }}>
            Not Sure
          </TypographyCompo>
        </ColDiv>
      </StackCompo>
    </StackWrapper>
  );
};

export default StackNumbers;
