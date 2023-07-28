import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BlobBreathing from '../components/BlobBreathing';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>

      <BlobBreathing />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Upload')}
      >
        <Text style={styles.buttonText}>Go to Upload Screen</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
