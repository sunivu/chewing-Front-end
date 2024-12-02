import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AddScreen = () => {
    return (
        <View style={styles.container}>
            <Text>친구 추가 화면</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default AddScreen;
