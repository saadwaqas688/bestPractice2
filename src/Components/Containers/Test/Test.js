// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import './../../../App.css'

// const propTypes = {
//   // text: PropTypes.string.isRequired,
//   // customClass: PropTypes.string,
//   // selectionHandler: PropTypes.func,
// };

// const Test = () => {
//   const [text, setText] = useState('hello asad bhai, kaisey hen aap thik hen.. pakka thik hen na.. sach baten ap thik hen?');
//   // const [isDirty, setIsDirty] = useState(false);
//   const [selection, setSelection] = useState("");
//   const [anchorNode, setAchorNode] = useState("?");
//   const [focusNode, setFocusNode] = useState("?");
//   const [selectionStart, setSelectionStart] = useState("?");
//   const [selectionEnd, setSelectionEnd] = useState("?");
//   const [first, setFirst] = useState("");
//   const [middle, setMiddle] = useState("");
//   const [last, setLast] = useState("");

//   const onMouseUpHandler = (e) => {
//     e.preventDefault();
//     const selectionObj = window.getSelection && window.getSelection();
//     const _selection = selectionObj.toString();
//     const _anchorNode = selectionObj.anchorNode;
//     const _focusNode = selectionObj.focusNode;
//     const _anchorOffset = selectionObj.anchorOffset;
//     const _focusOffset = selectionObj.focusOffset;
//     const position = _anchorNode.compareDocumentPosition(_focusNode);
//     let forward = false;

//     if (position === _anchorNode.DOCUMENT_POSITION_FOLLOWING) {
//       forward = true;
//     } else if (position === 0) {
//       forward = (_focusOffset - _anchorOffset) > 0;
//     }
//     let _selectionStart = forward ? _anchorOffset : _focusOffset;
//     const _selectionEnd = _selectionStart + _selection.length;

//     if (forward) {
//       if (
//         _anchorNode.parentNode.getAttribute("data-order") &&
//         _anchorNode.parentNode.getAttribute("data-order") === "middle"
//       ) {
//         _selectionStart += selectionStart;
//         //
//       }
//       if (
//         _anchorNode.parentNode.getAttribute("data-order") &&
//         _anchorNode.parentNode.getAttribute("data-order") === "last"
//       ) {
//         _selectionStart += selectionEnd;
//       }
//     } else {
//       if (
//         _focusNode.parentNode.getAttribute("data-order") &&
//         _focusNode.parentNode.getAttribute("data-order") === "middle"
//       ) {
//         _selectionStart += selectionStart;
//       }
//       if (
//         _focusNode.parentNode.getAttribute("data-order") &&
//         _focusNode.parentNode.getAttribute("data-order") === "last"
//       ) {
//         _selectionStart += selectionEnd;
//       }
//     }

//     const _first = text.slice(0, _selectionStart);
//     const _middle = text.slice(_selectionStart, _selectionEnd);
//     const _last = text.slice(_selectionEnd);

//     setSelectionEnd(_selectionEnd);
//     setFirst(_first);
//     setMiddle(_middle);
//     setLast(_last);
//     setSelectionStart(_selectionStart)
//     setFocusNode(_focusNode)
//     setAchorNode(_anchorNode)
//     setSelection(_selection)

//     // if (selectionHandler) {
//     //   selectionHandler({
//     //     _selection,
//     //     _selectionStart,
//     //     _selectionEnd,
//     //   });
//     // }
//   };

//   return (
//     <div>
//       {!selection ? (
//         <span onMouseUp={onMouseUpHandler}>{text}</span>
//       ) : (
//         <span onMouseUp={onMouseUpHandler}>
//           <span data-order="first">{first}</span>
//           <span
//             data-order="middle"
//             style={{background:"pink"}}
//           >
//             {middle}
//           </span>
//           <span data-order="last">{last}</span>
//         </span>
//       )}
//     </div>
//   );
// };

// export default Test;

//
// import React from 'react'
// import HighLighter from './../../UI/Highlight/Highlight';
// import ToolTips from './../../UI/Tooltip/ToolTip';
// import ClickAwayListener from "react-click-away-listener";

// const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
// const initDrag = {
//   selection: '',
//   selectionEnd: 0,
//   selectionStart: 0
// }
// const Test = () => {
//   const [highlighColor, setHighlightColor] = React.useState('yellow')
//   const [dragSelection, setDragSelection] = React.useState(initDrag)
//   const selectionHandler = (selection) => {
//     //do something with selection
//     setHighlightColor('pink')

//    let temp = {...dragSelection}
//    temp = {...selection}
//    setDragSelection(temp)
//   }
//   React.useEffect(() => {
//     console.table(dragSelection)
//   }, [dragSelection])
//   return (
//       <ClickAwayListener onClickAway={e => setDragSelection(initDrag)}>
//     <div>

//       {dragSelection.selectionStart !== dragSelection.selectionEnd && <div style={{position: 'absolute', top: 0, right: 0}}>Hello</div>}
//       <HighLighter
//        text={text}
//        onMouseUp={e => {return}}
//        selectionHandler={selectionHandler}
//        customClass={{background: highlighColor}}
//       />

//     </div>
//         </ClickAwayListener>
//   )
// }

import React from "react";
import FlashCardView from "./../../UI/FlashCardView/FlashCardView";

const Test = () => {
  return (
    <div>
      <FlashCardView />
    </div>
  );
};

export default Test;
