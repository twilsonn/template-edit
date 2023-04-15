import React from "react";

const ChevronRight: React.FC<IIcon> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      stroke="currentColor"
      fill="currentColor"
      className={`w-5 h-5 ${className}`}
    >
      <path d="M311 233c12 13 12 33 0 46L119 471a32 32 0 01-46-46l170-169L73 87a32 32 0 0146-46l192 192z"></path>
    </svg>
  );
};

export { ChevronRight };
