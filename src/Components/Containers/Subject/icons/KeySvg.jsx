import React from "react";

const KeySvg = ({ color }) => {
  return (
    <div style={{ marginRight: "0.5rem" }}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.4921 1.50786C12.4816 -0.502641 9.21044 -0.502609 7.19994 1.50789C5.82666 2.88117 5.34966 4.90495 5.94428 6.74105L0.137344 12.548C0.0494375 12.6359 0 12.7549 0 12.8795V15.5313C0 15.7904 0.209656 16 0.46875 16H3.12056C3.24506 16 3.36409 15.9506 3.45197 15.8627L4.11481 15.1994C4.21597 15.0982 4.26541 14.9563 4.24894 14.8139L4.16653 14.1016L5.15347 14.0087C5.37778 13.9876 5.55494 13.8105 5.576 13.5862L5.66894 12.5992L6.38122 12.6821C6.5135 12.6999 6.64672 12.6555 6.74697 12.5667C6.84675 12.4775 6.90397 12.3502 6.90397 12.2165V11.3438H7.76091C7.88541 11.3438 8.00444 11.2943 8.09231 11.2064L9.29441 10.0202C11.13 10.6153 13.1188 10.1743 14.4921 8.80005C16.5026 6.78958 16.5026 3.51836 14.4921 1.50786ZM13.166 4.82255C12.6176 5.37095 11.7259 5.37095 11.1775 4.82255C10.6291 4.27414 10.6291 3.38242 11.1775 2.83402C11.7259 2.28561 12.6176 2.28561 13.166 2.83402C13.7144 3.38242 13.7144 4.27414 13.166 4.82255Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default KeySvg;

KeySvg.defaultProps = {
  color: "#ADB4C5",
};
