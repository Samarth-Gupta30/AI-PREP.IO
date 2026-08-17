import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Import theme context

export default function Input({ label, type = 'text', error, ...props }) {
  const { isDarkMode } = useContext(ThemeContext); // Consume the theme state

  return (
    <div className="flex flex-col gap-1.5 w-full mb-5 text-left">
      {label && (
        <label className={`text-xs font-black tracking-widest uppercase px-1
          ${isDarkMode ? 'text-purple-400/60' : 'text-purple-700/80'}`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-4 py-3 border rounded-xl text-sm font-medium outline-none transition-all duration-200
          ${isDarkMode 
            ? 'bg-[#0c0d14] text-purple-50 border-[#26283c] focus:border-purple-500' 
            : 'bg-purple-50/50 text-gray-900 border-purple-200 focus:border-purple-600'
          }
          ${error ? 'border-rose-500 focus:border-rose-500' : ''}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-500 font-bold tracking-wide mt-1 px-1">⚠️ {error}</span>}
    </div>
  );
}
