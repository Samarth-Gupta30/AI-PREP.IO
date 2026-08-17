import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import questionData from '../data/questions.json';

// 1. Accept the 'bookmarks' array as a prop from App.jsx
export default function ProgressTracker({ bookmarks = [] }) {
  const { isDarkMode } = useContext(ThemeContext);

  // 2. Metrics Calculations
  const totalMissions = questionData.length;
  const bookmarkedCount = bookmarks.length;
  
  // 3. YOUR TASK: Calculate the completion percentage mathematically
  // Hint: (bookmarkedCount divided by totalMissions) multiplied by 100
  // To avoid breaking if totalMissions is 0, we can use a fallback value or short-circuiting
  const completionPercentage = totalMissions > 0 
    ? Math.round((bookmarkedCount / totalMissions) * 100) 
    : 0;

  return (
    <div className={`w-full p-5 rounded-2xl border transition-all duration-300 shadow-xl shadow-purple-500/5 mb-2
      ${isDarkMode ? "bg-[#151622] border-[#26283c]" : "bg-white border-purple-100"}`}
    >
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-purple-400/50' : 'text-purple-600/70'}`}>Total Bank</p>
          <h4 className="text-xl font-black mt-1">{totalMissions}</h4>
        </div>
        <div className="border-x border-purple-100 dark:border-[#26283c]">
          <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-purple-400/50' : 'text-purple-600/70'}`}>Bookmarked</p>
          <h4 className="text-xl font-black mt-1 text-purple-500">{bookmarkedCount}</h4>
        </div>
        <div>
          <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-purple-400/50' : 'text-purple-600/70'}`}>Target Rate</p>
          <h4 className="text-xl font-black mt-1 text-green-500">{completionPercentage}%</h4>
        </div>
      </div>

      {/* Modern Visual Progress Bar Track */}
      <div className="w-full h-1.5 bg-purple-100 dark:bg-[#0c0d14] rounded-full mt-4 overflow-hidden">
        <div 
          className="h-full bg-linear-to-r from-purple-500 to-indigo-500 transition-all duration-500"
          // 4. YOUR TASK: Map the computed completion percentage to this layout style width property
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
    </div>
  );
}
