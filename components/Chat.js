
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Linking,
  Platform,
  View, 
  Text
} from "react-native";
import MapView from 'react-native-maps';


import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';

const Chat = ({ isConnected, db, route, navigation, storage }) => {
  const { name, color, userID } = route.params;
  const [messages, setMessages] = useState([]);
  
  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });//sets Username to title on use of component
        console.log("userID ", userID);

    if (isConnected === true) {
    // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();
  

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

   const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  }

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };
  // const addMessagesItem = async (newMessage) => {
  //   const newMessageRef = await addDoc(
  //     collection(db, "messages"),
  //     newMessage[0]
  //   );
  //   if (!newMessageRef.id) {
  //     Alert.alert(
  //       "There was an error sending your message. Please try again later"
  //     );
  //   }
  // };
 
  //  send message => append to messages array
   const onSend = (newMessages) => {
    addMessagesItem(newMessages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else 
    return null;
   }
  
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "color"
          },
          left: {
            backgroundColor: "#FFF"
          },
        }}
      />
    );
  };
  // const renderCustomActions = (props) => {
  //   return <CustomActions onSend={onSend} {...props} />;
  // };

  const renderCustomActions = (props) => {
    return <CustomActions userID={userID} storage={storage} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        style={styles.textingBox}
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        //  _id={userID}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "ios" || Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textingBox: {
    flex: 1,
  },
});

export default Chat;
