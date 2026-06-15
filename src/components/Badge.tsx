import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';
import type { BadgeKind } from '../data/mock';

const MAP: Record<
  Exclude<BadgeKind, null>,
  { label: string; bg: string; fg: string }
> = {
  registrant: { label: 'Registrant', bg: colors.registrantBg, fg: colors.registrantText },
  dependent: { label: 'Dependent', bg: colors.dependentBg, fg: colors.dependentText },
  caregiver: { label: 'Caregiver', bg: colors.linkedBg, fg: colors.linkedText },
};

export function Badge({ kind }: { kind: BadgeKind }) {
  if (!kind) return null;
  const { label, bg, fg } = MAP[kind];
  return <Text style={[styles.badge, { backgroundColor: bg, color: fg }]}>{label}</Text>;
}

const styles = StyleSheet.create({
  badge: {
    fontFamily: fonts.bold,
    fontSize: 10,
    lineHeight: 20,
    letterSpacing: 0.5,
    textAlign: 'center',
    paddingHorizontal: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
});
