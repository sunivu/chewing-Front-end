import { StyleSheet, Text, View, Animated, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";

//임시
import { useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';
//

const LoadingScreen = ({ navigation }) => {
    const [isAnimationFinished, setIsAnimationFinished] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    //임시
    const { setIsLoggedIn } = useContext(AuthContext);
    //

    const loadResources = async () => {
        try {
            // 임시로 7초 대기
            await new Promise(resolve => setTimeout(resolve, 7000));
        } catch (e) {
            console.error("Resource loading failed:", e);
        }
    };

    useEffect(() => {
        const prepare = async () => {
            await loadResources();
            setIsReady(true);
            console.log("Resources loaded. isReady set to true.");
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000, 
                useNativeDriver: true,
            }).start(() => {
                console.log("Fade-in animation completed.");
            });
        };

        prepare();
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            <LottieView
                style={{
                    width: 300,
                    height: 300,
                }}
                source={require("../../assets/chewing-loading.json")}
                autoPlay
                loop={false}
                onAnimationFinish={() => setIsAnimationFinished(true)}
            />

            {isAnimationFinished && isReady && (
                <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
                    <TouchableOpacity style={styles.button} 
                        onPress={() => navigation.navigate('Login')}

                        // 임시
                        // onPress={() => setIsLoggedIn(true)}
                        //
                        >
                        <Text style={styles.buttonText}>시작하기</Text>
                    </TouchableOpacity>
                
                    <Text style={styles.description}>
                        <Text style={styles.linkText} onPress={() => {}}>
                            개인정보 처리방침
                        </Text>
                        과{" "}
                        <Text style={styles.linkText} onPress={() => {}}>
                            이용약관
                        </Text>
                        에 동의하면{"\n"}시작하기를 눌러주세요.
                    </Text>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    splashContainer: {
        alignItems: 'center',
    },
    button: {
        marginBottom: 10,
        backgroundColor: "#007AFF",
        borderRadius: 15,
        width: 250,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 20,
    },
    linkText: {
        fontSize: 14,
        color: '#007AFF',
        marginVertical: -1,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        color: 'black',
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
        width: 250,
    },
});

export default LoadingScreen;
