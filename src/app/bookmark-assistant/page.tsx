'use client';

import { useState } from 'react';
import { BsBookmarkPlus } from 'react-icons/bs'; // Using Bootstrap icons from react-icons
import Bookmark from '@/components/bookmark/Bookmark';

const initialBookmarks = [
    {
        title: 'Next.js Documentation',
        description: 'Learn about Next.js features and API.',
        url: 'https://nextjs.org/docs',
        userNotes: 'Great resource for learning Next.js!',
        tags: ['nextjs', 'documentation'],
    },
    {
        title: 'React Documentation',
        description: 'Official React documentation.',
        url: 'https://reactjs.org/docs/getting-started.html',
        userNotes: 'Helpful for understanding React concepts.',
        tags: ['react', 'documentation'],
    },
];

export default function BookmarkAssistant() {
    const [searchTerm, setSearchTerm] = useState('');
    const [bookmarks, _setBookmarks] = useState(initialBookmarks);

    const filteredBookmarks = bookmarks.filter(bookmark =>
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Bookmark Assistant
                    </h1>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
                                 text-white rounded-lg transition-colors duration-200
                                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={() => {
                            // Add your bookmark handling logic here
                            console.log('Add bookmark clicked');
                        }}
                    >
                        <BsBookmarkPlus className="text-lg" />
                        <span>Add Bookmark</span>
                    </button>
                </div>
                
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search bookmarks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-colors"
                    />
                    <svg 
                        className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                    </svg>
                </div>

                <div className="mt-8 space-y-4">
                    {filteredBookmarks.map((bookmark, index) => (
                        <Bookmark key={index} {...bookmark} />
                    ))}
                </div>
            </div>
        </div>
    );
}
