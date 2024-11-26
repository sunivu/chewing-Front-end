import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const ConfigScreen = ({ navigation }) => {
    const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;

    // 부드럽게 스위치 토글을 움직일 수 있도록 애니메이션 적용
    const toggleSwitch = () => {
        setIsAutoPlayEnabled(previousState => !previousState);
        Animated.timing(animatedValue, {
            toValue: isAutoPlayEnabled ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeaderText}>개인 관리</Text>
                <View style={styles.sectionBox}>
                    <TouchableOpacity style={styles.configButton} onPress={() => navigation.navigate("UserProfile")}>
                        <Text style={styles.buttonText}>개인 정보</Text>
                        <Icon name="chevron-forward" size={20} color="#000" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.configButton} onPress={() => navigation.navigate("ChangePassword")}>
                        <Text style={styles.buttonText}>알림</Text>
                        <Icon name="chevron-forward" size={20} color="#000" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.configButton} onPress={() => navigation.navigate("ChangePassword")}>
                        <Text style={styles.buttonText}>tts 등록/수정</Text>
                        <Icon name="chevron-forward" size={20} color="#000" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.dataSave}>
                <Text style={styles.dataSavingText}>데이터 절약</Text>
                <View style={styles.dataSavingContainer}>
                    <Text style={styles.infoText}>채팅방 동영상 자동재생</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#222222" }}
                        thumbColor="#FFF"
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isAutoPlayEnabled}
                    />
                </View>
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeaderText}>고객지원</Text>
                <View style={styles.sectionBox}>
                    <TouchableOpacity style={styles.configButton} onPress={() => navigation.navigate("NoticeList")}>
                        <Text style={styles.buttonText}>공지사항</Text>
                        <Icon name="chevron-forward" size={20} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.configButton} onPress={() => navigation.navigate("TermsOfService")}>
                        <Text style={styles.buttonText}>약관</Text>
                        <Icon name="chevron-forward" size={20} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.configButton}>
                        <Text style={styles.buttonText}>앱 버전</Text>
                        <Text color="#000">version</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
        backgroundColor: "#fff",
    },
    sectionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    sectionBox: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F5F9FD',
        borderRadius: 15,
        padding: 20,
    },
    sectionHeaderText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
    },
    buttonText: {
        color: '#33363F',
        fontSize: 15,
        textAlign: 'left',
    },
    icon: {
        color: '#E3E3E3',
    },
    dataSave: {
        flex: 1,
        justifyContent: 'center',
    },
    dataSavingText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 15,
        textAlign: 'left',
        alignSelf: 'center',
    },
    dataSavingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    configButton: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        marginBottom: 20,
        flex: 1,
    },
})

export default ConfigScreen;