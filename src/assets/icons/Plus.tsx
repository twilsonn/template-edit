import React from "react";

const Plus: React.FC<IIcon> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      stroke="currentColor"
      fill="currentColor"
      className={`w-5 h-5 ${className}`}
    >
      <path d="M240 80a32 32 0 10-64 0v144H32a32 32 0 100 64h144v144a32 32 0 1064 0V288h144a32 32 0 100-64H240V80z"></path>
    </svg>
  );
};

export { Plus };
