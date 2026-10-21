import React, { useState } from 'react';
import { Share2, ExternalLink, FileText, Check, Map, Eye } from 'lucide-react';

interface SharePreviewCardProps {
  onOpenSitemap: () => void;
}

export const SharePreviewCard: React.FC<SharePreviewCardProps> = ({ onOpenSitemap }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyAppUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bento-card p-5 sm:p-6 border border-[#27272A] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#DC2626]/20 text-[#EF4444] rounded-lg">
              <Eye className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Share Card &amp; Preview
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#DC2626] font-semibold">
            Social Meta
          </span>
        </div>

        <p className="text-xs text-[#A1A1AA] mb-4">
          Visual preview image configured for WhatsApp, iMessage, Twitter/X, Discord, and Slack:
        </p>

        {/* Visual Preview Image Card */}
        <div className="relative rounded-xl overflow-hidden border border-[#27272A] group mb-4 bg-black">
          <img
            src="/preview.svg"
            alt="Pick Me Up Web App Preview Card"
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] font-bold text-white">preview.svg (1200x630 OG Card)</span>
              <a
                href="/preview.svg"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#EF4444] hover:text-white flex items-center gap-1 font-semibold"
              >
                Open Full <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Resource Links Required by User */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <a
            href="/llms.txt"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] rounded-xl flex items-center justify-between transition-colors text-white font-medium"
          >
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>LLMs.txt</span>
            </div>
            <ExternalLink className="w-3 h-3 text-[#71717A]" />
          </a>

          <a
            href="/robots.txt"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] rounded-xl flex items-center justify-between transition-colors text-white font-medium"
          >
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>robots.txt</span>
            </div>
            <ExternalLink className="w-3 h-3 text-[#71717A]" />
          </a>

          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] rounded-xl flex items-center justify-between transition-colors text-white font-medium"
          >
            <div className="flex items-center gap-1.5">
              <Map className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>sitemap.xml</span>
            </div>
            <ExternalLink className="w-3 h-3 text-[#71717A]" />
          </a>

          <button
            onClick={onOpenSitemap}
            className="p-2.5 bg-[#DC2626]/20 hover:bg-[#DC2626]/30 border border-[#DC2626]/40 rounded-xl flex items-center justify-between transition-colors text-[#EF4444] font-semibold cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <Map className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Interactive Map</span>
            </div>
            <span>↗</span>
          </button>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#27272A]">
        <button
          onClick={handleCopyAppUrl}
          className="w-full py-2 px-3 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#DC2626]" />}
          <span>{copiedLink ? 'Share Link Copied!' : 'Copy Web App Share Link'}</span>
        </button>
      </div>
    </div>
  );
};
