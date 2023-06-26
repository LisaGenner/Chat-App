// import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { useEffect } from "react";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { useNetInfo } from "@react-native-community/netinfo";

// LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);
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
const app = initializeApp(firebaseConfig); // Init Cloud Firestore
const db = getFirestore(app);
const storage = getStorage(app);

const App = () => {

const connectionStatus = useNetInfo();

useEffect(() => {
  // Check the connection status and perform actions accordingly
  if (connectionStatus.isConnected === false) {
    alert("Connection Lost!");
    disableNetwork(db); // Disable Firestore network access
  } else if (connectionStatus.isConnected === true) {
    enableNetwork(db); // Enable Firestore network access
  }
}, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start' screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name='Start' component={Start} options={{ headerShown: false }} />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat
            isConnected={connectionStatus.isConnected}
            db={db}
            storage={storage}
            {...props}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
