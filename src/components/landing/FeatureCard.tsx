interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl hover:shadow-lg transition-shadow">
            <div className="text-blue-600 dark:text-blue-400 mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
                {description}
            </p>
        </div>
    );
}