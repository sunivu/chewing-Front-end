import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {Image, Alert, Button, TouchableOpacity, Text, View} from "react-native";
import {symbol} from "prop-types";
import {GoogleSignIn} from "./GoogleSignin";
import DeviceInfoManager from "../manager/DeviceInfoManager";
import LoginApiClient from "../api/LoginApiClient";
import AppleViewModel from "../viewmodels/AppleViewModel";
import {AccessStatus} from "../models/AccessStatus";
import {AuthContext} from "../contexts/AuthContext";

const CustomLoginButton = ({ backgroundColor, withBorder, shadow, onPress, icon, text, textColor }) => {
    const shadowStyles = shadow
        ? {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
          }
        : {};

    return (
        <LoginButtonStyled
            backgroundColor={backgroundColor}
            withBorder={withBorder}
            onPress={onPress}
            style={shadowStyles}
        >
            {icon && (
                <ButtonIcon>
                    <Image source={icon} style={{ width: 24, height: 24 }} />
                </ButtonIcon>
            )}
            <ButtonText color={textColor} hasIcon={!!icon}>
                {text}
            </ButtonText>
        </LoginButtonStyled>
    );
};


const Login = ({navigation}) => {

    const { setIsLoggedIn } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [appleViewModel, setAppleViewModel] = useState(null);


    useEffect(() => {
        const initializeViewModel = async () => {
            try {
                const deviceInfoManager = await DeviceInfoManager.create();
                const loginApiClient = new LoginApiClient();
                const appleViewModel = new AppleViewModel(loginApiClient, deviceInfoManager);
                setAppleViewModel(appleViewModel);
            } catch (err) {
                console.error("Error initializing EmailViewModel:", err);
            }
        };
        initializeViewModel();
    }, [navigation]);

    const handleAppleSignIn = async () => {
        setLoading(true);
        try {
            const appleId = await appleViewModel.signInWithApple();
            const accessStatus = await appleViewModel.verifyAppleVerification(appleId);
            if (accessStatus === AccessStatus.ACCESS) {
                setIsLoggedIn(true);
            } else {
                navigation.navigate('SignIn_ProfileSetting');
            }
        } catch (err) {
            Alert.alert("오류", appleViewModel.error);
        } finally {
            setLoading(false);
        }
    };

    const socialButtons = [
        {
            backgroundColor: "#f1f1f1",
            withBorder: false,
            shadow: false,
            onPress: GoogleSignIn,
            text: "구글로 시작하기",
            icon: require('../../assets/google-logo.png'),
        },
        {
            backgroundColor: "#000",
            withBorder: false,
            shadow: true,
            onPress: handleAppleSignIn,
            text: "Apple로 시작하기",
            icon: require('../../assets/apple-logo.png'),
            textColor: "#fff",
        },
        {
            backgroundColor: "#fff",
            withBorder: true,
            shadow: true,
            onPress: () => navigation.navigate('EmailInput'),
            text: "이메일로 시작하기",
            icon: require('../../assets/mail-logo.png'),
        },
    ];
    
    return (
        <Container>
            <WelcomeText>츄잉에 오신것을{"\n"}환영합니다.</WelcomeText>

            <CustomLoginButton
                backgroundColor="#fff"
                withBorder={true}
                shadow={true}
                onPress={() => navigation.navigate('PhoneNumberInput')}
                text="휴대폰번호로 시작하기"
            />

            <Divider />

            {socialButtons.map((button, index) => (
                <CustomLoginButton key={index} {...button} />
            ))}
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
    padding: 0 20px;
`;

const WelcomeText = styled.Text`
    font-size: 28px;
    color: ${({theme}) => theme.text};
    margin-bottom: 150px;
    text-align: left;
    align-self: flex-start;
`;

const LoginButtonStyled = styled.TouchableOpacity`
    width: 100%;
    padding: 15px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    background-color: ${({ backgroundColor }) => backgroundColor};
    border-width: ${({ withBorder }) => (withBorder ? 1 : 0)}px;
    border-color: ${({ withBorder }) => (withBorder ? '#000' : '#ccc')};
    flex-direction: row;
    position: relative;
`;

const ButtonIcon = styled.View`
    position: absolute;
    left: 20px;
`;

const ButtonText = styled.Text`
    font-size: 18px;
    color: ${({color}) => color || '#000'};
    margin-left: 10px;
`;

const Divider = styled.View`
    height: 1px;
    width: 95%;
    background-color: #ccc;
    margin: 30px 0;
`;

export default Login;