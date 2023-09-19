import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AllExpenses from './screens/allExpenses';
import ManageExpenses from './screens/manageExpenses';
import RecentExpenses from './screens/recentExpenses';
import {GLobalStyle} from './constant/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconButton from './components/UI/IconButton';
import ExpenseContextProvider from './store/expensesContext';
import {StatusBar} from 'react-native';
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpenseOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GLobalStyle.colors.primary500},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GLobalStyle.colors.primary500},
        tabBarActiveTintColor: GLobalStyle.colors.accent500,
        headerRight: ({tintColor}: any) => (
          <IconButton
            icon={'add'}
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageExpenses');
            }}
          />
        ),
      })}>
      <BottomTabs.Screen
        name="RecentExpense"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="hourglass" color={color} size={size}></Ionicons>
          ),
        }}></BottomTabs.Screen>
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="calendar" color={color} size={size}></Ionicons>
          ),
        }}></BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
}

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ExpenseContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: GLobalStyle.colors.primary500},
              headerTintColor: 'white',
            }}>
            <Stack.Screen
              name="ExpenseOverview"
              component={ExpenseOverview}
              options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpenses}
              options={{
                title: 'Manage Expense',
                presentation: 'modal',
              }}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContextProvider>
    </>
  );
}

export default App;
