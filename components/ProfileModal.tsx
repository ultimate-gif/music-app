import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, typography, spacing, layout, shadows, hp } from '../styles/theme';
import { useApp } from '../context/Appcontext';

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ visible, onClose }) => {
  const { likedSongs } = useApp();

  // Editable user info
  const [userName, setUserName] = useState('Alex');
  const [userHandle, setUserHandle] = useState('@alex_music');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [editingHandle, setEditingHandle] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (visible) {
      // Reset values before animating in
      fadeAnim.setValue(0);
      slideAnim.setValue(-20);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={handleClose} />
      </Animated.View>

      {/* Profile Card — anchored below the profile icon */}
      <Animated.View
        style={[
          styles.cardContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <BlurView intensity={60} tint="dark" style={styles.card}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose} activeOpacity={0.7}>
            <Feather name="x" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          {/* Avatar — inside the card, tap to upload */}
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.avatarTouchable}>
            <View style={styles.avatarRing}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <Feather name="user" size={28} color={colors.textSecondary} />
                </View>
              )}
            </View>
            <View style={styles.cameraOverlay}>
              <Feather name="camera" size={12} color="#fff" />
            </View>
          </TouchableOpacity>

          {/* Editable username */}
          {editingName ? (
            <TextInput
              style={styles.usernameInput}
              value={userName}
              onChangeText={setUserName}
              onBlur={() => setEditingName(false)}
              onSubmitEditing={() => setEditingName(false)}
              autoFocus
              selectionColor={colors.primaryStart}
              maxLength={20}
            />
          ) : (
            <TouchableOpacity onPress={() => setEditingName(true)} activeOpacity={0.7}>
              <Text style={styles.username}>{userName}</Text>
            </TouchableOpacity>
          )}

          {/* Editable handle */}
          {editingHandle ? (
            <TextInput
              style={styles.handleInput}
              value={userHandle}
              onChangeText={setUserHandle}
              onBlur={() => setEditingHandle(false)}
              onSubmitEditing={() => setEditingHandle(false)}
              autoFocus
              selectionColor={colors.primaryStart}
              maxLength={24}
            />
          ) : (
            <TouchableOpacity onPress={() => setEditingHandle(true)} activeOpacity={0.7}>
              <Text style={styles.handle}>{userHandle}</Text>
            </TouchableOpacity>
          )}

          {/* Liked songs stat */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Feather name="heart" size={18} color={colors.primaryEnd} />
              <Text style={styles.statValue}>{likedSongs.length}</Text>
              <Text style={styles.statLabel}>Liked Songs</Text>
            </View>
          </View>
        </BlurView>
      </Animated.View>
    </>
  );
};

/* ────────── STYLES ────────── */

const CARD_TOP = hp(6) + 48 + 8; // header paddingTop + profile icon height + gap

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 90,
  },
  cardContainer: {
    position: 'absolute',
    top: CARD_TOP,
    left: spacing.md,
    width: 240,
    zIndex: 100,
  },
  card: {
    borderRadius: layout.radiusMain,
    backgroundColor: colors.glassBackgroundStrong,
    borderWidth: 1,
    borderColor: colors.glassBorderStrong,
    padding: spacing.lg,
    paddingTop: spacing.lg,
    alignItems: 'center',
    overflow: 'hidden',
    ...shadows.card,
  },
  closeBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    padding: spacing.xxs,
    zIndex: 10,
  },

  /* Avatar */
  avatarTouchable: {
    marginBottom: spacing.sm,
    position: 'relative',
  },
  avatarRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: colors.primaryStart,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.primary,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.surface,
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryStart,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },

  /* Text */
  username: {
    ...typography.h3,
    fontWeight: '700',
    marginBottom: 2,
  },
  usernameInput: {
    ...typography.h3,
    fontWeight: '700',
    marginBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryStart,
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
    textAlign: 'center',
    minWidth: 120,
  },
  handle: {
    ...typography.caption,
    marginBottom: spacing.md,
  },
  handleInput: {
    ...typography.caption,
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryStart,
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
    textAlign: 'center',
    minWidth: 120,
  },

  /* Stats */
  statsRow: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: colors.glassBorder,
    paddingTop: spacing.sm,
    alignItems: 'center',
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: layout.radiusLarge,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  statValue: {
    ...typography.h3,
    lineHeight: 20,
  },
  statLabel: {
    ...typography.small,
    color: colors.textSecondary,
  },
});
