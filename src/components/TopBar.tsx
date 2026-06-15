import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Logo } from './Logo';
import { Bell } from './Bell';
import { colors } from '../theme';

type Props = {
  notifications?: number;
  onBellPress?: () => void;
};

/**
 * White top bar used on the detail / add-people / review screens:
 * ITS logo on the left, notification bell on the right.
 */
export function TopBar({ notifications = 0, onBellPress }: Props) {
  return (
    <View style={styles.bar}>
      <Logo width={37} height={58} />
      <Bell count={notifications} onPress={onBellPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 70,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10,
  },
});
