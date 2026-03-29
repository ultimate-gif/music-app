import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, layout } from '../styles/theme';

interface GenreChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export const GenreChip: React.FC<GenreChipProps> = ({ label, active = false, onPress }) => {
  if (active) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.touchWrap}>
        <LinearGradient
          colors={[colors.primaryStart, colors.primaryEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <Text style={[styles.text, styles.textActive]}>{label}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, styles.touchWrap, styles.containerInactive]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchWrap: {
    marginRight: spacing.xs,
  },
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs - 2,
    borderRadius: layout.radiusFull,
  },
  containerInactive: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  text: {
    ...typography.caption,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  textActive: {
    color: colors.textMain,
    fontWeight: '700',
  },
});
