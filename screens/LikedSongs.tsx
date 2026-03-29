import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useApp } from '../context/Appcontext';
import { SongCard } from '../components/SongCard';
import { colors, spacing, typography, globalStyles } from '../styles/theme';

export const LikedSongsScreen: React.FC = () => {
    const { likedSongs } = useApp();

    return (
        <View style={globalStyles.screen}>
            <View style={styles.header}>
                <Text style={styles.title}>Liked Songs</Text>
            </View>

            {likedSongs.length === 0 ? (
                <Text style={styles.empty}>No liked songs yet</Text>
            ) : (
                <FlatList
                    data={likedSongs}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <SongCard
                            id={item.id}
                            title={item.title}
                            artist={item.artist}
                            imageUrl={item.imageUrl}
                            index={index + 1}
                        />
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: spacing.md,
    },
    title: {
        ...typography.h1,
    },
    empty: {
        textAlign: 'center',
        marginTop: spacing.lg,
        color: colors.textSecondary,
    },
});