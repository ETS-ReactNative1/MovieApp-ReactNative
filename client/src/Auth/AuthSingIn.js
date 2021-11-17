import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Switch, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-navigation'
import Icon from "react-native-vector-icons/AntDesign";
import { SIGN_IN, GET_USERS } from './gql';
import { useMutation } from '@apollo/client/react/hooks/useMutation';

const AuthSignIn = ({ navigation }) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [createUsers, { data, error }] = useMutation(SIGN_IN, {
        refetchQueries: [{ query: GET_USERS }],
    });

    if(data && data.signIn.length !=0 ){
        navigation.navigate('AppContainer')
    }

    let loginValue = login;
    let passwordValue = password;

    return (
      
      <View style={styles.container}>
        <SafeAreaView>
            <TouchableOpacity>
                <Icon name="arrowleft" size={29} color="black"
                onPress={()=>{
                    navigation.navigate('Main')
                }}/>
            </TouchableOpacity>
            
            <Text style={styles.title}>Welcome Back!</Text>
            <View style={styles.orange}></View>
            <Text style={styles.textGray}>{(data && data.signIn.length === 0) || error  ? 'No such user exists' : 'Email'}</Text>
            <TextInput
                value={login}
                onChangeText={text => setLogin(text)}
                style={styles.input}
                placeholder="name@exemple.com"
            />
            <View style={{backgroundColor:((data && data.signIn.length === 0) || error ) ? 'red' : 'gray',
                          marginBottom:40,
                          opacity: (data && data.signIn.length === 0) || error  ? 1 : 0.16,
                          width:'100%',
                          height:2,}}>     
           </View>
            <Text style={styles.textGray}>{(data && data.signIn.length === 0) || error  ? 'Or wrong password :)' : 'Password'}</Text>
            <TextInput 
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                placeholder="Enter your password"
            />
            <View style={{backgroundColor:((data && data.signIn.length === 0) || error ) ? 'red' : 'gray',
                          marginBottom:40,
                          opacity: (data && data.signIn.length === 0) || error  ? 1 : 0.16,
                          width:'100%',
                          height:2,}}>     
           </View>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',marginTop:40,}}>
                <Text style={styles.textGray}>Remember Me</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#ffa94e" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="gray"
                onValueChange={toggleSwitch}
                value={isEnabled}
            /></View>
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
              <Text style={styles.textColor}>Sign In!</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    
  )
}

export default AuthSignIn;

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
        marginTop:90,
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
        backgroundColor:'gray',
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
