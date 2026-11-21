'use client';

import {
  Radio,
  Smartphone,
  PenTool,
  Stamp,
  Coins,
  Ticket,
  Star,
  Tag,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps a tutorial's `icon` string to a Lucide component.
 *
 * Kept as an explicit map rather than a dynamic lookup so a typo in
 * `lib/tutorials.ts` fails at build time instead of rendering nothing.
 */
const ICONS: Record<string, LucideIcon> = {
  radio: Radio,
  smartphone: Smartphone,
  'pen-tool': PenTool,
  stamp: Stamp,
  coins: Coins,
  ticket: Ticket,
  star: Star,
  tag: Tag,
};

export function TutorialIcon({
  name,
  size = 20,
  color = '#050505',
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  const Icon = ICONS[name] ?? Tag;
  return <Icon size={size} color={color} strokeWidth={2} />;
}
