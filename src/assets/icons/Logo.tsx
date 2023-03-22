import React from "react";

const Logo: React.FC<IIcon> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      stroke="currentColor"
      fill="currentColor"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448a32.03 32.03 0 1061.6 17.6l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1a32.05 32.05 0 000 45.3l89.3 89.4-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112a32.05 32.05 0 000-45.3l-112-112a32.05 32.05 0 00-45.3 0zm-306.7 0a32.05 32.05 0 00-45.3 0l-112 112a32.05 32.05 0 000 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4a32.05 32.05 0 000-45.3z" />
    </svg>
  );
};

export { Logo };
