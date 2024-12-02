import PhoneNumber from "../models/PhoneNumber";
import LoginApiClient from "../api/LoginApiClient";
import DeviceInfoManager from "../manager/DeviceInfoManager";
import * as SecureStore from 'expo-secure-store';
import {AccessStatus} from "../models/AccessStatus";



class PhoneNumberViewModel {
    private loginApiClient: LoginApiClient;
    private deviceInfoManager: DeviceInfoManager;
    public error: string | null;

    constructor(loginApiClient: LoginApiClient, deviceInfoManager: DeviceInfoManager) {
        this.loginApiClient = loginApiClient;
        this.deviceInfoManager = deviceInfoManager;
        this.error = null;
    }

    canProceed(phoneNumber: PhoneNumber): boolean {
        return phoneNumber.getPhoneNumber().length > 0;
    }

    async sendPhoneVerification(phoneNumber: PhoneNumber): Promise<void> {
        try {
            await this.loginApiClient.sendPhoneNumberVerification(phoneNumber);
        } catch (err: any) {
            this.error = err.message
            console.error("휴대폰 인증 전송 중 오류가 발생했습니다.", err);
            throw err;
        }
    }

    async verifyPhoneNumber(phoneNumber: PhoneNumber, certificationNumber: string): Promise<AccessStatus> {
        try {
            const [token, accessStatus] =await this.loginApiClient.verifyPhoneNumber(phoneNumber, this.deviceInfoManager.getDeviceInfo(),certificationNumber);
            await SecureStore.setItemAsync('accessToken', token.getAccessToken());
            await SecureStore.setItemAsync('refreshToken', token.getRefreshToken());
            return accessStatus;
        } catch (err: any) {
            this.error = err.message
            console.error("휴대폰 인증 전송 중 오류가 발생했습니다.", err);
            throw err;
        }
    }
}

export default PhoneNumberViewModel;