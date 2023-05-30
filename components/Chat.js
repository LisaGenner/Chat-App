import React from 'react';
import { useEffect } from "react";
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({route, navigation }) => {
    const { name, color } = route.params;
    useEffect(() => {
      navigation.setOptions({ title: name });
    }, []);

   
return (
    <View style={[styles.container, { backgroundColor: color
   }]}>
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
