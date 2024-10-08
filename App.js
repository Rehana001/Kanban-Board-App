// import 'react-native-gesture-handler';
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import DrawerNavigator from './src/navigators/DrawerNavigator'
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AllTasks from './src/screens/AllTasks';
// import TaskDetails from './src/screens/TaskDetails';
// import { Provider } from 'react-redux';
// import store from './src/Redux/store';

// const App = () => {
//   const Stack = createNativeStackNavigator();
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         {/* <DrawerNavigator/> */}
//         <Stack.Navigator>
//           <Stack.Screen name="Tasks List"
//             component={AllTasks} />
//           <Stack.Screen name="Tasks Detail"
//             component={TaskDetails} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   )
// }

// export default App

// const styles = StyleSheet.create({})

// App.js
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllTasks from './src/screens/AllTasks';
import TaskDetails from './src/screens/TaskDetails';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tasks List" component={AllTasks} />
          <Stack.Screen name="Tasks Detail" component={TaskDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
