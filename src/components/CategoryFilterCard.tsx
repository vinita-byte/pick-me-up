import React from 'react';
import { Filter, Flame, Heart, Smile, Utensils, Moon, Shield } from 'lucide-react';
import { VibeCategory } from '../types/dialogue';
import { VIBE_CATEGORIES } from '../data/dialogues';

interface CategoryFilterCardProps {
  selectedCategory: VibeCategory;
  onSelectCategory: (category: VibeCategory) => void;
}

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'all':
      return <Filter className="w-3.5 h-3.5" />;
    case 'iconic-romance':
      return <Heart className="w-3.5 h-3.5" />;
    case 'cheeky-flirt':
      return <Flame className="w-3.5 h-3.5" />;
    case 'comedic-banter':
      return <Smile className="w-3.5 h-3.5" />;
    case 'food-and-dates':
      return <Utensils className="w-3.5 h-3.5" />;
    case 'parting-lines':
      return <Moon className="w-3.5 h-3.5" />;
    case 'tashan-attitude':
      return <Shield className="w-3.5 h-3.5" />;
    default:
      return <Filter className="w-3.5 h-3.5" />;
  }
};

export const CategoryFilterCard: React.FC<CategoryFilterCardProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="bento-card p-5 sm:p-6 border border-[#27272A] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#DC2626]/20 text-[#EF4444] rounded-lg">
              <Filter className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Vibe &amp; Flavor Filter
            </h3>
          </div>
          <span className="text-[11px] text-[#A1A1AA] font-mono">
            {VIBE_CATEGORIES.length} Flavors
          </span>
        </div>

        <p className="text-xs text-[#A1A1AA] mb-4">
          Select what kind of lines you want to feed the randomizer:
        </p>

        {/* Category Filter Pills / List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {VIBE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as VibeCategory)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left border ${
                  isSelected
                    ? 'bg-[#DC2626] border-[#DC2626] text-white shadow-md shadow-red-700/20'
                    : 'bg-[#18181B] border-[#27272A] text-[#D4D4D8] hover:bg-[#27272A] hover:border-[#3F3F46]'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={isSelected ? 'text-white' : 'text-[#EF4444]'}>
                    {getCategoryIcon(cat.id)}
                  </span>
                  <span className="truncate">{cat.label}</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    isSelected ? 'bg-black/30 text-white' : 'bg-[#27272A] text-[#A1A1AA]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
