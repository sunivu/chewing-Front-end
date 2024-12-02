import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from './Auth';
import Main from './Main';
import { AuthContext } from '../contexts/AuthContext';

const RootStack = createStackNavigator();

const RootNavigator = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
                <RootStack.Screen name="Auth" component={Auth} />
            ) : (
                <RootStack.Screen name="Main" component={Main} />
            )}
        </RootStack.Navigator>
    );
};

export default RootNavigator;
