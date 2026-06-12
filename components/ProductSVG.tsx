import { Droplets, Zap, Utensils, Truck, Package, Moon, Tent, Wind } from 'lucide-react';

const config: Record<string, { from: string; to: string; icon: React.ElementType }> = {
  shower:      { from:'#1a3366', to:'#2a5a8a', icon: Droplets },
  lantern:     { from:'#4a3800', to:'#7a6010', icon: Zap },
  table:       { from:'#2a1a0a', to:'#4a3520', icon: Utensils },
  awning:      { from:'#1F3A2E', to:'#2d5240', icon: Tent },
  drybag:      { from:'#1a2a3a', to:'#2a4a5a', icon: Package },
  compressor:  { from:'#2a2a2a', to:'#444444', icon: Truck },
  pillow:      { from:'#3a1a3a', to:'#5a3060', icon: Moon },
  stringlights:{ from:'#3a2800', to:'#6a5010', icon: Zap },
  cookware:    { from:'#1a1a2a', to:'#333350', icon: Utensils },
  organizer:   { from:'#1a2a1a', to:'#2a4030', icon: Package },
  // category icons
  utensils:    { from:'#1F3A2E', to:'#3a6b53', icon: Utensils },
  zap:         { from:'#4a3800', to:'#7a6010', icon: Zap },
  truck:       { from:'#2a2a2a', to:'#444444', icon: Truck },
  moon:        { from:'#1a1a3a', to:'#2a3060', icon: Moon },
  droplets:    { from:'#1a3a4a', to:'#2a5a6a', icon: Droplets },
  package:     { from:'#2a2010', to:'#4a3820', icon: Package },
  wind:        { from:'#2a1a1a', to:'#4a3030', icon: Wind },
};

interface ProductSVGProps {
  type: string;
  size?: number;
  className?: string;
}

export function ProductSVG({ type, size = 80, className = '' }: ProductSVGProps) {
  const cfg = config[type] ?? config.awning;
  const Icon = cfg.icon;
  const iconSize = Math.round(size * 0.44);
  return (
    <div
      className={`flex items-center justify-center rounded-2xl flex-shrink-0 ${className}`}
      style={{ width: size, height: size, background: `linear-gradient(135deg, ${cfg.from}, ${cfg.to})` }}
      aria-hidden="true"
    >
      <Icon size={iconSize} className="text-white/70" strokeWidth={1.5} />
    </div>
  );
}
