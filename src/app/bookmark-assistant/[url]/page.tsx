'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BiCopy } from 'react-icons/bi'; // Import copy icon
import { toast } from 'sonner'; // Using sonner for notifications

interface Metadata {
    title?: string;
    description?: string;
    image?: string;
    favicon?: string;
    siteName?: string;
    url: string;
}

export default function BookmarkAssistant() {
    const params = useParams();
    const [metadata, setMetadata] = useState<Metadata | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const formatBookmarkMarkdown = (metadata: Metadata) => {
        const timestamp = new Date().toISOString();
        const markdownTemplate = `---
title: ${metadata.title || 'Untitled'}
url: ${metadata.url}
description: ${(metadata.description || '').replace(/\n/g, ' ')}
date: ${timestamp}
tags: []
type: bookmark
site_name: ${metadata.siteName || ''}
favicon: ${metadata.favicon || ''}
${metadata.image ? `image: ${metadata.image}` : ''}
---


`;
        return markdownTemplate.trim();
    };

    const copyToClipboard = async (metadata: Metadata) => {
        try {
            const formattedBookmark = formatBookmarkMarkdown(metadata);
            await navigator.clipboard.writeText(formattedBookmark);
            toast.success('Bookmark markdown copied to clipboard!');
        } catch (err) {
            toast.error('Failed to copy bookmark');
            console.error('Copy failed:', err);
        }
    };

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                setIsLoading(true);
                let url = decodeURIComponent(params.url as string);
                
                // Ensure URL has protocol
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = `https://${url}`;
                }

                // Using microlink.io API
                const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch metadata: ${response.statusText}`);
                }

                const data = await response.json();
                
                if (data.status === 'success') {
                    const metadata: Metadata = {
                        title: data.data.title || '',
                        description: data.data.description || '',
                        image: data.data.image?.url,
                        siteName: data.data.publisher,
                        favicon: `https://www.google.com/s2/favicons?domain=${url}&sz=128`,
                        url: url
                    };
                    setMetadata(metadata);
                } else {
                    throw new Error('Failed to extract metadata');
                }
            } catch (err) {
                setError('Failed to fetch metadata. Please check the URL and try again.');
                console.error('Error fetching metadata:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (params.url) {
            fetchMetadata();
        }
    }, [params.url]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                    Bookmark Assistant
                </h1>

                {isLoading && (
                    <div className="flex items-center justify-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg">
                        {error}
                        <div className="mt-2 text-sm">
                            URL attempted: {decodeURIComponent(params.url as string)}
                        </div>
                    </div>
                )}

                {metadata && !isLoading && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="flex items-start gap-4">
                            {metadata.favicon && (
                                <img 
                                    src={metadata.favicon} 
                                    alt="Site favicon" 
                                    className="w-8 h-8 rounded"
                                />
                            )}
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {metadata.title}
                                </h2>
                                {metadata.siteName && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {metadata.siteName}
                                    </p>
                                )}
                                <a 
                                    href={metadata.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-sm text-blue-500 hover:underline mt-1 block"
                                >
                                    {metadata.url}
                                </a>
                            </div>
                        </div>

                        {metadata.description && (
                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                                {metadata.description}
                            </p>
                        )}

                        {metadata.image && (
                            <img 
                                src={metadata.image} 
                                alt="Preview" 
                                className="mt-4 rounded-lg w-full object-cover max-h-48"
                            />
                        )}

                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 
                                         bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                                         transition-colors duration-200"
                                onClick={() => copyToClipboard(metadata)}
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
                                        {metadata ? formatBookmarkMarkdown(metadata) : ''}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
