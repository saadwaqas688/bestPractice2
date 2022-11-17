import React, { useRef, useState, useEffect } from "react";
import LeftMenu from "../../../../LeftSideBar/LeftSide";
import BreadCrumb from "../../../../BreadCrumb";
import NotesHeader from "../../../../Headers/LearningResources/Notes/Notes";
import NotesContent from "./NotesContent";
import Grid from "../../../../../../UI/Grid/Grid";
import Card from "../../../../../../UI/Card/Card";
import { useSnackbar } from "notistack";
import api from "./../../../../../../../Services";
import capitalize from "../../../../../../../helpers/capitalize";
import Loader from "../../../../../../UI/Loader/Loader";
import isEmptyObj from "../../../../../../../helpers/objectIsEmpty";
import Alert from "./../../../../../../UI/Alert/Alert";
import ErrorBoundary from "./../../../../../../../Errors/ErrorBoundary";

const Notes = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const searchResultsListRef = useRef();
  const [allTags, setAllTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [selectedFromList, setSelectedFromList] = useState({});
  const [selectedTag, setSelectedTag] = useState({ title: "all" });
  const [chapterId, setChapterId] = useState(null);
  const [showData, setShowData] = useState(true);
  const [dataCorrespondingToSelection, setDataCorrespondingToSelection] =
    useState([]);
  const getSnackFromApi = async (id, token) => {
    let temp = await api.getSnackNotes(id, token);
    return temp;
  };

  const getChapterFromApi = async (id, token) => {
    let chapterNotes = await api.getChapterNotes(id, token);
    return chapterNotes;
  };

  const handleDataIfTrue = (payload, userSelection) => {
    setSelectedFromList(userSelection);
    setChapterId(payload.data.rows[0]?.chapterId);

    if (payload.data.count === 0) {
      return setDataCorrespondingToSelection([]);
    }
    setDataCorrespondingToSelection(payload.data.rows);
    enqueueSnackbar(
      `Selected ${capitalize(userSelection.type)}: ${capitalize(
        userSelection.name
      )}`,
      { variant: "success" }
    );
    toggleTagsHandler(selectedTag);
    return true;
  };

  const getContentHandler = (id, type, selection) => {
    setLoading(true);
    let token = localStorage.getItem("auth");
    switch (type) {
      case "snack":
        getSnackFromApi(id, token)
          .then((el) => {
            if (!el.error) {
              handleDataIfTrue(el, selection);
              setSelectedFromList(selection);
            }
            setLoading(false);
          })
          .catch((err) => console.error(err));
        break;
      case "chapter":
        getChapterFromApi(id, token)
          .then((el) => {
            if (!el.error) {
              handleDataIfTrue(el, selection);
              setSelectedFromList(selection);
            }
            setLoading(false);
          })
          .catch((err) => console.error(err));
        break;
      default:
        break;
    }
  };

  const selectFromListHandler = async (e) => {
    setShowData(false);
    const { id, type } = e;
    if (!e.nested) {
      getContentHandler(id, type, e);
    }
  };

  const handleTagSelection = (_, tag) => {
    enqueueSnackbar(`Selected ${capitalize(tag.title)}`, {
      variant: "success",
    });
    setSelectedTag(tag);
  };

  const toggleTagsHandler = (selection) => {
    if (!selection.id && selection.title === "all") {
      setFilteredTags([...allTags]);
    } else {
      let temp = allTags.filter((each) => each.id === selection.id);
      setFilteredTags(temp);
    }
    return true;
  };

  useEffect(() => {
    toggleTagsHandler(selectedTag);
  }, [selectedTag]);

  const addNoteToLibraryApiCall = async (payload) => {
    let token = localStorage.getItem("auth");
    let temp = api.addNoteToLibrary(payload, token);
    return temp;
  };

  const pushSnackToLibrary = (payload) => {
    let data = {};
    if (payload.type === "snack") {
      data.snackId = payload.id;
      data.chapterId = payload.chapterId;
    }

    if (payload.type === "chapter") {
      data.chapterId = payload.id;
    }

    if (data.snackId || data.chapterId) {
      addNoteToLibraryApiCall(data)
        .then((el) => {
          handleResponseOfLibraryPush(el);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleResponseOfLibraryPush = (res) => {
    if (res.ok) {
      enqueueSnackbar(`Content added to library successfully!`, {
        variant: "success",
      });
      return true;
    } else
      enqueueSnackbar(`Failed to add to library!`, {
        variant: "error",
      });
    return false;
  };

  const pushTagToLibrary = (payload) => {
    const { chapterId, noteId, snackId, tagId } = payload;
    addNoteToLibraryApiCall({ chapterId, noteId, snackId, tagId })
      .then((el) => {
        handleResponseOfLibraryPush(el);
      })
      .catch((err) => console.error(err));
  };

  const addToLibraryHandler = (payload, type) => {
    console.log('libarary', payload);
    console.log('libary type', type);
    switch (type) {
      case "specific-tag": {
        pushTagToLibrary(payload);
        break;
      }
      case "full-content": {
        pushSnackToLibrary(payload);
        break;
      }
    }
  };

  return (
    <div>
      <BreadCrumb />
      <NotesHeader
        allTags={allTags}
        setAllTags={setAllTags}
        activeTag={selectedTag}
        handleSelection={handleTagSelection}
        ref={searchResultsListRef}
      />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <ErrorBoundary>
            <Card nopadding={true}>
              <LeftMenu
                selectedFromList={selectedFromList}
                onListClick={selectFromListHandler}
              />
            </Card>
          </ErrorBoundary>
        </Grid>
        <Grid item xs={9}>
          <ErrorBoundary>
            {showData ? (
              <Alert
                severe="info"
                message="Click on unit or chapter to show the Notes"
              />
            ) : (
              <>
                {isEmptyObj(selectedFromList) ? null : !loading ? (
                  dataCorrespondingToSelection.length > 0 ? (
                    <Card nopadding={true}>
                      <NotesContent
                        chapterId={chapterId}
                        addToLibraryHandler={addToLibraryHandler}
                        tags={filteredTags}
                        data={dataCorrespondingToSelection}
                        selection={selectedFromList}
                        tagSelection={selectedTag}
                      />
                    </Card>
                  ) : (
                    <Alert
                      message={"No notes found against this selection!"}
                      severity={"info"}
                    />
                  )
                ) : (
                  <Loader />
                )}
              </>
            )}
          </ErrorBoundary>
        </Grid>
      </Grid>
    </div>
  );
};

export default Notes;
