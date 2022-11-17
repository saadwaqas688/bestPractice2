import React from "react";
import Typography from "././../../../../../UI/Typography/TypographyCompo";
import Stack from "././../../../../../UI/Stack/Stack";
import { styled } from "@mui/system";
import ClickAwayListener from "react-click-away-listener";
import Delete from "./../icons/Delete";
import Share from "./../icons/Share";
import SetToOriginal from "./../icons/SetToOriginal";
import ThreeDotMenu from "./../../../Tabs/MyLibrary/Notes/ThreeDotMenu/ThreeDotMenu";
import NoteContent from "./NoteContent";
// import { useDispatch, useSelector } from "react-redux";

const spacing = "17px 24px";

const Wrapper = styled(Stack)(({ theme }) => ({}));

const HeaderContainer = styled(Stack)(({ theme }) => ({
  padding: spacing,
}));

const defaultUnit = {
  id: "",
  name: "",
};

const NotesContent = ({
  subjectName,
  handleResetNotes,
  getNotes,
  deleteSingleNote,
  selectedFromList,
  handleDelete,
  notes,
  course,
  recieveEditsHandler,
}) => {
  // const dispatch = useDispatch();
  const [unit, setUnit] = React.useState(defaultUnit);
  const [datalength, setDataLength] = React.useState([])
  const findObjectAgainstID = (id, array) => {
    return array.find((el) => el.id === id);
  };

  const buildUnitPayload = (base, acc) => {
    base.id = acc.id;
    base.name = acc.name;
    return base;
  };

  const getUnitForSelection = (selection, course) => {
    let payload = defaultUnit;
    switch (selection.type) {
      case "unit":
        payload = buildUnitPayload({}, selection);
        break;
      case "chapter":
        const getChapter = findObjectAgainstID(
          selection.id,
          course.data.chapters
        );
        if (getChapter) {
          const retrievedUnit = findObjectAgainstID(
            getChapter.unitId,
            course.data.units
          );
          payload = {
            id: retrievedUnit.id,
            name: retrievedUnit.title,
          };
        }
        break;
      case "snack":
        const getSnack = findObjectAgainstID(selection.id, course.data.snacks);
        const getChapterFromSnack = findObjectAgainstID(
          getSnack.chapterId,
          course.data.chapters
        );

        const getUnitFromChapter = findObjectAgainstID(
          getChapterFromSnack.unitId,
          course.data.units
        );

        payload = {
          id: getUnitFromChapter.id,
          name: getUnitFromChapter.title,
        };
        break;
      default:
        break;
    }
    setUnit(payload);
  };
  React.useEffect(() => {
    if (course.data.haveUnits) {
      getUnitForSelection(selectedFromList, course);
    }
  }, [selectedFromList, course]);

  // const [showMenu, setShowMenu] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  const clickThreeDotsHandler = (e) => {
    // setShowMenu((prevState) => !prevState);
  };
  const menuArr = [
    { name: "Share", icon: <Share /> },
    { name: "Delete", icon: <Delete /> },
    { name: "Set To Original", icon: <SetToOriginal /> },
  ];
  const selectOptionHandler = (option) => {
    // setShowMenu(false);
    setSelected(option);
    // setOpenModal(true);
  };
  // const [openModal, setOpenModal] = React.useState(false);
  return (
    <React.Fragment>
      <Wrapper>
        <HeaderContainer direction="row" justifyContent="space-between">
          <Typography
            variant="h5"
            style={{ color: "#31243D", fontSize: "24px", fontWeight: 800 }}
          >
            {unit.name}
          </Typography>
          <ClickAwayListener
            onClickAway={(e) => {
              // setShowMenu(false);
            }}
          >
            <div style={{ position: "relative" }}>
              {
                datalength.length !== 0? <ThreeDotMenu subjectName ={subjectName}  handleResetNotes ={handleResetNotes} handleDelete={handleDelete} />: null
              }
              
            </div>
          </ClickAwayListener>
        </HeaderContainer>
        <NoteContent

          getNotes={getNotes}
          deleteSingleNote={deleteSingleNote}
          selectedFromList={selectedFromList}
          notes={notes}
          course={course}
          unit={unit}
          setDataLength={setDataLength}
          recieveEditsHandler={recieveEditsHandler}
        />
      </Wrapper>
    </React.Fragment>
  );
};

export default NotesContent;
