import React, { useState, useEffect, useContext } from "react";
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, 
    TouchableWithoutFeedback, Keyboard, Alert 
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../contexts/AuthContext';

const SignIn_ProfileSetting = ({ navigation }) => {
    const { setIsLoggedIn, setProfileImage, setFirstName, setLastName } = useContext(AuthContext);

    const [localProfileImage, setLocalProfileImage] = useState(null);
    const [localLastName, setLocalLastName] = useState("");
    const [localFirstName, setLocalFirstName] = useState("");
    const [year, setYear] = useState("년");
    const [month, setMonth] = useState("월");
    const [day, setDay] = useState("일");
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [visiblePicker, setVisiblePicker] = useState(null);

    useEffect(() => {
        if (localProfileImage && localLastName && localFirstName && year !== "년" && month !== "월" && day !== "일") {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    }, [localProfileImage, localLastName, localFirstName, year, month, day]);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("앨범 접근 권한이 필요합니다.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setLocalProfileImage(result.assets[0].uri);
        }
    };

    const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

    const renderDropdown = (data, setFunction, value) => (
        visiblePicker === value && (
            <View style={[styles.dropdownContainer]}>
                <View style={[styles.dropdown, value === 'year' ? { left: 0 } : (value === 'month' ? { alignSelf:'center' } : { right:0 })]}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.dropdownItem}
                                onPress={() => {
                                    setFunction(item);
                                    setVisiblePicker(null);
                                }}
                            >
                                <Text style={styles.dropdownItemText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    );

    const handleConfirm = () => {

        Alert.alert(
            "프로필 설정이 완료되었습니다.",
            "",
            [
                { 
                    text: "확인",
                    onPress: () => {
                        setProfileImage(localProfileImage);
                        setFirstName(localFirstName);
                        setLastName(localLastName);
                        setIsLoggedIn(true);
                    }
                }
            ]
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                    {localProfileImage ? (
                        <Image source={{ uri: localProfileImage }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.defaultImage}>
                            <Text style={styles.cameraIcon}>📷</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>성</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="성 입력"
                        value={localLastName}
                        onChangeText={setLocalLastName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>이름</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="이름 입력"
                        value={localFirstName}
                        onChangeText={setLocalFirstName}
                    />
                </View>

                <Text style={styles.label}>생년월일</Text>
                <View style={styles.dateContainer}>
                    <TouchableOpacity style={[styles.dateBox, visiblePicker === 'year' && styles.expandedBox]} onPress={() => setVisiblePicker(visiblePicker === 'year' ? null : 'year')}>
                        <Text>{year}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.dateBox, visiblePicker === 'month' && styles.expandedBox]} onPress={() => setVisiblePicker(visiblePicker === 'month' ? null : 'month')}>
                        <Text>{month}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.dateBox, visiblePicker === 'day' && styles.expandedBox]} onPress={() => setVisiblePicker(visiblePicker === 'day' ? null : 'day')}>
                        <Text>{day}</Text>
                    </TouchableOpacity>
                </View>

                {renderDropdown(years, setYear, 'year')}
                {renderDropdown(months, setMonth, 'month')}
                {renderDropdown(days, setDay, 'day')}

                <TouchableOpacity
                    style={[styles.completeButton, isButtonEnabled ? styles.enabledButton : styles.disabledButton]}
                    disabled={!isButtonEnabled}
                    onPress={handleConfirm}
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
    imageContainer: {
        alignSelf: "center",
        marginBottom: 20,
        marginTop: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 50,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    defaultImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    cameraIcon: {
        fontSize: 24,
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
    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dateBox: {
        width: '28%',
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    expandedBox: {
        borderBottomWidth: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    dropdownContainer: {
        backgroundColor: "#fff",
    },
    dropdown: {
        position: "absolute",
        width: '28%',
        backgroundColor: "#fff",
        borderRadius: 8,
        maxHeight: 200,
        elevation: 5,
        borderTopWidth: 0,
        borderWidth: 1,
        borderColor: "#ccc",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    dropdownItem: {
        paddingVertical: 8,
        alignItems: "center",
    },
    dropdownItemText: {
        fontSize: 16,
        color: "#333",
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
        backgroundColor: "#1E90FF",
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
    completeButtonText: {
        color: "#fff",
        fontSize: 18,
    },
});

export default SignIn_ProfileSetting;
