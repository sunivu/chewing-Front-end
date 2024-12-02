import Email from "../models/Email";
import LoginApiClient from "../api/LoginApiClient";
import DeviceInfoManager from "../manager/DeviceInfoManager";
import * as SecureStore from "expo-secure-store";
import {AccessStatus} from "../models/AccessStatus";


class EmailViewModel {
    private loginApiClient: LoginApiClient;
    private deviceInfoManager: DeviceInfoManager;
    public error: string | null;

    constructor(loginApiClient: LoginApiClient, deviceInfoManager: DeviceInfoManager) {
        this.loginApiClient = loginApiClient;
        this.deviceInfoManager = deviceInfoManager;
        this.error = null;
    }

    canProceed(email: Email): boolean {
        return email.getEmailAddress().length > 0 && email.validate();
    }

    async sendEmailVerification(email: Email): Promise<void> {
        try {
            await this.loginApiClient.sendEmailVerification(email);
        } catch (err: any) {
            this.error = "이메일 인증 전송 중 오류가 발생했습니다.";
            console.error("이메일 인증 전송 중 오류가 발생했습니다.", err);
            throw err;
        }
    }

    async verifyEmail(email: Email, certificationNumber: string): Promise<AccessStatus> {
        try {
            const [token, accessStatus] =await this.loginApiClient.verifyEmailVerification(
                email,
                this.deviceInfoManager.getDeviceInfo(),
                certificationNumber
            );
            await SecureStore.setItemAsync('accessToken', token.getAccessToken());
            await SecureStore.setItemAsync('refreshToken', token.getRefreshToken());
            return accessStatus;
        } catch (err: any) {
            this.error = "이메일 인증 중 오류가 발생했습니다.";
            console.error("이메일 인증 중 오류가 발생했습니다.", err);
            throw err;
        }
    }
}

export default EmailViewModel;