import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
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
import { colors, fonts, cardShadow } from '../theme';
import { family, mehmaan, currentUser, type FamilyMember } from '../data/mock';

type Props = NativeStackScreenProps<RootStackParamList, 'Review'>;

const byId = (id: string) => family.find((m) => m.id === id)!;

const pairs: { banner: string; lead: FamilyMember; dependent: FamilyMember }[] = [
  {
    banner: 'Guardian + dependent · registered together',
    lead: byId('yusuf'),
    dependent: byId('nazia'),
  },
  {
    banner: 'Caregiver + dependent · registered together',
    lead: byId('sakina'),
    dependent: byId('amatullah'),
  },
];

export function ReviewScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const total = family.length + mehmaan.length;

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
              { label: 'Add people', onPress: () => navigation.goBack() },
              { label: 'Summary', active: true },
            ]}
          />
        </View>

        <Text style={styles.title}>Review & Submit</Text>
        <Text style={styles.instruction}>
          Check your group before submitting. You can go back to edit any step.
        </Text>

        <Text style={styles.subheading}>Participant Count</Text>
        <View style={styles.statsRow}>
          <StatCard value={String(total)} label={'Total\nHeadcount'} color={colors.statGreen} />
          <StatCard value={'05'} label={'My family\n& group'} color={colors.statGold} />
          <StatCard value={'05'} label={'Invited\nmembers'} color={colors.statGold} />
        </View>

        <View style={styles.dividerWrap}>
          <SectionDivider label="Your Family" />
        </View>

        {pairs.map((p) => (
          <PairCard key={p.dependent.id} banner={p.banner} lead={p.lead} dependent={p.dependent} />
        ))}

        {/* Solo member */}
        <SoloCard member={byId('mohammed')} />

        <View style={styles.dividerWrap}>
          <SectionDivider label="Invite Mehmaan" />
        </View>

        {mehmaan.map((m) => (
          <View key={m.id} style={styles.mehmaanCard}>
            <Avatar initials={m.initials} size={36} />
            <View style={styles.rowText}>
              <Text style={styles.rowName}>{m.name}</Text>
              <Text style={styles.rowSub}>
                Age {m.age} · ITS {m.its}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <StickyCTA
        caption={`${total} members`}
        title="Ready to submit"
        buttonLabel={`Register(${total})`}
        onPress={() =>
          Alert.alert(
            'Registration submitted',
            `${total} members have been registered for Eid-e-Ghadeer 1447H.`,
            [{ text: 'Done', onPress: () => navigation.navigate('MiqaatList') }]
          )
        }
      />
    </View>
  );
}

function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function PersonRow({ member }: { member: FamilyMember }) {
  return (
    <View style={styles.personRow}>
      <Avatar initials={member.initials} size={36} />
      <View style={styles.rowText}>
        <Text style={styles.rowName}>{member.name}</Text>
        <Text style={styles.rowSub}>
          {member.relationship} · Age {member.age} · ITS {member.its}
        </Text>
      </View>
      <Badge kind={member.badge} />
    </View>
  );
}

function PairCard({
  banner,
  lead,
  dependent,
}: {
  banner: string;
  lead: FamilyMember;
  dependent: FamilyMember;
}) {
  return (
    <View style={[styles.pairCard, cardShadow]}>
      <View style={styles.pairBanner}>
        <MaterialIcons name="link" size={16} color={colors.linkedText} />
        <Text style={styles.pairBannerText}>{banner}</Text>
      </View>
      <View style={styles.pairBody}>
        <PersonRow member={lead} />
        <View style={styles.connector} />
        <PersonRow member={dependent} />
      </View>
    </View>
  );
}

function SoloCard({ member }: { member: FamilyMember }) {
  return (
    <View style={styles.soloCard}>
      <PersonRow member={member} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  scroll: { paddingHorizontal: 16, paddingBottom: 140 },
  crumbWrap: { paddingVertical: 14 },
  title: {
    fontFamily: fonts.serif,
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 0.2,
    color: colors.greenDark,
  },
  instruction: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textBody,
    marginTop: 8,
  },
  subheading: {
    fontFamily: fonts.serif,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.2,
    color: colors.greenDark,
    marginTop: 24,
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    height: 82,
    borderRadius: 8,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  statValue: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 20,
  },
  statLabel: {
    fontFamily: fonts.bold,
    fontSize: 13,
    lineHeight: 17,
    color: colors.textBody,
    textAlign: 'center',
  },
  dividerWrap: {
    marginTop: 28,
    marginBottom: 14,
  },
  pairCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
  },
  pairBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 32,
    paddingHorizontal: 14,
    backgroundColor: colors.linkedBg,
  },
  pairBannerText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.linkedText,
  },
  pairBody: {
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  connector: {
    width: 1,
    height: 12,
    backgroundColor: colors.cardBorder,
    marginLeft: 17,
  },
  soloCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.cardBorderLight,
    borderRadius: 8,
    paddingHorizontal: 13,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
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
    lineHeight: 16,
    color: colors.textBody,
  },
  mehmaanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 12,
    marginBottom: 8,
  },
});
