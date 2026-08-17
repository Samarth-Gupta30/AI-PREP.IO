import React from 'react';

export default function Button({ children, variant = 'primary', ...props }) {
  const baseStyle = "px-4 py-2 rounded-md font-medium transition-all duration-200 active:scale-95";
    const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40",
    secondary: "bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 dark:bg-[#161724] dark:hover:bg-[#1e2032] dark:text-purple-300 dark:border-[#26283c]",
    danger: "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white shadow-md shadow-red-500/10"
  };


  return (
    <button className={`${baseStyle} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}
