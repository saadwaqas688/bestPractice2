import React, {useState, useEffect} from "react";
import FlashCardBreadCrumb from "./BreadCrumbs/BreadCrumbs";
import FlashCardHeader from "../../../../Headers/LearningResources/FlashCard/FlashCard";
import LeftSide from "../../../../LeftSideBar/LeftSide";
import GridComp from "../../../../../../UI/Grid/Grid";
import CardComp from "../../../../../../UI/Card/Card";
import api from "./../../../../../../../Services";
import { useMediaQuery } from "@mui/material";
import FlashCardOpen from "./../../../../FlashcardOpen/FlashcardOpen";
import Loader from "../../../../../../UI/Loader/Loader";
import { useSnackbar } from "notistack";
import capitalize from "../../../../../../../helpers/capitalize";
import Alert from "../../../../../../UI/Alert/Alert";
import FlashcardHandler from "./FlashcardHandler";
import errorFunctions from "../../../../../../../helpers/createResponses";
import ErrorBoundary from "./../../../../../../../Errors/ErrorBoundary";
import debounce from "lodash.debounce";

const FlashCards = () => {
  const { createError, createLoading, initialError, initialLoading } =
    errorFunctions;
  const { enqueueSnackbar } = useSnackbar();
  const [allTags, setAllTags] = useState([]);
  const [baseView, setBaseView] = useState(true);
  const _1000px = useMediaQuery("(min-width: 1000px)");
  const _750px = useMediaQuery("(max-width: 750px)");
  const [selection, setSelection] = useState({});
  const [selectedTag, setSelectedTag] = useState({});
  const [flashcards, setFlashcards] = useState([]);
  const [listHandle, setListHandle] = useState({});
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(initialLoading);
  const [selectedStack, setSelectedStack] = useState({});
  const [isInLibrary, setIsInLibrary] = useState(false);
  const [showFlashcard, setShowFlashcard] = useState(true);
  // const [buttonStatus, setButttonStatu] = useState('');
  const [flashcardId, setFlashcardId] = useState(null);
  const [chapterOrSnackId, setChapterOrSnackId] = useState(null);
  const [getMenuStats, setGetMenuStats] = useState(false);
  const [flashcardStatus, setFlashcardStatus] = useState({});


  useEffect(() => {
    console.log('mmmm',flashcardStatus);
  },[flashcardStatus])

  const getFlashcardsFromApi = async ({ id, type, token }) => {
    let temp = await api.getFlashcards(id, type, token);
    return temp;
  };

  const handleFlashcardCall = (payload, criterea) => {
    const { id, type } = payload;
    const token = localStorage.getItem("auth");
    getFlashcardsFromApi({ id, type, token })
    .then((el) => {

      setLoading(initialLoading);
      if (!el.error) {
        console.log('card status', el.data);
          const {doneFlashcards, status} = el.data;
          const statusObj = {doneFlashcards : doneFlashcards, status : status}
        setFlashcardStatus(statusObj)
        if (el.data.questions.length > 0) {
          setError(initialError);
          // case if flashcards recieved
          setIsInLibrary(el.data.isInLibrary);
          const data = el.data.questions;
          let temp = [...data];
          if (criterea && criterea.title !== "all") {
            temp = data.filter((each) => each.tagId === criterea.id);
          }
          if (temp.length === 0) {
            setError(
              createError(
                true,
                "info",
                "No Question Pair against this selection!"
              )
            );
          }
          setFlashcards(temp);
          setSelection(payload);
          setBaseView(true);
        } else {
          setError(
            createError(
              true,
              "No flashcard found against this selection!",
              "info"
            )
          );
        }
      } else {
        // case if error is there
        setError(createError(true, "Unknown error occured!", "error"));
      }
    });
  };

  // const buildObj = (type, id) => {
  //   return {
  //     [type]: id,
  //   };
  // };

  const listItemClickHandler = (e, courseInfo) => {
    if (e.type === "chapter" && !e.nested) {
      setChapterOrSnackId(e.id);
    } else if (e.type === "snack") {
      setChapterOrSnackId(e.id);
    }
    setGetMenuStats(false);
    setShowFlashcard(false);
    setListHandle({ listSelection: e, courseInfo });
    // let config = {};
    // config = { ...config, ...buildObj(`${e.type}Id`, e.id) };

    if (!e.nested) {
      enqueueSnackbar(`Selected ${capitalize(e.type)}: ${capitalize(e.name)}`, {
        variant: "success",
      });
      setLoading(createLoading(true, "list-click"));
      handleFlashcardCall(e);
    }
  };

  const handleTagSelection = (e, item) => {
    enqueueSnackbar(`Selected ${capitalize(item.title)}`, {
      variant: "success",
    });

    handleFlashcardCall(selection, item);
    setLoading(createLoading(true, "tag-click"));
    setSelectedTag(item);
  };

  const flashcardSelectionHandler = (e) => {
    const stackSelection = {
      stack: selection,
      questions: flashcards,
      userSelection: e,
    };
    setSelectedStack(stackSelection);
    setBaseView(false);
  };

  const sideEffectHandler = debounce((response) => {
    flashCardButtonApiHandler(response);
  }, 2000);

  const flashCardIdSideEffect = (responseId) => {
    setFlashcardId(responseId);
  };
  const flashCardButtonApiCall = async (
    chapterOrSnackId,
    response,
    flashcardId
  ) => {
    let token = localStorage.getItem("auth");
    let temp = api.postFlashcardButtonStatus(
      token,
      chapterOrSnackId,
      response,
      flashcardId
    );
    return temp;
  };
  const flashCardButtonApiHandler = (response) => {
    flashCardButtonApiCall(chapterOrSnackId, response, flashcardId)
      .then((el) => {
        if (!el.error) {
          enqueueSnackbar(`${response} added ${el.response}`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(el.response, {
            variant: "success",
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar(error, {
          variant: "error",
        });
      });
  };

  const getMenuState = (getMenu) => {
    if (getMenu === true) {
      setGetMenuStats(getMenu);
      setBaseView(true);
    }
  };
  const left = _1000px ? 3 : _750px ? 12 : 4;
  const right = _1000px ? 9 : _750px ? 12 : 8;
  return (
    <GridComp container spacing={4}>
      <GridComp item xs={12}>
        <FlashCardBreadCrumb />
      </GridComp>
      <GridComp item container xs={12}>
        <FlashCardHeader
          activeTag={selectedTag}
          allTags={allTags}
          setAllTags={setAllTags}
          baseView={baseView}
          left={left}
          right={right}
          handleSelection={handleTagSelection}
          flashcards={flashcards}
        />
      </GridComp>
      <GridComp item xs={left}>
        <CardComp nopadding={true}>
          <LeftSide
            selectedFromList={selection}
            onListClick={(e, i) => {
              listItemClickHandler(e, i);
            }}
            getMenuStats={getMenuStats}
          />
        </CardComp>
      </GridComp>
      <GridComp item xs={right}>
        <ErrorBoundary>
          {showFlashcard ? (
            <Alert
              severe="info"
              message="Click on unit or chapter to show the Flashcards"
            />
          ) : (
            <>
              {!loading.value ? (
                <>
                  {!error.value ? (
                    <>
                      {baseView ? (
                        <>
                          {flashcards.length > 0 && (
                            <FlashcardHandler
                            flashcardStatus ={flashcardStatus}
                              course={listHandle}
                              selection={selection}
                              selectedTag={selectedTag}
                              stacksArr={[flashcards]}
                              isInLibrary={isInLibrary}
                              show={false}
                              clicked={flashcardSelectionHandler}
                              _1000px={_1000px}
                            />
                          )}
                        </>
                      ) : (
                        <FlashCardOpen
                          sideEffect={sideEffectHandler}
                          selectedStack={selectedStack}
                          flashCardIdSideEffect={flashCardIdSideEffect}
                          getMenuState={getMenuState}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <Alert
                        message={error.message}
                        severity={error.severity}
                      />
                    </>
                  )}
                </>
              ) : (
                <Loader />
              )}
            </>
          )}
        </ErrorBoundary>
      </GridComp>
    </GridComp>
  );
};

export default FlashCards;
