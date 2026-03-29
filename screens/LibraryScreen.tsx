import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, layout, globalStyles, hp } from '../styles/theme';
import { useApp } from '../context/Appcontext';
import { SongCard } from '../components/SongCard';

export const LibraryScreen: React.FC = () => {
  const { likedSongs, setCurrentSong, setPlayQueue } = useApp();

  // Show only up to 5 recently liked songs
  const recentLikes = [...likedSongs].reverse().slice(0, 5);

  return (
    <View style={globalStyles.screen}>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Library</Text>
        </View>

        {/* Liked Songs Card */}
        <TouchableOpacity activeOpacity={0.8} style={styles.cardWrapper}>
          <LinearGradient
            colors={[colors.primaryStart, colors.primaryEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.iconCircle}>
              <Feather name="heart" size={24} color={colors.primaryStart} />
            </View>

            <View>
              <Text style={styles.cardTitle}>Liked Songs</Text>
              <Text style={styles.cardSubtitle}>
                {likedSongs.length} {likedSongs.length === 1 ? 'song' : 'songs'}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Recently Liked Section */}
        <View style={styles.recentlyLikedSection}>
          <Text style={styles.sectionTitle}>Recently Liked</Text>

          {recentLikes.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>No liked songs yet 🎵</Text>
            </View>
          ) : (
            <View style={styles.recentList}>
              {recentLikes.map((song, index) => (
                <View key={song.id} style={styles.recentItemWrap}>
                  <SongCard
                    id={song.id}
                    title={song.title}
                    artist={song.artist}
                    imageUrl={song.imageUrl || 'https://i.pravatar.cc/150?img=1'} 
                    index={index + 1}
                    onPress={() => {
                      setPlayQueue(likedSongs);
                      setCurrentSong({ id: song.id, title: song.title, artist: song.artist, imageUrl: song.imageUrl });
                    }}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: hp(8),
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    ...typography.h1,
    fontWeight: '800',
  },
  cardWrapper: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  card: {
    borderRadius: layout.radiusMain,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    shadowColor: colors.primaryStart,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    ...typography.h2,
    color: '#fff',
    fontWeight: '700',
  },
  cardSubtitle: {
    ...typography.body,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
    marginTop: 2,
  },
  recentlyLikedSection: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.h2,
    fontWeight: '800',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  emptyWrap: {
    marginTop: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    ...typography.h3,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  recentList: {
    paddingHorizontal: spacing.sm,
  },
  recentItemWrap: {
    marginBottom: spacing.xs,
  },
  bottomSpacer: {
    height: 140, // Space for miniplayer + tabs
  },
});