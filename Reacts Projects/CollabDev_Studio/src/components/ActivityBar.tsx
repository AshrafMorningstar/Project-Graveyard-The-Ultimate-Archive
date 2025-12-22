/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from "react";
import { Files, Search, GitBranch, Bug, Blocks, Settings } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import clsx from "clsx";

const ActivityBar = () => {
  const { activeView, setActiveView } = useAppStore();

  const items = [
    { id: "explorer", icon: Files },
    { id: "search", icon: Search },
    { id: "git", icon: GitBranch },
    { id: "debug", icon: Bug },
    { id: "extensions", icon: Blocks },
  ] as const;

  return (
    <div className="w-12 bg-surface text-textMuted flex flex-col items-center py-2 border-r border-border h-full justify-between z-10 shadow-xl">
      <div className="flex flex-col gap-4 w-full items-center">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={clsx(
              "p-2 w-full flex justify-center transition-all duration-200 hover:text-textMain relative group",
              activeView === item.id
                ? "text-primary border-l-2 border-primary bg-white/5"
                : "opacity-60 hover:opacity-100"
            )}
          >
            <item.icon size={24} strokeWidth={1.5} />
            <div className="absolute left-10 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
              {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
            </div>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4 mb-2 w-full items-center">
        <button className="p-2 hover:text-textMain opacity-60 hover:opacity-100 transition-colors">
          <Settings size={24} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default ActivityBar;
