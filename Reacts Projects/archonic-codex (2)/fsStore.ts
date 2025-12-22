/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FileNode, FileType } from './types';

interface FileSystemState {
    files: Record<string, FileNode>;
    rootId: string;
    
    // Actions
    createFile: (parentId: string, name: string, type: FileType, content?: string) => string;
    createFolder: (parentId: string, name: string) => string;
    deleteNode: (id: string) => void;
    moveNode: (id: string, newParentId: string) => void;
    renameNode: (id: string, newName: string) => void;
    updateFileContent: (id: string, content: string) => void;
    getContents: (folderId: string) => FileNode[];
    getPath: (id: string) => string;
}

const INITIAL_ROOT_ID = 'root';
const INITIAL_FILES: Record<string, FileNode> = {
    'root': { id: 'root', parentId: null, name: 'Root', type: 'folder', children: ['home'], createdAt: new Date() },
    'home': { id: 'home', parentId: 'root', name: 'home', type: 'folder', children: ['user'], createdAt: new Date() },
    'user': { id: 'user', parentId: 'home', name: 'guest', type: 'folder', children: ['docs', 'pics', 'code', 'welcome'], createdAt: new Date() },
    'docs': { id: 'docs', parentId: 'user', name: 'Documents', type: 'folder', children: [], createdAt: new Date() },
    'pics': { id: 'pics', parentId: 'user', name: 'Pictures', type: 'folder', children: [], createdAt: new Date() },
    'code': { id: 'code', parentId: 'user', name: 'Projects', type: 'folder', children: ['project1'], createdAt: new Date() },
    'project1': { id: 'project1', parentId: 'code', name: 'main.tsx', type: 'code', content: "console.log('Hello World');", createdAt: new Date() },
    'welcome': { id: 'welcome', parentId: 'user', name: 'README.md', type: 'text', content: "# Welcome to AshrafOS\n\nThis is a fully persistent file system.\nTry using the Terminal!", createdAt: new Date() },
};

export const useFileSystem = create<FileSystemState>()(
    persist(
        (set, get) => ({
            files: INITIAL_FILES,
            rootId: INITIAL_ROOT_ID,

            createFile: (parentId, name, type, content = '') => {
                const id = Math.random().toString(36).substr(2, 9);
                const newNode: FileNode = {
                    id,
                    parentId,
                    name,
                    type,
                    content,
                    createdAt: new Date()
                };

                set(state => {
                    const parent = state.files[parentId];
                    if (!parent || parent.type !== 'folder') return state;

                    return {
                        files: {
                            ...state.files,
                            [id]: newNode,
                            [parentId]: {
                                ...parent,
                                children: [...(parent.children || []), id]
                            }
                        }
                    };
                });
                return id;
            },

            createFolder: (parentId, name) => {
                const id = Math.random().toString(36).substr(2, 9);
                const newNode: FileNode = {
                    id,
                    parentId,
                    name,
                    type: 'folder',
                    children: [],
                    createdAt: new Date()
                };

                set(state => {
                    const parent = state.files[parentId];
                    if (!parent || parent.type !== 'folder') return state;

                    return {
                        files: {
                            ...state.files,
                            [id]: newNode,
                            [parentId]: {
                                ...parent,
                                children: [...(parent.children || []), id]
                            }
                        }
                    };
                });
                return id;
            },

            deleteNode: (id) => {
                set(state => {
                    const node = state.files[id];
                    if (!node || !node.parentId) return state; // Can't delete root

                    const parent = state.files[node.parentId];
                    const newFiles = { ...state.files };
                    
                    // Recursive delete function would be ideal here, but for simple MVP:
                    delete newFiles[id];

                    return {
                        files: {
                            ...newFiles,
                            [parent.id]: {
                                ...parent,
                                children: parent.children?.filter(childId => childId !== id)
                            }
                        }
                    };
                });
            },

            moveNode: (id, newParentId) => {
                // Implementation for drag and drop later
            },

            renameNode: (id, newName) => {
                set(state => ({
                    files: {
                        ...state.files,
                        [id]: { ...state.files[id], name: newName }
                    }
                }));
            },

            updateFileContent: (id, content) => {
                set(state => ({
                    files: {
                        ...state.files,
                        [id]: { ...state.files[id], content }
                    }
                }));
            },

            getContents: (folderId) => {
                const state = get();
                const folder = state.files[folderId];
                if (!folder || !folder.children) return [];
                return folder.children.map(id => state.files[id]).filter(Boolean);
            },

            getPath: (id) => {
                const state = get();
                let current = state.files[id];
                let path = '';
                
                while (current && current.parentId) {
                    path = '/' + current.name + path;
                    current = state.files[current.parentId];
                }
                return path || '/';
            }
        }),
        {
            name: 'eigenfolio-filesystem',
        }
    )
);