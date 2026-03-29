import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, layout, globalStyles, shadows, wp } from '../styles/theme';

interface HeaderProps {
  greeting: string;
  name: string;
}

export const Header: React.FC<HeaderProps> = ({ greeting, name }) => {
  return (
    <View style={styles.container}>
      <View style={globalStyles.row}>
        {/* Avatar with glow ring */}
        <View style={styles.avatarWrap}>
          <LinearGradient
            colors={[colors.primaryStart, colors.primaryEnd]}
            style={styles.avatarRing}
          >
            <Image
              source={{ uri: 'https://appstorespy.com/apps/play/BoysMemojiStickers/com.boys_memojis.app' }}
              style={styles.avatar}
            />
          </LinearGradient>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.notificationBtn} activeOpacity={0.7}>
        <View style={styles.bellBg}>
          <Feather name="bell" color={colors.textMain} size={20} />
        </View>
        <View style={styles.badge} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  avatarWrap: {
    marginRight: spacing.sm,
  },
  avatarRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.primary,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
  },
  textContainer: {
    justifyContent: 'center',
  },
  greeting: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  name: {
    ...typography.h3,
    fontWeight: '700',
  },
  notificationBtn: {
    position: 'relative',
  },
  bellBg: {
    width: 42,
    height: 42,
    borderRadius: layout.radiusSmall,
    backgroundColor: colors.glassBackground,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaryEnd,
    borderWidth: 1.5,
    borderColor: colors.background,
  },
});
