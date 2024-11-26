import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from "react-native-elements";

const NoticeScreen = ( { route }) => {
    const { notice } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{notice.title}</Text>
            <Text style={styles.date}>{notice.date}</Text>
            <Divider style={styles.devider} />
            <Text style={styles.content}>{notice.content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },

    title: {
        fontWeight: 'bold',
        lineHeight: 36,
        fontSize: 20,
        marginBottom: 10,
    },

    date: {
        fontSize: 15,
        lineHeight: 16,
        color: '#CDCDCD',
        marginBottom: 20,
    },

    devider: {
        height: 0,
        width: '100%',
        backgroundColor: '#EDEDED',
        marginBottom: 40,
    },

    content: {
        fontWeight: 'medium',
        fontSize: 15,
        lineHeight: 22,
        color: '#000',
    },
});

export default NoticeScreen;