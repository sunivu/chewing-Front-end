import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { usePosts } from './context/PostContext';

const ManagePost = ({ navigation }) => {
    const { posts, hidePosts, deletePosts} = usePosts();
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isHideMode, setHideMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [selectedPosts, setSelectedPosts] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setMenuVisible(!isMenuVisible)} style={{ paddingRight: 16 }}>
                    <MaterialIcons name="more-horiz" size={24} color="#000" />
                </TouchableOpacity>
            ),
        });
    }, [navigation, isMenuVisible]);

    // 드롭다운 메뉴 핸들러
    const handleMenuOption = (option) => {
        setMenuVisible(false);
        if (option === 'hide') {
            setHideMode(true);
            setDeleteMode(false);
        } else if (option === 'delete') {
            setDeleteMode(true);
            setHideMode(false);
        } else if (option === 'manage') {
            navigation.navigate('HidePost');
        }
    };

    // 게시물 선택/해제
    const toggleSelectPost = (id) => {
        setSelectedPosts((prevSelectedPosts) =>
            prevSelectedPosts.includes(id)
                ? prevSelectedPosts.filter((postId) => postId !== id)
                : [...prevSelectedPosts, id]
        );
    };

    // 선택된 게시물 숨기기
    const hideSelectedPosts = () => {
        hidePosts(selectedPosts)
        setSelectedPosts([]);
        setHideMode(false);
    };

        // 선택된 게시물 삭제하기
        const deleteSelectedPosts = () => {
            deletePosts(selectedPosts);
            setSelectedPosts([]);
            setDeleteMode(false);
        };

    // 게시물 이미지 렌더링 함수
    const renderPost = ({ item }) => (
        <View style={styles.postImageContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
            {(isHideMode || isDeleteMode) && (
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => toggleSelectPost(item.id)}
                >
                    {selectedPosts.includes(item.id) && <View style={styles.checkboxSelected} />}
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {isMenuVisible && (
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption('hide')}>
                        <Text style={styles.menuText}>게시물 숨김</Text>
                    </TouchableOpacity>
                    <View style={styles.separator}/>
                    <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption('delete')}>
                        <Text style={styles.menuText}>게시물 삭제</Text>
                    </TouchableOpacity>
                    <View style={styles.separator}/>
                    <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption('manage')}>
                        <Text style={styles.menuText}>숨긴 게시물</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.separator} />
            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={styles.postsGrid}
            />

            {isHideMode && (
                <TouchableOpacity
                    style={[styles.hideButton, { backgroundColor: selectedPosts.length > 0 ? '#1E90FF' : '#E0E4E8' }]}
                    onPress={hideSelectedPosts}
                    disabled={selectedPosts.length === 0}
                >
                    <Text style={styles.hideButtonText}>숨기기</Text>
                </TouchableOpacity>
            )}
            {isDeleteMode && (
                <TouchableOpacity
                    style={[styles.hideButton, { backgroundColor: selectedPosts.length > 0 ? '#1E90FF' : '#E0E4E8' }]}
                    onPress={deleteSelectedPosts}
                    disabled={selectedPosts.length === 0}
                >
                    <Text style={styles.hideButtonText}>삭제</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
    },
    menu: {
        position: 'absolute',
        right: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 5,
        zIndex: 1, // 드롭다운이 게시물 이미지 위로 올라오도록 설정
    },
    menuItem: {
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
    menuText: {
        fontWeight: 'medium',
        fontSize: 14,
        color: '#222',
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
        marginTop: 10,
        position: 'relative',
    },
    postImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    checkbox: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    checkboxSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#007AFF',
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    hideButton: {
        alignItems: 'center',
        bottom: 20,
        paddingVertical: 12,
        marginHorizontal: 30,
        borderRadius: 5,
    },
    hideButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'semibold',
    },
});

export default ManagePost;
