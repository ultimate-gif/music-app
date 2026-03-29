import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { colors, typography, spacing, layout, globalStyles, wp, hp } from '../styles/theme';
import { PlayerControls } from '../components/PlayerControls';
import { VinylRecord } from '../components/VinylRecord';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../context/Appcontext';

type PlayerScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

export const PlayerScreen: React.FC<PlayerScreenProps> = ({ navigation }) => {
  const {
    currentSong,
    isPlaying, togglePlay,
    currentTime, setCurrentTime,
    duration,
    likedSongs, likeSong, unlikeSong,
    playNext, playPrev,
  } = useApp();

  const isLiked = currentSong ? likedSongs.some(s => s.id === currentSong.id) : false;
  const hasRealDuration = !!currentSong?.duration;
  const imageUrl = currentSong?.imageUrl || 'https://i.pravatar.cc/150?img=1';

  const handleLike = () => {
    if (!currentSong) return;
    if (isLiked) unlikeSong(currentSong.id);
    else likeSong(currentSong);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const vinylSize = wp(100) - spacing.lg * 1.5;
  return (
    <View style={globalStyles.screen}>
      {/* Blurred background */}
      <Image source={{ uri: imageUrl }} style={StyleSheet.absoluteFillObject} blurRadius={25} />
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.72)' }]} />
      <LinearGradient
        colors={['rgba(193,100,255,0.15)', 'transparent', 'rgba(255,106,157,0.10)']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <View style={styles.headerBtnBg}>
            <Feather name="chevron-down" color="#fff" size={24} />
          </View>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerPre}>Now Playing</Text>
          <Text style={styles.headerPlaylist}>Late Night Drive</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.headerBtnBg}>
            <Feather name="more-horizontal" color="#fff" size={24} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Spinning Vinyl */}
        <View style={styles.vinylWrap}>
          <VinylRecord imageUrl={imageUrl} isPlaying={isPlaying} size={vinylSize} />
        </View>

        {/* Song Info + Like */}
        <View style={styles.infoContainer}>
          <View style={styles.textWrap}>
            <Text style={styles.title} numberOfLines={1}>{currentSong?.title || '—'}</Text>
            <Text style={styles.artist}>{currentSong?.artist || '—'}</Text>
          </View>
          <TouchableOpacity style={styles.likeBtn} onPress={handleLike} activeOpacity={0.7}>
            <Feather name="heart" color={isLiked ? colors.primaryEnd : 'rgba(255,255,255,0.5)'} size={24} />
          </TouchableOpacity>
        </View>

        {/* Progress Slider */}
        <View style={styles.progressContainer}>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={duration}
            value={currentTime}
            minimumTrackTintColor={colors.primaryStart}
            maximumTrackTintColor="rgba(255,255,255,0.15)"
            thumbTintColor={colors.primaryEnd}
            onValueChange={setCurrentTime}
            onSlidingComplete={setCurrentTime}
          />
          <View style={styles.timeLabels}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{hasRealDuration ? formatTime(duration) : '--:--'}</Text>
          </View>
        </View>

        {/* Controls */}
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={togglePlay}
          onSkipForward={playNext}
          onSkipBack={playPrev}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: hp(6),
    paddingBottom: spacing.sm,
  },
  headerBtnBg: {
    width: 42,
    height: 42,
    borderRadius: layout.radiusSmall,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: { alignItems: 'center' },
  headerPre: { fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 2, letterSpacing: 1 },
  headerPlaylist: { ...typography.caption, color: '#fff', fontWeight: '600' },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  vinylWrap: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.7,
    shadowRadius: 32,
    elevation: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textWrap: { flex: 1, marginRight: spacing.sm },
  title: { ...typography.h1, fontSize: 22, color: '#fff', marginBottom: 4 },
  artist: { ...typography.caption, fontSize: 14, color: 'rgba(255,255,255,0.6)' },
  likeBtn: {
    width: 44,
    height: 44,
    borderRadius: layout.radiusSmall,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: { width: '100%' },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  timeText: { ...typography.small, color: 'rgba(255,255,255,0.5)' },
});