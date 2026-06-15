import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, ctaShadow, cardShadow } from '../theme';

type Props = {
  caption: string;
  title: string;
  buttonLabel: string;
  onPress?: () => void;
  disabled?: boolean;
};

/**
 * Bottom sticky call-to-action: a fading scrim, a cream card with a
 * left-aligned caption/title block and a green action button on the right.
 */
export function StickyCTA({ caption, title, buttonLabel, onPress, disabled }: Props) {
  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <LinearGradient
        colors={['rgba(248,244,234,0)', colors.creamScrim]}
        locations={[0, 0.28]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.card, cardShadow]}>
        <View style={styles.textBlock}>
          <Text style={styles.caption}>{caption}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Pressable
          style={[styles.button, disabled && styles.buttonDisabled]}
          onPress={onPress}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 26,
    paddingBottom: 14,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: colors.cream,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderRadius: 18,
    paddingHorizontal: 18,
    height: 74,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...ctaShadow,
  },
  textBlock: {
    flex: 1,
    paddingRight: 12,
  },
  caption: {
    fontFamily: fonts.bold,
    fontSize: 11,
    lineHeight: 17,
    letterSpacing: 0.5,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fonts.extrabold,
    fontSize: 15,
    lineHeight: 23,
    color: colors.greenDark,
  },
  button: {
    backgroundColor: colors.green,
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 15.5,
    lineHeight: 16,
  },
});
