'use client';

import { BiCopy } from 'react-icons/bi';
import { toast } from 'sonner';
import { type Bookmark } from '@/lib/markdownParser';

interface BookmarkCardProps {
    bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
    const getPreviewMarkdown = () => `---
title: ${bookmark.title}
url: ${bookmark.url}
description: ${bookmark.description}
tags: []
type: bookmark
site_name: ${bookmark.site_name}
favicon: ${bookmark.favicon}
${bookmark.image ? `image: ${bookmark.image}` : ''}
---
`;

    const copyToClipboard = async () => {
        try {
            const markdown = getPreviewMarkdown().replace('tags: []', `tags: []\ndate: ${new Date().toISOString()}`);
            await navigator.clipboard.writeText(markdown);
            toast.success('Bookmark markdown copied!');
        } catch (err) {
            toast.error('Failed to copy bookmark');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-start gap-4">
                {bookmark.favicon && (
                    <img 
                        src={bookmark.favicon} 
                        alt="Site favicon" 
                        className="w-8 h-8 rounded"
                    />
                )}
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {bookmark.title}
                    </h2>
                    {bookmark.site_name && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {bookmark.site_name}
                        </p>
                    )}
                    <a 
                        href={bookmark.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-blue-500 hover:underline mt-1 block"
                    >
                        {bookmark.url}
                    </a>
                </div>
            </div>

            {bookmark.description && (
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    {bookmark.description}
                </p>
            )}

            {bookmark.image && (
                <img 
                    src={bookmark.image}
                    alt="Preview"
                    className="mt-4 rounded-lg w-full object-cover max-h-48"
                />
            )}

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 
                             bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                             transition-colors duration-200"
                >
                    <BiCopy className="text-xl" />
                    <span>Copy Bookmark Markdown</span>
                </button>
                
                <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Preview of markdown to be copied:
                    </p>
                    <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        <code className="text-gray-800 dark:text-gray-200">
                            {getPreviewMarkdown()}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}