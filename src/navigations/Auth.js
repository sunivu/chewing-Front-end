import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Signin, LoadingScreen, PhoneNumberInput, CertificationNumber, EmailInput } from "../screens";
import { StackActions } from "@react-navigation/native";

const Stack = createStackNavigator();

const Auth = () => {
    return (
        <Stack.Navigator initialRouteName="LoadingScreen"
        >
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}}/>

            <Stack.Screen 
                name="PhoneNumberInput" 
                component={PhoneNumberInput} 
                options={{
                    title: "휴대폰 번호 입력",
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: 'white',
                        shadowOpacity: 0,
                    },
                }}
            />
            <Stack.Screen 
                name="CertificationNumber" 
                component={CertificationNumber} 
                options={{
                    title: "인증번호 입력",
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: 'white',
                        shadowOpacity: 0,
                    },
                }}
            />
            <Stack.Screen 
                name="EmailInput" 
                component={EmailInput} 
                options={{
                    title: "이메일 입력",
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: 'white',
                        shadowOpacity: 0,
                    },
                }}
            />
        </Stack.Navigator>
    )
}

export default Auth;