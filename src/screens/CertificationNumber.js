import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard ,TouchableWithoutFeedback, Alert} from "react-native";


const CertificationNumber = ({navigation}) => {
    const [certificationNumber, setCertificationNumber] = useState("");
    const [timer, setTimer] = useState(180);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        if (certificationNumber.length === 6 && timer > 0) {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    }, [certificationNumber, timer]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer]);

    const formatTime = () => {
        const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
        const seconds = String(timer % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const handleResend = () => {
        setTimer(180); // 타이머를 3분으로 초기화
        setCertificationNumber(""); // 입력 초기화
    };

    const handleComplete = () => {
        Alert.alert(
            "인증이 완료되었습니다.",
            "",
            [{ text: "확인", onPress: () => console.log("확인 pressed") }]
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>인증번호를 입력해주세요</Text>
                
                {/* 인증번호 입력 */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>인증번호</Text>
                    <View style={styles.timerInputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="인증번호 6자리"
                            keyboardType="number-pad"
                            maxLength={6}
                            value={certificationNumber}
                            onChangeText={setCertificationNumber}
                        />
                        <Text style={styles.timer}>{formatTime()}</Text>
                    </View>
                </View>

                {/* 재전송 안내 */}
                <Text style={styles.resendText}>
                    인증번호를 받지 못하셨나요?{" "}
                    <Text style={styles.resendLink} onPress={handleResend}>다시받기</Text>
                </Text>

                {/* 완료 버튼 */}
                <TouchableOpacity 
                    style={[styles.completeButton, isButtonEnabled ? styles.enabledButton : styles.disabledButton]} 
                    disabled={!isButtonEnabled}
                    onPress={handleComplete}
                >
                    <Text style={styles.completeButtonText}>완료</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 50,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    timerInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        height: 50,
    },
    input: {
        flex: 1,
    },
    timer: {
        marginLeft: 10,
        fontSize: 16,
        color: "#1E90FF",
    },
    resendText: {
        marginTop: 15,
        color: "#8E8E90",
        textAlign: "center",
    },
    resendLink: {
        color: "#1E90FF",
        fontWeight: "bold",
    },
    completeButton: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    enabledButton: {
        backgroundColor: '#1E90FF',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    completeButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default CertificationNumber;
