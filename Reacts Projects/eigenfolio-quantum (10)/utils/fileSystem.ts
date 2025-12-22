/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { VirtualFile } from '../types';

export const initialFileSystem: VirtualFile = {
  id: 'root',
  name: 'root',
  type: 'folder',
  createdAt: Date.now(),
  children: [
    {
      id: 'home',
      name: 'home',
      type: 'folder',
      parentId: 'root',
      createdAt: Date.now(),
      children: [
        {
          id: 'user',
          name: 'guest',
          type: 'folder',
          parentId: 'home',
          createdAt: Date.now(),
          children: [
            {
              id: 'docs',
              name: 'Documents',
              type: 'folder',
              parentId: 'user',
              createdAt: Date.now(),
              children: [
                 { id: 'readme', name: 'README.txt', type: 'file', parentId: 'docs', createdAt: Date.now(), content: 'Welcome to Eigenfolio Quantum OS.\nVersion 2.0.0-Singularity\n\nCommand List:\n- help\n- ls\n- cd\n- mkdir\n- touch' }
              ]
            },
            {
              id: 'projects',
              name: 'Projects',
              type: 'folder',
              parentId: 'user',
              createdAt: Date.now(),
              children: [
                { id: 'p1', name: 'main.rs', type: 'code', language: 'rust', parentId: 'projects', createdAt: Date.now(), content: 'fn main() {\n    println!("Hello Quantum World!");\n}' },
                { id: 'p2', name: 'app.tsx', type: 'code', language: 'typescript', parentId: 'projects', createdAt: Date.now(), content: 'import React from "react";\n\nexport const App = () => <div>Hello World</div>;' }
              ]
            }
          ]
        }
      ]
    },
    {
        id: 'sys',
        name: 'system',
        type: 'folder',
        parentId: 'root',
        createdAt: Date.now(),
        children: [
            { id: 'kernel', name: 'kernel.sys', type: 'file', parentId: 'sys', createdAt: Date.now(), content: 'BINARY DATA DO NOT EDIT' }
        ]
    }
  ]
};

export const findFile = (root: VirtualFile, path: string[]): VirtualFile | null => {
    if (path.length === 0) return root;
    const [current, ...rest] = path;
    
    // Handle 'root' explicitly if path starts with /
    if (current === '') return findFile(root, rest);

    const found = root.children?.find(c => c.name === current);
    if (found) {
        if (rest.length === 0) return found;
        if (found.type === 'folder') return findFile(found, rest);
    }
    return null;
};

// Helper to flatten FS for ID search
export const findFileById = (root: VirtualFile, id: string): VirtualFile | null => {
    if (root.id === id) return root;
    if (root.children) {
        for (const child of root.children) {
            const found = findFileById(child, id);
            if (found) return found;
        }
    }
    return null;
};

// Helper to add file
export const addFileToFolder = (root: VirtualFile, folderId: string, newFile: VirtualFile): VirtualFile => {
    if (root.id === folderId) {
        return { ...root, children: [...(root.children || []), newFile] };
    }
    if (root.children) {
        return {
            ...root,
            children: root.children.map(child => addFileToFolder(child, folderId, newFile))
        };
    }
    return root;
};

// Helper to update file content
export const updateFileContent = (root: VirtualFile, fileId: string, content: string): VirtualFile => {
    if (root.id === fileId) {
        return { ...root, content };
    }
    if (root.children) {
        return {
            ...root,
            children: root.children.map(child => updateFileContent(child, fileId, content))
        };
    }
    return root;
}

// Helper to delete file
export const deleteFile = (root: VirtualFile, fileId: string): VirtualFile => {
    if (root.children) {
        // If child is the one to delete, remove it
        if (root.children.some(c => c.id === fileId)) {
            return { ...root, children: root.children.filter(c => c.id !== fileId) };
        }
        // Recurse
        return {
            ...root,
            children: root.children.map(child => deleteFile(child, fileId))
        };
    }
    return root;
}
