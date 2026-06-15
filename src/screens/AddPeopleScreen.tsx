import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { TopBar } from '../components/TopBar';
import { Breadcrumb } from '../components/Breadcrumb';
import { SectionDivider } from '../components/SectionDivider';
import { StickyCTA } from '../components/StickyCTA';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { AssignSheet } from '../components/AssignSheet';
import { colors, fonts, cardShadow } from '../theme';
import { family, currentUser, type FamilyMember } from '../data/mock';

type Props = NativeStackScreenProps<RootStackParamList, 'AddPeople'>;

type SheetState = { member: FamilyMember; kind: 'guardian' | 'caregiver' } | null;

export function AddPeopleScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  const [selected, setSelected] = useState<Record<string, boolean>>(
    () => Object.fromEntries(family.map((m) => [m.id, true]))
  );
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [sheet, setSheet] = useState<SheetState>(null);

  const selectedCount = Object.values(selected).filter(Boolean).length;

  const toggle = (id: string) =>
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));

  const candidates = useMemo(
    () =>
      sheet
        ? family.filter((m) => m.id !== sheet.member.id && Number(m.age) >= 18)
        : [],
    [sheet]
  );

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={{ paddingTop: insets.top }}>
        <TopBar notifications={currentUser.notifications} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.crumbWrap}>
          <Breadcrumb
            items={[
              { label: 'Miqaat list', onPress: () => navigation.navigate('MiqaatList') },
              { label: 'Miqaat detail page', onPress: () => navigation.goBack() },
              { label: 'Add people', active: true },
            ]}
          />
        </View>

        {/* Invite Mehmaan card */}
        <LinearGradient
          colors={['#F7E6C3', colors.cream, 'rgba(247,230,195,0.4)']}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.inviteCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.inviteTitle}>Invite Mehmaan</Text>
            <View style={styles.invitePill}>
              <View style={styles.inviteDot} />
              <Text style={styles.invitePillText}>2 of 2 invitations remaining</Text>
            </View>
          </View>
          <Pressable style={styles.inviteButton}>
            <LinearGradient
              colors={[colors.gold, colors.goldEdge]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.inviteButtonText}>Invite now</Text>
          </Pressable>
        </LinearGradient>

        <Text style={styles.heading}>Add People to group</Text>

        {/* Search */}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.search}
            placeholder="Enter 8-digit ITS ID"
            placeholderTextColor={colors.placeholder}
            keyboardType="number-pad"
            maxLength={8}
          />
          <Pressable style={styles.addButton}>
            <LinearGradient
              colors={['rgba(227,205,150,0.5)', 'rgba(201,164,92,0.5)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>

        <View style={styles.dividerWrap}>
          <SectionDivider label="Your Family" />
        </View>

        {/* Member list */}
        <View style={styles.list}>
          {family.map((m) => (
            <MemberRow
              key={m.id}
              member={m}
              checked={!!selected[m.id]}
              assignedTo={assignments[m.id]}
              onToggle={() => toggle(m.id)}
              onAssign={() =>
                setSheet({ member: m, kind: m.warning!.kind })
              }
            />
          ))}
        </View>
      </ScrollView>

      <StickyCTA
        caption={`${String(selectedCount).padStart(2, '0')} members selected`}
        title="Family & group"
        buttonLabel="Confirm"
        disabled={selectedCount === 0}
        onPress={() => navigation.navigate('Review')}
      />

      <AssignSheet
        visible={sheet !== null}
        title={sheet?.kind === 'guardian' ? 'Assign guardian' : 'Assign Care'}
        subtitle={
          sheet
            ? `For ${sheet.member.name} · ${sheet.member.relationship} · Age ${sheet.member.age} · Choose an adult family member`
            : ''
        }
        candidates={candidates}
        confirmLabel={sheet?.kind === 'guardian' ? 'Add guardian' : 'Add care'}
        onClose={() => setSheet(null)}
        onConfirm={(memberId) => {
          const assignee = family.find((m) => m.id === memberId);
          if (sheet && assignee) {
            setAssignments((prev) => ({ ...prev, [sheet.member.id]: assignee.name }));
          }
          setSheet(null);
        }}
      />
    </View>
  );
}

function MemberRow({
  member,
  checked,
  assignedTo,
  onToggle,
  onAssign,
}: {
  member: FamilyMember;
  checked: boolean;
  assignedTo?: string;
  onToggle: () => void;
  onAssign: () => void;
}) {
  const showWarning = !!member.warning && !assignedTo;
  const assignedLabel = member.warning?.kind === 'guardian' ? 'Guardian' : 'Under Care of';

  return (
    <View style={styles.row}>
      <View style={styles.rowHeader}>
        <Pressable onPress={onToggle} hitSlop={6}>
          <MaterialIcons
            name={checked ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={checked ? colors.green : colors.goldEdge}
          />
        </Pressable>
        <Avatar initials={member.initials} size={36} />
        <View style={styles.rowText}>
          <Text style={styles.rowName}>{member.name}</Text>
          <Text style={styles.rowSub}>
            {member.relationship} · Age {member.age} · ITS {member.its}
          </Text>
        </View>
        <Badge kind={member.badge} />
      </View>

      {showWarning && (
        <View style={styles.warning}>
          <MaterialIcons name="warning-amber" size={16} color="#DE7C00" />
          <Text style={styles.warningText}>{member.warning!.message}</Text>
          <Pressable style={styles.assignButton} onPress={onAssign}>
            <Text style={styles.assignText}>Assign</Text>
            <MaterialIcons name="arrow-forward" size={12} color={colors.assignText} />
          </Pressable>
        </View>
      )}

      {assignedTo && (
        <View style={styles.assigned}>
          <MaterialIcons name="check-circle" size={16} color={colors.green} />
          <Text style={styles.assignedText}>
            {assignedLabel}: <Text style={styles.assignedName}>{assignedTo}</Text>
          </Text>
          <Pressable onPress={onAssign}>
            <Text style={styles.changeText}>Change</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  scroll: { paddingBottom: 140 },
  crumbWrap: { paddingHorizontal: 16, paddingVertical: 14 },
  inviteCard: {
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9DABF',
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteTitle: {
    fontFamily: fonts.serif,
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: 0.2,
    color: colors.greenDark,
  },
  invitePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(12,61,34,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(12,61,34,0.15)',
  },
  inviteDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CC9C42',
  },
  invitePillText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.assignText,
  },
  inviteButton: {
    height: 42,
    borderRadius: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  inviteButtonText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    letterSpacing: 0.2,
    color: colors.green,
  },
  heading: {
    fontFamily: fonts.serif,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.2,
    color: colors.greenDark,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 14,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
  },
  search: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.inputBg,
    paddingHorizontal: 14,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textName,
  },
  addButton: {
    width: 80,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  addButtonText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: '#194A37',
  },
  dividerWrap: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 14,
  },
  list: {
    marginHorizontal: 16,
    gap: 8,
  },
  row: {
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 14,
    padding: 13,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowName: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textName,
  },
  rowSub: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textBody,
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.warningBg,
    borderWidth: 1,
    borderColor: colors.warningBorder,
  },
  warningText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.warningText,
  },
  assignButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.assignBorder,
  },
  assignText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.assignText,
  },
  assigned: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F2F7F4',
  },
  assignedText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textBody,
  },
  assignedName: {
    fontFamily: fonts.bold,
    color: colors.greenDark,
  },
  changeText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.green,
  },
});
