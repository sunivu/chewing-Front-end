import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const PhoneNumber = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+82");
    const [isModalVisible, setModalVisible] = useState(false);

    const isPhoneNumberValid = (number) => {
        const regExp = /^\d{3}\d{3,4}\d{4}$/;
        return regExp.test(number);
    };

    const handleSelectCountry = (code) => {
        setCountryCode(code);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>휴대폰 번호</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="휴대폰 번호를 입력해 주세요"
                    keyboardType="nemeric"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    maxLength={11}
                />
                {phoneNumber ? (
                    <TouchableOpacity
                        onPress={() => setPhoneNumber('')}
                        style={styles.clearButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // 터치 영역 확장
                        pointerEvents="box-none" // input field가 같이 클릭되어 clearButton이 클릭되지 않는 일을 없도록 함
                    >
                        <Icon name="close-circle" size={20} color="#ccc" />
                    </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                    onPress={handleReuqestCertification}
                    style={styles.requestButton}
                >
                    <Text style={styles.requestText}>인증 요청</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    clearButton: {
        position: 'absolute',
        right: 0,
    },
    requestButton: {
        backgroundColor: '#222',
        padding: 10,
        borderRadius: 5,
    },
    requestText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    countryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    countryText: {
        fontSize: 16,
    },
    countryFlag: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    countryName: {
        fontSize: 16,
    },
    countryDialCode: {
        fontSize: 16,
    },
});

export default PhoneNumber;