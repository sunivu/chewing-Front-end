import React from "react";
import styled from "styled-components";
import { Image } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
import { Button, TouchableOpacity, Text, View } from "react-native";
import { symbol } from "prop-types";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
    padding: 0 20px;
`;

const WelcomeText = styled.Text`
  font-size: 28x;
  color: ${({ theme }) => theme.text};
  margin-bottom: 150px;
  text-align: left;
  align-self: flex-start;
`;

const LoginButton = styled.TouchableOpacity`
    width: 100%;
    padding: 15px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    background-color: ${({backgroundColor}) => backgroundColor};
    border-width: ${({ withBorder }) => withBorder ? '1px solid #000' : '0px solid #ccc'}; 
    flex-direction: row;
    position: relative;

    ${({ shadow }) => shadow && `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 3.84px;
    elevation: 5;
  `}
`;

const ButtonIcon = styled.View`
    position: absolute;
    left: 20px;
`;

const ButtonText = styled.Text`
    font-size: 18px;
    color: ${({ color }) => color || '#000'};
    margin-left: 10px;
`;

const Divider = styled.View`
    height: 1px;
    width: 95%;
    background-color: #ccc;
    margin: 30px 0;
`;

const Login = ({navigation}) => {
    return (
      <Container>
        <WelcomeText>츄잉에 오신것을{"\n"}환영합니다.</WelcomeText>
  
        <LoginButton 
            backgroundColor='#fff' 
            withBorder={true} 
            shadow={true}
            onPress={() => navigation.navigate('PhoneNumberInput')}
        > 
          <ButtonText>휴대폰번호로 시작하기</ButtonText>
        </LoginButton>
  
        <Divider />
  
        <LoginButton backgroundColor='#f1f1f1'>
          <ButtonIcon>
          <Image source={require('../../assets/google-logo.png')} style={{ width: 24, height: 24 }} />

          </ButtonIcon>
          <ButtonText>구글로 시작하기</ButtonText>
        </LoginButton>
  
        <LoginButton backgroundColor="#000" shadow={true}>
            <ButtonIcon>
                <Image source={require('../../assets/apple-logo.png')} style={{ width: 24, height: 24 }} />
            </ButtonIcon>
          <ButtonText color="white">Apple로 시작하기</ButtonText>
        </LoginButton>
  
        <LoginButton backgroundColor="#fff" withBorder={true} shadow={true}> 
            <ButtonIcon>
                <Image source={require('../../assets/mail-logo.png')} style={{ width: 24, height: 24 }} />
            </ButtonIcon>
          <ButtonText>이메일로 시작하기</ButtonText>
        </LoginButton>
      </Container>
    );
  };
  

export default Login;