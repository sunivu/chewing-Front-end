import React, {useState, useRef, useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert
} from "react-native";
import EmailViewModel from "../viewmodels/EmailViewModel";
import LoginApiClient from "../api/LoginApiClient";
import DeviceInfoManager from "../manager/DeviceInfoManager";
import Email from "../models/Email";


const EmailInput = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailViewModel, setEmailViewModel] = useState(null);


    useEffect(() => {
        const initializeViewModel = async () => {
            try {
                const deviceInfoManager = await DeviceInfoManager.create();
                const loginApiClient = new LoginApiClient();
                const viewModel = new EmailViewModel(
                    loginApiClient,
                    deviceInfoManager,
                );
                setEmailViewModel(viewModel);
            } catch (err) {
                console.error("Error initializing EmailViewModel:", err);
            }
        };
        initializeViewModel();
    }, [navigation]);


    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
    };

    const handleNext = async () => {
        const emailModel = new Email(email);
        if (!emailViewModel.canProceed(emailModel)) {
            Alert.alert("유효한 이메일을 입력해주세요.");
            return;
        }

        setLoading(true);
        try {
            await emailViewModel.sendEmailVerification(emailModel);
            navigation.navigate('CertificationNumber', {email: emailModel ,emailViewModel: emailViewModel});
        } catch (err) {
            Alert.alert("오류", emailViewModel.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>이메일을 입력해주세요</Text>

                {/* 이메일 입력 */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>이메일</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="이메일 입력"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={handleEmailChange}
                        autoCapitalize="none"
                    />
                </View>

                {/* 다음 버튼 */}
                {email.length > 0 && (
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={handleNext}
                        disabled={loading}
                    >
                        <Text style={styles.nextButtonText}>
                            {loading ? "로딩 중..." : "다음"}
                        </Text>
                    </TouchableOpacity>
                )}
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
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    touchableInput: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    nextButton: {
        backgroundColor: '#1E90FF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        position: 'absolute',
        bottom: 50,
        left:20,
        right:20
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default EmailInput;
