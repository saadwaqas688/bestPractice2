import React, { useEffect } from "react";
import SecondaryAccordion from "../../../../../../UI/Accordian/SecondaryAccordion/SecondaryAccordian";
import Stack from "../../../../../../UI/Stack/Stack";
import TextEditorRenderOutput from "../../../../../../UI/TextEditorRenderOutput/TextEditorRenderOutput";
import { Utility_MarginTop_16_px } from "../../../../../../../utilitystyles/TopMarginStyleForEditorOutput";
import TextSelectionComp from "../../../../../../UI/TextSelection/TextSelectionComp";
import { Provider, useDispatch, useSelector } from "react-redux";
import { subjectActions } from "../../../../../../../redux/reducers/subject";
import { generateCompletedLabel } from "./SyllabusAccordions";
import Checkbox from "../../../../../../UI/Checkbox/Checkbox";
import { learningObjectivesCompletedActions } from "../../../../../../../redux/reducers/learningObjectivesCompleted";
import api from "../../../../../../../Services";
import colorsObj from "../../../../../../../config/palette";
import ReactDOM from "react-dom";
import TextComp from "../Notes/TextComp";
import store from "../../../../../../../redux/store";
import SingeCommentSVG from "../Notes/icons/SingeCommentSVG";
import { IconButtonWrapper } from "../Notes/TextComp.style";
import MulitipleCommentsSVG from "../Notes/icons/MulitipleCommentsSVG";
import Alert from "../../../../../../UI/Alert/Alert";
import Loader from "../../../../../../UI/Loader/Loader";
import { Oval } from "react-loader-spinner";
import { useSnackbar } from "notistack";

const IndividualLearningObjective = ({ index, objective }) => {
  //
  // waqas highlighting and commenting
  //
  const { enqueueSnackbar } = useSnackbar();
  const [showIcons, setShowIcons] = React.useState(false);
  const [highlightContent, setHighlightContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [commentsOnNotes, setCommentsOnNotes] = React.useState([]);
  const [noteError, setNoteError] = React.useState(false);
  const [loading, setLoading] = React.useState({
    value: false,
  });
  const handleChangeLoading = (value) =>
    setLoading((prevState) => ({ ...prevState, value }));
  //
  // waqas highlighting and commenting
  //

  const dispatch = useDispatch();
  const isCompleted = useSelector(
    (state) =>
      state?.learningObjectivesCompleted?.learningObjectivesCompleted?.find(
        (el) => el.id === objective.id
      )?.checked
  );

  //
  // waqas highlighting and commenting
  //
  const updateHighlightedNotesApi = async () => {
    setIsLoading(true);
    try {
      let payload = {
        id: highlightContent.id,
        chapterId: objective.chapterId,
        content: document.getElementById(objective.id).innerHTML,
        loId: objective.id,
      };
      const result = await api.updateHighlightedNote(payload);
      const { error } = result;

      if (error) {
        throw new Error(result.error);
      } else {
        setHighlightContent(payload);
        setNoteError(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error in updateHighlightedNotesApi", error);

      setNoteError(true);
      setIsLoading(false);
    }
  };

  const addHighlightedNotesApi = async () => {
    setIsLoading(true);
    try {
      let payload = {
        chapterId: objective.chapterId,
        content: document.getElementById(objective.id).innerHTML,
        loId: objective.id,
      };
      const result = await api.addHighlightedNotes(payload);
      const { error } = result;

      if (error) {
        throw new Error(result.error);
      } else {
        setHighlightContent(result.data);
        setNoteError(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error in add highlighted notes", error);
      setNoteError(true);
      setIsLoading(false);
    }
  };

  const addComment = async (payload) => {
    console.log("payload in add commment", payload);
    setIsLoading(true);
    try {
      const result = await api.addComment(payload);
      console.log("result of addComment", result);
      const { error } = result;
      if (error) {
        throw new Error(result.error);
      } else {
        setCommentsOnNotes([...commentsOnNotes, result.data]);
        setNoteError(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error in addComment api", error);

      setNoteError(true);
      setIsLoading(false);
    }
  };

  function converter(data) {
    let newData = data;

    if (highlightContent) {
      if (highlightContent.loId === objective.id) {
        const temp = JSON.parse(data);

        temp.html = [highlightContent.content];

        newData = JSON.stringify(temp);
      }
    }
    return newData;
  }

  const sideEffectsOfHighlighting = () => {
    // dispatch(learningResourcesHighlightActions.toggleHighlightState());
    commentsOnNotes.length > 0 &&
      commentsOnNotes.forEach((ele) => {
        ReactDOM.unmountComponentAtNode(document.getElementById(ele.commentId));
      });

    if (highlightContent) {
      updateHighlightedNotesApi();
      return;
    } else {
      addHighlightedNotesApi();
    }
  };

  const sideEffectsOfCommenting = (data) => {
    commentsOnNotes.length > 0 &&
      commentsOnNotes.forEach((ele) => {
        ReactDOM.unmountComponentAtNode(document.getElementById(ele.commentId));
      });
    const payload = {
      chapterId: objective.chapterId,
      loId: objective.id,
      content: data.comment,
      commentId: data.commentId,
    };
    sideEffectsOfHighlighting();
    addComment(payload);
  };

  function handleClick(id) {
    const commentObj = commentsOnNotes?.find((ele) => ele.commentId === id);

    const child = document.getElementById(id).firstChild;
    if (child) {
      ReactDOM.unmountComponentAtNode(document.getElementById(id));
    } else {
      ReactDOM.render(
        <Provider store={store}>
          <TextComp
            value={commentObj.content}
            commentId={id}
            loId={commentObj.loId}
            deleteComment={deleteComment}
          />
        </Provider>,
        document.getElementById(id)
      );
    }
  }

  const getHighlightedNotesApi = async () => {
    setIsLoading(true);
    try {
      const result = await api.getHighlightedNotes(
        objective.id,
        "learnobjective"
      );
      const { error } = result;

      if (error) {
        throw new Error(result.error);
      } else {
        setHighlightContent(result.data[0]);
        setNoteError(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error in getHighlightedNotesApi", error);

      setNoteError(true);
      setIsLoading(false);
    }
  };

  const getCommentsApi = async () => {
    setIsLoading(true);
    try {
      let library = false;

      const result = await api.getComments(
        objective.id,
        "learnobjective",
        library
      );
      const { error } = result;

      if (error) {
        throw new Error(result.error);
      } else {
        setCommentsOnNotes(result.data);
        setNoteError(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error in getcommentsApi", error);
      setNoteError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHighlightedNotesApi();
    getCommentsApi();
  }, []);

  const deleteComment = async (commentId) => {
    setIsLoading(true);
    try {
      const result = await api.deleteComment(commentId, "comment");

      const { error } = result;

      if (error) {
        throw new Error(result.error);
      } else {
        setIsLoading(false);

        document.getElementById(commentId).remove();

        let temp = commentsOnNotes.filter((ele) => ele.commentId !== commentId);

        setCommentsOnNotes(temp);
        setNoteError(false);
      }
    } catch (error) {
      console.log("error in deleteComment", error);
      setNoteError(true);
      setIsLoading(false);
    }
  };

  //
  // waqas highlighting and commenting
  //

  const callApiLearningObjectivesCompleted = async (status, id) => {
    const token = localStorage.getItem("auth");
    const response = await api.postLearningObjective(
      { value: status, id },
      token
    );
    return response;
  };

  const handleGoodResponse = (data) => {
    console.log({ data });
    const { completed, loId } = data;
    dispatch(
      learningObjectivesCompletedActions.toggleSpecificLearningObjectiveState({
        id: loId,
        value: completed,
      })
    );
  };

  const checkedLearningObjectivesBadResponse = (err) => {
    handleChangeLoading(false);
    console.error(err);
    enqueueSnackbar(
      "Error! Please check your internet connection and try again or contact administrator",
      {
        variant: "error",
        autoHideDuration: 3000,
      }
    );
    throw Error("Bad response recieved!");
  };

  const handleCheckedLearningObjective = (isChecked) => {
    const { id } = objective;
    handleChangeLoading(true);
    if (typeof isChecked !== "boolean") {
      throw Error('Type of "isChecked" parameter should be boolean');
    }
    // perform api call here
    callApiLearningObjectivesCompleted(isChecked, id)
      .then((el) => {
        if (el.error) {
          checkedLearningObjectivesBadResponse(el.response);
        }
        handleChangeLoading(false);
        handleGoodResponse(el.data);
      })
      .catch((err) => {
        checkedLearningObjectivesBadResponse(err);
      });
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexGrow: 1 }} key={index}>
        <Utility_MarginTop_16_px style={{ userSelect: "none" }}>
          {index + 1}. &nbsp;
        </Utility_MarginTop_16_px>
        {isLoading ? (
          <Loader />
        ) : noteError ? (
          <Alert message={"Error Occured !"} severity={"error"} />
        ) : (
          <TextSelectionComp
            sideEffectsOfCommenting={sideEffectsOfCommenting}
            sideEffectsOfHighlighting={sideEffectsOfHighlighting}
            isHighlightingActive={true}
          >
            <TextEditorRenderOutput
              data={converter(objective.title)}
              noteId={objective.id}
            />
          </TextSelectionComp>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-between",
        }}
      >
        <div style={{ padding: loading.value ? "6px" : "" }}>
          {loading.value ? (
            <Oval
              height={19}
              width={19}
              color="#e015a2"
              secondaryColor="rgb(235, 87, 159)"
            />
          ) : (
            <Checkbox
              checked={isCompleted}
              setChecked={handleCheckedLearningObjective}
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {commentsOnNotes?.length === 0 ? null : (
            <IconButtonWrapper
              style={{
                marginBottom: "0px",
                padding: "10px 0px 10px 0px",
              }}
              aria-label="delete"
              size="small"
              onClick={() => setShowIcons(!showIcons)}
            >
              <MulitipleCommentsSVG />
            </IconButtonWrapper>
          )}

          {showIcons &&
            commentsOnNotes.map((ele) => {
              return (
                <IconButtonWrapper
                  style={{
                    padding: "2px 0px 0px 0px",
                  }}
                  aria-label="delete"
                  size="small"
                  onClick={() => handleClick(ele.commentId)}
                >
                  <SingeCommentSVG />
                </IconButtonWrapper>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const LearningObjectiveController = ({ learningObjectives }) => {
  return (
    <Stack style={{ paddingLeft: "1.4rem" }}>
      {learningObjectives.map((objective, index) => (
        <IndividualLearningObjective
          index={index}
          objective={objective}
          learningObjectives={learningObjectives}
        />
      ))}
    </Stack>
  );
};

const PrimarySyllabus = ({ chapters, ...props }) => {
  const { hasUnits } = props;
  const allExpanded = useSelector((state) => state.subject.expandAccordian);
  const dispatch = useDispatch();
  const learningObjectivesCompletedStatus = useSelector(
    (state) => state.learningObjectivesCompleted.learningObjectivesCompleted
  );
  const [controller, setController] = React.useState([]);
  React.useEffect(() => {
    const updatedController = updateCompletedChapters();
    setController(updatedController);
  }, [learningObjectivesCompletedStatus]);

  const updateCompletedChapters = () => {
    let temp = [...controller];
    let tempLearningObjCompleted = [...learningObjectivesCompletedStatus];
    temp.map((eachObj) => {
      const filteredLearningObjectivesCompleted =
        tempLearningObjCompleted.filter(
          (each) => each.chapterId === eachObj.chapterId
        );
      let [completed, total] = eachObj.description.split("/");
      completed = filteredLearningObjectivesCompleted.filter(
        (el) => el.checked
      )?.length;
      eachObj.description = [completed, total].join("/");
      return eachObj;
    });

    return temp;
  };

  React.useEffect(() => {
    if (hasUnits) {
      let temp = chapters.map((chapter, index) => {
        const filteredObjectivesCompleted =
          learningObjectivesCompletedStatus.filter(
            (each) => each.chapterId === chapter.id
          );
        const completed = filteredObjectivesCompleted.filter(
          (el) => el.checked
        )?.length;
        return {
          heading: chapter.title,
          description:
            chapter.learningObjectives &&
            generateCompletedLabel(
              completed,
              chapter.learningObjectives.length
            ),
          content: (
            <LearningObjectiveController
              learningObjectives={chapter.learningObjectives}
            />
          ),
          id: index,
          chapterId: chapter.id,
        };
      });
      setController(temp);
    }
  }, [chapters]);

  if (hasUnits) {
    return (
      <>
        {controller.length > 0 ? (
          <SecondaryAccordion
            expandAll={allExpanded}
            toggleExpandAllOff={(e) =>
              dispatch(subjectActions.stopExpandAccordion())
            }
            controller={controller}
          />
        ) : (
          "No Chapters Found"
        )}
      </>
    );
  }

  if (!hasUnits) {
    return (
      <>
        {chapters && chapters.length > 0 ? (
          <LearningObjectiveController learningObjectives={chapters} />
        ) : (
          "No Learning Objective Found"
        )}
      </>
    );
  }
};

export default PrimarySyllabus;
