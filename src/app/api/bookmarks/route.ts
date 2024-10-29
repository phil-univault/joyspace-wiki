import fs from 'fs';
import path from 'path';
import { parseFeatureBookmarks } from '@/lib/markdownParser';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/components/landing/Features.md');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const bookmarks = parseFeatureBookmarks(fileContent);
    
    return new Response(JSON.stringify(bookmarks), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Bookmarks API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch bookmarks' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
