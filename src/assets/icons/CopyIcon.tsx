import React from "react";

const CopyIcon: React.FC<IIcon> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke="currentColor"
      fill="currentColor"
      className={`w-5 h-5 ${className}`}
    >
      <path d="M272 0h124c13 0 25 5 34 14l68 68c9 9 14 21 14 34v220c0 27-21 48-48 48H272c-26 0-48-21-48-48V48c0-26 22-48 48-48zM48 128h144v64H64v256h192v-32h64v48c0 27-21 48-48 48H48c-26 0-48-21-48-48V176c0-26 22-48 48-48z"></path>
    </svg>
  );
};

export { CopyIcon };
