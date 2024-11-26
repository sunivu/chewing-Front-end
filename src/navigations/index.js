import React from "react";
import { NavigationContainer  } from "@react-navigation/native";
import Auth from "./Auth";
// import { Login, Signin, LoadingScreen } from "../screens";


const Navigation = () => {
    return (
        <NavigationContainer>
            <Auth />
        </NavigationContainer>
    )
}

export default Navigation;