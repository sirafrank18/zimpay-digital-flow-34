
import React from "react";

const CircleDollarSign = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8h-8" />
      <path d="M12 17v-9" />
      <path d="M8 13h8" />
    </svg>
  );
};

export default CircleDollarSign;
