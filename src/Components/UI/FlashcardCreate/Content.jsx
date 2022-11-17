import React from "react";
import Tabs from "./../Tabs/Tabs";
import Stack from "./../Stack/Stack";
import Paper from "./../Paper/Paper";
import AddFileClip from "./icons/AddFileClipSvg";
import UploadIcon from "../UploadIcon/UploadIcon";
import Chip from "./../Chip/Chip";
import CrossFile from "./icons/CrossFileSvg";
import Button from "../Button/ButtonComp";
import Question from "./Question";
import Answer from "./Answer";
import Tag from "./Tag";
import { differenceInQuartersWithOptions } from "date-fns/fp";

const TabContainer = (props) => (
  <div style={{ minHeight: "15rem" }}>{props.element}</div>
);

const Content = ({
  tags,
  sideEffects,
  selectedTag,
  question,
  getQuestionHandler,
  getAnswerHandler,
  getTagHandler,
}) => {
  return (
    <Stack sx={{ height: "100%" }}>
      <Stack sx={{ flexGrow: 1 }}>
        {question ? (
          <Tabs
            tabs={[
              {
                id: 0,
                value: "front",
                label: "Front",
                component: (
                  <TabContainer
                    element={
                      <Question
                        question={question.question}
                        getQuestionHandler={(e) => {
                          question.question = e;
                          getQuestionHandler(question);
                        }}
                      />
                    }
                  />
                ),
              },
              {
                id: 1,
                value: "back",
                label: "Back",
                component: (
                  <TabContainer
                    element={
                      <Answer
                        answer={question.answer}
                        getAnswerHandler={(e) => {
                          question.answer = e;
                          getAnswerHandler(question);
                        }}
                      />
                    }
                  />
                ),
              },
              {
                id: 2,
                value: "tag",
                label: "Tag",
                component: (
                  <TabContainer
                    element={
                      <Tag
                        tags={tags}
                        selectedTag={selectedTag}
                        getTagHandler={(e) => {
                          question.tagId = e;
                          getTagHandler(question);
                        }}
                      />
                    }
                  />
                ),
              },
            ]}
          />
        ) : null}
      </Stack>
      <Stack
        direction="row"
        sx={{ width: "100%" }}
        alignItems="center"
        justifyContent="center"
      >
        <Button
          variant="text"
          styleOverrides={{
            background: "#fff",
            color: "#ADB4C5",
          }}
        >
          Cancel
        </Button>
        <Button onClick={sideEffects}>Save</Button>
      </Stack>
    </Stack>
  );
};

export default Content;
