import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';

// 공지사항 리스트 테스트용
const notices = [
    { id: '1', title: 'TEST TEST TEST', date: '2024-01-01', content: 'TEST TEST TEST1' },
    { id: '2', title: 'TEST TEST TEST', date: '2024-01-01', content: 'TEST TEST TEST2' },
    { id: '3', title: 'TEST TEST TEST', date: '2024-01-01', content: 'TEST TEST TEST3'  },
    { id: '4', title: 'TEST TEST TEST', date: '2024-01-01', content: 'TEST TEST TEST4' },
    { id: '5', title: 'TEST TEST TEST', date: '2024-01-01', content: 'TEST TEST TEST5' },
    { id: '6', title: 'TEST TEST TEST', date: '2024-01-01', content: 'TEST TEST TEST6' },
    { id: '7', title: 'TEST TEST TEST', date: '2024-01-01', content: 'TEST TEST TEST7' },
    { id: '8', title: 'TEST TEST TEST', date: '2024-01-01', content: 'TEST TEST TEST8' },
    { id: '9', title: 'TEST TEST TEST', date: '2024-01-01', content: 'TEST TEST TEST9' },
    { id: '10', title: 'TEST TEST TEST', date: '2024-01-01', content: 'TEST TEST TEST10' },
]

const NoticeList = ({ navigation }) => {
    const handlePress = (notice) => {
        navigation.navigate('NoticeScreen', { notice });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.totalNotice}>총 {notices.length}건의 공지사항이 있습니다.</Text>
            <Divider style={styles.divider} />
            <FlatList
                data={notices}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePress(item)}>
                        <Text style={styles.noticeItem}>{item.title}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <Divider style={styles.itemDivider} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    totalNotice: {
        fontWeight: 'medium',
        fontSize: 16,
        marginBottom: 20,
    },

    divider: {
        height: 1,
        width: '120%',
        backgroundColor: '#222',
        marginHorizontal: -20,
        marginTop: 10,
        marginBottom: 10,
    },

    noticeItem: {
        fontWeight: 'medium',
        fontSize: 16,
        marginTop: 5,
        marginBottom: 5,
    },

    date: {
        fontSize: 15,
        color: '#CDCDCD',
        marginBottom: 5,
    },

    itemDivider: {
        height: 1,
        width: '100%',
        backgroundColor: '#EDEDED',
        marginVertical: 10,
        marginBottom: 15,
    },
});

export default NoticeList;