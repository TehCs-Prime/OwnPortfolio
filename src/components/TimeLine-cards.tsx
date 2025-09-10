import React from "react";

const FolderOutline: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <svg
        viewBox="0 0 200 150"
        className="w-64 h-48"
        fill="none"
        stroke="skyblue"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Folder outline */}
        <path
          d="
            M10 130
            L10 40
            Q10 30 20 30
            L80 30
            Q90 30 95 40
            L190 40
            Q195 40 195 50
            L195 130
            Q195 140 185 140
            L20 140
            Q10 140 10 130
            Z
          "
        />
        {/* Text on the tab */}
        <text x="30" y="45" fill="white" fontSize="10" fontFamily="sans-serif">
            Tab Text
        </text>

        {/* Text on the body */}
        <text x="80" y="100" fill="white" fontSize="14" fontFamily="sans-serif">
            Body Text
        </text>
      </svg>
    </div>
  );
};

export default FolderOutline;
