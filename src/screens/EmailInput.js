import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";



const EmailInput = ({navigation}) => {
    const [email, setEmail] = useState("");

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>이메일을 입력해주세요</Text>
                
                {/* 이메일 입력 */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>이메일</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="'-' 이메일 입력"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                </View>
    
                {/* 다음 버튼 */}
                {email.length > 0 && (
                    <TouchableOpacity 
                        style={styles.nextButton} 
                        onPress={() => navigation.navigate('CertificationNumber')}
                    >
                        <Text style={styles.nextButtonText}>다음</Text>
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
