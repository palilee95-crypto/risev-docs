import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const originalName = file.name || 'uploaded_media';
    const ext = path.extname(originalName).toLowerCase() || '.png';
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
    const uniqueFileName = `${baseName}_${Date.now()}${ext}`;
    const filePath = path.join(UPLOAD_DIR, uniqueFileName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;
    const isVideo = file.type.startsWith('video/') || ['.mp4', '.mov', '.webm'].includes(ext);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      originalName,
      size: file.size,
      type: file.type,
      isVideo,
      markdownSnippet: isVideo 
        ? `<video controls className="rounded-xl w-full my-4 border" src="${publicUrl}" />`
        : `![${baseName}](${publicUrl})`,
    });
  } catch (err: any) {
    console.error('[Upload API Error]:', err);
    return NextResponse.json({ error: err.message || 'File upload failed' }, { status: 500 });
  }
}
