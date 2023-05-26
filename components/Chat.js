import React from 'react';
import { useEffect } from 'react';
import { render } from 'react-dom';
import { View, Text } from 'react-native';

const Chat = ({route, navigation }) => {
    const { name } = route.params;

    
 render (
   <View style={styles.container}>
     <Text>Chat</Text>
   </View>
 );
}

export default Chat;
