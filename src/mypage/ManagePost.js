// ManagePost.js

import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MenuIcon from '../../assets/menu.svg';

const ManagePost = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [isMenuVisible, setMenuVisible] = useState(false); // 드롭다운 메뉴 상태
    const [isHideMode, setHideMode] = useState(false); // 게시물 숨김 모드
    const [selectedPosts, setSelectedPosts] = useState([]); // 선택된 게시물 ID
    const [posts, setPosts] = useState(route.params?.posts || []); // 전달된 게시물 데이터

    // 헤더 설정
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setMenuVisible(!isMenuVisible)} style={{ paddingRight: 16 }}>
                    <MenuIcon />
                </TouchableOpacity>
            ),
        });
    }, [navigation, isMenuVisible]);

    // 메뉴 옵션 클릭 시 동작
    const handleMenuOption = (option) => {
        setMenuVisible(false);
        if (option === 'hide') {
            setHideMode(true);
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
        setPosts((prevPosts) => prevPosts.filter((post) => !selectedPosts.includes(post.id)));
        setSelectedPosts([]);
        setHideMode(false);
        Alert.alert("선택한 게시물이 숨겨졌습니다.");
    };

    // 게시물 이미지 렌더링 함수
    const renderPost = ({ item }) => (
        <View style={styles.postImageContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
            {isHideMode && (
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
            {/* 드롭다운 메뉴 */}
            {isMenuVisible && (
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption('hide')}>
                        <Text style={styles.menuText}>게시물 숨김</Text>
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

            {/* 숨기기 버튼 */}
            {isHideMode && (
                <TouchableOpacity
                    style={[styles.hideButton, { backgroundColor: selectedPosts.length > 0 ? '#1E90FF' : '#E0E4E8' }]}
                    onPress={hideSelectedPosts}
                    disabled={selectedPosts.length === 0}
                >
                    <Text style={styles.hideButtonText}>숨기기</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative', // 드롭다운 메뉴의 절대 위치 기준
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
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    menuText: {
        fontSize: 16,
        color: '#333',
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
