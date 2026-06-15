import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { LoginScreen } from '../screens/LoginScreen';
import { MiqaatListScreen } from '../screens/MiqaatListScreen';
import { RegistrationDetailScreen } from '../screens/RegistrationDetailScreen';
import { AddPeopleScreen } from '../screens/AddPeopleScreen';
import { ReviewScreen } from '../screens/ReviewScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFFFFF' } }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MiqaatList" component={MiqaatListScreen} />
      <Stack.Screen name="RegistrationDetail" component={RegistrationDetailScreen} />
      <Stack.Screen name="AddPeople" component={AddPeopleScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  );
}
