import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
    const actionSheet = useActionSheet();
 
    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;actionSheet.showActionSheetWithOptions(
            {
              options,
              cancelButtonIndex,
            },
            async (buttonIndex) => {
              switch (buttonIndex) {
                case 0:
                  pickImage();
                  return;
                case 1:
                  takePhoto();
                  return;
                case 2:
                  getLocation();
                default:
              }
            },
          );
        };

        const generateReference = (uri) => {
          const timeStamp = (new Date()).getTime();
          const imageName = uri.split("/")[uri.split("/").length - 1];
          return `${userID}-${timeStamp}-${imageName}`;
        }

        const uploadAndSendImage = async (imageURI) => {
          const uniqueRefString = generateReference(imageURI);
          const newUploadRef = ref(storage, uniqueRefString);
          const response = await fetch(imageURI);
          const blob = await response.blob();
          uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            const imageURL = await getDownloadURL(snapshot.ref)
            onSend({ image: imageURL })
          });
        }  

        const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  }
        
          const takePhoto = async (imageURI) => {
            let permissions = await ImagePicker.requestCameraPermissionsAsync();
            if (permissions?.granted) {
              let result = await ImagePicker.launchCameraAsync();
              if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
                //console.log('uploading and uploading the image occurs here');
                
               else alert("Permissions haven't been granted.");
            }
          }
                 
          const getLocation = async () => {
            let permissions = await Location.requestForegroundPermissionsAsync();
            if (permissions?.granted) {
              const location = await Location.getCurrentPositionAsync({});
              if (location) {onSend({
                location: {
                  longitude: location.coords.longitude,
                  latitude: location.coords.latitude,
                },
              });
            } else alert("Error occurred while fetching location");
          } else alert("Permissions haven't been granted.");
        }
        
        return(
      <TouchableOpacity style={styles.container} onPress={onActionPress}>
        <View style={[styles.wrapper, wrapperStyle]}>
<Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
      </TouchableOpacity>
    );
        }

  const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 10,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
  });

  export default CustomActions;
