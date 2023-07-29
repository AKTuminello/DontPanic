import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import { firebase } from '../../firebaseConfig';


const FunStuffScreen = () => {
  const [selectedBlend, setSelectedBlend] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const blendsMenu = [
    {
      label: 'Calm',
      blend: 'calmBlend',
      text: 'Relax and wind down with this soothing blend.',
      imageUrl: 'url_to_calm_blend_image',
      audioUrl: 'url_to_calm_blend_audio',
    },
    {
      label: 'Energized',
      blend: 'energizedBlend',
      text: 'Increase alertness and improve focus with this refreshing blend.',
      imageUrl: 'url_to_energized_blend_image',
      audioUrl: 'url_to_energized_blend_audio',
    },
    // Add more blend objects for other options here
  ];

  const playAudio = async (fileUrl) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: fileUrl });
      setAudio(sound);
      await sound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const stopAudio = async () => {
    if (audio) {
      await audio.stopAsync();
      setIsPlaying(false);
    }
  };

  const handleBlendSelection = async (blendData) => {
    // Stop any previously playing audio
    await stopAudio();

    // Play the audio from Firebase Storage
    if (blendData.audioUrl) {
      playAudio(blendData.audioUrl);
    }

    // Set the selected blend for displaying text and image
    setSelectedBlend(blendData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>I want to feel more...</Text>
      {blendsMenu.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={styles.button}
          onPress={() => handleBlendSelection(item)}
        >
          <Text style={styles.buttonText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
      {selectedBlend && (
        <View style={styles.selectedBlendContainer}>
          <Text style={styles.selectedBlendText}>{selectedBlend.text}</Text>
          <Image source={{ uri: selectedBlend.imageUrl }} style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedBlendContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedBlendText: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});

export default FunStuffScreen;
