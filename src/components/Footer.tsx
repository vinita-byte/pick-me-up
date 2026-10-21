import React from 'react';
import { ExternalLink, Map, FileText, Heart, Shield } from 'lucide-react';

interface FooterProps {
  onOpenSitemap: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSitemap }) => {
  return (
    <footer className="mt-12 border-t border-[#27272A] bg-[#0A0A0A] py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <span className="text-xl">🎬</span>
            <span className="text-base font-black tracking-wider uppercase text-white">
              Pick Me Up
            </span>
            <span className="text-xs text-[#DC2626] font-bold px-1.5 py-0.5 bg-[#DC2626]/10 rounded border border-[#DC2626]/30">
              v1.0
            </span>
          </div>
          <p className="text-xs text-[#71717A] max-w-sm">
            The definitive Bollywood dialogue and pickup line randomizer with authentic spinning sounds and audio effects.
          </p>
        </div>

        {/* 4 Required Assets Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#A1A1AA]">
          <a
            href="/llms.txt"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>LLMs.txt</span>
          </a>

          <a
            href="/robots.txt"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>robots.txt</span>
          </a>

          <a
            href="/preview.svg"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Preview Image</span>
          </a>

          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <Map className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>sitemap.xml</span>
          </a>

          <button
            onClick={onOpenSitemap}
            className="hover:text-[#EF4444] flex items-center gap-1 text-white transition-colors cursor-pointer"
          >
            <Map className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Site Map</span>
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-xs text-[#71717A]">
          <p>Strictly Red • Black • White</p>
          <p className="text-[11px] text-[#52525B] mt-0.5">Crafted with pure Bollywood melodrama</p>
        </div>
      </div>
    </footer>
  );
};
