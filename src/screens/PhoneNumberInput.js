import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity, FlatList } from "react-native";
import Modal from 'react-native-modal'; 
import { Ionicons } from '@expo/vector-icons'; 

const countries = [
    { name: "대한민국", code: "+82" },
    { name: "독일", code: "+49" },
    { name: "러시아", code: "+7" },
    { name: "미국", code: "+1" },
    { name: "브라질", code: "+55" },
    { name: "영국", code: "+44" },
    { name: "이탈리아", code: "+39" },
    { name: "가나", code: "+233" },
    { name: "가봉", code: "+241" },
    { name: "감비아", code: "+220" },
    { name: "가이아나", code: "+592" },
    { name: "과테말라", code: "+502" },
];

const PhoneNumberInput = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+82");
    const [isModalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const selectCountry = (code) => {
        setCountryCode(code);
        setModalVisible(false);
    };

    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>휴대폰 번호를 입력해주세요</Text>

                {/* 휴대폰 번호 입력 */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>휴대폰 번호</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="'-' 제외한 휴대폰 번호"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        maxLength={11}
                    />
                </View>

                {/* 국가 선택 영역 */}
                <TouchableOpacity style={styles.inputContainer} onPress={() => setModalVisible(true)}>
                    <Text style={styles.label}>국가</Text>
                    <View style={styles.touchableInput}>
                        <Text>{countryCode}</Text>
                    </View>
                </TouchableOpacity>

                {/* Modal 컴포넌트 */}
                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={() => setModalVisible(false)}
                    style={styles.modal}
                    swipeDirection="down"
                    onSwipeComplete={() => setModalVisible(false)}
                    propagateSwipe={true}
                >
                    <View style={styles.modalContent}>
                        {/* 팝업 상단 */}
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close-outline" size={24} color="#111" />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>국가</Text>
                        </View>

                        {/* 검색창 */}
                        <View style={styles.searchContainer}>
                            <Ionicons name="search-outline" size={20} color="#8E8E90" style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="검색"
                                placeholderTextColor="#8E8E90"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>

                        {/* 국가 리스트 */}
                        <FlatList
                            data={filteredCountries}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => selectCountry(item.code)}>
                                    <View style={styles.countryItem}>
                                        <Text style={styles.countryName}>{item.name}</Text>
                                        <Text style={styles.countryCode}>{item.code}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </Modal>

                {/* 다음 버튼 */}
                {phoneNumber.length > 10 && (
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
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        height: '80%', // 팝업 높이 설정
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "bold",
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#111',
    },
    countryItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    countryName: {
        fontSize: 16,
        color: '#111',
    },
    countryCode: {
        fontSize: 16,
        color: '#888',
    },
    nextButton: {
        backgroundColor: '#1E90FF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default PhoneNumberInput;
