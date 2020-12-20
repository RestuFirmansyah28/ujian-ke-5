import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EditUser, Home, TambahKontak, UserDetails} from '../pages';
const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="TambahKontak" component={TambahKontak} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="EditUser" component={EditUser} />
    </Stack.Navigator>
  );
};

export default Router;
