/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <div className="flex-1 h-full bg-background overflow-hidden relative flex flex-col">
      {/* Tab Bar Mock */}
      <div className="flex bg-surface border-b border-border h-[37px]">
        <div className="px-4 text-sm border-r border-border border-t-2 border-t-primary bg-[#1e1e1e] text-textMain cursor-pointer flex items-center gap-2 min-w-[120px]">
          <span className="text-primary text-xs font-bold">TSX</span>
          <span>App.tsx</span>
        </div>
        <div className="px-4 text-sm border-r border-border text-textMuted cursor-pointer flex items-center gap-2 hover:bg-white/5 min-w-[120px]">
          <span className="text-accent text-xs font-bold">TS</span>
          <span>useAppStore.ts</span>
        </div>
      </div>

      <div className="flex-1 w-full bg-[#1e1e1e]">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          defaultValue={`// Welcome to CollabDev Studio
// Start coding in real-time with your team.

import React from 'react';

const App = () => {
  return (
    <div className="p-4">
      <h1>Hello CollabDev</h1>
    </div>
  );
};`}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            fontFamily: 'Consolas, "Courier New", monospace',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16 },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
