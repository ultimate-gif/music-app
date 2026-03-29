import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, layout, shadows } from '../styles/theme';
import { useApp } from '../context/Appcontext';

interface MiniPlayerProps {
  onPress?: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({ onPress }) => {
  const {
    currentSong,
    isPlaying, togglePlay,
    progress,
    likedSongs, likeSong, unlikeSong,
    playNext,
  } = useApp();

  const progressAnim = useRef(new Animated.Value(0)).current;
  const playScaleAnim = useRef(new Animated.Value(1)).current;

  const isLiked = currentSong ? likedSongs.some(s => s.id === currentSong.id) : false;

  // Smooth progress bar — matches Spotify feel
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 1000, // 1s to match ticker speed — smooth like Spotify
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const handleLike = () => {
    if (!currentSong) return;
    if (isLiked) unlikeSong(currentSong.id);
    else likeSong(currentSong);
  };

  const handlePlayPause = () => {
    togglePlay();
    Animated.sequence([
      Animated.timing(playScaleAnim, { toValue: 0.8, duration: 100, useNativeDriver: true }),
      Animated.timing(playScaleAnim, { toValue: 1, duration: 150, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true }),
    ]).start();
  };

  const interpolatedWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  if (!currentSong) return null;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.92} style={styles.wrapper}>
      <BlurView intensity={65} tint="dark" style={styles.blurContainer}>
        <View style={styles.container}>
          {/* Album art */}
          <Image
            source={{ uri: currentSong.imageUrl || 'https://i.pravatar.cc/150?img=1' }}
            style={styles.image}
          />

          {/* Track info */}
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1}>{currentSong.title}</Text>
            <Text style={styles.artist} numberOfLines={1}>{currentSong.artist}</Text>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            {/* Like */}
            <TouchableOpacity onPress={handleLike} style={styles.btn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Feather name="heart" color={isLiked ? colors.primaryEnd : colors.primaryStart} size={20} />
            </TouchableOpacity>

            {/* Play/Pause */}
            <TouchableOpacity onPress={handlePlayPause} style={[styles.btn, styles.playBtn]} activeOpacity={0.9}>
              <Animated.View style={{ transform: [{ scale: playScaleAnim }] }}>
                <LinearGradient colors={[colors.primaryStart, colors.primaryEnd]} style={styles.playGradient}>
                  <Feather
                    name={isPlaying ? 'pause' : 'play'}
                    color="#fff"
                    size={18}
                    style={isPlaying ? undefined : { marginLeft: 2 }}
                  />
                </LinearGradient>
              </Animated.View>
            </TouchableOpacity>

            {/* Skip Forward */}
            <TouchableOpacity onPress={playNext} style={styles.btn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Feather name="skip-forward" color={colors.textMain} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress strip */}
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFillWrapper, { width: interpolatedWidth }]}>
            <LinearGradient
              colors={[colors.primaryStart, colors.primaryEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.progressFill}
            />
          </Animated.View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: spacing.sm,
    borderRadius: layout.radiusMain,
    overflow: 'hidden',
    ...shadows.primary,
  },
  blurContainer: {
    borderRadius: layout.radiusMain,
    borderWidth: 1,
    borderColor: colors.glassBorderStrong,
    overflow: 'hidden',
    backgroundColor: colors.glassBackgroundStrong,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minHeight: 68,
  },
  image: {
    width: 46,
    height: 46,
    borderRadius: layout.radiusSmall,
    backgroundColor: colors.surface,
  },
  info: {
    flex: 1,
    marginLeft: spacing.sm,
    justifyContent: 'center',
  },
  title: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: 3,
  },
  artist: {
    ...typography.caption,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  btn: { padding: 6 },
  playBtn: { marginHorizontal: 2 },
  playGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressTrack: {
    height: 3,
    backgroundColor: colors.glassBorder,
    width: '100%',
  },
  progressFillWrapper: { height: '100%' },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});