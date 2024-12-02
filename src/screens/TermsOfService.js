import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Button } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const TermsOfService = () => {
    const [isTermsVisible, setTermsVisible] = useState(false);
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.termsButton} onPress={() => setTermsVisible(true)}>
                <Text style={styles.buttonText}>서비스 이용약관</Text>
                <Icon name="chevron-forward" size={20} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.termsButton} onPress={() => setTermsVisible(true)}>
                <Text style={styles.buttonText}>개인정보 처리방침</Text>
                <Icon name="chevron-forward" size={20} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'left',
        backgroundColor: "#fff",
        padding: 20,
    },

    termsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 35,
    },

    buttonText: {
        font: "Pretendard",
        color: '#33363F',
        fontSize: 15,
        textAlign: 'left',
    },
});
export default TermsOfService;