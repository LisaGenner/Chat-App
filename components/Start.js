import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity  } from 'react-native';

const backgroundColors = {
  black: { backgroundColor: '#090C08'},
  purple: { backgroundColor: '#474056'},
  grey: { backgroundColor: '#8A95A5'},
  green: { backgroundColor: '#B9C6AE'}
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
{/* <Icon style={styles.personIcon} name="ios-person" size={20} color="#000"/> */}
<TextInput
style={styles.nameBox}
value={this.state.name}
onChangeText={(name)=> this.setState({ name })}
placeholder='Your Name'
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
    },

  image: {
   flexDirection: 'column',
   justifyContent: 'space-between',
   alignItems: 'center'
    },
    
    title: {  
    color: '#fffff',
    fontSize: 45,
    fontWeight: '600',
    marginTop: 60,
    fontWeight: 'bold',
  },

 inputBox: {
    backgroundColor: '#fffff',
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
    fontColor: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },


});
