"use client";

export default function Backbtn(props: any) {

  const { className = null } = props;

  return (
    <>
      <button {...props} className={`back-btn cursor-pointer ${className ?? ''}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
        >
          <circle
            cx="28"
            cy="28"
            r="28"
            transform="matrix(-1 0 0 1 56 0)"
            fill="#C4CD24"
          />
          <path
            d="M37 28L19 28M19 28L27.5 36.5M19 28L27.5 19.5"
            stroke="#2B1354"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}

