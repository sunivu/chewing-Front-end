import React, { useState } from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import Navigation from "./navigations";
import * as SplashScreen from "expo-splash-screen";
import LoadingScreen from "./screens/LoadingScreen";
import { Login } from "./screens";


const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <StatusBar 
                backgroundColor={theme.background} 
                barStyle={"dark-content"} 
            />
            <Navigation />
        </ThemeProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
    },
});

export default App;
