import React from "react";

const PenToSquare: React.FC<IIcon> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke="currentColor"
      fill="currentColor"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M472 22a56 56 0 00-80 0l-30 30 98 98 30-30c22-22 22-58 0-80l-18-18zM172 242c-6 6-10 13-13 22l-30 88a24 24 0 0031 31l89-30c8-3 15-7 21-13l168-168-98-98-168 168zM96 64c-53 0-96 43-96 96v256c0 53 43 96 96 96h256c53 0 96-43 96-96v-96a32 32 0 10-64 0v96c0 18-14 32-32 32H96c-18 0-32-14-32-32V160c0-18 14-32 32-32h96a32 32 0 100-64H96z"></path>
    </svg>
  );
};

export { PenToSquare };
