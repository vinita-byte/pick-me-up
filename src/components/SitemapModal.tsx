import React from 'react';
import { X, Map, FileText, ExternalLink, Sparkles, Music, Globe, Database } from 'lucide-react';
import { VIBE_CATEGORIES, BOLLYWOOD_DIALOGUES } from '../data/dialogues';
import { SOUND_EFFECTS } from '../data/sounds';
import { VibeCategory } from '../types/dialogue';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: VibeCategory) => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#121212] border-2 border-[#27272A] rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-[#A1A1AA] hover:text-white rounded-xl transition-colors cursor-pointer"
          aria-label="Close Site Map"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-[#DC2626] rounded-xl text-white shadow-md shadow-red-700/30">
            <Map className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Pick Me Up — Site Map &amp; Architecture
            </h2>
            <p className="text-xs text-[#A1A1AA]">
              Complete structure, resources, categories, and technical endpoints
            </p>
          </div>
        </div>

        {/* SECTION 1: Core System & SEO Files (The 4 user requirements) */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-[#DC2626] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Globe className="w-4 h-4" />
            <span>Core SEO, AI, and Social Files</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* LLMs.txt */}
            <div className="p-3.5 bg-[#18181B] border border-[#27272A] rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#DC2626]" />
                  /llms.txt
                </span>
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#EF4444] hover:underline flex items-center gap-1"
                >
                  View <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-[11px] text-[#A1A1AA]">
                LLM agent context documentation outlining app identity, dialogues, and audio assets.
              </p>
            </div>

            {/* robots.txt */}
            <div className="p-3.5 bg-[#18181B] border border-[#27272A] rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#DC2626]" />
                  /robots.txt
                </span>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#EF4444] hover:underline flex items-center gap-1"
                >
                  View <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-[11px] text-[#A1A1AA]">
                Search engine indexing rules allowing full crawl of routes, sitemap, and assets.
              </p>
            </div>

            {/* sitemap.xml */}
            <div className="p-3.5 bg-[#18181B] border border-[#27272A] rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Map className="w-3.5 h-3.5 text-[#DC2626]" />
                  /sitemap.xml
                </span>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#EF4444] hover:underline flex items-center gap-1"
                >
                  View <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-[11px] text-[#A1A1AA]">
                Structured XML sitemap registering all primary pages, parameter routes, and priorities.
              </p>
            </div>

            {/* preview.svg */}
            <div className="p-3.5 bg-[#18181B] border border-[#27272A] rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
                  /preview.svg (OpenGraph Image)
                </span>
                <a
                  href="/preview.svg"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#EF4444] hover:underline flex items-center gap-1"
                >
                  View <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-[11px] text-[#A1A1AA]">
                1200x630 high-impact Bento-styled social share preview banner for WhatsApp, X, and iMessage.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: Dialogue Categories */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-[#DC2626] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Database className="w-4 h-4" />
            <span>Dialogue Categories ({BOLLYWOOD_DIALOGUES.length} Total Lines)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {VIBE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id as VibeCategory);
                  onClose();
                }}
                className="p-2.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer group"
              >
                <div>
                  <span className="text-xs font-bold text-white group-hover:text-[#EF4444] transition-colors">
                    {cat.label}
                  </span>
                  <p className="text-[10px] text-[#71717A] mt-0.5">
                    Click to filter randomizer pool
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-[#27272A] text-white px-2 py-0.5 rounded-lg">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 3: Audio Effects Library */}
        <div>
          <h3 className="text-xs font-bold text-[#DC2626] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Music className="w-4 h-4" />
            <span>Audio Sound Effects Vault ({SOUND_EFFECTS.length} FX)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {SOUND_EFFECTS.map((s) => (
              <div
                key={s.id}
                className="p-2.5 bg-[#18181B] border border-[#27272A] rounded-xl text-left"
              >
                <p className="text-xs font-bold text-white truncate">{s.title}</p>
                <p className="text-[10px] text-[#A1A1AA] truncate">{s.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-[#27272A] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
          >
            Close Site Map
          </button>
        </div>
      </div>
    </div>
  );
};
