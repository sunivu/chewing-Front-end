import LoginApiClient from "../api/LoginApiClient";
import DeviceInfoManager from "../manager/DeviceInfoManager";
import {AccessStatus} from "../models/AccessStatus";
import * as AppleAuthentication from 'expo-apple-authentication';
import * as SecureStore from 'expo-secure-store';

class AppleViewModel {
    private loginApiClient: LoginApiClient;
    private deviceInfoManager: DeviceInfoManager;
    public error: string | null;

    constructor(loginApiClient: LoginApiClient, deviceInfoManager: DeviceInfoManager) {
        this.loginApiClient = loginApiClient;
        this.deviceInfoManager = deviceInfoManager;
        this.error = null;
    }

    async signInWithApple(): Promise<string> {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            const {identityToken} = credential;

            return identityToken!;
        } catch (error: any) {
            this.error = "Apple 로그인 중 오류가 발생했습니다.";
            console.error("Apple 로그인 중 오류가 발생했습니다.", error);
            throw error;
        }
    }

    async verifyAppleVerification(identityToken: string): Promise<AccessStatus> {
        try {
            // const [token, accessStatus] = await this.loginApiClient.sendAppleVerification(
            //     identityToken,
            //     this.deviceInfoManager.getDeviceInfo()
            // );
            // await SecureStore.setItemAsync('accessToken', token.getAccessToken());
            // await SecureStore.setItemAsync('refreshToken', token.getRefreshToken());
            return AccessStatus.ACCESS;
        } catch (error: any) {
            this.error = "Apple 로그인 중 오류가 발생했습니다.";
            console.error("Apple 로그인 중 오류가 발생했습니다.", error);
            throw error;
        }
    }
}

export default AppleViewModel;