import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { Logo } from '../components/Logo';
import { Bell } from '../components/Bell';
import { colors, fonts, cardShadow } from '../theme';
import { events, currentUser, type MiqaatEvent } from '../data/mock';

type Props = NativeStackScreenProps<RootStackParamList, 'MiqaatList'>;

export function MiqaatListScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {/* Gradient app bar */}
      <LinearGradient
        colors={[colors.greenDark, colors.green]}
        locations={[0, 0.78]}
        style={[styles.header, { paddingTop: insets.top + 10 }]}
      >
        <Logo width={38} height={60} />
        <View style={styles.headerText}>
          <Text style={styles.headerIts}>ITS ID {currentUser.its}</Text>
          <Text style={styles.headerName} numberOfLines={1}>
            {currentUser.name}
          </Text>
        </View>
        <Bell count={currentUser.notifications} color={colors.white} />
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>All Miqaats</Text>
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onPress={() =>
              navigation.navigate('RegistrationDetail', { eventId: event.id })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

function EventCard({
  event,
  onPress,
}: {
  event: MiqaatEvent;
  onPress: () => void;
}) {
  const live = event.status === 'live';
  const tile = live
    ? { bg: colors.countPeachBg, border: colors.countPeachBorder, num: colors.countPeachNumber, lab: colors.countPeachLabel }
    : { bg: colors.countBlueBg, border: 'transparent', num: colors.countBlueNumber, lab: colors.countBlueLabel };

  const units: [string, string][] = [
    [event.countdown.days, 'Days'],
    [event.countdown.hours, 'Hours'],
    [event.countdown.mins, 'Min'],
    [event.countdown.secs, 'Sec'],
  ];

  return (
    <View style={[styles.card, cardShadow]}>
      {/* Hero block */}
      <LinearGradient
        colors={[colors.greenDark, colors.greenLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardHero}
      >
        <LinearGradient
          colors={['rgba(14,45,33,0)', colors.greenDarkest]}
          style={styles.cardHeroFade}
        />
        {live && (
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>Live</Text>
          </View>
        )}
        <View style={styles.cardHeroContent}>
          <Text style={styles.cardTitle}>{event.title}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MaterialIcons name="date-range" size={16} color={colors.white} />
              <Text style={styles.metaText}>{event.date}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="schedule" size={16} color={colors.white} />
              <Text style={styles.metaText}>{event.time}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Body */}
      <View style={styles.cardBody}>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: live ? colors.countPeachLabel : colors.countBlueLabel },
            ]}
          />
          <Text style={styles.statusText}>{event.statusLine}</Text>
        </View>

        <View style={styles.countdownRow}>
          {units.map(([value, label]) => (
            <View
              key={label}
              style={[
                styles.tile,
                { backgroundColor: tile.bg, borderColor: tile.border, borderWidth: live ? 1 : 0 },
              ]}
            >
              <Text style={[styles.tileNum, { color: tile.num }]}>{value}</Text>
              <Text style={[styles.tileLabel, { color: tile.lab }]}>{label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonZone}>
          {live ? (
            <Pressable style={styles.primaryButton} onPress={onPress}>
              <Text style={styles.primaryButtonText}>{event.cta}</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.outlineButton} onPress={onPress}>
              <Text style={styles.outlineButtonText}>{event.cta}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  header: {
    paddingBottom: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    flex: 1,
    marginLeft: 14,
  },
  headerIts: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.2,
    color: colors.white,
  },
  headerName: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(248,244,234,0.85)',
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  heading: {
    fontFamily: fonts.serif,
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 0.2,
    color: colors.greenDark,
    marginBottom: 14,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.cardBorderLight,
    overflow: 'hidden',
    marginBottom: 12,
  },
  cardHero: {
    height: 118,
    justifyContent: 'flex-end',
  },
  cardHeroFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 90,
  },
  cardHeroContent: {
    padding: 14,
  },
  cardTitle: {
    fontFamily: fonts.serif,
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: 0.15,
    color: colors.white,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.white,
  },
  liveBadge: {
    position: 'absolute',
    top: 13,
    right: 14,
    backgroundColor: colors.goldDark,
    borderRadius: 58,
    paddingHorizontal: 16,
    paddingVertical: 1,
    minWidth: 56,
    alignItems: 'center',
  },
  liveText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.white,
  },
  cardBody: {
    paddingHorizontal: 13,
    paddingTop: 13,
    paddingBottom: 13,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#3D3D46',
  },
  countdownRow: {
    flexDirection: 'row',
    gap: 6,
  },
  tile: {
    flex: 1,
    height: 68,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tileNum: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 24,
  },
  tileLabel: {
    fontFamily: fonts.bold,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  buttonZone: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorderLight,
  },
  primaryButton: {
    height: 42,
    borderRadius: 30,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    letterSpacing: 0.2,
    color: '#F8F4EA',
  },
  outlineButton: {
    height: 42,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButtonText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    letterSpacing: 0.2,
    color: colors.green,
  },
});
