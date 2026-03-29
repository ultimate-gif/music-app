import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, layout, globalStyles } from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('GetStarted');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim, slideAnim]);

  return (
    <View style={globalStyles.screen}>
      <LinearGradient
        colors={['rgba(193, 156, 255, 0.25)', 'transparent', 'rgba(255, 106, 157, 0.2)']}
        style={styles.gradientBg}
      />
      
      <Animated.View style={[
        styles.content,
        {
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { translateY: slideAnim }
          ]
        }
      ]}>
        <View style={styles.logoContainer}>
          <View style={styles.logoGlow} />
          <View style={styles.logoInner}>
            <Text style={styles.logoText}>M</Text>
          </View>
        </View>

        <Text style={styles.title}>Your Night, Your Sound</Text>
        <Text style={styles.subtitle}>
          Dive into the digital after-dark aesthetic with premium sound curations.
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientBg: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    position: 'relative',
  },
  logoGlow: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.primaryStart,
    opacity: 0.5,
    position: 'absolute',
    transform: [{ scale: 1.25 }],
  },
  logoInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: colors.primaryEnd,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.primaryStart,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
    paddingHorizontal: spacing.md,
  },
});
