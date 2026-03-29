import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, layout, wp } from '../styles/theme';

interface PlaylistCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  onPress?: () => void;
}

const CARD_WIDTH = wp(38);

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ title, subtitle, imageUrl, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        {/* Gradient overlay for depth */}
        <LinearGradient
          colors={['transparent', 'rgba(7, 7, 15, 0.7)']}
          style={styles.imageOverlay}
        />
      </View>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginRight: spacing.sm,
  },
  imageWrap: {
    position: 'relative',
    marginBottom: spacing.xs,
    borderRadius: layout.radiusMain,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: layout.radiusMain,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: 3,
    paddingHorizontal: 2,
  },
  subtitle: {
    ...typography.caption,
    paddingHorizontal: 2,
  },
});
