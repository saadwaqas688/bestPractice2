import React from "react";
import MyLibFlashCard from "./MyLibFlashCard";
import api from "../../../../../../Services";
import createResponses from "../../../../../../helpers/createResponses";
import Loader from "../../../../../UI/Loader/Loader";
import BreadCrumb from './BreadCrumbs/BreadCrumbs';
import MyLibFlashCardView from './MyLibFlashCardView/MyLibFlashCardView';
import { useSelector, } from "react-redux";

const MyLibraryFlashcard = () => {
  const { createLoading, initialLoading } = createResponses;
    const {showMyLibFlashcard} = useSelector((state) => state.breadCrumbStats );
   
  const [baseView, setBaseView] = React.useState(true);
  const [flashcards, setFlashcards] = React.useState([]);
  const [selectedStack, setSelectedStack] = React.useState();
  // const [error, setError] = React.useState(initialError);
  const [loading, setLoading] = React.useState(initialLoading);

  const loadFlashcards = async () => {
    const token = localStorage.getItem("auth");
    let temp = await api.getFlashcardsFromLibrary(token);
    return temp;
  };

  const loadFlashcardsHandler = () => {
    setLoading(createLoading(true, "flash-cards-init"));
    loadFlashcards()
      .then((el) => {
        console.log('my library', el);
        if (!el.error) {
          setFlashcards([...el.data]);
          // setError(initialError);
        }

        // setError(createError(true, "Unknown", "info"));
        setLoading(initialLoading);
      })
      .catch((err) => console.error(err));
  };
  const loadInit = () => {
    loadFlashcardsHandler();
  };

  React.useEffect(() => {
    loadInit();
  }, []);
React.useState(() => {
  loadInit();
},[showMyLibFlashcard])

  function handleClick(stack){
    setBaseView(false)
    setSelectedStack(stack)
  }
  return (
    <div>
      {loading.value ? (
        <Loader />
      ) : (
        <>
          <BreadCrumb  baseVeiw={baseView}/>
          {baseView ? (
            <MyLibFlashCard clicked={handleClick} MyLibraryFlashCardData={flashcards}   loadFlashCardStacks={loadInit}/>
          ) : (
            // <FlashCardOpen selectedStack={selectedStack}/>
            <MyLibFlashCardView controllerData={selectedStack.flashcards}/>
            // <FlashCardView controllerData={selectedStack.flashcards}/>
          )}
        </>
      )}
    </div>
  );
};

export default MyLibraryFlashcard;
