import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AddScreen, HomeScreen, AddNewTaskScreen } from './Screens'
import { store } from './redux'
import { ProfileScreen } from './Screens/ProfileScreen'
import { TestScreen } from './Screens/TestScreen'

type RootParamList = {
  Home: undefined
  Test: undefined
  NewTask: undefined
  Add: undefined
  Profile: undefined
}

const Tab = createBottomTabNavigator<RootParamList>()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Tab.Screen
            name="NewTask"
            component={AddNewTaskScreen}
            options={{
              tabBarLabel: 'New Task',
            }}
          />
          <Tab.Screen
            name="Add"
            component={AddScreen}
            // options={{
            //   tabBarShowLabel: false,
            //   tabBarIcon: ({ focused }) => (
            //     <View
            //       style={{
            //         top: -30,
            //         backgroundColor: 'red',
            //         height: 25,
            //         width: 25,
            //       }}>
            //       <Text>Add</Text>
            //     </View>
            //   ),
            // }}
          />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Test" component={TestScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
