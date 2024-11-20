import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatScreen = () => {
    return (
        <View style={styles.container}>
            <Text>채팅 화면</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
    },
});

export default ChatScreen;
