import React from 'react';
/*
import { StyleSheet, Text, View, Button } from 'react-native';
import Routes from './routes/Routes';



export default class App extends React.Component {

  render() {

    return (
      <View style={styles.container} >
        <Routes />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
import { StackNavigator, DrawerNavigator } from "react-navigation";
import Login from './pages/Login';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Leave from './pages/Leave';
import LeaveApply from './pages/LeaveApply';
import LeaveWTO from './pages/LeaveWTO';

const App = StackNavigator(
  {
    Login: { screen: Login },
    Home: { screen: Home },
    Registration: { screen: Registration},
    Leave: { screen: Leave},
    LeaveApply: { screen: LeaveApply},
    LeaveWTO : { screen: LeaveWTO},
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default App;
