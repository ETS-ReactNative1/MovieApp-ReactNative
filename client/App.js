import React, { useState, useEffect, useContext } from "react";
import { View, StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import { SafeAreaView } from "react-navigation";
import StackNavigator from "./src/Screens/StackNavigator";
import DiscoverContextProvider from "./src/Context/DiscoverContext";
import ThemesContextProvider from "./src/Context/ThemesContext";
import { ThemesContext } from "./src/Context/ThemesContext";
import { getTheme } from "./src/utils/themePersist";
import AppMain from './src/Auth/AuthWelcome'
import AuthSignIn from './src/Auth/AuthSingIn'
import AuthSignUp from './src/Auth/AuthSignUp';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from "./src/Screens/Tabs/SettingsScreen/SettingsScreen";

const AppContainer = () => {

  const [appLoading, setAppLoading] = useState(true);
  const { theme, themeType, setTheme } = useContext(ThemesContext);

  useEffect(() => {
    getTheme()
      .then(theme => {
        if (theme) {
          setTheme(theme.colors);
        }
        setAppLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  if (appLoading) {
    return <AppLoading />;
  }

  return (
    <View style={styles(theme).appContainer}>
      <StatusBar
        barStyle={themeType == "dark" ? "light-content" : "dark-content"}
      />
      <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: "never" }}>
        <StackNavigator screenProps={{ theme: theme }} />
      </SafeAreaView>
    </View>
  );
};
const cache = new InMemoryCache({});

const Stack = createNativeStackNavigator();
const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log('[graphQLErrors]', graphQLErrors);
    }
    if (networkError) {
      console.log('[networkError]', networkError);
    }
  }),
  new HttpLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'same-origin',
  }),
]);

const client = new ApolloClient({
  link,
  cache,
});

const App = () => {
  return (
   <ApolloProvider client={client}>
    <View style={{ flex: 1 }}>
      <ThemesContextProvider>
        <DiscoverContextProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Main"
                  component={AppMain}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="SettingsScreen"
                  component={SettingsScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="SignUp"
                  component={AuthSignUp}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="SignIn"
                  component={AuthSignIn}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="AppContainer"
                  component={AppContainer}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
            {/* <AppContainer /> */}
        </DiscoverContextProvider>
      </ThemesContextProvider>
    </View>
   </ApolloProvider>
  );
};

const styles = theme => {
  return {
    app: {
      flex: 1,
    },
    appContainer: {
      flex: 1,
      backgroundColor: theme.base01,
    },
  };
};

export default App;
