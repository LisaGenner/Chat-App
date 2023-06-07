import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";

import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT_rxmpBv_9gujGc6lJ51LiA-4CWvC0u4",
  authDomain: "chatapp-dec4e.firebaseapp.com",
  projectId: "chatapp-dec4e",
  storageBucket: "chatapp-dec4e.appspot.com",
  messagingSenderId: "16129654801",
  appId: "1:16129654801:web:08a35a5e4716da6ba771b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start' screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name='Start' component={Start} options={{ headerShown: false }} />
        <Stack.Screen name='Chat' component={Chat} options={({ route }) => ({ title: route.params.name })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;