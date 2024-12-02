import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { usePosts } from './context/PostContext';

const HidePost = () => {
    const { hiddenPosts } = usePosts();

    const renderPost = ({ item }) => (
        <View style={styles.postImageContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.separator} />
            {hiddenPosts.length === 0 ? (
                <Text style={styles.emptyText}>숨긴 게시물이 없습니다.</Text>
            ) : (
                <FlatList
                    data={hiddenPosts}
                    renderItem={renderPost}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    contentContainerStyle={styles.postsGrid}
                />
            )}
        </View>
    );
};

export default HidePost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#888',
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#E4E4E4',
        marginBottom: 10,
    },
    postImageContainer: {
        flex: 1 / 3,
        aspectRatio: 1,
        padding: 1,
        position: 'relative',
    },
    postImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});