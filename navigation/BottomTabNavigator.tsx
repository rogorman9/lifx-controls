import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import EditLightScreen from '../screens/EditLightScreen'
import LightsScreen from '../screens/LightsScreen'
import ScenesScreen from '../screens/ScenesScreen'
import { BottomTabParamList, LightsParamList, ScenesParamList } from '../types'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="Lights"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Lights"
        component={LightsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Scenes"
        component={ScenesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const LightsStack = createStackNavigator<LightsParamList>()

function LightsNavigator() {
  return (
    <LightsStack.Navigator>
      <LightsStack.Screen
        name="LightsScreen"
        component={LightsScreen}
        options={{ headerTitle: 'Lights' }}
      />
      <LightsStack.Screen
        name="EditLightScreen"
        component={EditLightScreen}
        options={({ route }) => ({ title: route.params.light.label })}
      />
    </LightsStack.Navigator>
  )
}

const ScenesStack = createStackNavigator<ScenesParamList>()

function ScenesNavigator() {
  return (
    <ScenesStack.Navigator>
      <ScenesStack.Screen
        name="ScenesScreen"
        component={ScenesScreen}
        options={{ headerTitle: 'Scenes' }}
      />
    </ScenesStack.Navigator>
  )
}
