import { ReactNode } from 'react';

interface StepProps {
    number: string;
    title: string;
    description: string | ReactNode;
}

export function Step({ number, title, description }: StepProps) {
    return (
        <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    {number}
                </span>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {title}
                </h3>
                <div className="text-gray-600 dark:text-gray-300">
                    {description}
                </div>
            </div>
        </div>
    );
}