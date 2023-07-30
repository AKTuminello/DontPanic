import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import UploadFileScreen from '../screens/UploadFileScreen';
import FunStuffScreen from '../screens/FunStuffScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Upload" component={UploadFileScreen} />
      <Drawer.Screen name="FunStuff" component={FunStuffScreen} />
      <Drawer.Screen name="Authorization" component={AuthenticationScreen} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
