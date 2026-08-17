import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; 
import Button from './Button';

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`w-full  backdrop-blur-xl border-b  sticky top-0 z-50 transition-colors duration-300
    ${ isDarkMode 
         ? "bg-[#0c0d14]/70 border-[#1e2032]" 
        : "bg-[#B8B8B8] border-purple-100" }`}>
        
      <div className="w-full mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* Gen-Z Branded Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="h-8 w-8 rounded-xl bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-purple-500/20 transform group-hover:rotate-6 transition-transform">
            AI
          </div>
          <span className="text-md font-black tracking-wider uppercase bg-linear-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Prep.<span className="text-gray-900 dark:text-white">io</span>
          </span>
        </div>

        {/* Custom Toggle Button */}
        <Button
  variant="secondary"
  onClick={toggleTheme}
  className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/40"
>
  {isDarkMode ? "🌙 Dark" : "☀️ Light"}
</Button>

      </div>
    </nav>
  );
}
