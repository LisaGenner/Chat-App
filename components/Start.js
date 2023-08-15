import React from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";

const backgroundColors = {
  black: { backgroundColor: '#090C08'},
  blue: { backgroundColor: '#b4d9db'},
  grey: { backgroundColor: '#8A95A5'},
  green: { backgroundColor: '#B9C6AE'}
}

const colors = ["#090C08", "#8A95A5", "b4d9db", "gB9C6A"];

const Start = ({ navigation }) => {
  // Set initial state for text and color inputs
const [color, setColor] = useState("");
const auth = getAuth();
const [name, setName] = useState('');
const [text, setText] = useState("");
 
 // Function to sign in the user anonymously
 const signInUser = () => {
  signInAnonymously(auth)
    .then((result) => {
      navigation.navigate("Chat", {
        userID: result.user.uid,
        name: name,
        color: color ? color : "white",
      });
      alert("Signed in successfully!");
    })
    .catch((error) => {
      alert("Unable to sign in, try again later.");
    });
};

// sets background image
return (
  <View style={styles.container}>
    <ImageBackground
      source={require('../assets/BackgroundImage.png')}
      style={[styles.container, styles.image]}
    >
    <Text style={styles.title}>Chat App</Text>

      <View style={styles.inputBox}>
        <TextInput
          style={styles.nameBox}
          onChangeText={setName}
          placeholder='Your Name'
        />
        <View>
          <Text style={styles.colorSelector}>Choose your Background:</Text>
          <View style={styles.colorWrapper}>
            <TouchableOpacity
              style={[styles.color, backgroundColors.black]}
              onPress={() => setColor("#090C08")}
            />
            <TouchableOpacity
              style={[styles.color, backgroundColors.blue]}
              onPress={() => setColor("#b4d9db")}
            />
            <TouchableOpacity
              style={[styles.color, backgroundColors.grey]}
              onPress={() => setColor("#8A95A5")}
            />
            <TouchableOpacity
              style={[styles.color, backgroundColors.green]}
              onPress={() => setColor("#B9C6AE")}
            />
          </View>
        </View>
        <TouchableOpacity
  style={[styles.nameBox, styles.chatBox]}
  onPress={(sign) => {
    signInUser();
   }}
>

          <Text style={[styles.colorSelector, styles.chatBoxText]}>
            Start Chatting
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
);
};
 
// styling
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
export default Start;
