import matter from 'gray-matter';

export interface Bookmark {
    title: string;
    url: string;
    description: string;
    date: string;
    tags: string[];
    type: string;
    site_name: string;
    favicon: string;
    image?: string;
    createdAt: string;
}

export function parseFeatureBookmarks(content: string): Bookmark[] {
    // Split content by sections (## headers)
    const sections = content.split('\n## ').slice(1);
    
    return sections.map(section => {
        try {
            const [_, frontmatter] = section.split('---\n');
            
            // Process all frontmatter lines to handle colons in values
            const processedFrontmatter = frontmatter.split('\n').map(line => {
                // Skip empty lines or lines without colons
                if (!line.trim() || !line.includes(':')) {
                    return line;
                }

                // Split only at the first colon to separate key and value
                const [key, ...valueParts] = line.split(':');
                const value = valueParts.join(':').trim(); // Rejoin the value parts with colons

                // Skip if no value or if it's an array (tags: [])
                if (!value || value.startsWith('[')) {
                    return line;
                }

                // If value isn't already quoted and contains special characters
                if (!value.startsWith('"') && !value.startsWith("'")) {
                    // Add quotes if the value contains special characters
                    if (value.includes(':') || value.includes('#') || value.includes('{') || 
                        value.includes('}') || value.includes('[') || value.includes(']')) {
                        return `${key}: "${value.replace(/"/g, '\\"')}"`;
                    }
                }
                
                return line;
            }).join('\n');

            const { data } = matter(`---\n${processedFrontmatter}`);
            return data as Bookmark;
        } catch (error) {
            console.error('Error parsing bookmark:', error);
            console.log('Problematic section:', section);
            return null;
        }
    }).filter(Boolean) as Bookmark[];
}