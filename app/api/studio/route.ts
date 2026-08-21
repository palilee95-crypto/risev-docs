import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DOCS_ROOT = path.join(process.cwd(), 'content/docs');

interface DocItem {
  id: string;
  category: string;
  title: string;
  relativePath: string;
  content: string;
  lastModified: string;
}

function parseTitle(content: string, fallback: string): string {
  const match = content.match(/^title:\s*(.+)$/m);
  if (match && match[1]) {
    return match[1].replace(/^['"]|['"]$/g, '').trim();
  }
  return fallback;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const targetFile = searchParams.get('file');

    if (targetFile) {
      const fullPath = path.join(DOCS_ROOT, targetFile);
      if (!fs.existsSync(fullPath)) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
      }
      const content = fs.readFileSync(fullPath, 'utf8');
      return NextResponse.json({
        relativePath: targetFile,
        content,
        title: parseTitle(content, targetFile),
      });
    }

    // List all docs recursively
    const docs: DocItem[] = [];

    // Root index.mdx
    const indexPath = path.join(DOCS_ROOT, 'index.mdx');
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf8');
      const stats = fs.statSync(indexPath);
      docs.push({
        id: 'index',
        category: 'Utama',
        title: parseTitle(content, 'Selamat Datang'),
        relativePath: 'index.mdx',
        content,
        lastModified: stats.mtime.toISOString(),
      });
    }

    const categories = [
      { name: 'Peniaga (Merchant)', folder: 'merchant' },
      { name: 'Pelanggan (Customer)', folder: 'customer' },
    ];

    for (const cat of categories) {
      const dirPath = path.join(DOCS_ROOT, cat.folder);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.mdx'));
        for (const file of files) {
          const filePath = path.join(dirPath, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const stats = fs.statSync(filePath);
          const relativePath = `${cat.folder}/${file}`;
          docs.push({
            id: relativePath.replace('.mdx', ''),
            category: cat.name,
            title: parseTitle(content, file.replace('.mdx', '')),
            relativePath,
            content,
            lastModified: stats.mtime.toISOString(),
          });
        }
      }
    }

    return NextResponse.json({ docs });
  } catch (err: any) {
    console.error('[Studio API GET Error]:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { relativePath, content } = body;

    if (!relativePath || typeof content !== 'string') {
      return NextResponse.json({ error: 'relativePath and content are required' }, { status: 400 });
    }

    // Security check: prevent directory traversal
    const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, '');
    const fullPath = path.join(DOCS_ROOT, safePath);

    // Ensure parent directory exists
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fullPath, content, 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Article saved successfully!',
      relativePath: safePath,
      lastModified: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('[Studio API POST Error]:', err);
    return NextResponse.json({ error: err.message || 'Failed to save document' }, { status: 500 });
  }
}
