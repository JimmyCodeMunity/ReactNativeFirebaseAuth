import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert} from 'react-native';
import React, {useState} from 'react'

import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';

//navigation stack
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator;




function HomeScreen(){
  return(
    <View style={styles.home}>
      <Text>HomeScreen</Text>
    </View>
  )
}


function LoginScreen(){
  const [email,setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const navigation = useNavigation;

  const handleCreateAccount = () =>{
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      Alert.alert('Account created successfully');
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error)=>{
      console.log(error);
      Alert.alert(error.message);
    })
  }


  const handleSignIn = () =>{
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      console.log('User signed in!');
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) =>{
      console.log(error)
    })
  }



  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize:34,fontWeight:'bold'}}>Login</Text>
      </View>

      <View style={styles.loginContainer}>
        <TextInput style={styles.input}
        onChangeText={(text)=> setEmail(text)}
         placeholder='Enter email'/>


        <TextInput style={styles.input}
         secureTextEntry
         onChangeText={(text)=> setPassword(text)}
          placeholder='Enter password'/>
      </View>
      <TouchableOpacity onPress={handleSignIn} style={styles.logbtn}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCreateAccount} style={styles.regbtn}>
        <Text>Create Account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer:{
    width:'100%',
    

  },
  input:{
    
    borderWidth:1,
    borderColor:'#ccc',
    height:30,
    width:280,
   
    borderRadius:5,
    marginBottom:15,
  },
  logbtn:{
    marginTop:40,
    paddingTop:7,
    paddingBottom:6,
    marginHorizontal:90,
    backgroundColor:"lightblue",
    borderRadius:5,
    width:70,
    alignItems:'center',
    justifyContent:'center'
    
  },
  regbtn:{
    marginTop:40,
    paddingTop:7,
    paddingBottom:6,
    marginHorizontal:90,
    backgroundColor:"lightblue",
    borderRadius:5,
    width:70,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'black'
    
  }
});
