// import React,{useContext} from 'react';
// import questionData from '../data/questions.json';


import React from 'react';

// 1. Accept bookmarks list array and the toggle handler function as props
export default function QuestionCard({ questions, bookmarks = [], onToggleBookmark }) {

  return (
    <div className="flex flex-col gap-4 p-4 w-full max-w-xl">
      {questions && questions.map((q) => {
        // 2. Check if this specific question ID is inside our bookmarks state array
        const isBookmarked = bookmarks.includes(q.id);

        return (
          <div 
            key={q.id} 
            className="bg-white dark:bg-[#161724] p-5 rounded-2xl shadow-xl shadow-purple-500/5 dark:shadow-none border border-purple-100 dark:border-[#26283c] hover:border-purple-500 dark:hover:border-purple-500/60 transition-all duration-300 group"
          >
            <div className="flex justify-between items-start">
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-1">
                  {q.topic}
                </p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
                  {q.title}
                </h3>
              </div>
              
              {/* 3. INTERACTIVE STAR BUTTON SYSTEM */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggleBookmark(q.id)}
                  className="text-xl transition-transform hover:scale-125 focus:outline-none"
                  title={isBookmarked ? "Remove Bookmark" : "Bookmark Question"}
                >
                  {/* Dynamic render: filled gold star or empty grey star wireframe */}
                  {isBookmarked ? '⭐' : '☆'}
                </button>

                <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider
                  ${q.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : ''}
                  ${q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' : ''}
                  ${q.difficulty === 'Hard' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' : ''}
                `}>
                  {q.difficulty}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
