import React from "react";

const Checked = ({ color }) => {
  return (
    <div>
      <svg
        style={{
          paddingTop: "0.3rem",
          paddingRight: "2rem",
          paddingLeft: "0.5rem",
        }}
        width="20"
        height="20"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.1" cx="9.5" cy="9.5" r="9.5" fill={color} />
        <circle cx="9.5" cy="9.5" r="6.5" fill={color} />
        <g clipPath="url(#clip0_470_5504)">
          <path
            d="M11.8535 8.53389L9.21584 11.1714C9.02051 11.3668 8.70366 11.3668 8.50815 11.1714L7.14655 9.80972C6.95115 9.61435 6.95115 9.29747 7.14655 9.10207C7.34199 8.90663 7.65881 8.90663 7.85416 9.10199L8.8621 10.1099L11.1458 7.82621C11.3413 7.63077 11.6581 7.63092 11.8535 7.82621C12.0488 8.02161 12.0488 8.33838 11.8535 8.53389Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_470_5504">
            <rect
              width="5"
              height="5"
              fill="white"
              transform="translate(7 7)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Checked;
Checked.defaultProps = {
  color: "#ADB4C5",
};
