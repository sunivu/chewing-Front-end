// App.js
import React from 'react';
import { StatusBar, View, StyleSheet } from "react-native";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import Navigation from "./navigations";
import { AuthProvider } from './contexts/AuthContext';
import { enableScreens } from 'react-native-screens';

enableScreens(); // react-native-screens 최적화 활성화

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <StatusBar
                    backgroundColor={theme.background}
                    barStyle={"dark-content"}
                />
                <Navigation />
            </ThemeProvider>
        </AuthProvider>
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
