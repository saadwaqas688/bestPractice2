import PropTypes from "prop-types";
import React from "react";

function MoveLibrarySvg({ color }) {
  return (
    <div>
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.43747 11.9761H9.92592C10.2642 11.9761 10.5447 11.7069 10.5447 11.3823C10.5447 11.0577 10.2642 10.7965 9.92592 10.7965H5.43747C5.09918 10.7965 4.81866 11.0577 4.81866 11.3823C4.81866 11.7069 5.09918 11.9761 5.43747 11.9761ZM8.22625 6.83815H5.43747C5.09918 6.83815 4.81866 7.10732 4.81866 7.4319C4.81866 7.75648 5.09918 8.01774 5.43747 8.01774H8.22625C8.56453 8.01774 8.84506 7.75648 8.84506 7.4319C8.84506 7.10732 8.56453 6.83815 8.22625 6.83815ZM14.1144 6.14593C14.3083 6.1438 14.5195 6.14148 14.7114 6.14148C14.9177 6.14148 15.0827 6.29982 15.0827 6.49774V12.8627C15.0827 14.8261 13.4243 16.4173 11.3781 16.4173H4.81041C2.66519 16.4173 0.916016 14.7469 0.916016 12.6886V4.1544C0.916016 2.19107 2.58268 0.583984 4.63714 0.583984H9.04308C9.2576 0.583984 9.42262 0.750234 9.42262 0.948151V3.49732C9.42262 4.94607 10.6685 6.13357 12.1784 6.14148C12.5311 6.14148 12.842 6.14399 13.1141 6.14618C13.3258 6.14789 13.514 6.1494 13.68 6.1494C13.7975 6.1494 13.9497 6.14773 14.1144 6.14593ZM14.3419 4.9904C13.6637 4.99278 12.8642 4.9904 12.2891 4.98486C11.3766 4.98486 10.6249 4.26365 10.6249 3.38807V1.30123C10.6249 0.960026 11.0564 0.790609 11.3031 1.03682C11.7501 1.48276 12.3646 2.09592 12.976 2.70611C13.5846 3.31348 14.1903 3.9179 14.6249 4.35153C14.8659 4.5914 14.6893 4.98961 14.3419 4.9904Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

MoveLibrarySvg.propTypes = {
  color: PropTypes.any,
};

MoveLibrarySvg.defaultProps = {
  color: "white",
};

export default MoveLibrarySvg;