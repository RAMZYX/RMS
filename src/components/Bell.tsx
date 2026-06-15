import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

type Props = {
  count?: number;
  color?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export function Bell({ count = 0, color = colors.green, onPress, style }: Props) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress} hitSlop={8}>
      <MaterialCommunityIcons name="bell-outline" size={22} color={color} />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 5,
    width: 16,
    height: 16,
    borderRadius: 9,
    backgroundColor: colors.notifRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.white,
    fontFamily: fonts.extrabold,
    fontSize: 10,
    lineHeight: 12,
  },
});
