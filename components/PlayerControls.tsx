import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, shadows } from '../styles/theme';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipForward?: () => void;
  onSkipBack?: () => void;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({ isPlaying, onPlayPause, onSkipForward, onSkipBack }) => {
  return (
    <View style={styles.container}>
      {/* Skip Back */}
      <TouchableOpacity onPress={onSkipBack} activeOpacity={0.7} style={styles.skipButton}>
        <Feather name="skip-back" color={colors.textMain} size={28} />
      </TouchableOpacity>
      {/* Play / Pause — single centered button */}
      <TouchableOpacity onPress={onPlayPause} activeOpacity={0.85}>
        <LinearGradient
          colors={[colors.primaryStart, colors.primaryEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.playButton}
        >
          <Feather
            name={isPlaying ? 'pause' : 'play'}
            color="#fff"
            size={32}
            style={isPlaying ? undefined : { marginLeft: 3 }}
          />
        </LinearGradient>
      </TouchableOpacity>

      {/* Skip Forward */}
      <TouchableOpacity onPress={onSkipForward} activeOpacity={0.7} style={styles.skipButton}>
        <Feather name="skip-forward" color={colors.textMain} size={28} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: spacing.md,
    gap: spacing.xl,
  },
  skipButton: {
    padding: spacing.md,
  },
  playButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.primary,
  },
});
