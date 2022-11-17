import React, { useCallback, useState } from "react";
import Quill from "quill";
import katex from "katex";
import "quill/dist/quill.snow.css";
import "katex/dist/katex.min.css";
import "./QuillEditor.css";
import { IoIosSend } from "react-icons/io";
import useHtmlReturn from "./hooks/useHtmlReturn";
import BlotFormatter from "quill-blot-formatter";
import deltaHtmlParser from "./hooks/deltaHtmlParser";

Quill.register("modules/blotFormatter", BlotFormatter);
window.katex = katex;

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
  ["formula"],
];

const TextEditor = ({
  getContent,
  maxWidth,
  width,
  defaultContent,
  includeSendBtn,
  getLengthOfContent,
}) => {
  const [quill, setQuill] = useState();
  const [data, setData] = React.useState("");
  const { handleGetReturn } = useHtmlReturn();
  if (!includeSendBtn && quill) {
    const lengthOfContent = quill.getLength();
    getLengthOfContent(lengthOfContent);
  }
  const [returnedObj, setReturnedObj] = React.useState({});

  React.useEffect(() => {
    if (quill) {
      quill.focus();
      const temp = handleGetReturn(data, quill.getContents());
      setReturnedObj(temp);
    }
  }, [data, quill]);

  React.useEffect(() => {
    if (!includeSendBtn) {
      if (quill) {
        getContent(returnedObj);
      }
    }
  }, [returnedObj]);

  const sendBtnRef = React.useRef(null);

  const wrapperRef = useCallback((wrapper) => {
    const htmlData = deltaHtmlParser(defaultContent);
    setData(htmlData);
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      placeholder: "Enter some text",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        blotFormatter: {},
      },
    });
    q.focus();
    if (Quill) {
      Quill.register("modules/blotFormatter", BlotFormatter);
    }
    q.setContents(defaultContent);

    const lengthOfContent = q.getLength();
    q.on("editor-change", (eventName, ...args) => {
      setData(wrapper.querySelector(".ql-editor").innerHTML);
      if (!includeSendBtn) {
        getLengthOfContent(lengthOfContent);
      }
    });

    setQuill(q);
  }, []);

  return (
    <div className="quill-wrapper" style={{ width, maxWidth }}>
      {includeSendBtn ? (
        <button
          ref={sendBtnRef}
          className="quill-send-btn"
          onClick={(e) => {
            e.preventDefault();
            if (returnedObj.html === "") {
              return;
            }
            if (quill) {
              getContent(returnedObj);
            }
          }}
        >
          <IoIosSend color="rgb(224,21,162)" />
        </button>
      ) : null}
      <div className="quill-container" ref={wrapperRef}></div>
    </div>
  );
};

TextEditor.defaultProps = {
  width: "100%",
  maxWidth: "100%",
  getContent: (e) => {
    return;
  },
  includeSendBtn: true,
  isContentEmpty: (e) => {
    return;
  },
  getLengthOfContent: (e) => {
    return;
  },
  getSnapshot: (e) => {
    return;
  },
};

export default TextEditor;
