import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar } from './Avatar';
import { colors, fonts } from '../theme';
import type { FamilyMember } from '../data/mock';

type Props = {
  visible: boolean;
  title: string;
  subtitle: string;
  candidates: FamilyMember[];
  confirmLabel: string;
  onClose: () => void;
  onConfirm: (memberId: string) => void;
};

/**
 * Bottom-sheet used to assign a guardian / caregiver to a dependent member.
 * Mirrors the "Assign guardian" / "Assign Care" sheets in the design.
 */
export function AssignSheet({
  visible,
  title,
  subtitle,
  candidates,
  confirmLabel,
  onClose,
  onConfirm,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (visible) setSelected(null);
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <ScrollView style={styles.list} bounces={false}>
          {candidates.map((m) => {
            const isOn = selected === m.id;
            return (
              <Pressable
                key={m.id}
                style={[styles.option, isOn && styles.optionOn]}
                onPress={() => setSelected(m.id)}
              >
                <Avatar initials={m.initials} size={36} />
                <View style={styles.optionText}>
                  <Text style={styles.optionName}>{m.name}</Text>
                  <Text style={styles.optionSub}>
                    {m.relationship} · Age {m.age}
                  </Text>
                </View>
                <MaterialIcons
                  name={isOn ? 'check-circle' : 'radio-button-unchecked'}
                  size={24}
                  color={isOn ? colors.green : colors.cardBorder}
                />
              </Pressable>
            );
          })}
        </ScrollView>

        <Pressable
          style={[styles.confirm, !selected && styles.confirmDisabled]}
          disabled={!selected}
          onPress={() => selected && onConfirm(selected)}
        >
          <Text style={styles.confirmText}>{confirmLabel}</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(14,45,33,0.4)',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 32,
    maxHeight: '78%',
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.cardBorder,
    marginBottom: 18,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 22,
    lineHeight: 28,
    color: colors.greenDark,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textBody,
    marginTop: 4,
    marginBottom: 16,
  },
  list: {
    flexGrow: 0,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cream,
    marginBottom: 10,
  },
  optionOn: {
    borderColor: colors.green,
    backgroundColor: '#F2F7F4',
  },
  optionText: {
    flex: 1,
    gap: 2,
  },
  optionName: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textName,
  },
  optionSub: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textBody,
  },
  confirm: {
    marginTop: 8,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmDisabled: {
    opacity: 0.45,
  },
  confirmText: {
    fontFamily: fonts.bold,
    fontSize: 15.5,
    color: colors.white,
  },
});
