interface BookmarkProps {
    title: string;
    description: string;
    url: string;
    userNotes: string;
    tags: string[];
}

const Bookmark = ({ title, description, url, userNotes, tags }: BookmarkProps) => {
    return (
        <div className="p-4 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
            <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
                {title}
            </a>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{userNotes}</p>
            <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span 
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Bookmark;