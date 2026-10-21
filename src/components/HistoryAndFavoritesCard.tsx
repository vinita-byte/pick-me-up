import React, { useState } from 'react';
import { Heart, Clock, Copy, Check, Trash2, ArrowUpRight } from 'lucide-react';
import { Dialogue } from '../types/dialogue';

interface HistoryAndFavoritesCardProps {
  history: Dialogue[];
  favorites: Dialogue[];
  onSelectDialogue: (dialogue: Dialogue) => void;
  onRemoveFavorite: (id: string) => void;
  onClearHistory: () => void;
}

export const HistoryAndFavoritesCard: React.FC<HistoryAndFavoritesCardProps> = ({
  history,
  favorites,
  onSelectDialogue,
  onRemoveFavorite,
  onClearHistory,
}) => {
  const [tab, setTab] = useState<'favorites' | 'history'>('favorites');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (d: Dialogue, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`"${d.quote}" — ${d.movie}`);
    setCopiedId(d.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const list = tab === 'favorites' ? favorites : history;

  return (
    <div className="bento-card p-5 sm:p-6 border border-[#27272A] flex flex-col justify-between">
      <div>
        {/* Header Tabs */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 bg-[#18181B] p-1 rounded-xl border border-[#27272A]">
            <button
              onClick={() => setTab('favorites')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                tab === 'favorites'
                  ? 'bg-[#DC2626] text-white'
                  : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>Favorites ({favorites.length})</span>
            </button>
            <button
              onClick={() => setTab('history')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                tab === 'history'
                  ? 'bg-[#DC2626] text-white'
                  : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>History ({history.length})</span>
            </button>
          </div>

          {tab === 'history' && history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-[11px] text-[#71717A] hover:text-[#EF4444] transition-colors cursor-pointer"
              title="Clear history"
            >
              Clear
            </button>
          )}
        </div>

        {/* Content List */}
        <div className="max-h-[260px] overflow-y-auto space-y-2 pr-1">
          {list.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#71717A]">
              {tab === 'favorites'
                ? 'No favorites saved yet. Heart any dialogue to bookmark it here!'
                : 'No spin history yet. Hit "Randomize" to start spinning!'}
            </div>
          ) : (
            list.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => onSelectDialogue(item)}
                className="p-2.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] rounded-xl transition-all cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate group-hover:text-[#EF4444] transition-colors">
                    “{item.quote}”
                  </p>
                  <p className="text-[11px] text-[#A1A1AA] truncate mt-0.5">
                    🎬 {item.movie}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => handleCopy(item, e)}
                    className="p-1 rounded-lg text-[#71717A] hover:text-white hover:bg-[#27272A] transition-colors cursor-pointer"
                    title="Copy dialogue"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {tab === 'favorites' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFavorite(item.id);
                      }}
                      className="p-1 rounded-lg text-[#71717A] hover:text-[#EF4444] hover:bg-[#27272A] transition-colors cursor-pointer"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <ArrowUpRight className="w-3.5 h-3.5 text-[#52525B] group-hover:text-white" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
