import React, { useContext, useRef, useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    Image, 
    TouchableOpacity, 
    TextInput, 
    Keyboard,
    Dimensions,
    Animated,
    Easing,
    Switch,
    TouchableWithoutFeedback 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../contexts/AuthContext'; 

const { width } = Dimensions.get('window');

// 텍스트가 maxLength 를 초과하면 '...' 표시
const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
};

const HomeScreen = () => {
    const { profileImage, firstName, lastName, backgroundImage } = useContext(AuthContext); 

    // 검색어 상태
    const [searchText, setSearchText] = useState('');
    // 검색창 표시 여부 상태
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    // 드롭다운 메뉴 상태
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    // 카드뷰 상태
    const [isCardView, setIsCardView] = useState(true);

    // 애니메이션 값 초기화
    const searchHeight = useRef(new Animated.Value(0)).current;
    const searchOpacity = useRef(new Animated.Value(0)).current;
    
    const animateSearch = (show) => {
        Animated.parallel([
            Animated.timing(searchHeight, {
                toValue: show ? 1 : 0,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: false, // height 애니메이션 시 false
            }),
            Animated.timing(searchOpacity, {
                toValue: show ? 1 : 0,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: false,
            }),
        ]).start();
    };
    
    // 사용자 정보
    const me = {
        id: 'me',
        name: `${lastName}${firstName}`,
        status: '🚗 출근 중',
        profileImage: profileImage, 
        backgroundImage: backgroundImage,
    };

    // 친구 목록 (사용자 제외)
    const friends = [
        {
            id: '1', 
            name: '홍길동', 
            status: '🚗 출근 중', 
            profileImage: null, 
            backgroundImage: null,
        },
        {
            id: '2', 
            name: '김영희', 
            status: '🚗 출근 중', 
            profileImage: null, 
            backgroundImage: null,
        },
        {
            id: '3', 
            name: '이철수', 
            status: '🚗 출근 중', 
            profileImage: null, 
            backgroundImage: null,
        },
        {
            id: '4', 
            name: '김반석', 
            status: '🏠 휴식 중', 
            profileImage: require('../../assets/profile_default_3.png'), 
            backgroundImage: require('../../assets/profile_background_default_2.png'),
        },
        {
            id: '5', 
            name: '최진원', 
            status: '🏠 휴식 중', 
            profileImage: require('../../assets/profile_default_3.png'), 
            backgroundImage: require('../../assets/profile_background_default_2.png'),
        },
        {
            id: '6', 
            name: '안성호', 
            status: '🏠 휴식 중', 
            profileImage: require('../../assets/profile_default_3.png'), 
            backgroundImage: require('../../assets/profile_background_default_2.png'),
        },
        {
            id: '7', 
            name: '이라엘', 
            status: '💟 데이트 중', 
            profileImage: require('../../assets/profile_default_4.png'), 
            backgroundImage: require('../../assets/profile_background_default_3.png'),
        },
        {
            id: '8', 
            name: '김정동', 
            status: '💟 데이트 중', 
            profileImage: require('../../assets/profile_default_4.png'), 
            backgroundImage: require('../../assets/profile_background_default_3.png'),
        },
        {
            id: '9', 
            name: '김태경', 
            status: '💟 데이트 중', 
            profileImage: require('../../assets/profile_default_4.png'), 
            backgroundImage: require('../../assets/profile_background_default_3.png'),
        },
        {
            id: '10', 
            name: '박소현', 
            status: '⚽️ 운동 중', 
            profileImage: null, 
            backgroundImage: null,
        },
        {
            id: '11', 
            name: '이아현', 
            status: '⚽️ 운동 중',
            profileImage: null, 
            backgroundImage: null,
        },
        
    ];

    // 검색어에 따라 친구 목록 필터링
    const filteredFriends = friends.filter(friend =>
        friend.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderMe = () => (
        <TouchableOpacity style={styles.meContainer}>
            <Image
                source={me.profileImage ? { uri: me.profileImage } : require('../../assets/profile_default_1.png')}
                style={styles.meProfileImage}
            />
            <View style={styles.meInfo}>
                <Text style={styles.meName}>{me.name}</Text>
                <Text style={styles.meStatus}>{me.status}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderFriendList = ({ item }) => (
        <TouchableOpacity style={styles.friendItem_list}>
            <Image
                // source={item.profileImage ? { uri: item.profileImage } : require('../../assets/profile_default_2.png')}
                source={item.profileImage ? item.profileImage : require('../../assets/profile_default_2.png')}
                style={styles.profileImage}
            />
            <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{truncateText(item.name, 7)}</Text>
                <Text style={styles.friendStatus}>{truncateText(item.status, 10)}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderFriendCard = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            {/* Background Image */}
            <Image
                // source={item.backgroundImage ? { uri: item.backgroundImage } : require('../../assets/profile_background_default_1.png')}
                source={item.backgroundImage ? item.backgroundImage : require('../../assets/profile_background_default_1.png')}
                style={styles.cardBackground}
            />
            {/* Overlay for Profile Info */}
            <View style={styles.infoBox}>
                <Image
                    // source={item.profileImage ? { uri: item.profileImage } : require('../../assets/profile_default.png')}
                    source={item.profileImage ? item.profileImage : require('../../assets/profile_default_2.png')}
                    style={[styles.profileImage, { width: 40, height: 40 }]}
                />
                <View style={styles.textContainer}>
                    <Text style={[styles.friendName, {fontSize: 14}]}>{truncateText(item.name, 5)}</Text>
                    <Text style={[styles.friendStatus, {fontSize: 10}]}>{truncateText(item.status, 9)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    // 검색 아이콘을 눌렀을 때 호출되는 함수
    const toggleSearch = () => {
        const newValue = !isSearchVisible;
        setIsSearchVisible(newValue);
        animateSearch(newValue);
        if (isSearchVisible) {
            // 검색창을 숨길 때 검색어를 초기화
            setSearchText('');
            Keyboard.dismiss();
        }
    };
    
    // ellipsis 버튼을 눌렀을 때 드롭다운 토글
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    // 드롭다운 외부를 눌렀을 때 드롭다운 숨기기
    const hideDropdown = () => {
        if (isDropdownVisible) {
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        if (isSearchVisible) {
            animateSearch(true);
        }
    }, []);

    return (
        <View style={styles.container}>
            {/* 드롭다운이 보일 때 오버레이 표시 */}
            {isDropdownVisible && (
                <TouchableWithoutFeedback onPress={hideDropdown}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}

            {/* 상단 헤더 */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>친구</Text>
                <View style={styles.headerIcons}>
                    {/* 검색창이 표시될 때와 아닐 때 아이콘 변경 */}
                    <TouchableOpacity 
                        style={styles.iconButton} 
                        onPress={toggleSearch}
                        >
                        <Ionicons
                            name={isSearchVisible ? "close-outline" : "search-outline"}
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.iconButton}
                        >
                        <Ionicons name="add-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.iconButton}
                        onPress={toggleDropdown}
                        >
                        <Ionicons name="ellipsis-vertical-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* 드롭다운 메뉴 */}
            {isDropdownVisible && (
                    <View style={styles.dropdown}>
                        <Text style={styles.dropdownLabel}>카드 형태로 보기</Text>
                        <Switch
                            value={isCardView}
                            onValueChange={(value) => setIsCardView(value)}
                        />
                    </View>
                )}

            {/* 검색창 */}
            <Animated.View
                style={[
                    styles.searchContainer,
                    {
                        height: searchHeight.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 50], // 원하는 높이로 조절
                        }),
                        opacity: searchOpacity,
                        overflow: 'hidden', // 내용이 넘치지 않도록 설정
                    },
                ]}
            >
                {isSearchVisible && (
                    <TextInput
                        style={styles.searchInput}
                        placeholder="친구 이름 검색"
                        value={searchText}
                        onChangeText={setSearchText}
                        autoFocus={true}
                    />
                )}
            </Animated.View>

            {/* 친구 리스트 */}
            <FlatList
                    ListHeaderComponent={
                        <>
                            {/* 사용자 프로필 */}
                            {renderMe()}

                            {/* 친구 목록 헤더 */}
                            <View style={styles.friendsHeader}>
                                <Text style={styles.friendsHeaderText}>친구 {filteredFriends.length}명</Text>
                            </View>
                        </>
                    }
                    data={filteredFriends}
                    keyExtractor={(item) => item.id}
                    renderItem={isCardView ? renderFriendCard : renderFriendList}
                    key={isCardView ? 'card' : 'list'} // key 변경 시 FlatList 리렌더링
                    numColumns={isCardView ? 3 : 1}
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={isCardView ? styles.columnWrapper : null}
                />
        </View>
    );
};

const cardWidth = (width - 40) / 3; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
        paddingHorizontal: 15,
        paddingVertical: 10,

    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 10,
    },
    searchContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        width: '100%',
    },
    meContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    meProfileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    meInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    meName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    meStatus: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    friendsHeader: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    friendsHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    friendItem_list: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    card: {
        width: cardWidth,
        height: cardWidth * 1.3, 
        borderRadius: 15,
        marginHorizontal: 4,
        marginVertical: 15,
        overflow: 'visible',
        position: 'relative',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    cardBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'cover',
        borderRadius: 15,
    },
    infoBox: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: -5,
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: -2 },
        elevation: 5,
    },
    textContainer: {
        flexDirection: 'column',
        // alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    friendInfo: {
        justifyContent: 'center',
    },
    friendName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    friendStatus: {
        fontSize: 14,
        color: '#888',
        marginTop: 2,
    },
    listContent: {
        paddingBottom: 20,
    },
    columnWrapper: {
        justifyContent: 'flex-start',
    },
    dropdown: {
        position: 'absolute',
        top: 100,
        right: 20,
        width: 200,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        zIndex: 1000,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdownLabel: {
        fontSize: 16,
        color: '#333',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999, // 드롭다운 아래에 위치하도록 설정
    },
});

export default HomeScreen;
