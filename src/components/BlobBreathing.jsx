import React, { useState } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';

const BlobBreathing = () => {
  const [isBreathing, setBreathing] = useState(false);
  const animatedBlobSize = new Animated.Value(100);

  const startBreathing = () => {
    setBreathing(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedBlobSize, {
          toValue: 120,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedBlobSize, {
          toValue: 120,
          duration: 7000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedBlobSize, {
          toValue: 100,
          duration: 8000,
          useNativeDriver: false,
        }),
      ])
    ).start(() => {
      setBreathing(false);
    });
  };

  const handleTouchStart = () => {
    Animated.timing(animatedBlobSize, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      startBreathing();
    });
  };

  const handleTouchEnd = () => {
    if (isBreathing) {
      // Stop the breathing animation
      animatedBlobSize.stopAnimation();
      setBreathing(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.blobContainer, { height: animatedBlobSize, width: animatedBlobSize }]}
        onPressIn={handleTouchStart}
        onPressOut={handleTouchEnd}
      >
        {/* Your happy little blob (lava lamp) image here */}
        {/* You can replace the view with your actual blob image */}
        <View style={styles.blob} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blobContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  blob: {
    backgroundColor: 'yellow', // Replace with your blob's background color or image
    width: 100,
    height: 100,
    borderRadius: 50,
  },
};

export default BlobBreathing;
