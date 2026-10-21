import React from 'react';
import { Award, Compass, Eye, ShieldAlert, Sparkles, Smile } from 'lucide-react';

export const DeliveryCoachCard: React.FC = () => {
  const tips = [
    {
      icon: <Eye className="w-4 h-4 text-[#EF4444]" />,
      title: 'The Deadpan Rule',
      description:
        'Deliver lines like "Aapke paon bahut haseen hain..." with complete, unshakable seriousness. Zero laughing before they do.',
    },
    {
      icon: <Sparkles className="w-4 h-4 text-[#EF4444]" />,
      title: 'The SRK Intensity',
      description:
        'Hold eye contact for 2 seconds longer than polite society allows. Best paired with slow-motion head tilt.',
    },
    {
      icon: <ShieldAlert className="w-4 h-4 text-[#EF4444]" />,
      title: 'The Food Defense Rule',
      description:
        'When defending pizza or pasta, invoke Bajirao or Singham immediately: "Aata majhi satakli" guarantees you keep your slice.',
    },
    {
      icon: <Compass className="w-4 h-4 text-[#EF4444]" />,
      title: 'The Uber Farewell',
      description:
        'Always deliver "Pushpa, I hate tears" or "Main wapas aaoongi" looking back over your shoulder right as the cab door closes.',
    },
  ];

  return (
    <div className="bento-card p-5 sm:p-6 border border-[#27272A] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#DC2626]/20 text-[#EF4444] rounded-lg">
              <Award className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Pickup Masterclass
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#A1A1AA]">
            Flirting Protocol
          </span>
        </div>

        <p className="text-xs text-[#A1A1AA] mb-4">
          Tactical advice on landing Bollywood pickup lines without getting banned from the restaurant:
        </p>

        <div className="space-y-3">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#18181B] border border-[#27272A] rounded-xl hover:border-[#3F3F46] transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                {tip.icon}
                <h4 className="text-xs font-bold text-white">{tip.title}</h4>
              </div>
              <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
