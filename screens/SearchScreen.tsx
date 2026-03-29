import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity, FlatList, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { colors, spacing, layout, globalStyles, typography, hp } from '../styles/theme';
import { SongCard } from '../components/SongCard';
import { mockSongs } from '../data/mockData';
import { useApp } from '../context/Appcontext';

export const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const { setCurrentSong } = useApp();

  return (
    <View style={globalStyles.screen}>
      {/* Search Bar */}
      <View style={styles.topContainer}>
        <View style={styles.searchWrapper}>
          <BlurView intensity={40} tint="dark" style={styles.blur}>
            <View style={styles.searchBar}>
              <Feather name="search" color={colors.textSecondary} size={20} />
              <TextInput
                style={styles.input}
                placeholder="Search songs..."
                placeholderTextColor={colors.textMuted}
                value={query}
                onChangeText={setQuery}
              />
            </View>
          </BlurView>
        </View>

        {/* Settings icon — fixed color, no state-based change */}
        <TouchableOpacity style={styles.settingsBtn} activeOpacity={0.7}>
          <View style={styles.settingsBg}>
            <Feather name="settings" size={20} color={colors.textMain} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Quick Picks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Picks</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={mockSongs.quickPicks}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.horizontalList}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <SongCard
                  id={item.id}
                  title={item.title}
                  artist={item.artist}
                  imageUrl={item.imageUrl}
                  onPress={() => setCurrentSong({ id: item.id, title: item.title, artist: item.artist, imageUrl: item.imageUrl })}
                />
              </View>
            )}
          />
        </View>

        {/* Bollywood Trending */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bollywood Trending</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={mockSongs.bollywoodTrending}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.horizontalList}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <SongCard
                  id={item.id}
                  title={item.title}
                  artist={item.artist}
                  imageUrl={item.imageUrl}
                  onPress={() => setCurrentSong({ id: item.id, title: item.title, artist: item.artist, imageUrl: item.imageUrl })}
                />
              </View>
            )}
          />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    paddingTop: hp(6),
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  settingsBtn: {
    marginLeft: spacing.xs,
  },
  settingsBg: {
    width: 40,
    height: 40,
    borderRadius: layout.radiusSmall,
    backgroundColor: colors.glassBackground,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchWrapper: {
    flex: 1,
    shadowColor: colors.primaryStart,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  blur: {
    borderRadius: layout.radiusMain,
    overflow: 'hidden',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.glassBackgroundStrong,
    borderRadius: layout.radiusMain,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.glassBorderStrong,
  },
  input: {
    flex: 1,
    marginLeft: spacing.sm,
    color: colors.textMain,
    fontSize: 16,
  },
  scrollContent: {
    paddingTop: spacing.md,
    paddingBottom: 20,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h2,
    fontWeight: '800',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  horizontalList: {
    paddingHorizontal: spacing.sm,
  },
  cardWrapper: {
    width: 280, // Giving SongCard a fixed width since it's in a horizontal FlatList now
  },
  bottomSpacer: {
    height: 140, // Space for miniplayer + tabs
  },
});