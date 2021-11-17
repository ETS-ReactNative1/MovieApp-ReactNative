import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-navigation'
import Icon from "react-native-vector-icons/AntDesign";
import { ADD_USER, GET_USERS } from './gql';
import { useMutation } from '@apollo/client/react/hooks/useMutation';

const AuthSignUp = ({navigation}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [createUsers, { data, error }] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  let loginValue = login;
  let passwordValue = password;
  if(data && !error){
    navigation.navigate('SignIn')
}

  return (
      
      <View style={styles.container}>
        <SafeAreaView>
            <TouchableOpacity>
                <Icon name="arrowleft" size={29} color="black"
                onPress={()=>{
                    navigation.navigate('Main')
                }}/>
            </TouchableOpacity>
            
            <Text style={styles.title}>Create new account</Text>
            <View style={styles.orange}></View>
            <Text style={styles.textGray}>Full name</Text>
            <TextInput
                
                style={styles.input}
                placeholder="Enter your name"
            />
            <View style={styles.grayLine}></View>
            <Text style={styles.textGray}>{error ? "Bad email or this email already existst" : "Email adress"}</Text>
            <TextInput 
                value={login}
                onChangeText={text => setLogin(text)}
                style={styles.input}
                placeholder="name@exemple.com"
            />
            <View style={{backgroundColor: error ? "red" : "gray",
                          marginBottom:40, 
                          opacity: error ? 1 : 0.16,
                          width:'100%',
                          height:2,}}>
            </View>
            <Text style={styles.textGray}>Create Password</Text>
            <TextInput
                 
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                placeholder="Enter your password"
            />
            <View style={styles.grayLine}></View>
            <TouchableOpacity 
                style={styles.buttonSign}
                onPress={()=>{
                    setLogin()
                    setPassword()
                    createUsers({
                        variables:{
                            email:loginValue,
                            password:passwordValue
                        }
                    })
                }}>
              <Text style={styles.textColor}>Sign Up!</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    
  )
}

export default AuthSignUp;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingTop: 80,
        paddingHorizontal: 40,
    },
    title:{
        marginTop:50,
        width:200,
        lineHeight:50,
        textAlign:'left',
        fontSize: 37,
        fontWeight: "600",
        marginBottom:12,
    },
    orange:{
        marginBottom:80,
        width:25,
        height:5,
        borderRadius:20,
        backgroundColor:"#ffa94e"
    },
    textGray:{
        marginBottom:13,
        color:'gray',
        fontWeight: "700",
        fontSize: 18,
    },
    buttonSign:{
        marginTop:70,
        width:'100%',
        borderRadius:20,
        paddingVertical:23,
        alignItems:'center',
        backgroundColor:'#ffa94e',
    },
    textColor:{
        color:'white',
        fontWeight:'700',
        fontSize:16
    },
    buttonSighUp:{
        marginTop:20,
        width:'100%',
        borderRadius:20,
        paddingVertical:20,
        borderColor:'gray',
        borderWidth:0.3,
        alignItems:'center',
        backgroundColor:'white',
        color:'#ffa94e'
    },
    grayLine:{
        marginBottom:40,
        backgroundColor: "gray", 
        opacity: 0.16,
        width:'100%',
        height:2,
    },
    input:{
        color:'gray',
        fontSize:15,
        marginBottom:10
    }

})
