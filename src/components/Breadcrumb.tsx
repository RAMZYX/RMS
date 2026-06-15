import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

export type Crumb = {
  label: string;
  onPress?: () => void;
  active?: boolean;
};

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <View style={styles.row}>
      {items.map((item, i) => (
        <View key={`${item.label}-${i}`} style={styles.item}>
          <Pressable onPress={item.onPress} disabled={!item.onPress}>
            <Text
              style={[styles.label, item.active && styles.active]}
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </Pressable>
          {i < items.length - 1 && (
            <MaterialIcons
              name="chevron-right"
              size={16}
              color={colors.crumbInactive}
              style={styles.chevron}
            />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    rowGap: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.crumbInactive,
  },
  active: {
    color: colors.crumbActive,
    fontFamily: fonts.semibold,
  },
  chevron: {
    marginHorizontal: 4,
  },
});
