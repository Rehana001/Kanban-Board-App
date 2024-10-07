import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DrawerNavigator from './src/navigators/DrawerNavigator'
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
     <DrawerNavigator/>
     </NavigationContainer>
 
  )
}

export default App

const styles = StyleSheet.create({})