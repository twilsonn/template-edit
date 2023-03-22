import React from "react";

const TrashCan: React.FC<IIcon> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      stroke="currentColor"
      fill="currentColor"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M135 18l-7 14H32a32 32 0 100 64h384a32 32 0 100-64h-96l-7-14c-6-11-17-18-29-18H164c-12 0-23 7-29 18zm281 110H32l21 339c2 25 23 45 48 45h246c25 0 46-20 48-45l21-339z"></path>
    </svg>
  );
};

export { TrashCan };
