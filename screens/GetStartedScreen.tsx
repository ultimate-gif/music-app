import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, layout, globalStyles, shadows } from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

export const GetStartedScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const btnSlide = useRef(new Animated.Value(40)).current;
  const btnFade = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Logo + text entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.back(1.4)),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Button entrance (delayed)
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(btnFade, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(btnSlide, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);

    // Glow pulse loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={globalStyles.screen}>
      <LinearGradient
        colors={['rgba(193, 156, 255, 0.20)', 'transparent', 'rgba(255, 106, 157, 0.15)']}
        style={StyleSheet.absoluteFill}
      />

      {/* Hero content */}
      <Animated.View
        style={[
          styles.hero,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
          },
        ]}
      >
        {/* Logo */}
        <View style={styles.logoWrap}>
          <Animated.View style={[styles.logoGlow, { transform: [{ scale: pulseAnim }] }]} />
          <LinearGradient
            colors={[colors.primaryStart, colors.primaryEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoCircle}
          >
            <Feather name="music" size={48} color="#fff" />
          </LinearGradient>
        </View>

        <Text style={styles.title}>Riffy</Text>
        <Text style={styles.subtitle}>
          Your night, your sound.{'\n'}Premium after-dark listening awaits.
        </Text>
      </Animated.View>

      {/* CTA Button */}
      <Animated.View
        style={[
          styles.btnWrap,
          { opacity: btnFade, transform: [{ translateY: btnSlide }] },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Passcode')}
        >
          <LinearGradient
            colors={[colors.primaryStart, colors.primaryEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Get Started</Text>
            <Feather name="arrow-right" size={22} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

/* ────────── STYLES ────────── */

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },

  /* Logo */
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    position: 'relative',
  },
  logoGlow: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.primaryStart,
    opacity: 0.35,
    position: 'absolute',
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.primary,
  },

  /* Text */
  title: {
    ...typography.display,
    textAlign: 'center',
    letterSpacing: -1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },

  /* Button */
  btnWrap: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl + 16,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: layout.radiusLarge,
    gap: spacing.sm,
    ...shadows.primary,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
});
