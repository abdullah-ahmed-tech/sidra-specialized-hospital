import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors, radius } from '../../constants/theme';

export function ShimmerBlock({
  height = 120,
  radiusSize = radius.lg,
}: {
  height?: number;
  radiusSize?: number;
}) {
  const translateX = useRef(new Animated.Value(-220)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(translateX, {
        toValue: 220,
        duration: 1100,
        useNativeDriver: true,
      }),
    );

    loop.start();
    return () => loop.stop();
  }, [translateX]);

  return (
    <View style={[styles.wrapper, { height, borderRadius: radiusSize }]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  shimmer: {
    width: 120,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
});