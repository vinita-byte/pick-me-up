import React, { useState } from 'react';
import { Search, BookOpen, Copy, Check, Sparkles, Film } from 'lucide-react';
import { Dialogue } from '../types/dialogue';
import { BOLLYWOOD_DIALOGUES } from '../data/dialogues';
import { filterDialogues } from '../utils/randomizer';

interface DialogueLibraryCardProps {
  onSelectDialogue: (dialogue: Dialogue) => void;
}

export const DialogueLibraryCard: React.FC<DialogueLibraryCardProps> = ({
  onSelectDialogue,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = filterDialogues(BOLLYWOOD_DIALOGUES, 'all', searchQuery);

  const handleCopy = (d: Dialogue, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`"${d.quote}" — ${d.movie}`);
    setCopiedId(d.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="bento-card p-5 sm:p-6 border border-[#27272A] flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#DC2626]/20 text-[#EF4444] rounded-lg">
              <BookOpen className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Dialogue Vault
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#A1A1AA]">
            Showing {filtered.length} of {BOLLYWOOD_DIALOGUES.length}
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by quote, movie, actor (e.g. DDLJ, Baburao, samosa)..."
            className="w-full bg-[#18181B] border border-[#27272A] focus:border-[#DC2626] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-[#71717A] outline-none transition-colors"
          />
        </div>

        {/* Scrollable list */}
        <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#71717A]">
              No dialogues match "{searchQuery}". Try searching for SRK, Hera Pheri, or pizza!
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectDialogue(item)}
                className="p-3 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] hover:border-[#DC2626]/50 rounded-xl transition-all cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white group-hover:text-[#EF4444] transition-colors leading-relaxed">
                    “{item.quote}”
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-[10px] font-medium text-[#DC2626] flex items-center gap-1">
                      <Film className="w-3 h-3" />
                      {item.movie}
                    </span>
                    <span className="text-[10px] bg-[#27272A] text-[#A1A1AA] px-1.5 py-0.5 rounded">
                      {item.vibeLabel}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => handleCopy(item, e)}
                    className="p-1.5 rounded-lg text-[#71717A] hover:text-white hover:bg-[#27272A] transition-colors cursor-pointer"
                    title="Copy dialogue"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => onSelectDialogue(item)}
                    className="p-1.5 rounded-lg text-[#71717A] hover:text-[#EF4444] hover:bg-[#27272A] transition-colors cursor-pointer"
                    title="Load into Main Spinner"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
