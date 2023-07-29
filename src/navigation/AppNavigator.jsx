import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import UploadFileScreen from '../screens/UploadFileScreen';
import FunStuffScreen from '../screens/FunStuffScreen'; // Import the FunStuffScreen

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Upload" component={UploadFileScreen} />
      <Tab.Screen name="FunStuffScreen" component={FunStuffScreen} /> 
    </Tab.Navigator>
  );
};

export default AppNavigator;
