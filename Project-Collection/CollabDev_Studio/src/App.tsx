/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from "react";
import ActivityBar from "./components/ActivityBar";
import Sidebar from "./components/Sidebar";
import CodeEditor from "./components/Editor";
import Terminal from "./components/Terminal";
import { useAppStore } from "./store/useAppStore";

function App() {
  const { terminalOpen } = useAppStore();

  return (
    <div className="flex h-screen bg-background text-textMain overflow-hidden font-sans selection:bg-primary/30">
      <ActivityBar />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Area */}
        <div className="flex-1 flex flex-col relative z-0">
          <CodeEditor />
        </div>
        {/* Terminal Area */}
        {terminalOpen && <Terminal />}
        {/* Status Bar */}
        <div className="h-6 bg-primary text-white flex items-center px-3 text-xs justify-between z-20 select-none">
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-white"></span> main*
            </span>
            <span>0 errors, 0 warnings</span>
          </div>
          <div className="flex gap-4 items-center">
            <span>Ln 12, Col 34</span>
            <span>Spaces: 2</span>
            <span>UTF-8</span>
            <span>TypeScript React</span>
            <span className="cursor-pointer hover:bg-white/20 px-1 rounded flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span> Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
