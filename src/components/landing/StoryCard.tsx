interface StoryCardProps {
    title: string;
    author: string;
    content: string;
}

export function StoryCard({ title, author, content }: StoryCardProps) {
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
                {content}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                — {author}
            </p>
        </div>
    );
}