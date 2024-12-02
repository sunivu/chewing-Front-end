import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MyPageScreen, ManagePost, Plan, HidePost } from '../screens';
import { PostProvider } from '../contexts/PostContext';

const Stack = createStackNavigator();

const MyPage = () => {
    return (
        <PostProvider>
            <Stack.Navigator initialRouteName="MyPageScreen">
                <Stack.Screen
                    name="MyPageScreen"
                    component={MyPageScreen}
                    options={{
                        headerShown: false,
                        headerBackTitleVisible: false,
                    }}
                />
                <Stack.Screen
                    name="ManagePost"
                    component={ManagePost}
                    options={{
                        title: '내 게시물',
                        headerTitleAlign: 'center',
                        headerBackTitleVisible: false,
                    }}
                />
                <Stack.Screen
                    name="HidePost"
                    component={HidePost}
                    options={{
                        title: '숨긴 게시물',
                        headerTitleAlign: 'center',
                        headerBackTitleVisible: false,
                    }}
                />
                <Stack.Screen
                    name="Plan"
                    component={Plan}
                    options={{
                        title: '일정',
                        headerTitleAlign: 'center',
                        headerBackTitleVisible: false,
                    }}
                />
            </Stack.Navigator>
        </PostProvider>
    );
};

export default MyPage;
