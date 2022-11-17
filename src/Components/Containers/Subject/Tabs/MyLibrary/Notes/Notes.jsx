import React from "react";
import BreadCrumb from "./../../../BreadCrumb";
import MyLibraryNotesHeader from "./../../../Headers/MyLibrary/Notes/Notes";
import NotesContent from "./NotesContent";
import GridComp from "./../../../../../UI/Grid/Grid";
import CardComp from "./../../../../../UI/Card/Card";
import LeftSide from "./../../../LeftSideBar/LeftSide";
import { useMediaQuery } from "@mui/material";
import api from "../../../../../../Services";
import responseFunctions from "../../../../../../helpers/createResponses";
import Loader from "../../../../../UI/Loader/Loader";
import Alert from "../../../../../UI/Alert/Alert";
import ErrorBoundary from "./../../../../../../Errors/ErrorBoundary";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const MyLibraryNotes = () => {
  const params = useParams();
  const { id } = params;
  const { enqueueSnackbar } = useSnackbar();
  const { createError, createLoading, initialError, initialLoading } =
    responseFunctions;
  // const dispatch = useDispatch();
  const noteId = useSelector((state) => state.myLibrary.notesId);
  const [course, setCourse] = React.useState({});
  const [selectedFromList, setSelectedFromList] = React.useState({});
  const [error, setError] = React.useState(initialError);
  const [loading, setLoading] = React.useState(initialLoading);
  const [initialNotes, setInitialNotes] = React.useState([]);
  const [notes, setNotes] = React.useState([]);
  const _1000px = useMediaQuery("(min-width: 1000px)");
  const _830px = useMediaQuery("(max-width: 830px)");
  const [dataType, setDataType] = React.useState("");
  const [getUnitorChapId, setGetUnitorChapId] = React.useState(null);
  const [subjectName,setSubjectName]= React.useState('');
  // const [undoApiStats, setUndoApiStats] = React.useState(false);
  // const notesIdUnitChap = useSelector((state) => state.notes.isUnitorChapter);
  // const { id, type } = notesIdUnitChap;

  // ************* single note delete start **************

  const deleteSingleNoteApi = async (id) => {
    const token = localStorage.getItem("auth");
    let temp = await api.deleteNote(id, token);
    return temp;
  };

  const handleSignleDeleteNote = (category) => {
    deleteSingleNoteApi(noteId)
      .then((el) => {
        if (!el.error) {
          enqueueSnackbar("Changes successfully made!", {
            variant: "success",
            autoHideDuration: 4000,
          });
          getNotes();
          // setSelectedFromList({})

          // setShowUpdateData(true);
        } else {
          enqueueSnackbar("Edits failed, please try again!", {
            variant: "error",
            autoHideDuration: 6000,
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(`${error} please try again!`, {
          variant: "error",
          autoHideDuration: 6000,
        });
      });
  };

  // **************** Single note delete function end ***************************

  const selectFromListHandler = (e) => {
    const { id, type, name } = e;
    setSubjectName(name)
    setGetUnitorChapId(id);
    // dispatch(notesActions.notesStats({ id, type }));
    let temp = [...initialNotes];
    let update = [];
    switch (e.type) {
      case "unit": {
        update = temp.filter((each) => each.unitId === e.id);
        break;
      }
      case "chapter": {
        update = temp.filter((each) => each.chapterId === e.id);
        break;
      }
      case "snack": {
        update = temp.filter((each) => each.snackId === e.id);
        break;
      }
      default:
        break;
    }

    
    setNotes(update);
    setSelectedFromList(e);

    switch (type) {
      case "unit":
        setDataType("unit");
        break;
      case "chapter":
        setDataType("chapter");
        break;

      default:
        break;
    }
  };

  const callResetNotesApi = async (getUnitorChapId, dataType) => {
    let token = localStorage.getItem("auth");
    let temp = await api.restNotesFromDB(token, getUnitorChapId, dataType);
    return temp;
  };

  const resetMyLibraryNotes = () => {
    callResetNotesApi(getUnitorChapId, dataType)
      .then((el) => {
        if (!el.error) {
          getNotes();
          enqueueSnackbar("Notes has been set to Origional!", {
            variant: "success",
            autoHideDuration: 4000,
          });
        } else {
          enqueueSnackbar("Reset to default failed, please try again!", {
            variant: "error",
            autoHideDuration: 6000,
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar(`${error}please try again!`, {
          variant: "error",
          autoHideDuration: 6000,
        });
      });
  };

  const fetchLibraryApi = async () => {
    let token = localStorage.getItem("auth");
    let temp = await api.fetchNotesFromLibrary(token);
    return temp;
  };

  const filterNotesThroughCourseId = (notes) => {
    const filtered = notes.filter((note) => note.courseId === +id);
    return filtered;
  };

  const getNotes = (category) => {
    setLoading(createLoading(true, "load-notes"));
    fetchLibraryApi()
      .then((el) => {
        setSelectedFromList({});
        const filterData = filterNotesThroughCourseId(el.data);
        if (!el.error) {
          if (el.data.length > 0) {
            setError(initialError);
          } else if (el.data.length === 0) {
            setError(
              createError(true, "No notes found in the library!", "info")
            );
          }

          setInitialNotes(filterData);
          if (category && category === "delete") {
            setNotes(filterData);
          }
        } else {
          setError(createError(true, "An error occured", "info"));
        }
        setLoading(createLoading(false, "load-notes"));
        setInitialNotes(filterData);
        if (category && category === "delete") {
          return filterData;
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteMyLibraryApi = async () => {
    let token = localStorage.getItem("auth");
    let temp = await api.deleteMyLibraryNotes(token, getUnitorChapId, dataType);
    return temp;
  };

  const deleteMylibraryData = () => {
    deleteMyLibraryApi()
      .then((el) => {
        if (!el.error) {
          getNotes("delete");
          setSelectedFromList({});
          enqueueSnackbar(`Notes deleted library successfully!`, {
            variant: "success",
            autoHideDuration: 4000,
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err, {
          variant: "error",
          autoHideDuration: 6000,
        });
      });
  };

  const handleDelete = () => {
    deleteMylibraryData();
  };

  const deleteSingleNote = () => {
    handleSignleDeleteNote("delete");
    getNotes();
  };
  const handleResetNotes = () => {
    resetMyLibraryNotes();
  };
  React.useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      {loading.value ? (
        <Loader />
      ) : (
        <>
          {error.value ? (
            <>
              <Alert severity={error.severity} message={error.message} />
            </>
          ) : (
            <>
              <BreadCrumb />
              <MyLibraryNotesHeader _1000px={_1000px} _830px={_830px} />
              <GridComp container spacing={2}>
                <GridComp item xs={_1000px ? 3 : _830px ? 12 : 4}>
                  <CardComp nopadding={true}>
                    <LeftSide
                      selectedFromList={selectedFromList}
                      onListClick={selectFromListHandler}
                      getCourseInfo={(e) => setCourse(e)}
                    />
                  </CardComp>
                </GridComp>
                <GridComp item xs={_1000px ? 9 : _830px ? 12 : 8}>
                  {selectedFromList.id ? (
                    <ErrorBoundary>
                      <CardComp
                        nopadding={true}
                        style={{ paddingBottom: "2rem" }}
                      >
                        <NotesContent
                        subjectName={subjectName}
                          handleResetNotes={handleResetNotes}
                          getNotes={getNotes}
                          deleteSingleNote={deleteSingleNote}
                          handleDelete={handleDelete}
                          selectedFromList={selectedFromList}
                          notes={notes}
                          // undoApiStats={undoApiStats}
                          course={course}
                        />
                      </CardComp>
                    </ErrorBoundary>
                  ) : (
                    <Alert
                      severity={"info"}
                      title={"Please select a topic"}
                      // message={"Please select a topic"}
                    />
                  )}
                </GridComp>
              </GridComp>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MyLibraryNotes;
