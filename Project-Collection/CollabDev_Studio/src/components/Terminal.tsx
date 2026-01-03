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
import { X, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

const Terminal = () => {
  const { toggleTerminal } = useAppStore();

  return (
    <div className="h-48 border-t border-border bg-[#18181b] flex flex-col">
      <div className="flex justify-between items-center px-4 pt-2 border-b border-border text-textMuted text-xs uppercase tracking-wider">
        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-textMain border-b border-primary text-textMain pb-2">
            Terminal
          </span>
          <span className="cursor-pointer hover:text-textMain pb-2">
            Output
          </span>
          <span className="cursor-pointer hover:text-textMain pb-2">
            Problems
          </span>
          <span className="cursor-pointer hover:text-textMain pb-2">
            Debug Console
          </span>
        </div>
        <div className="flex gap-3 mb-1">
          <Plus size={14} className="cursor-pointer hover:text-white" />
          <Trash2 size={14} className="cursor-pointer hover:text-white" />
          <ChevronUp size={14} className="cursor-pointer hover:text-white" />
          <X
            size={14}
            className="cursor-pointer hover:text-white"
            onClick={toggleTerminal}
          />
        </div>
      </div>
      <div className="flex-1 p-3 font-mono text-sm overflow-auto text-[#cccccc] bg-[#09090b]">
        <div className="flex gap-2">
          <span className="text-green-500">➜</span>
          <span className="text-blue-400">collabdev-studio</span>
          <span className="text-yellow-400">git:(main)</span>
          <span>npm run dev</span>
        </div>
        <div className="mt-1">&nbsp;&nbsp;VITE v5.0.0 ready in 240 ms</div>
        <div className="mt-1">&nbsp;&nbsp;➜ Local: http://localhost:5173/</div>
        <div className="mt-1">&nbsp;&nbsp;➜ Network: use --host to expose</div>
        <div className="mt-2 flex gap-2">
          <span className="text-green-500">➜</span>
          <span className="text-blue-400">collabdev-studio</span>
          <span className="text-yellow-400">git:(main)</span>
          <span className="animate-pulse block w-2 h-4 bg-white/50"></span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
