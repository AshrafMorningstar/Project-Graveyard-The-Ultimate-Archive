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

import React, { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import {
  Folder,
  FileCode,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

const FileItem = ({
  name,
  type,
  depth,
  children,
}: {
  name: string;
  type: "file" | "folder";
  depth: number;
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div
        onClick={() => type === "folder" && setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 py-1 pr-2 hover:bg-white/5 cursor-pointer text-sm text-textMuted hover:text-textMain transition-colors select-none group"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {type === "folder" && (
          <span
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-90" : ""
            }`}
          >
            <ChevronRight size={12} />
          </span>
        )}
        {type === "folder" ? (
          <Folder
            size={14}
            className="text-accent group-hover:text-accent/80"
          />
        ) : (
          <FileCode
            size={14}
            className="text-primary group-hover:text-primary/80"
          />
        )}
        <span className="truncate">{name}</span>
      </div>
      {isOpen && children && <div>{children}</div>}
    </div>
  );
};

const Sidebar = () => {
  const { activeView } = useAppStore();

  if (activeView !== "explorer") {
    return (
      <div className="w-60 bg-surface border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-xs font-bold uppercase tracking-wider text-textMuted">
            {activeView}
          </h2>
        </div>
        <div className="p-4 text-sm text-textMuted italic opacity-50">
          {activeView.charAt(0).toUpperCase() + activeView.slice(1)} view not
          yet implemented.
        </div>
      </div>
    );
  }

  return (
    <div className="w-60 bg-surface border-r border-border flex flex-col h-full select-none">
      <div className="p-3 text-xs font-bold text-textMuted uppercase tracking-wider flex justify-between items-center border-b border-border/50">
        <span>Explorer</span>
        <MoreHorizontal size={16} className="cursor-pointer hover:text-white" />
      </div>

      <div className="flex-1 overflow-auto py-2 custom-scrollbar">
        <FileItem name="COLLABDEV-STUDIO" type="folder" depth={0}>
          <FileItem name="src" type="folder" depth={1}>
            <FileItem name="components" type="folder" depth={2}>
              <FileItem name="ActivityBar.tsx" type="file" depth={3} />
              <FileItem name="Sidebar.tsx" type="file" depth={3} />
              <FileItem name="Editor.tsx" type="file" depth={3} />
              <FileItem name="Terminal.tsx" type="file" depth={3} />
            </FileItem>
            <FileItem name="store" type="folder" depth={2}>
              <FileItem name="useAppStore.ts" type="file" depth={3} />
            </FileItem>
            <FileItem name="App.tsx" type="file" depth={2} />
            <FileItem name="index.css" type="file" depth={2} />
            <FileItem name="main.tsx" type="file" depth={2} />
          </FileItem>
          <FileItem name="public" type="folder" depth={1}>
            <FileItem name="vite.svg" type="file" depth={2} />
          </FileItem>
          <FileItem name="index.html" type="file" depth={1} />
          <FileItem name="package.json" type="file" depth={1} />
          <FileItem name="README.md" type="file" depth={1} />
          <FileItem name="tsconfig.json" type="file" depth={1} />
        </FileItem>
      </div>
    </div>
  );
};

export default Sidebar;
