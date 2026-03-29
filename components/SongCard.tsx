import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, layout } from '../styles/theme';
import { useApp } from '../context/Appcontext'; // ✅ FIXED import (case issue)

interface SongCardProps {
  index?: number;
  id: string; // ✅ ADDED
  title: string;
  artist: string;
  imageUrl?: string;
  plays?: string;
  onPress?: () => void;
}

const FALLBACK_IMAGE = 'https://i.pravatar.cc/150?img=1';

export const SongCard: React.FC<SongCardProps> = ({
  index,
  id,
  title,
  artist,
  imageUrl,
  plays,
  onPress,
}) => {
  const resolvedImage = imageUrl || FALLBACK_IMAGE;
  const { likeSong, unlikeSong, likedSongs } = useApp();

  const isLiked = likedSongs.some((s) => s.id === id);

  const handleLike = () => {
    const song = { id, title, artist, imageUrl };

    if (isLiked) {
      unlikeSong(id);
    } else {
      likeSong(song);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.65}>

      {/* Track number */}
      {index !== undefined && (
        <View style={styles.indexWrap}>
          <Text style={styles.index}>{index}</Text>
        </View>
      )}

      {/* Album thumbnail */}
      <Image source={{ uri: resolvedImage }} style={styles.image} />

      {/* Track info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{artist}</Text>
      </View>

      {/* Play count */}
      {plays && (
        <View style={styles.playsPill}>
          <Text style={styles.plays}>{plays}</Text>
        </View>
      )}

      {/* ❤️ LIKE BUTTON */}
      <TouchableOpacity onPress={handleLike} style={styles.likeBtn}>
        <Text style={{ fontSize: 18 }}>
          {isLiked ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>

      {/* More button */}
      <TouchableOpacity style={styles.moreBtn}>
        <Feather name="more-vertical" color={colors.textSecondary} size={18} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: layout.radiusSmall,
    marginHorizontal: spacing.xs,
    marginBottom: 2,
  },
  indexWrap: {
    width: 24,
    marginRight: spacing.xs,
    alignItems: 'center',
  },
  index: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: layout.radiusSmall,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: spacing.xs,
  },
  title: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: 3,
  },
  artist: {
    ...typography.caption,
  },
  playsPill: {
    backgroundColor: colors.surface,
    borderRadius: layout.radiusFull,
    paddingHorizontal: spacing.xs,
    paddingVertical: 3,
    marginRight: spacing.xs,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  plays: {
    ...typography.small,
    color: colors.textMuted,
    fontWeight: '600',
  },
  likeBtn: {
    marginRight: spacing.sm,
  },
  moreBtn: {
    padding: 4,
  },
});