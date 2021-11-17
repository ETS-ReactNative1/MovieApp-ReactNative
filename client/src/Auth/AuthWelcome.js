import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import ballon from '../../assets/ballon.png';

const AppMain = ({ navigation }) => {

  return (
      <View style={styles.container}>
          <SafeAreaView>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.textGray}>Sign in or create a new account</Text>
            <Image
            style={{
                width:340,
                height:340,
                resizeMode: 'contain',
            }}
            source={ballon}
          />
          <TouchableOpacity 
            style={styles.buttonSign}
            onPress={()=>{
                navigation.navigate('SignIn')
            }}>
              <Text style={styles.textColor}>Go to Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonSighUp}
            onPress={()=>{
                navigation.navigate('SignUp')
            }}>
              <Text>No account yet?
                <Text style={{color:"#ffa94e"}}> Sign up</Text>
              </Text>
          </TouchableOpacity>
          </SafeAreaView>
      </View>
    
  )
}

export default AppMain;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingTop: 100,
        paddingHorizontal: 40,
    },
    title:{
        marginTop:50,
        textAlign:'center',
        fontSize: 35,
        fontWeight: "500",
    },
    textGray:{
        marginTop: 5,
        marginLeft: -10,
        textAlign:'center',
        color:'gray',
        fontSize: 15,
    },
    buttonSign:{
        marginTop:50,
        width:'100%',
        borderRadius:20,
        paddingVertical:20,
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
    }

})
