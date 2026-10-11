/**
 * Icon.jsx
 * Thin wrapper around lucide-react that mirrors the Banani <Icon i="..." size color /> API.
 */
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  BarChart2,
  BarChart3,
  Command,
  Database,
  Globe2,
  Keyboard,
  MessagesSquare,
  PieChart,
  Share2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';

const iconMap = {
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  'arrow-up-right': ArrowUpRight,
  'bar-chart-2': BarChart2,
  'bar-chart-3': BarChart3,
  command: Command,
  database: Database,
  'globe-2': Globe2,
  keyboard: Keyboard,
  'messages-square': MessagesSquare,
  'pie-chart': PieChart,
  'share-2': Share2,
  'shield-check': ShieldCheck,
  sparkles: Sparkles,
  'trending-up': TrendingUp,
  users: Users,
};

export default function Icon({ i, size = 16, color = 'currentColor', className = '' }) {
  const LucideIcon = iconMap[i];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} color={color} className={className} strokeWidth={1.75} />;
}
