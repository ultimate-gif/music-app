import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, typography, spacing, layout, globalStyles, shadows } from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import passcodes from '../data/passcodes.json';

const PASSCODE_LENGTH = 6;
const STORAGE_KEY = '@musicfy_passcode';

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

export const PasscodeScreen: React.FC<Props> = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const dotScale = useRef(new Animated.Value(0.8)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const triggerShake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 12, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -12, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
    ]).start();
  };

  const handleChange = (text: string) => {
    // Only allow digits
    const digits = text.replace(/[^0-9]/g, '').slice(0, PASSCODE_LENGTH);
    setCode(digits);
    setError('');
  };

  const handleSubmit = async () => {
    if (code.length !== PASSCODE_LENGTH) {
      setError('Passcode must be 6 digits');
      triggerShake();
      return;
    }

    setLoading(true);

    // Small delay for UX feel
    await new Promise(r => setTimeout(r, 300));

    if ((passcodes as string[]).includes(code)) {
      await AsyncStorage.setItem(STORAGE_KEY, code);
      navigation.replace('MainTabs');
    } else {
      setError('Invalid passcode. Try again.');
      triggerShake();
      setLoading(false);
    }
  };

  // Dot indicator animation
  const filledCount = code.length;

  return (
    <View style={globalStyles.screen}>
      <LinearGradient
        colors={['rgba(193, 156, 255, 0.15)', 'transparent', 'rgba(255, 106, 157, 0.10)']}
        style={StyleSheet.absoluteFill}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Back button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={24} color={colors.textMain} />
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Lock icon */}
          <View style={styles.lockWrap}>
            <LinearGradient
              colors={[colors.primaryStart, colors.primaryEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.lockCircle}
            >
              <Feather name="lock" size={32} color="#fff" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>Enter Passcode</Text>
          <Text style={styles.subtitle}>
            Enter your 6-digit access code to unlock the app
          </Text>

          {/* Dot indicators */}
          <Animated.View
            style={[
              styles.dotsRow,
              { transform: [{ translateX: shakeAnim }] },
            ]}
          >
            {Array.from({ length: PASSCODE_LENGTH }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i < filledCount && styles.dotFilled,
                ]}
              />
            ))}
          </Animated.View>

          {/* Hidden TextInput */}
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            value={code}
            onChangeText={handleChange}
            keyboardType="number-pad"
            maxLength={PASSCODE_LENGTH}
            autoFocus
            caretHidden
          />

          {/* Tap to focus input */}
          <TouchableOpacity
            style={styles.dotsOverlay}
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
          />

          {/* Error message */}
          {error ? (
            <View style={styles.errorRow}>
              <Feather name="alert-circle" size={16} color={colors.primaryEnd} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <View style={styles.errorPlaceholder} />
          )}

          {/* Submit button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSubmit}
            disabled={loading}
          >
            <LinearGradient
              colors={
                code.length === PASSCODE_LENGTH
                  ? [colors.primaryStart, colors.primaryEnd]
                  : ['rgba(193,156,255,0.25)', 'rgba(255,106,157,0.25)']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitBtn}
            >
              {loading ? (
                <Text style={styles.submitText}>Verifying…</Text>
              ) : (
                <>
                  <Feather name="unlock" size={20} color="#fff" />
                  <Text style={styles.submitText}>Unlock</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
};

/* ────────── STYLES ────────── */

const styles = StyleSheet.create({
  flex: { flex: 1 },

  backBtn: {
    position: 'absolute',
    top: spacing.xxl + 8,
    left: spacing.md,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.glassBackground,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },

  /* Lock */
  lockWrap: {
    marginBottom: spacing.lg,
  },
  lockCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.primary,
  },

  /* Text */
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.caption,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },

  /* Dots */
  dotsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.md,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: colors.textMuted,
    backgroundColor: 'transparent',
  },
  dotFilled: {
    backgroundColor: colors.primaryStart,
    borderColor: colors.primaryStart,
  },
  dotsOverlay: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    height: 60,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },

  /* Error */
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.lg,
    height: 24,
  },
  errorText: {
    ...typography.caption,
    color: colors.primaryEnd,
  },
  errorPlaceholder: {
    height: 24,
    marginBottom: spacing.lg,
  },

  /* Submit */
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    borderRadius: layout.radiusLarge,
    paddingHorizontal: spacing.xxl,
    gap: spacing.sm,
    ...shadows.primary,
  },
  submitText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
});
