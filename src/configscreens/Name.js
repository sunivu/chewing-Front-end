import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const Name = ({ route, navigation }) => {
    const [lastName, setLastName] = useState(route.params?.lastName || '');
    const [firstName, setFirstName] = useState(route.params?.firstName || '');
    const [isEdited, setIsEdited] = useState(false);
    const [lastNameFocused, setLastNameFocused] = useState(false);
    const [firstNameFocused, setFirstNameFocused] = useState(false);

    const handleSave = () => {
        // 키보드를 숨겨서 입력 종료
        Keyboard.dismiss();

        // 수정된 lastName과 firstName을 UserProfile에 전달하고 UserProfile로 이동
        navigation.navigate('UserProfile', {
            updatedLastName: lastName,
            updatedFirstName: firstName,
        });

        // 저장 후 비입력 상태로 변경
        setIsEdited(false);
    };

    // 이름 수정 여부를 확인함. 수정이 되었다면 isEdited를 true로 변경하여 확인 버튼 활성화
    useEffect(() => {
        const originalLastName = route.params?.lastName || '';
        const originalFirstName = route.params?.firstName || '';
        setIsEdited(lastName !== originalLastName || firstName !== originalFirstName);
    }, [lastName, firstName]);

    // 헤더에 "확인" 버튼 추가 (isEdited가 true일 때만)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                isEdited ? (
                    <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
                        <Text style={styles.headerButtonText}>확인</Text>
                    </TouchableOpacity>
                ) : null
            ),
        });
    }, [navigation, isEdited, lastName, firstName]);

    // 다음 입력 필드를 참조하기 위한 ref 생성
    const firstNameInputRef = useRef(null);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>성</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={[styles.input, lastNameFocused > 0 && styles.inputActive]}
                            value={lastName}
                            onChangeText={text => {
                                setLastName(text);
                                setIsEdited(true);
                            }}
                            placeholder="성 입력"
                            returnKeyType="next"
                            onSubmitEditing={() => firstNameInputRef.current.focus()} // "다음" 버튼을 눌렀을 때 "이름" 입력 필드로 이동
                            onFocus={() => setLastNameFocused(true)}
                            onBlur={() => setLastNameFocused(false)}
                        />
                        {lastName.length > 0 && lastNameFocused && (
                            <TouchableOpacity 
                                onPress={() => setLastName('')} 
                                style={styles.clearButton}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // 터치 영역 확장
                                pointerEvents="box-none" // input field가 같이 클릭되어 clearButton이 클릭되지 않는 일을 없도록 함
                            >
                                <Icon name="close-circle" size={20} color="#ccc" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>이름</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={[styles.input, firstNameFocused && styles.inputActive]}
                            value={firstName}
                            onChangeText={text => {
                                setFirstName(text);
                                setIsEdited(true);
                            }}
                            placeholder="이름 입력"
                            returnKeyType="done"
                            ref={firstNameInputRef}
                            onFocus={() => setFirstNameFocused(true)}
                            onBlur={() => setFirstNameFocused(false)}
                        />
                        {firstName.length > 0 && firstNameFocused && (
                            <TouchableOpacity 
                                onPress={() => setFirstName('')} 
                                style={styles.clearButton}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // 터치 영역 확장
                                pointerEvents="box-none" // 터치 이벤트 처리
                            >
                                <Icon name="close-circle" size={20} color="#ccc" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputWrapper: {
        position: 'relative',
        flexDirection: 'row',
    },
    label: {
        fontSize: 14,
        lineHeight: 16,
        color: '#161616',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingRight: 40,
        height: 50,
        fontSize: 16,
        color: '#1E90FF',
    },
    inputActive: {
        color: '#222',
    },
    clearButton: {
        position: 'absolute',
        right: 5,
        padding: 15,
        zIndex: 1, // input field 위에 clearButton이 위치하도록 함
    },
    headerButton: {
        marginRight: 16,
    },
    headerButtonText: {
        fontSize: 16,
        color: '#1E90FF',
    },
});

export default Name;