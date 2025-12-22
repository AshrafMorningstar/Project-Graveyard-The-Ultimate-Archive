/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { Book, Bookmark, BookOpen } from 'lucide-react';

const Books = () => {
    const books = [
        { title: "Clean Code", author: "Robert C. Martin", cover: "#ef4444" },
        { title: "The Pragmatic Programmer", author: "Andrew Hunt", cover: "#3b82f6" },
        { title: "Design Patterns", author: "Erich Gamma", cover: "#eab308" },
        { title: "Refactoring", author: "Martin Fowler", cover: "#10b981" },
        { title: "You Don't Know JS", author: "Kyle Simpson", cover: "#f97316" },
    ];

    return (
        <div className="h-full bg-[#fff] dark:bg-[#1e1e1e] text-black dark:text-white flex flex-col">
            <div className="h-12 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-6">
                <span className="font-bold flex items-center gap-2"><BookOpen /> Library</span>
                <div className="flex text-sm gap-4 text-gray-500">
                    <span>Reading Now</span>
                    <span className="text-black dark:text-white font-bold">Library</span>
                    <span>Book Store</span>
                </div>
            </div>

            <div className="flex-1 p-8 overflow-auto">
                <h2 className="text-2xl font-bold mb-6">Reading Now</h2>
                <div className="flex gap-8 mb-12 overflow-x-auto pb-4">
                    <div className="shrink-0 w-32 h-48 bg-gray-800 rounded shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0 hover:-translate-y-2 cursor-pointer relative">
                         <div className="absolute inset-0 bg-blue-600 flex items-center justify-center p-4 text-center text-white font-bold font-serif opacity-90">
                             The React Handbook
                         </div>
                         <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/20 rounded-full overflow-hidden">
                             <div className="w-[45%] h-full bg-white"></div>
                         </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-6">My Collection</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {books.map((book, i) => (
                        <div key={i} className="flex flex-col gap-2 group cursor-pointer">
                            <div className={`aspect-[2/3] rounded-r-md rounded-l-sm shadow-lg group-hover:shadow-2xl transition-all hover:-translate-y-2 relative`} style={{ backgroundColor: book.cover }}>
                                <div className="absolute inset-y-0 left-0 w-2.5 bg-black/20 rounded-l-sm"></div>
                                <div className="p-4 text-white text-center font-serif font-bold pt-8 leading-tight">
                                    {book.title}
                                </div>
                            </div>
                            <div>
                                <div className="font-bold text-sm truncate">{book.title}</div>
                                <div className="text-xs text-gray-500">{book.author}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Books;
