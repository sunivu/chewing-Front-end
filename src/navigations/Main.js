import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import AddScreen from '../screens/AddScreen';
import MyPage from './Mypage';
import Setting from './Setting';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 90,
                    backgroundColor: 'white',
                    borderTopColor: '#fff',
                },
                tabBarIcon: ({ focused }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = focused
                                ? require('../../assets/icons/home-active.png')
                                : require('../../assets/icons/home.png');
                            break;
                        case 'Chat':
                            iconName = focused
                                ? require('../../assets/icons/chat-active.png')
                                : require('../../assets/icons/chat.png');
                            break;
                        case 'Add':
                            iconName = focused
                                ? require('../../assets/icons/add-active.png')
                                : require('../../assets/icons/add.png');
                            break;
                        case 'MyPage':
                            iconName = focused
                                ? require('../../assets/icons/mypage-active.png')
                                : require('../../assets/icons/mypage.png');
                            break;
                        case 'Setting':
                            iconName = focused
                                ? require('../../assets/icons/setting-active.png')
                                : require('../../assets/icons/setting.png');
                            break;
                        default:
                            break;
                    }

                    return (
                        <Image
                            source={iconName}
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? '#000' : '#8e8e8e',
                            }}
                        />
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Add" component={AddScreen} />
            <Tab.Screen name="MyPage" component={MyPage} />
            <Tab.Screen name="Setting" component={Setting} />
        </Tab.Navigator>
    );
};

export default Main;
