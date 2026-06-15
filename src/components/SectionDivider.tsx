import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts } from '../theme';

type Props = {
  label: string;
  align?: 'center' | 'left';
};

/**
 * Gold uppercase label flanked by gradient hairlines that fade toward the text.
 */
export function SectionDivider({ label, align = 'center' }: Props) {
  return (
    <View style={styles.row}>
      {align === 'center' && (
        <LinearGradient
          colors={['rgba(227,205,150,0)', colors.gold]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.line}
        />
      )}
      <Text style={styles.label}>{label}</Text>
      <LinearGradient
        colors={[colors.gold, 'rgba(227,205,150,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.line}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 18,
  },
  line: {
    flex: 1,
    height: 1,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 2.5,
    color: colors.goldDark,
    textTransform: 'uppercase',
  },
});
