/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { create } from 'zustand';

export interface VirtualFile {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'image' | 'code' | 'note' | 'zip';
  content?: string;
  parentId: string | null; // null for desktop
  position?: { x: number; y: number };
  size?: string;
  date?: string;
}

interface FileSystemState {
  files: VirtualFile[];
  trash: VirtualFile[];
  addFile: (file: VirtualFile) => void;
  moveFile: (id: string, position: { x: number; y: number }) => void;
  deleteFile: (id: string) => void;
  restoreFile: (id: string) => void;
  emptyTrash: () => void;
  updateFileContent: (id: string, content: string) => void;
}

export const useFileSystem = create<FileSystemState>((set) => ({
  files: [
    { id: '1', name: 'Welcome.txt', type: 'note', content: 'Welcome to Eigenfolio Quantum OS.\nExplore the nebula.', parentId: null, position: { x: 50, y: 50 }, size: '1 KB', date: 'Just now' },
    { id: '2', name: 'Project_Alpha', type: 'folder', parentId: null, position: { x: 50, y: 150 }, size: '--', date: 'Yesterday' },
    { id: '3', name: 'secret_key.pem', type: 'code', content: 'QUANTUM_ENTANGLEMENT_KEY_882', parentId: null, position: { x: 50, y: 250 }, size: '2 KB', date: '2 days ago' },
    { id: '4', name: 'nebula_v1.png', type: 'image', parentId: '2', position: { x: 0, y: 0 }, size: '2.4 MB', date: 'Last week' }, // Inside folder
    { id: '5', name: 'notes.md', type: 'file', parentId: '2', content: '# Meeting Notes', position: { x: 0, y: 0 }, size: '5 KB', date: 'Today' },
    { id: '6', name: 'System_Log.log', type: 'file', parentId: null, content: 'System boot successful...', position: { x: 150, y: 50 }, size: '12 KB', date: 'Today' },
  ],
  trash: [],
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  moveFile: (id, position) => set((state) => ({
    files: state.files.map(f => f.id === id ? { ...f, position } : f)
  })),
  deleteFile: (id) => set((state) => {
    const fileToDelete = state.files.find(f => f.id === id);
    if (!fileToDelete) return state;
    // Remove from files, add to trash
    return {
        files: state.files.filter(f => f.id !== id),
        trash: [...state.trash, fileToDelete]
    };
  }),
  restoreFile: (id) => set((state) => {
    const fileToRestore = state.trash.find(f => f.id === id);
    if (!fileToRestore) return state;
    return {
        trash: state.trash.filter(f => f.id !== id),
        files: [...state.files, fileToRestore]
    };
  }),
  emptyTrash: () => set({ trash: [] }),
  updateFileContent: (id, content) => set((state) => ({
    files: state.files.map(f => f.id === id ? { ...f, content } : f)
  })),
}));
