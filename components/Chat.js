import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({route, navigation }) => {
    const { color, name } = route.params;

    console.log(color, name);
    
 return (
   <View style={[styles.container, { backgroundColor: color
   }]}>
     <Text>Chat</Text>
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});    

export default Chat;
