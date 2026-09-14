'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'fumadocs-core/link';
import { 
  FileText, 
  UploadCloud, 
  Save, 
  Eye, 
  Edit3, 
  Columns, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Image as ImageIcon, 
  Video, 
  Plus, 
  Search, 
  Copy, 
  Trash2,
  HelpCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface DocItem {
  id: string;
  category: string;
  title: string;
  relativePath: string;
  content: string;
  lastModified: string;
}

interface UploadedMedia {
  url: string;
  fileName: string;
  originalName: string;
  size: number;
  isVideo: boolean;
  markdownSnippet: string;
  uploadedAt: string;
}

export default function StudioPage() {
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);
  const [content, setContent] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [langFilter, setLangFilter] = useState<'all' | 'ms' | 'en'>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string>('');
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');

  const getLiveUrl = (relativePath?: string) => {
    if (!relativePath) return '/ms/docs/merchant/unboxing-stand';
    if (relativePath === 'index.mdx') return '/ms/docs/merchant/unboxing-stand';
    const isEn = relativePath.endsWith('.en.mdx');
    const cleanPath = relativePath.replace('.en.mdx', '').replace('.mdx', '');
    return `/${isEn ? 'en' : 'ms'}/docs/${cleanPath}`;
  };
  
  // Media Upload State
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [recentUploads, setRecentUploads] = useState<UploadedMedia[]>([]);
  const [showMediaModal, setShowMediaModal] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch all articles
  const fetchDocs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/studio');
      const data = await res.json();
      if (data.docs && data.docs.length > 0) {
        setDocs(data.docs);
        if (!selectedDoc) {
          setSelectedDoc(data.docs[0]);
          setContent(data.docs[0].content);
        } else {
          const updated = data.docs.find((d: DocItem) => d.relativePath === selectedDoc.relativePath);
          if (updated) {
            setSelectedDoc(updated);
            setContent(updated.content);
          }
        }
      }
    } catch (err: any) {
      console.error('Failed to load docs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleSelectDoc = (doc: DocItem) => {
    setSelectedDoc(doc);
    setContent(doc.content);
    setSaveSuccess(false);
    setSaveError('');
  };

  // Save current doc
  const handleSave = async () => {
    if (!selectedDoc) return;
    try {
      setIsSaving(true);
      setSaveError('');
      setSaveSuccess(false);

      const res = await fetch('/api/studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          relativePath: selectedDoc.relativePath,
          content,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        // update local list
        setDocs((prev) =>
          prev.map((d) =>
            d.relativePath === selectedDoc.relativePath ? { ...d, content, lastModified: new Date().toISOString() } : d
          )
        );
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setSaveError(data.error || 'Failed to save');
      }
    } catch (err: any) {
      setSaveError(err.message || 'Network error while saving');
    } finally {
      setIsSaving(false);
    }
  };

  // File Upload handler
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/studio/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.success) {
          const newMedia: UploadedMedia = {
            url: data.url,
            fileName: data.fileName,
            originalName: data.originalName,
            size: data.size,
            isVideo: data.isVideo,
            markdownSnippet: data.markdownSnippet,
            uploadedAt: new Date().toLocaleTimeString(),
          };

          setRecentUploads((prev) => [newMedia, ...prev]);

          // Auto-insert snippet at cursor
          insertTextAtCursor(`\n\n${data.markdownSnippet}\n\n`);
        } else {
          alert('Upload failed: ' + data.error);
        }
      }
    } catch (err: any) {
      alert('Upload error: ' + err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Insert text into textarea
  const insertTextAtCursor = (textToInsert: string) => {
    if (!textareaRef.current) {
      setContent((prev) => prev + textToInsert);
      return;
    }
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = content.substring(0, start);
    const after = content.substring(end);
    setContent(before + textToInsert + after);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
    }, 50);
  };

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(identifier);
    setTimeout(() => setCopiedUrl(''), 2500);
  };

  // Filter docs
  const filteredDocs = docs.filter((d) => {
    const isEn = d.relativePath.endsWith('.en.mdx');
    if (langFilter === 'ms' && isEn) return false;
    if (langFilter === 'en' && !isEn) return false;

    return (
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.relativePath.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const categories = Array.from(new Set(docs.map((d) => d.category)));

  return (
    <div className="flex h-screen w-full flex-col bg-[#09090B] text-[#FAFAFA] antialiased overflow-hidden font-sans">
      {/* Top Header */}
      <header className="flex h-16 w-full items-center justify-between border-b border-[#27272A] bg-[#121215] px-6 z-20">
        <div className="flex items-center gap-4">
          <Link
            href="/docs"
            className="flex items-center gap-2 rounded-lg border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs font-semibold text-[#A1A1AA] hover:bg-[#27272A] hover:text-white transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Docs</span>
          </Link>
          <div className="h-5 w-[1px] bg-[#27272A]" />
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFC700] text-black font-extrabold text-xs">
              R
            </span>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-white">Risev Studio</span>
              <span className="rounded-md bg-[#FFC700]/10 border border-[#FFC700]/30 px-2 py-0.5 text-[10px] font-bold text-[#FFC700]">
                CONTENT & MEDIA HUB
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center rounded-lg border border-[#27272A] bg-[#18181B] p-1">
            <button
              onClick={() => setViewMode('edit')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                viewMode === 'edit' ? 'bg-[#27272A] text-white' : 'text-[#71717A] hover:text-white'
              }`}
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit Sahaja</span>
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                viewMode === 'split' ? 'bg-[#27272A] text-white' : 'text-[#71717A] hover:text-white'
              }`}
            >
              <Columns className="h-3.5 w-3.5" />
              <span>Split View</span>
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                viewMode === 'preview' ? 'bg-[#27272A] text-white' : 'text-[#71717A] hover:text-white'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Preview</span>
            </button>
          </div>

          {/* Media Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 rounded-lg border border-[#27272A] bg-[#18181B] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#27272A] active:scale-95 transition"
          >
            <UploadCloud className="h-4 w-4 text-[#FFC700]" />
            <span>{isUploading ? 'Memuat naik...' : 'Upload Gambar / Video'}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
            accept="image/*,video/*"
            multiple
          />

          {/* Save & Publish Button */}
          <button
            onClick={handleSave}
            disabled={isSaving || !selectedDoc}
            className="flex items-center gap-2 rounded-lg bg-[#FFC700] px-4 py-2 text-xs font-extrabold text-black hover:bg-[#FACC15] active:scale-95 transition shadow-lg shadow-[#FFC700]/10 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{isSaving ? 'Menyimpan...' : 'Save & Publish'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Document Explorer */}
        <aside className="flex w-80 flex-col border-r border-[#27272A] bg-[#0E0E11]">
          {/* Search bar & Language Filter */}
          <div className="p-3 border-b border-[#27272A] space-y-2">
            <div className="flex items-center gap-2 rounded-lg border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs text-[#A1A1AA]">
              <Search className="h-3.5 w-3.5" />
              <input
                type="text"
                placeholder="Cari tutorial..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-[#52525B] focus:outline-none text-xs"
              />
            </div>

            {/* Language filter pills */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLangFilter('all')}
                className={`flex-1 rounded py-1 text-[10px] font-bold transition ${
                  langFilter === 'all' ? 'bg-[#27272A] text-white' : 'text-[#71717A] hover:text-white'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setLangFilter('ms')}
                className={`flex-1 rounded py-1 text-[10px] font-bold transition ${
                  langFilter === 'ms' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-[#71717A] hover:text-white'
                }`}
              >
                🇲🇾 Melayu
              </button>
              <button
                onClick={() => setLangFilter('en')}
                className={`flex-1 rounded py-1 text-[10px] font-bold transition ${
                  langFilter === 'en' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-[#71717A] hover:text-white'
                }`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>

          {/* Document Tree */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center p-6 text-xs text-[#71717A]">
                Memuatkan senarai panduan...
              </div>
            ) : (
              categories.map((cat) => {
                const catDocs = filteredDocs.filter((d) => d.category === cat);
                if (catDocs.length === 0) return null;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="px-2 py-1 text-[11px] font-extrabold tracking-wider text-[#71717A] uppercase">
                      {cat}
                    </div>
                    {catDocs.map((doc) => {
                      const isSelected = selectedDoc?.relativePath === doc.relativePath;
                      const isEn = doc.relativePath.endsWith('.en.mdx');
                      return (
                        <button
                          key={doc.relativePath}
                          onClick={() => handleSelectDoc(doc)}
                          className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition ${
                            isSelected
                              ? 'bg-[#FFC700]/15 text-[#FFC700] font-bold border border-[#FFC700]/30'
                              : 'text-[#D4D4D8] hover:bg-[#18181B] hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate flex-1 mr-2">
                            <FileText className={`h-3.5 w-3.5 shrink-0 ${isSelected ? 'text-[#FFC700]' : 'text-[#71717A]'}`} />
                            <span className="truncate">{doc.title}</span>
                          </div>
                          <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-extrabold ${
                            isEn ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {isEn ? 'EN' : 'BM'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>

          {/* Media History Drawer Quick Panel */}
          {recentUploads.length > 0 && (
            <div className="border-t border-[#27272A] bg-[#121215] p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A]">
                  Media Baru ({recentUploads.length})
                </span>
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1.5">
                {recentUploads.slice(0, 3).map((media, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-md bg-[#18181B] border border-[#27272A] px-2 py-1 text-[11px]"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      {media.isVideo ? (
                        <Video className="h-3 w-3 text-purple-400 shrink-0" />
                      ) : (
                        <ImageIcon className="h-3 w-3 text-[#FFC700] shrink-0" />
                      )}
                      <span className="truncate text-[#A1A1AA]">{media.originalName}</span>
                    </div>
                    <button
                      onClick={() => insertTextAtCursor(`\n\n${media.markdownSnippet}\n\n`)}
                      className="rounded bg-[#27272A] px-1.5 py-0.5 text-[10px] font-bold text-white hover:bg-[#3F3F46]"
                    >
                      + Insert
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Editor & Preview Workspace */}
        <main className="flex flex-1 flex-col overflow-hidden bg-[#0A0A0C]">
          {/* Article Info Bar */}
          <div className="flex items-center justify-between border-b border-[#27272A] bg-[#101014] px-6 py-2.5">
            <div className="flex items-center gap-3">
              <span className="rounded bg-[#18181B] border border-[#27272A] px-2 py-0.5 text-[11px] font-mono text-[#A1A1AA]">
                {selectedDoc?.relativePath || 'Pilih fail'}
              </span>
              <h2 className="text-sm font-bold text-white truncate max-w-md">
                {selectedDoc?.title || 'Tiada fail dipilih'}
              </h2>
              {selectedDoc && (
                <a
                  href={getLiveUrl(selectedDoc.relativePath)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 rounded bg-[#18181B] border border-[#27272A] px-2 py-0.5 text-[11px] font-bold text-cyan-400 hover:bg-cyan-500/10 transition"
                >
                  <span>Buka Halaman Live</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            {/* Notification messages */}
            {saveSuccess && (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 animate-fade-in">
                <CheckCircle2 className="h-4 w-4" />
                <span>Berjaya disimpan dan dipublikasikan!</span>
              </div>
            )}
            {saveError && (
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                <AlertCircle className="h-4 w-4" />
                <span>Ralat: {saveError}</span>
              </div>
            )}
          </div>

          {/* Quick Formatting Toolbar */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-[#27272A] bg-[#141418] px-6 py-1.5 text-xs text-[#A1A1AA]">
            <span className="text-[10px] font-bold uppercase text-[#52525B] mr-1">Shortcuts:</span>
            <button
              onClick={() => insertTextAtCursor('\n## Tajuk Utama (H2)\n')}
              className="rounded px-2 py-0.5 hover:bg-[#27272A] hover:text-white"
            >
              H2
            </button>
            <button
              onClick={() => insertTextAtCursor('\n### Sub-Tajuk (H3)\n')}
              className="rounded px-2 py-0.5 hover:bg-[#27272A] hover:text-white"
            >
              H3
            </button>
            <button
              onClick={() => insertTextAtCursor('**teks tebal**')}
              className="rounded px-2 py-0.5 font-bold hover:bg-[#27272A] hover:text-white"
            >
              B
            </button>
            <button
              onClick={() => insertTextAtCursor('\n> **💡 Tip:** Masukkan tip atau info penting di sini.\n')}
              className="rounded px-2 py-0.5 hover:bg-[#27272A] hover:text-[#FFC700]"
            >
              💡 Callout Tip
            </button>
            <button
              onClick={() => insertTextAtCursor('\n| Ciri | Penerangan |\n| :--- | :--- |\n| Item 1 | Butiran 1 |\n')}
              className="rounded px-2 py-0.5 hover:bg-[#27272A] hover:text-white"
            >
              📊 Jadual
            </button>
            <button
              onClick={() => insertTextAtCursor('\n```\nContoh Teks / Kod di sini\n```\n')}
              className="rounded px-2 py-0.5 hover:bg-[#27272A] hover:text-white font-mono"
            >
              {'<Code>'}
            </button>
            <div className="h-3 w-[1px] bg-[#27272A] mx-1" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 text-[#FFC700] hover:underline font-bold"
            >
              <UploadCloud className="h-3 w-3" />
              <span>Upload Gambar/Video</span>
            </button>
          </div>

          {/* Editors Workspace */}
          <div className="flex flex-1 overflow-hidden">
            {/* Editor Pane */}
            {(viewMode === 'edit' || viewMode === 'split') && (
              <div
                className={`flex flex-col h-full overflow-hidden ${
                  viewMode === 'split' ? 'w-1/2 border-r border-[#27272A]' : 'w-full'
                }`}
              >
                <div className="bg-[#0E0E12] px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#71717A] border-b border-[#1F1F24]">
                  MDX Code Editor
                </div>
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Taip kandungan tutorial di sini..."
                  className="flex-1 w-full resize-none bg-[#09090B] p-6 font-mono text-sm leading-relaxed text-[#EDEDED] focus:outline-none selection:bg-[#FFC700]/20"
                />
              </div>
            )}

            {/* Live Preview Pane */}
            {(viewMode === 'preview' || viewMode === 'split') && (
              <div
                className={`flex flex-col h-full overflow-y-auto bg-[#0C0C0E] ${
                  viewMode === 'split' ? 'w-1/2' : 'w-full'
                }`}
              >
                <div className="bg-[#0E0E12] px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#71717A] border-b border-[#1F1F24] flex items-center justify-between">
                  <span>Live Preview</span>
                  <span className="text-[10px] text-[#52525B]">Real-time rendering</span>
                </div>
                <div className="prose prose-invert max-w-none p-8 leading-relaxed text-[#D4D4D8]">
                  <SimpleMarkdownRenderer content={content} />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// Simple client markdown preview parser for live instant feedback
function SimpleMarkdownRenderer({ content }: { content: string }) {
  // Strip frontmatter
  const cleanContent = content.replace(/^---[\s\S]*?---/, '').trim();

  // Split lines
  const lines = cleanContent.split('\n');

  return (
    <div className="space-y-4 text-sm">
      {lines.map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return (
            <h1 key={index} className="text-2xl font-extrabold text-white border-b border-[#27272A] pb-2 mt-4">
              {line.replace('# ', '')}
            </h1>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-xl font-bold text-white mt-6 mb-2">
              {line.replace('## ', '')}
            </h2>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="text-base font-bold text-[#FFC700] mt-4 mb-1">
              {line.replace('### ', '')}
            </h3>
          );
        }

        // Callouts
        if (line.startsWith('> ')) {
          return (
            <div key={index} className="rounded-xl border border-[#FFC700]/30 bg-[#FFC700]/10 p-4 text-[#FDE047] my-3">
              {line.replace('> ', '')}
            </div>
          );
        }

        // Images
        const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (imgMatch) {
          return (
            <div key={index} className="my-4 rounded-xl overflow-hidden border border-[#27272A] bg-black max-w-md">
              <img src={imgMatch[2]} alt={imgMatch[1]} className="w-full object-contain max-h-96" />
              {imgMatch[1] && (
                <div className="bg-[#18181B] p-2 text-center text-[11px] text-[#A1A1AA]">{imgMatch[1]}</div>
              )}
            </div>
          );
        }

        // Video embeds
        if (line.includes('<video') && line.includes('src=')) {
          const srcMatch = line.match(/src=["'](.*?)["']/);
          if (srcMatch) {
            return (
              <div key={index} className="my-4 rounded-xl overflow-hidden border border-[#27272A] bg-black max-w-md">
                <video controls className="w-full rounded-lg" src={srcMatch[1]} />
              </div>
            );
          }
        }

        // Cards component placeholder
        if (line.includes('<Cards>') || line.includes('</Cards>')) {
          return null;
        }
        if (line.includes('<Card')) {
          const titleMatch = line.match(/title=["'](.*?)["']/);
          const descMatch = line.match(/description=["'](.*?)["']/);
          return (
            <div key={index} className="rounded-xl border border-[#27272A] bg-[#141418] p-4 my-2">
              <div className="font-bold text-white mb-1">{titleMatch ? titleMatch[1] : 'Card'}</div>
              <div className="text-xs text-[#A1A1AA]">{descMatch ? descMatch[1] : ''}</div>
            </div>
          );
        }

        // Divider
        if (line === '---') {
          return <hr key={index} className="border-[#27272A] my-4" />;
        }

        // Empty line
        if (!line.trim()) {
          return <div key={index} className="h-2" />;
        }

        // Standard paragraph
        return (
          <p key={index} className="text-[#D4D4D8] leading-relaxed">
            {line}
          </p>
        );
      })}
    </div>
  );
}
