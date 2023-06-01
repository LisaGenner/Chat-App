import React from 'react';
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import {KeyboardAvoidingView, Platform } from 'react-native';

const Chat = ({route, navigation }) => {
    const { name, color } = route.params;
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
      navigation.setOptions({ title: name });
      setMessages([
        {
          _id: 1,
          text: "Hello Developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
       {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
      ]);
    }, []);

    const onSend = (newMessages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }
    const renderBubble = (props) => {
      return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
      />
    }

return (
  <View style={[styles.container, { backgroundColor: color
  }]}>
     <GiftedChat 
  messages={messages}
  renderBubble={renderBubble}//prop so can change speech bubble color
  onSend={messages => onSend(messages)}
  user={{_id: 1}}//user id for the current user
  />
  {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
  {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
    <Text
  style={
   color !== "white" ? [{ color: "white" }, styles.title] : styles.title
 }
>
 Let's Chat
 </Text>
</View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
  }
});    

export default Chat;
