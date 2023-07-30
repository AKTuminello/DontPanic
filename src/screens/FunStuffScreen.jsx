import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const FunStuffScreen = () => {
  const [selectedBlend, setSelectedBlend] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [blendsMenu, setBlendsMenu] = useState([]);
  const [isMusicOn, setIsMusicOn] = useState(false); 

  useEffect(() => {
    fetchBlendsFromFirestore();
  }, []);

  const fetchBlendsFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'OilBlends'));
      const blends = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlendsMenu(blends);
    } catch (error) {
      console.error('Error fetching blends:', error);
    }
  };

  const toggleMusic = async () => {
    if (isMusicOn) {
      await stopAudio();
    } else {
      if (selectedBlend?.audioUrl) {
        await playAudio(selectedBlend.audioUrl);
      }
    }
    setIsMusicOn(!isMusicOn);
  };

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
    if (selectedBlend && selectedBlend.id === blendData.id) {
      return;
    }
  
    await stopAudio();
    if (blendData.audioUrl && isMusicOn) {
      await playAudio(blendData.audioUrl);
    }
    setSelectedBlend(blendData);
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>I want to feel more...</Text>
      {blendsMenu.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.button}
          onPress={() => handleBlendSelection(item)}
        >
          <Text style={styles.buttonText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.toggleButton} onPress={() => toggleMusic()}>
        <Text style={styles.toggleButtonText}>{isMusicOn ? 'Music On' : 'Music Off'}</Text>
      </TouchableOpacity>
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
  toggleButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FunStuffScreen;
