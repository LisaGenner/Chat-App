import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';

import 'firebase/auth';
const firebaseConfig = {
  // Your Firebase configuration
};
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const db = getFirestore(app);

const Chat = ({ route, navigation }) => {
  const { name, userID } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: name });

    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, []);

  const referenceChatMessages = firebase.firestore().collection("messages");
  let unsubscribe;

  const onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          avatar: data.user.avatar || '',
          name: data.user.name,
        }
      });
    });
    setMessages(messages);
  };

  const addMessage = (message) => {
    const { _id, createdAt, image, location, text, user } = message;
    referenceChatMessages.add({
      _id,
      createdAt,
      image: image || null,
      location: location || null,
      text: text || '',
      uid: user._id,
      user,
    });
  };

  const onSend = (messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    addMessage(messages[0]);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: '#000' }
        }}
      />
    )
  };

  let backgroundColor = route.params.backgroundColor;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        renderBubble={renderBubble}
        messages={messages}
        onSend={onSend}
        user={{
          _id: userID,
          avatar: 'https://placeimg.com/140/140/any',
          name: name
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
      <Text style={styles.title}>Let's Chat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
