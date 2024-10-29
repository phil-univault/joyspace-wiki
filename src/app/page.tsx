'use client';

import Link from 'next/link';
import { motion } from 'framer-motion'; // For smooth animations
import { BiBookmark, BiCamera, BiFolder } from 'react-icons/bi';
import { FeatureCard } from '@/components/landing/FeatureCard';
import { StoryCard } from '@/components/landing/StoryCard';
import { Step } from '@/components/landing/Step';
import { BookmarkSlider } from '@/components/landing/Bookmark-Slider';
import { useState, useEffect } from 'react';
import { type Bookmark } from '@/lib/markdownParser';
import { useRouter } from 'next/navigation';
import { formatAndValidateUrl } from '@/lib/urlUtils';

export default function HomePage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [url, setUrl] = useState('');
  const [_error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/bookmarks')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setBookmarks(data))
      .catch(error => {
        console.error('Error fetching bookmarks:', error);
        setBookmarks([]); // Set empty array as fallback
      });
  }, []);

  const handleTryAssistant = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      const result = formatAndValidateUrl(url);
      console.log(result, 11);
      if (result.isValid) {
        const encodedUrl = encodeURIComponent(result.url);
        router.push(`/bookmark-assistant/${encodedUrl}`);
      } else {
        setError(result.error);
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section with Slider */}
      <section className="px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[1.5rem] md:text-[2.5rem] font-bold text-gray-900 dark:text-white mb-8"
          >
            Bring Joy to Your Digital Space
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Open-source tools to organize your bookmarks, screenshots, and media <br /> Making digital organization delightful.
          </p>
        </div>

        {/* Bookmark Slider */}
      

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 mt-12">
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="https://github.com/univault-org/JoySpace"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started →
            </Link>
            <button
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Try Bookmark Assistant
            </button>
          </div>

          {/* URL Input Form */}
          {showUrlInput && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-lg mt-4"
            >
              <form onSubmit={handleTryAssistant}>
                <input
                  type="text"
                  placeholder="Insert any URL and press Enter"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 
                           dark:border-gray-700 bg-white dark:bg-gray-800 
                           text-gray-900 dark:text-white focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent
                           transition-colors"
                  autoFocus
                />
              </form>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                Enter any URL to see how our assistant extracts and formats bookmark information
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Bookmarks Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Bookmarks
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Discover some of our community's favorite bookmarks
          </p>
        </div>
        <BookmarkSlider bookmarks={bookmarks} />
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Your Digital Life, Organized
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BiBookmark className="w-8 h-8" />}
              title="Smart Bookmarks"
              description="Enhanced bookmarks with rich metadata, making them easy to find and organize."
            />
            <FeatureCard 
              icon={<BiCamera className="w-8 h-8" />}
              title="Screenshot Management"
              description="Organize screenshots with automatic naming and categorization."
            />
            <FeatureCard 
              icon={<BiFolder className="w-8 h-8" />}
              title="Local-First"
              description="Your data stays on your machine, with optional sync capabilities."
            />
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="px-4 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Community-Driven Platform
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <StoryCard 
              title="Open Contribution Model"
              author="For Everyone"
              content="JoySpace is built by the community, for the community. Any user with a verified email can become an admin and contribute to JoySpace.wiki, helping shape the future of digital organization."
            />
            <StoryCard 
              title="Growing Together"
              author="Early Access"
              content="Be among the first to organize your digital space while we develop more features. Your feedback and contributions will help build JoySpace.wiki into a comprehensive knowledge base."
            />
          </div>
          <div className="text-center mt-12">
            <Link 
              href="https://github.com/univault-org/JoySpace/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
               Share Feedback → 
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Get Started in Minutes
          </h2>
          <div className="space-y-6">
            <Step 
              number="01"
              title="Download JoySpace"
              description={
                <span>
                  Clone or download the repository from{' '}
                  <a 
                    href="https://github.com/univault-org/JoySpace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    github.com/univault-org/JoySpace
                  </a>
                </span>
              }
            />
            <Step 
              number="02"
              title="Choose Your Space"
              description="Open the HTML file in your preferred folder: 'bookmarks' for web links, 'screenshots' for image captures, or 'media' for photos and videos."
            />
            <Step 
              number="03"
              title="Start Organizing"
              description="Edit and download your markdown files to the respective folders. Each space (bookmarks, screenshots, media) will automatically organize and display your content."
            />
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              JoySpace runs entirely in your browser - no installation or server needed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

