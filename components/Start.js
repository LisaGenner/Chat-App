import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity  } from 'react-native';

const backgroundColors = {
  black: { backgroundColor: '#000000'},
  grey: { backgroundColor: '#8a95a5'},
  purple: { backgroundColor: '#474056'},
  green: { backgroundColor: '#94ae89'}
}
export default class Start extends React.Component {
 
  constructor(props) {
      super(props);
      this.state = { name: '', color: ''};
  }
  render () {
      const { black, grey, purple, green} = backgroundColors;
 return (
   <View style={styles.container}>
    <ImageBackground
                  source={require('../assets/BackgroundImage.png')}
                  style={[styles.container, styles.image]}
                >
     <Text style={styles.title}>Chat App</Text>

     <View style={styles.inputBox} >
         <TextInput
        style={styles.nameBox}
        value={this.state.name}
        onChangeText={(name)=> this.setState({ name })}
        placeholder='Enter your Name'
        />
         <View>
       <Text style={styles.colorSelector} >Choose your Background:</Text>
        <View style={styles.colorWrapper}>
        <TouchableOpacity 
           style={[styles.color, 
       black,
         this.state.color === black.backgroundColor
         ? styles.colorSelected
         : {}
         ]}
            onPress={() =>
           this.setState({ color: black.backgroundColor })
          }
         />
   <TouchableOpacity style={[
     styles.color, 
        grey,
         this.state.color === grey.backgroundColor
         ? styles.colorSelected
         : {}
          ]}
         onPress={() =>
       this.setState({ color: grey.backgroundColor })
         }
       />
   <TouchableOpacity style={[
       styles.color, 
           purple,
       this.state.color === purple.backgroundColor
       ? styles.colorSelected
          : {}
         ]}
        onPress={() =>
       this.setState({ color: purple.backgroundColor })
        }
        />
    <TouchableOpacity style={[
       styles.color,
       green,
         this.state.color === green.backgroundColor
          ? styles.colorSelected
         : {}
          ]}
         onPress={() =>
        this.setState({ color: green.backgroundColor })
        }
        />
        </View>
        </View>
       <TouchableOpacity
       style={[styles.nameBox, styles.chatBox]}
       // title='Go to Chat'
         onPress={() => 
         this.props.navigation.navigate('Chat', 
        {
         name: this.state.name, 
         color: this.state.color
         })
         }
         >
         <Text style={[styles.colorSelector, styles.chatBoxText]} >
         Start Chatting
        </Text>
         </TouchableOpacity>
         </View>
 
      </ImageBackground>
    </View>
        )
    }
}
    
const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   fontSize: 16,
    fontWeight: "300",
    color: '#757083'
 },
 textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15
    
 }
});
