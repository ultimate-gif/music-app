import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';

interface VinylRecordProps {
    imageUrl: string;
    isPlaying: boolean;
    size?: number;
}

export const VinylRecord: React.FC<VinylRecordProps> = ({
    imageUrl,
    isPlaying,
    size = 300,
}) => {
    const spinAnim = useRef(new Animated.Value(0)).current;
    const animRef = useRef<Animated.CompositeAnimation | null>(null);

    useEffect(() => {
        if (isPlaying) {
            spinAnim.setValue(0);
            animRef.current = Animated.loop(
                Animated.timing(spinAnim, {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            );
            animRef.current.start();
        } else {
            if (animRef.current) animRef.current.stop();
        }
        return () => {
            if (animRef.current) animRef.current.stop();
        };
    }, [isPlaying]);

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const avatarSize = size * 0.44;

    return (
        <View style={[styles.wrapper, { width: size, height: size }]}>
            <Animated.View
                style={[
                    styles.discWrap,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        transform: [{ rotate: spin }],
                    },
                ]}
            >
                <Image
                    source={require('../assets/pl.png')}
                    style={{ width: size, height: size, borderRadius: size / 2 }}
                    resizeMode="cover"
                />

                <View
                    style={[
                        styles.avatarWrap,
                        {
                            width: avatarSize,
                            height: avatarSize,
                            borderRadius: avatarSize / 2,
                        },
                    ]}
                >
                    <Image
                        source={{ uri: imageUrl }}
                        style={{
                            width: avatarSize,
                            height: avatarSize,
                            borderRadius: avatarSize / 2,
                        }}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.spindle} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    discWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',  // clips the black corners — no buffering ring
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.8,
        shadowRadius: 24,
        elevation: 20,
    },
    avatarWrap: {
        position: 'absolute',
        overflow: 'hidden',
    },
    spindle: {
        position: 'absolute',
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.4)',
        zIndex: 10,
    },
});