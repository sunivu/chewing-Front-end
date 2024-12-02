<<<<<<< HEAD
import { React, useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Avatar } from 'react-native-elements';
import { usePosts } from './context/PostContext';
=======
import { React, useState } from 'react';
import { View, Text, Image, Button, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
>>>>>>> 9312a88 (마이페이지 화면 구현)
import * as ImagePicker from 'expo-image-picker';
import CalendarIcon from '../../assets/calendar.svg';
import MenuIcon from '../../assets/menu.svg';
import EditIcon from '../../assets/edit.svg';

const MyPageScreen = ({ navigation }) => {
<<<<<<< HEAD
  const { posts, hiddenPosts, hidePosts, deletePosts, deletedPosts } = usePosts();
  const context = usePosts();
  const [profileImage, setProfileImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  console.log('Context:', context);

  useEffect(() => {
    console.log('Posts:', posts);
    console.log('Hidden Posts:', hiddenPosts);
    console.log('Deleted Posts:', deletedPosts);
}, [posts, hiddenPosts, deletedPosts]);


=======

  const [profileImage, setProfileImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

>>>>>>> 9312a88 (마이페이지 화면 구현)
  const handleChoosePhoto = () => {
    setModalVisible(true);
  }

  //앨벰에서 이미지를 선택하는 함수
  const pickImageFromAlbum = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('앨범 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setModalVisible(false);
    }
  }

  //카메라로 찍은 사진을 선택하는 함수
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('카메라 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setModalVisible(false);
    }
  }

  //기본 이미지로 설정하는 함수 (일단은 단순히 비어있는 이미지로 설정)
  const defaultProfileImae = () => {
    setProfileImage(null);
    setModalVisible(false);
  }

<<<<<<< HEAD
=======

  // 게시물 데이터 (test용)
  const posts = [
    { id: '1', imageUrl: 'https://kidlingoo.com/wp-content/uploads/flowers_name_in_english-980x510.jpg.webp' },
    { id: '2', imageUrl: 'https://kidlingoo.com/wp-content/uploads/flowers_name_in_english-980x510.jpg.webp' },
    { id: '3', imageUrl: 'https://kidlingoo.com/wp-content/uploads/flowers_name_in_english-980x510.jpg.webp' },
    // 필요에 따라 이미지 URL을 더 추가
  ];

>>>>>>> 9312a88 (마이페이지 화면 구현)
  // 게시물 이미지 렌더링 함수
  const renderPost = ({ item }) => (
    <View style={styles.postImageContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Image source={require('../../assets/logo.png')} style={styles.logo}></Image>
<<<<<<< HEAD
          <CalendarIcon onPress={() => navigation.navigate('Plan')} />
=======
          <CalendarIcon />
>>>>>>> 9312a88 (마이페이지 화면 구현)
        </View>
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>김츄잉</Text>
            <Text style={styles.status}>🏎️ 출근 중</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Avatar
              rounded
              source={profileImage ? { uri: profileImage } : require('../../assets/defaultProfile.png')}
              size="large"
              containerStyle={styles.avatar}
            />
            <TouchableOpacity style={styles.editIconContainer} onPress={handleChoosePhoto}>
<<<<<<< HEAD
              <EditIcon />
=======
              <EditIcon/>
>>>>>>> 9312a88 (마이페이지 화면 구현)
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { }}>
            <Text style={styles.buttonText}>프로필 편집</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { }}>
            <Text style={styles.buttonText}>프로필 공유</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>게시물</Text>
<<<<<<< HEAD
        <MenuIcon onPress={() => navigation.navigate('ManagePost')}
        />
=======
        <MenuIcon onPress={() => navigation.navigate('ManagePost', { posts })}/>
>>>>>>> 9312a88 (마이페이지 화면 구현)
      </View>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.postsGrid}
      />

      <Modal visible={isModalVisible} transparent={true}>
        <TouchableOpacity style={styles.modalContainer} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>프로필 사진 설정</Text>
<<<<<<< HEAD
            <View style={styles.separator} />
            <TouchableOpacity style={styles.modalButton} onPress={pickImageFromAlbum}>
              <Text style={styles.modalText}>앨범에서 사진 선택</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
              <Text style={styles.modalText}>사진 찍기</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
=======
            <View style={styles.separator}/>
            <TouchableOpacity style={styles.modalButton} onPress={pickImageFromAlbum}>
              <Text style={styles.modalText}>앨범에서 사진 선택</Text>
            </TouchableOpacity>
            <View style={styles.separator}/>
            <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
              <Text style={styles.modalText}>사진 찍기</Text>
            </TouchableOpacity>
            <View style={styles.separator}/>
>>>>>>> 9312a88 (마이페이지 화면 구현)
            <TouchableOpacity style={styles.modalButton} onPress={defaultProfileImae}>
              <Text style={styles.modalText}>기본 이미지 적용</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    backgroundColor: '#F5f9FD',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  status: {
    fontSize: 14,
    color: '#1E90FF',
  },
  avatar: {
    marginLeft: 16,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: -10,
    right: 0,
    borderRadius: 12,
    padding: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    padding: 10,
    marginBottom: 16,
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 50,
    padding: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#222',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  postImageContainer: {
    flex: 1 / 3,
    aspectRatio: 1,
    padding: 1,
  },
  postsGrid: {
    justifyContent: 'space-between',
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#CCC',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  modalButton: {
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222'
  },
  separator: {
<<<<<<< HEAD
    width: '100%',
=======
    width: '90%',
>>>>>>> 9312a88 (마이페이지 화면 구현)
    height: 1,
    backgroundColor: '#E0E0E0',
  },

});

export default MyPageScreen;
