import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { TopBar } from '../components/TopBar';
import { Breadcrumb } from '../components/Breadcrumb';
import { SectionDivider } from '../components/SectionDivider';
import { StickyCTA } from '../components/StickyCTA';
import { colors, fonts, cardShadow } from '../theme';
import { miqaatDetail, currentUser } from '../data/mock';

type Props = NativeStackScreenProps<RootStackParamList, 'RegistrationDetail'>;

export function RegistrationDetailScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const d = miqaatDetail;

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
              { label: 'Miqaat detail page', active: true },
            ]}
          />
        </View>

        {/* Hero + Fasal */}
        <LinearGradient
          colors={[colors.greenDarkest, colors.greenDark, colors.green]}
          locations={[0, 0.5, 1]}
          style={styles.hero}
        >
          <Text style={styles.heroTitle}>{d.title}</Text>
          <View style={styles.heroMeta}>
            <View style={styles.metaItem}>
              <MaterialIcons name="date-range" size={16} color={colors.white} />
              <Text style={styles.heroMetaText}>{d.date}</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <MaterialIcons name="schedule" size={16} color={colors.white} />
              <Text style={styles.heroMetaText}>{d.time}</Text>
            </View>
          </View>

          {/* Fasal panel */}
          <View style={styles.fasalPanel}>
            <Text style={styles.fasalEyebrow}>OFFICIAL FASAL ANNOUNCEMENT</Text>
            <Text style={styles.salawat}>{d.salawat}</Text>
            <Text style={styles.fasalSubtitle}>{d.fasal}</Text>

            <View style={styles.hostPill}>
              <Ionicons name="location-sharp" size={14} color={colors.gold} />
              <Text style={styles.hostLabel}>Host City</Text>
              <Text style={styles.hostValue}>{d.hostCity}</Text>
            </View>

            <Text style={styles.relayHeading}>RELAY CENTERS</Text>
            <View style={styles.relayGrid}>
              {d.relayCenters.map((city) => (
                <View key={city} style={styles.relayChip}>
                  <Text style={styles.relayOrnament}>۞</Text>
                  <Text style={styles.relayCity}>{city}</Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>

        {/* Important Notice */}
        <View style={styles.section}>
          <SectionDivider label="Important Notice" align="left" />
          <View style={[styles.noticeCard, cardShadow]}>
            {d.notices.map((notice, i) => (
              <View
                key={i}
                style={[styles.noticeRow, i === d.notices.length - 1 && styles.noticeRowLast]}
              >
                <View style={styles.noticeBadge}>
                  <Text style={styles.noticeBadgeText}>{i + 1}</Text>
                </View>
                <Text style={styles.noticeText}>{notice}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Video */}
        <View style={styles.section}>
          <LinearGradient
            colors={[colors.greenDarkest, colors.green]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.video, cardShadow]}
          >
            <View style={styles.playButton}>
              <Ionicons name="play" size={28} color={colors.greenDark} style={{ marginLeft: 3 }} />
            </View>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.55)']}
              style={styles.videoCaptionBar}
            >
              <Text style={styles.videoCaption}>{d.videoCaption}</Text>
            </LinearGradient>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <SectionDivider label="About" />
        </View>
      </ScrollView>

      <StickyCTA
        caption="Eid-e-Ghadeer 1447H"
        title="Registration open"
        buttonLabel="Register Now"
        onPress={() => navigation.navigate('AddPeople')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  scroll: { paddingBottom: 140 },
  crumbWrap: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  hero: {
    marginHorizontal: 0,
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 26,
  },
  heroTitle: {
    fontFamily: fonts.serif,
    fontSize: 27,
    lineHeight: 31,
    letterSpacing: 0.2,
    color: colors.white,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(227,205,150,0.4)',
  },
  heroMetaText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 18,
    color: colors.white,
  },
  fasalPanel: {
    marginTop: 22,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(227,205,150,0.25)',
    backgroundColor: 'rgba(255,255,255,0.07)',
    padding: 18,
    alignItems: 'center',
  },
  fasalEyebrow: {
    fontFamily: fonts.extrabold,
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1,
    color: colors.gold,
    textTransform: 'uppercase',
  },
  salawat: {
    fontFamily: fonts.arabic,
    fontSize: 18,
    lineHeight: 32,
    color: colors.white,
    textAlign: 'center',
    marginTop: 14,
  },
  fasalSubtitle: {
    fontFamily: fonts.italic,
    fontSize: 13,
    lineHeight: 20,
    color: 'rgba(248,244,234,0.8)',
    textAlign: 'center',
    marginTop: 12,
  },
  hostPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 18,
    paddingHorizontal: 16,
    height: 35,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(227,205,150,0.4)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  hostLabel: {
    fontFamily: fonts.bold,
    fontSize: 13,
    lineHeight: 19,
    color: colors.gold,
  },
  hostValue: {
    fontFamily: fonts.bold,
    fontSize: 13,
    lineHeight: 19,
    color: colors.white,
  },
  relayHeading: {
    fontFamily: fonts.extrabold,
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1,
    color: colors.gold,
    textTransform: 'uppercase',
    marginTop: 22,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  relayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  relayChip: {
    width: '31%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    height: 37,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(227,205,150,0.3)',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  relayOrnament: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.gold,
  },
  relayCity: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 18,
    color: colors.white,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  noticeCard: {
    marginTop: 16,
    backgroundColor: colors.cream,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  noticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  noticeRowLast: {
    borderBottomWidth: 0,
  },
  noticeBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noticeBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.greenDark,
  },
  noticeText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textNoticeBody,
  },
  video: {
    marginTop: 4,
    height: 200,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: 'rgba(248,244,234,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  videoCaptionBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  videoCaption: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 21,
    color: colors.white,
  },
});
