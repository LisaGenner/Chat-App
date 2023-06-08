import React from 'react';
// import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
  // Your Firebase configuration
// };

// initializeApp(firebaseConfig);


const Start = ({ navigation }) => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("");
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: text ? text : "User",
          color: color ? color : "white",
        });
        Alert.alert("Signed in successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try again later.");
      });
  };

  const backgroundColors = {
    black: { backgroundColor: '#090C08' },
    purple: { backgroundColor: '#474056' },
    grey: { backgroundColor: '#8A95A5' },
    green: { backgroundColor: '#B9C6AE' }
  };

  const { black, grey, purple, green } = backgroundColors;

  return (
    <ImageBackground
      source={require('../assets/BackgroundImage.png')}
      style={[styles.container, styles.image]}
    >
      <Text style={styles.title}>Welcome to the Chat App</Text>

      <View style={styles.container}>
        <TextInput
          style={styles.nameBox}
          value={text}
          onChangeText={(name) => setText(name)}
          placeholder='Your Name'
        />

        <View style={styles.colorSelect}>
          <Text style={styles.colorSelector}>Choose your Background:</Text>
          <View style={styles.colorWrapper}>
            <TouchableOpacity
              style={[
                styles.color,
                black,
                color === black.backgroundColor ? styles.colorSelected : {},
              ]}
              onPress={() => setColor(black.backgroundColor)}
            />
            <TouchableOpacity
              style={[
                styles.color,
                purple,
                color === purple.backgroundColor ? styles.colorSelected : {}
              ]}
              onPress={() => setColor(purple.backgroundColor)}
            />

            <TouchableOpacity
              style={[
                styles.color,
                grey,
                color === grey.backgroundColor ? styles.colorSelected : {}
              ]}
              onPress={() => setColor(grey.backgroundColor)}
            />

            <TouchableOpacity
              style={[
                styles.color,
                green,
                color === green.backgroundColor ? styles.colorSelected : {}
              ]}
              onPress={() => setColor(green.backgroundColor)}
            />

          </View>
        </View>

        <TouchableOpacity style={[styles.nameBox, styles.chatBox]}>
          <Text
            onPress={signInUser}
            style={[styles.colorSelector, styles.chatBox]}
  >
    Start Chatting
  </Text>
</TouchableOpacity>
</View>
</ImageBackground>
);
};
    
const styles = StyleSheet.create({
 container: {
   flex: 1,
    },

  image: {
   flexDirection: 'column',
   justifyContent: 'space-between',
   alignItems: 'center'
    },
    
    title: {  
    color: 'white',
    fontSize: 45,
    fontWeight: '600',
    marginTop: 60,
    fontWeight: 'bold',
  },

 inputBox: {
    backgroundColor: 'white',
    height: '44%',
    width: "88%",
    justifyContent: 'space-between',
   alignItems: 'center',
   paddingVertical: 20
   },

  nameBox: {
    height: 50,
    width: '88%',
    borderColor: '#757083',
    borderWidth: 1,
    borderRadius: 2,
    color: 'black',
    opacity: 50,
    fontSize: 16,
    fontWeight: '300',
    paddingLeft: 10,
 },

 colorSelector: {
  textAlign: 'center',
  fontSize: 16,
  fontWeight: '300',
  color: 'black',
  opacity: 100
},

colorWrapper: {
  flexDirection: 'row'
},

color: {
  width: 40,
  height: 40,
  borderRadius: 20,
  margin: 10
 },

 chatBox: {
    backgroundColor: '#757083',
    justifyContent: 'center'
  },
  
   chatBoxText: {
    textAlign:'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },


});