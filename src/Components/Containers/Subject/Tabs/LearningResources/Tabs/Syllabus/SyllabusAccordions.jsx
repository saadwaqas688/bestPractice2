import React from "react";
import Accordian from "./../../../../../../UI/Accordian/PrimaryAccordion/PrimaryAccordion";
import { useSelector, useDispatch } from "react-redux";
import { subjectActions } from "./../../../../../../../redux/reducers/subject";
import PrimarySyllabus from "./PrimarySyllabus";
import api from "../../../../../../../Services";
import Loader from "./../../../../../../UI/Loader/Loader";
import { useParams } from "react-router-dom";
import ErrorBoundary from "../../../../../../../Errors/ErrorBoundary";
import { learningObjectivesCompletedActions } from "../../../../../../../redux/reducers/learningObjectivesCompleted";
import isEmptyObj from "./../../../../../../../helpers/objectIsEmpty";
import { courseActions } from "../../../../../../../redux/reducers/course";

export const generateCompletedLabel = (value, total) => `${value}/${total}`;

const SyllabusAccordions = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const courseHasUnits = useSelector((state) => state.course?.haveUnits);
  const [loadingSyllabus, setLoadingSyllabus] = React.useState(false);
  const allExpanded = useSelector((state) => state.subject.expandAccordian);
  const [accordionController, setAccordionController] = React.useState([]);
  const { id: courseId } = useParams();
  const [courseDetails, setCourseDetails] = React.useState({});
  const learningObjectivesCompletedStatus = useSelector(
    (state) => state.learningObjectivesCompleted.learningObjectivesCompleted
  );
  const getLearningObjectivesformDB = async (token) => {
    let temp = await api.getSyllabus(token, courseId);
    return temp;
  };
  const apiCall = async () => {
    let token = localStorage.getItem("auth");
    getLearningObjectivesformDB(token)
      .then((el) => {
        if (el.error) {
          return;
        }

        dispatch(courseActions.addCourse(el.data));
        setCourseDetails(el);
      })
      .catch((error) => console.error(error));
  };

  const getCompeletedStatusFromBackend = (arr) => {
    if (!Array.isArray(arr)) {
      console.error("Invalid parameter provided, Detail provided below");
      throw Error("Parameter must be an array");
    }
    const isCompleted = arr.map(({ id, chapterId, userLearningObjective }) => {
      const payload = {
        id,
        chapterId,
      };
      if (userLearningObjective) {
        payload.checked = true;
      }
      if (!userLearningObjective) {
        payload.checked = false;
      }
      return payload;
    });
    return isCompleted;
  };

  const generateCompletedArr = (arr) => {
    if (arr.length === 0) {
      return false;
    }
    const completedLearningObjectives = getCompeletedStatusFromBackend(arr);

    dispatch(
      learningObjectivesCompletedActions.updateLearningObjectives(
        completedLearningObjectives
      )
    );
    return true;
  };

  React.useEffect(() => {
    if (!isEmptyObj(courseDetails)) {
      unitsStatus(courseDetails);
    }
  }, [courseDetails]);

  const unitsStatus = (el) => {
    const checkedValues = 4;
    const { data: course } = el;
    const generatedLearningObjCompleted = generateCompletedArr(
      el.data.learningObjectives
    );
    if (generatedLearningObjCompleted) {
      if (course.haveUnits) {
        let unitData = course.units.map((each, index) => {
          let chaptersData = course.chapters;
          let allLearningObjectives = course.learningObjectives;
          const filterdChapers = chaptersData.filter(
            (ch) => ch.unitId === each.id
          );

          const filterdChaperId = filterdChapers.map((item) => {
            const filteredLearningObjectives = allLearningObjectives.filter(
              (lo) => lo.chapterId === item.id
            );
            return { ...item, learningObjectives: filteredLearningObjectives };
          });
          return {
            heading: each.title,
            id: each.id,
            description: `${filterdChapers.length} chapters`,
            content: (
              <PrimarySyllabus
                key={index}
                chapters={filterdChaperId}
                hasUnits={course.haveUnits}
              />
            ),
          };
        });

        setAccordionController(unitData);
        setLoadingSyllabus(false);
      } else {
        let chaptersData = course.chapters.map((each, index) => {
          let allLearningObjectives = course.learningObjectives;
          const filteredLearningObjectives = allLearningObjectives.filter(
            (lo) => lo.chapterId === each.id
          );

          return {
            heading: each.title,
            id: each.id,
            description: generateCompletedLabel(
              checkedValues,
              filteredLearningObjectives.length
            ),
            content: (
              <>
                <PrimarySyllabus
                  key={index}
                  hasUnits={course.haveUnits}
                  chapters={filteredLearningObjectives}
                />
              </>
            ),
          };
        });
        setAccordionController(chaptersData);
        setLoadingSyllabus(false);
      }
    }
  };

  React.useEffect(() => {
    setLoadingSyllabus(true);
    apiCall();
  }, []);

  const updateCountForLearningObjCompletion = (
    controllerArr,
    referenceArray,
    hasUnits
  ) => {
    for (let i in controllerArr) {
      const { id } = controllerArr[i];
      if (!hasUnits) {
        const filteredRefArr = referenceArray.filter(
          (eachObj) => eachObj.chapterId === id
        );
        const completedVals = filteredRefArr.filter(
          (each) => each.checked
        )?.length;
        const toChange = controllerArr[i].description.split("/");
        toChange[0] = completedVals;
        const joined = toChange.join("/");
        controllerArr[i].description = joined;
      }
    }

    return controllerArr;
  };

  React.useEffect(() => {
    let temp = [...accordionController];
    const controllerUpdated = updateCountForLearningObjCompletion(
      temp,
      learningObjectivesCompletedStatus,
      courseHasUnits
    );
    setAccordionController(controllerUpdated);
  }, [learningObjectivesCompletedStatus]);

  return (
    <ErrorBoundary>
      <div ref={ref}>
        {loadingSyllabus ? (
          <Loader />
        ) : (
          accordionController.length > 0 && (
            <Accordian
              expandAll={allExpanded}
              controller={accordionController}
              toggleExpandAllOff={(e) =>
                dispatch(subjectActions.stopExpandAccordion())
              }
            />
          )
        )}
      </div>
    </ErrorBoundary>
  );
});

export default SyllabusAccordions;
