import React, { useState } from 'react'
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AddScreen, HomeScreen, NewTaskScreen } from './Screens'
import { store } from './redux'
import { Calendar, MonthlyCalendar } from './Components/Calendar'
import dayjs from 'dayjs'
import { ColorPalette } from './Assets'
import TabBar from './Components/TabBar'

function SettingsScreen() {
  const [selectedMonth, setSelectedMonth] = useState(dayjs('2021-03-10'))
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Calendar calendarDimensions={350} />
        <View style={{ height: 50, width: 50, backgroundColor: ColorPalette.darkGreen }} />
      </View>
    </SafeAreaView>
  )
}

type RootParamList = {
  Home: undefined
  Testing: undefined
  NewTask: undefined
  Add: undefined
}

const Tab = createBottomTabNavigator<RootParamList>()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Testing" component={SettingsScreen} />
          <Tab.Screen
            name="NewTask"
            component={NewTaskScreen}
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
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
