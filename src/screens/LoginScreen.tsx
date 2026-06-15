import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import type { RootStackParamList } from '../navigation/types';
import { Logo } from '../components/Logo';
import { colors, fonts } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const HERO_HEIGHT = 340;

export function LoginScreen({ navigation }: Props) {
  const [its, setIts] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {/* Hero */}
      <View style={styles.hero}>
        <LinearGradient
          colors={[colors.greenDarkest, colors.greenDark, colors.green]}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />
        {/* Soft gold radial glow behind the logo */}
        <Svg style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient id="glow" cx="50%" cy="34%" r="46%">
              <Stop offset="0" stopColor="#E3CD96" stopOpacity={0.28} />
              <Stop offset="0.62" stopColor="#E3CD96" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#glow)" />
        </Svg>

        <View style={styles.heroContent}>
          <Logo width={56} height={89} />
          <View style={styles.welcomeBlock}>
            <Text style={styles.welcomeTop}>Welcome to</Text>
            <Text style={styles.welcomeGold}>Miqāt Registration</Text>
          </View>
          <View style={styles.dividerRow}>
            <LinearGradient
              colors={['rgba(227,205,150,0)', colors.gold]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.dividerLine}
            />
            <Text style={styles.ornament}>۞</Text>
            <LinearGradient
              colors={[colors.gold, 'rgba(227,205,150,0)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.dividerLine}
            />
          </View>
        </View>
      </View>

      {/* Body card */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.cardWrap}
      >
        <ScrollView
          contentContainerStyle={styles.card}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.cardTitle}>Login to Continue</Text>
          <Text style={styles.cardSubtitle}>
            Use your ITS credentials to access the portal
          </Text>

          <Text style={styles.label}>ITS ID</Text>
          <TextInput
            style={styles.input}
            value={its}
            onChangeText={setIts}
            placeholder="Enter your ITS ID"
            placeholderTextColor={colors.placeholder}
            keyboardType="number-pad"
            maxLength={8}
          />

          <Text style={[styles.label, { marginTop: 18 }]}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={colors.placeholder}
            secureTextEntry
          />

          <Pressable
            style={styles.rememberRow}
            onPress={() => setRemember((r) => !r)}
          >
            <View style={[styles.checkbox, remember && styles.checkboxOn]}>
              {remember && <MaterialIcons name="check" size={15} color={colors.white} />}
            </View>
            <Text style={styles.rememberText}>Remember Me</Text>
          </Pressable>

          <Pressable
            style={styles.loginButton}
            onPress={() => navigation.replace('MiqaatList')}
          >
            <LinearGradient
              colors={[colors.green, colors.greenDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.loginText}>Login</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.greenDark,
  },
  hero: {
    height: HERO_HEIGHT,
    width: '100%',
    overflow: 'hidden',
  },
  heroContent: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 7,
  },
  welcomeBlock: {
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  welcomeTop: {
    fontFamily: fonts.serif,
    fontSize: 24,
    lineHeight: 28,
    color: '#F8F4EA',
    textAlign: 'center',
  },
  welcomeGold: {
    fontFamily: fonts.serif,
    fontSize: 24,
    lineHeight: 28,
    color: colors.gold,
    textAlign: 'center',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: 192,
    height: 20,
    marginTop: 2,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  ornament: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.gold,
    textAlign: 'center',
  },
  cardWrap: {
    flex: 1,
    marginTop: -27,
  },
  card: {
    backgroundColor: colors.cream,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    paddingHorizontal: 15,
    paddingTop: 32,
    paddingBottom: 40,
    minHeight: '100%',
  },
  cardTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    lineHeight: 33,
    color: colors.green,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.6,
    color: colors.goldDark,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textName,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.goldEdge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  rememberText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textBody,
    marginLeft: 12,
  },
  loginButton: {
    height: 48,
    borderRadius: 9999,
    marginTop: 28,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.4,
    color: '#F8F4EA',
  },
});
