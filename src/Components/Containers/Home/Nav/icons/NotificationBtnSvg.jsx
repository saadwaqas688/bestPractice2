import React from "react";

const NotificationBtnSvg = ({ color, ...props }) => {
  return (
    <svg
      {...props}
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 0C3.92954 0 2.98173 0.691642 2.65518 1.71108L0 10H10L7.34482 1.71108C7.01827 0.691641 6.07046 0 5 0ZM3.5 11C3.22386 11 3 11.2239 3 11.5C3 11.7761 3.22386 12 3.5 12H6.5C6.77614 12 7 11.7761 7 11.5C7 11.2239 6.77614 11 6.5 11H3.5Z"
        fill={color}
      />
    </svg>
  );
};

export default NotificationBtnSvg;

NotificationBtnSvg.defaultProps = {
  color: "#DDDBE0",
};
