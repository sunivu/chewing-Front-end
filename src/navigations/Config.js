import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ConfigScreen, TermsOfService, NoticeList, NoticeScreen, UserProfile, Name, Birth, PhoneNumber } from "../configscreens";

const Stack = createStackNavigator();

const Config = () => {
    return (
        <Stack.Navigator initialRouteName="ConfigScreen">
            <Stack.Screen 
                name="TermsOfService" 
                component={TermsOfService} 
                options={{
                    title: "약관",
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: true,
                }}/>
            <Stack.Screen 
                name="NoticeList" 
                component={NoticeList} 
                options={{
                    title: "공지사항",
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                }}/>
            <Stack.Screen
                name="NoticeScreen"
                component={NoticeScreen}
                options={{
                    title: "공지사항",
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen 
                name="UserProfile" 
                component={UserProfile} 
                options={{
                    title: "개인 정보",
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen 
                name="Name" 
                component={Name} 
                options={{
                    title: "사용자 이름",
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen 
                name="Birth" 
                component={Birth} 
                options={{
                    title: "생년월일",
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen 
                name="PhoneNumber" 
                component={PhoneNumber} 
                options={{
                    title: "휴대폰 번호",
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen 
                name="ConfigScreen" 
                component={ConfigScreen} 
                options={{
                    title: "설정",
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default Config;