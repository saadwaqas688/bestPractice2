import React from "react";

const LibrarySvg = ({ color }) => {
  return (
    <div style={{ marginRight: "0.5rem", marginTop: "0.2rem" }}>
      <svg
        width="13"
        height="15"
        viewBox="0 0 15 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.79167 11.8757H9.3296C9.67162 11.8757 9.95524 11.5992 9.95524 11.2656C9.95524 10.9321 9.67162 10.6637 9.3296 10.6637H4.79167C4.44966 10.6637 4.16603 10.9321 4.16603 11.2656C4.16603 11.5992 4.44966 11.8757 4.79167 11.8757ZM7.61119 6.59632H4.79167C4.44966 6.59632 4.16603 6.8729 4.16603 7.20642C4.16603 7.53995 4.44966 7.80839 4.79167 7.80839H7.61119C7.95321 7.80839 8.23683 7.53995 8.23683 7.20642C8.23683 6.8729 7.95321 6.59632 7.61119 6.59632ZM13.5643 5.88503C13.7603 5.88285 13.9739 5.88047 14.1678 5.88047C14.3764 5.88047 14.5432 6.04316 14.5432 6.24653V12.7868C14.5432 14.8042 12.8665 16.4393 10.7978 16.4393H4.15769C1.98883 16.4393 0.220367 14.7229 0.220367 12.6079V3.83866C0.220367 1.82126 1.90541 0.169922 3.98251 0.169922H8.43703C8.65392 0.169922 8.82075 0.34075 8.82075 0.544117V3.16349C8.82075 4.65213 10.0804 5.87234 11.6069 5.88047C11.9635 5.88047 12.2778 5.88304 12.5529 5.8853C12.7669 5.88705 12.9572 5.88861 13.1251 5.88861C13.2439 5.88861 13.3978 5.88689 13.5643 5.88503ZM13.7943 4.69769C13.1086 4.70013 12.3003 4.69769 11.7189 4.69199C10.7963 4.69199 10.0363 3.95092 10.0363 3.05123V0.906924C10.0363 0.556319 10.4726 0.382237 10.722 0.635226C11.1737 1.09325 11.7946 1.72293 12.4125 2.34964C13.0281 2.97403 13.6408 3.59545 14.0804 4.04122C14.324 4.2877 14.1455 4.69687 13.7943 4.69769Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default LibrarySvg;

LibrarySvg.defaultProps = {
  color: "#ADB4C5",
};
