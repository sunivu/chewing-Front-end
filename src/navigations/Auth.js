import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Login,
  Signin,
  LoadingScreen,
  PhoneNumberInput,
  CertificationNumber,
  EmailInput,
  SignIn_ProfileSetting
} from "../screens";
import { AuthContext } from '../contexts/AuthContext';

const Stack = createStackNavigator();

const Auth = () => {
    const { setIsLoggedIn } = useContext(AuthContext);

    return (
        <Stack.Navigator
            initialRouteName="LoadingScreen"
            screenOptions={{
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                headerBackTitle: '',
                headerStyle: {
                    backgroundColor: 'white',
                    shadowOpacity: 0,
                },
                // 모든 화면에 적용되는 공통 옵션을 여기에 추가할 수 있습니다.
            }}
        >
            <Stack.Screen 
                name="LoadingScreen" 
                component={LoadingScreen} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="Login" 
                component={Login} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="Signin" 
                component={Signin} 
                options={{ headerShown: false }} 
            />

            <Stack.Screen
                name="PhoneNumberInput"
                component={PhoneNumberInput}
                options={{
                    title: "휴대폰 번호 입력",
                    // headerTitleAlign: 'center', // 이미 screenOptions에서 설정됨
                    // headerBackTitleVisible: false, // 이미 screenOptions에서 설정됨
                    // headerStyle: { backgroundColor: 'white', shadowOpacity: 0 }, // 이미 screenOptions에서 설정됨
                }}
            />
            <Stack.Screen
                name="CertificationNumber"
                component={CertificationNumber}
                options={{
                    title: "인증번호 입력",
                }}
            />
            <Stack.Screen
                name="EmailInput"
                component={EmailInput}
                options={{
                    title: "이메일 입력",
                }}
            />
            <Stack.Screen
                name="SignIn_ProfileSetting"
                options={{
                    title: "프로필 설정",
                }}
            >
                {props => <SignIn_ProfileSetting {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default Auth;
