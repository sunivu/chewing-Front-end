import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const UserProfile = ({ route, navigation }) => {
    //text를 위한 임의의 사용자 profile
    const [userInfo, setUserInfo] = useState({
        lastName: '김',
        firstName: '츄잉',
        birthDate: '2000.01.02',
        phoneNumber: '01012345678',
        email: 'example@example.com',
    });

    useEffect(() => {
        if (route.params?.updatedLastName || route.params?.updatedFirstName) {
            setUserInfo(prevState => ({
                ...prevState,
                lastName: route.params.updatedLastName || prevState.lastName,
                firstName: route.params.updatedFirstName || prevState.firstName,
            }));
        }
    }, [route.params]);

    useEffect(() => {
        if (route.params?.updatedBirthDate) {
            setUserInfo(prevState => ({
                ...prevState,
                birthDate: route.params.updatedBirthDate,
            }));
        }
    }, [route.params?.updatedBirthDate]);

    const handleEditName = () => {
        navigation.navigate('Name', {
            lastName: userInfo.lastName,
            firstName: userInfo.firstName,
        });
    };

    const handleEditBirth = () => {
        navigation.navigate('Birth', {
            birthDate: userInfo.birthDate,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>정보 관리</Text>
            <View style={styles.infoBox}>
                <TouchableOpacity style={styles.infoButton} onPress={handleEditName}>
                    <Text style={styles.label}>사용자 이름</Text>
                    <View style={styles.rightContainer}>
                        <Text style={styles.value}>{userInfo.lastName}{userInfo.firstName}</Text>
                        <Icon name="chevron-forward" size={20} style={styles.icon} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoButton} onPress={() => navigation.navigate("Birth")}> 
                    <Text style={styles.label}>생년월일</Text>
                    <View style={styles.rightContainer}>
                        <Text style={styles.value}>{userInfo.birthDate}</Text>
                        <Icon name="chevron-forward" size={20} style={styles.icon} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoButton} onPress={() => navigation.navigate("PhoneNumber")}>
                    <Text style={styles.label}>휴대폰 번호</Text>
                    <View style={styles.rightContainer}>
                        <Text style={styles.value}>{userInfo.phoneNumber}</Text>
                        <Icon name="chevron-forward" size={20} style={styles.icon} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoButton} onPress={() => navigation.navigate("Email")}>
                    <Text style={styles.label}>이메일</Text>
                    <View style={styles.rightContainer}>
                        <Text style={styles.value}>{userInfo.email}</Text>
                        <Icon name="chevron-forward" size={20} style={styles.icon} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        marginBottom: 20,
        lineHeight: 24,
        color: "#000",
    },
    infoBox: {
        backgroundColor: '#F5F9FD',
        borderRadius: 15,
        padding: 20,
    },
    infoButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    label: {
        fontWeight: 'medium',
        fontSize: 15,
        marginBottom: 10,
        lineHeight: 24,
        color: "#33363F",
    },
    value: {
        fontWeight: 'regular',
        fontSize: 16,
        lineHeight: 24,
        color: "#0F84F4",

        marginRight: 5,
    },
    icon: {
        color: '#E3E3E3',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: -10,
        marginBottom: 10,
    },
});

export default UserProfile;