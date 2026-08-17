import React, { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import Button from './components/Button';
import Login from './pages/Login';
import QuestionCard from './components/QuestionCard'; // 1. IMPORT YOUR COMPONENT HERE
import Navbar from './components/Navbar';
import { ThemeContext } from './context/ThemeContext'; 
import Input from './components/Input';
import questionData from './data/questions.json';
import PomodoroTimer from './components/PomodoroTimer';
import useDebounce from './hooks/useDebounce';
import ProgressTracker from './components/ProgressTracker';




export default function App() {
  // 2. We extract both isAuthenticated AND logout from the context cloud
  const { isAuthenticated, logout } = useContext(AuthContext); 
  const { isDarkMode } = useContext(ThemeContext); // 2. EXTRACT THE CURRENT THEME STATE
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

// 1. INITIALIZE BOOKMARKS STATE (Checks LocalStorage on startup)
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('bookmarked_questions');
    return saved ? JSON.parse(saved) : [];
  });


 React.useEffect(() => {
    localStorage.setItem('bookmarked_questions', JSON.stringify(bookmarks));
  }, [bookmarks]);

// 3. TOGGLE FUNCTION ENGINE
  const handleToggleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      // If it exists, filter it out to remove it
      setBookmarks(bookmarks.filter(bId => bId !== id));
    } else {
      // If it doesn't exist, append it using the spread operator
      setBookmarks([...bookmarks, id]);
    }
  };

  const debouncedSearch = useDebounce(searchTerm, 500);


const filteredQuestions = questionData.filter((question) => {
    // Keep this search statement exactly the same as you have it
    const matchesSearch = (question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           question.topic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // --- CHANCE AREA: Let's rebuild your difficulty matching logic ---
    let matchesDifficulty = false;

    if (selectedDifficulty === 'All') {
      // 1. If 'All' is picked, every question passes this rule
      matchesDifficulty = true;
    } else if (selectedDifficulty === 'Saved') {
      // 2. YOUR CHALLENGE: Check if the current question's ID is included inside your bookmarks state array!
      // Hint: Use the array method `bookmarks.includes(question.id)`
      matchesDifficulty = bookmarks.includes(question.id);
    } else {
      // 3. Otherwise, check if the question's difficulty matches the selected string ('Easy', 'Medium', etc.)
      matchesDifficulty = (question.difficulty === selectedDifficulty);
    }
    
    return matchesSearch && matchesDifficulty;
  });    

const difficulties = ['All', 'Easy', 'Medium', 'Hard','Saved'];

//   return (
//         <div
//       className={`min-h-screen w-full flex flex-col items-center transition-colors duration-300
//        ${isDarkMode 
//         ? "bg-[#0c0d14] text-purple-100" 
//         : "bg-purple-50/50 text-gray-900"}`} 
//     >
//       <div className="w-full max-w-full flex flex-col items-center justify-start">

//       <Navbar />

//       {/* Conditional Screen View */}
//       {isAuthenticated ? (
//         <div className="w-full max-w-xl flex flex-col gap-4 p-6">
          
//           {/* Dashboard Header Box */}
//           <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md text-center border border-gray-100 dark:border-gray-700">
//             <h1 className="text-2xl font-bold mb-2 text-green-500">🎉 Welcome to your Dashboard</h1>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//               You are securely logged in using local storage state persistence.
//             </p>
            
//             {/* 3. ADD THE LOG OUT BUTTON HERE */}
//             <Button variant="danger" onClick={logout}>
//               Log Out
//             </Button>
//           </div>
//           <ProgressTracker bookmarks={bookmarks} />
//           <PomodoroTimer />

// {/* 5. ADD THE INTERACTIVE SEARCH BOX LAYOUT LAYER HERE */}
//             <div className="w-full mt-4">
//               <Input
//                 label="SEARCH CORE BANK"
//                 placeholder="🔍 Type topic or problem name..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)} // Binds input typing directly to state
//               />
//             </div>

  



// {/* 3. INTERACTIVE DIFFICULTY FILTER BUTTON LAYOUT PANEL */}

//  <div className="flex gap-2 w-full mt-1 overflow-x-auto pb-1">
//               {difficulties.map((diff) => (
//                 <button
//                   key={diff}
//                   onClick={() => setSelectedDifficulty(diff)}
//                   className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 border
//                     ${selectedDifficulty === diff 
//                       ? "bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-500/20 scale-105" 
//                       : isDarkMode 
//                         ? "bg-[#161724] border-[#26283c] text-purple-300 hover:border-purple-500/50" 
//                         : "bg-white border-purple-100 text-purple-700 hover:bg-purple-50"}`}
//                 >
//                   {diff}
//                 </button>
//               ))}
//             </div>





// <h2 className="text-sm font-black uppercase tracking-widest mt-2 self-start px-1 text-purple-600 dark:text-purple-400">
//               Available Missions ({filteredQuestions.length}):
//             </h2>
            
//                         {/* Pass bookmarks array and click handler down as props */}
//             <QuestionCard 
//               questions={filteredQuestions} 
//               bookmarks={bookmarks}
//               onToggleBookmark={handleToggleBookmark}
//             />


//         </div>
//       ) : (
//         <Login />
//       )}
//     </div>
//   </div>
//   );
  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-start transition-colors duration-300
      ${isDarkMode ? "bg-[#0c0d14] text-purple-100" : "bg-purple-50/50 text-gray-900"}`}
    >
      <Navbar />

      {/* CHANGER 1: We widen the main wrapper box max-width cap to let the workspace expand across the browser page canvas */}
      <div className="w-full max-w-5xl flex flex-col items-center justify-start p-6">
        
        {isAuthenticated ? (
          
          // CHANGER 2: This is the new master Grid Container Layout Frame!
          // Stacks elements vertically on tiny screens, but opens up into a 3-column layout track on medium/large screens.
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-2">
            
            {/* ==================== LEFT COLUMN: CORE DASHBOARD STREAMS (Spans 2 columns wide) ==================== */}
            <div className="md:col-span-2 flex flex-col gap-4 w-full">
              
              {/* Dashboard Welcome Header Card */}
              <div className={`w-full p-6 rounded-2xl shadow-xl border text-center transition-all duration-300
                ${isDarkMode ? "bg-[#151622] border-[#26283c]" : "bg-white border-purple-100"}`}
              >
                <h1 className="text-2xl font-black mb-2 text-green-500 uppercase tracking-tight">🎉 Welcome to your Dashboard</h1>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-purple-300/60' : 'text-gray-600'}`}>
                  You are securely logged in using local storage state persistence layers.
                </p>
                <Button variant="danger" onClick={logout} className="text-xs font-bold uppercase tracking-wider py-1.5 px-4">
                  Log Out
                </Button>
              </div>

              {/* Interactive Search Field Input Card Block */}
              <div className="w-full mt-2">
                <Input
                  label="SEARCH CORE BANK"
                  placeholder="🔍 Type topic or problem name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Interactive Difficulty Pill Filter Panel */}
              <div className="flex gap-2 w-full overflow-x-auto pb-1">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 border
                      ${selectedDifficulty === diff 
                        ? "bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-500/20 scale-105" 
                        : isDarkMode 
                          ? "bg-[#161724] border-[#26283c] text-purple-300 hover:border-purple-500/50" 
                          : "bg-white border-purple-100 text-purple-700 hover:bg-purple-50"}`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              {/* Dynamic Task Heading Metircs Label */}
              <h2 className="text-sm font-black uppercase tracking-widest mt-4 self-start px-1 text-purple-600 dark:text-purple-400">
                Available Missions ({filteredQuestions.length}):
              </h2>
              
              {/* Question Inventory Streaming Feed Components */}
              <QuestionCard questions={filteredQuestions} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} />

            </div>


            {/* ==================== RIGHT COLUMN: UTILITY SIDEBAR PANELS (Takes 1 column width) ==================== */}
            <div className="flex flex-col gap-4 w-full sticky top-20">
              
              {/* Analytics Progress Tracker metric widget panel mounts here */}
              <ProgressTracker bookmarks={bookmarks} />

              {/* Pomodoro Focus Timer ticking engine module component mounts right beneath it */}
              <PomodoroTimer />

            </div>

          </div>

        ) : (
          // Centered login interface framework parameters
          <div className="max-w-md w-full mt-8">
            <Login />
          </div>
        )}

      </div>
    </div>
  );





}



  
