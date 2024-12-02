import axios, {AxiosInstance} from "axios";
import Email from "../models/Email";
import PhoneNumber from "../models/PhoneNumber";
import {CommonResponse, SuccessResponseData} from "../dtos/CommonResponse";
import {handleApiError} from "../handlers/handleApiError";
import {
    VerifyAppleRequest,
    SendEmailVerificationRequest,
    SendPhoneNumberVerificationRequest,
    VerifyEmailVerificationRequest, VerifyPhoneNumberVerificationRequest
} from "../dtos/AuthRequest";
import {AuthData} from "../dtos/AuthResponse";
import {AccessStatus} from "../models/AccessStatus";
import Token from "../models/Token";
import Device from "../models/Device";

class LoginApiClient {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "http://118.67.142.14:8080",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async sendEmailVerification(email: Email): Promise<void> {
        const requestDto: SendEmailVerificationRequest = {
            email: email.getEmailAddress(),
        };

        try {
            const response = await this.axiosInstance.post<CommonResponse<SuccessResponseData>>(
                "/api/auth/email/create/send",
                requestDto
            );

            const successData = response.data.data;
            console.log("이메일 인증 전송 성공:", successData.message);
        } catch (error: any) {
            handleApiError(error); // 공통 에러 처리
        }
    }

    async verifyEmailVerification(email: Email, device: Device, certificationNumber: string): Promise<[Token, AccessStatus]> {
        const requestDto: VerifyEmailVerificationRequest = {
            email: email.getEmailAddress(),
            deviceId: device.getDeviceId(),
            provider: device.getProvider(),
            appToken: device.getAppToken(),
            verificationCode: certificationNumber,
        };

        try {
            const response = await this.axiosInstance.post<CommonResponse<AuthData>>(
                "/api/auth/email/create/verify",
                requestDto
            );
            const successData = response.data.data;
            const token = new Token(
                successData.token.accessToken,
                successData.token.refreshToken,
            );
            return [token, successData.access]
        } catch (error: any) {
            handleApiError(error); // 공통 에러 처리
        }
    }

    async verifyPhoneNumber(phoneNumber: PhoneNumber, device: Device, certificationNumber: string): Promise<[Token, AccessStatus]> {
        const requestDto: VerifyPhoneNumberVerificationRequest = {
            phoneNumber: phoneNumber.getPhoneNumber(),
            countryCode: phoneNumber.getCountryCode(),
            deviceId: device.getDeviceId(),
            provider: device.getProvider(),
            appToken: device.getAppToken(),
            verificationCode: certificationNumber,
        };

        try {
            const response = await this.axiosInstance.post<CommonResponse<AuthData>>(
                "/api/auth/phone/create/verify",
                requestDto
            );
            const successData = response.data.data;
            const token = new Token(
                successData.token.accessToken,
                successData.token.refreshToken,
            );
            return [token, successData.access]
        } catch (error: any) {
            handleApiError(error); // 공통 에러 처리
        }
    }

    async sendPhoneNumberVerification(phoneNumber: PhoneNumber): Promise<void> {
        const requestDto: SendPhoneNumberVerificationRequest = {
            phoneNumber: phoneNumber.getPhoneNumber(),
            countryCode: phoneNumber.getCountryCode(),
        };

        try {
            const response = await this.axiosInstance.post<CommonResponse<SuccessResponseData>>(
                "/api/auth/phone/create/send",
                requestDto
            );
            const successData = response.data.data;
            console.log("휴대폰 인증 전송 성공:", successData.message);
        } catch (error: any) {
            handleApiError(error); // 공통 에러 처리
        }
    }

    async verifyApple(identityToken: string, device: Device): Promise<[Token, AccessStatus]> {
        const requestDto: VerifyAppleRequest = {
            appleId: identityToken,
            deviceId: device.getDeviceId(),
            provider: device.getProvider(),
            appToken: device.getAppToken(),
        }

        try {
            const response = await this.axiosInstance.post<CommonResponse<AuthData>>(
                "/api/auth/apple/create/send",
                requestDto
            );
            const successData = response.data.data;
            const token = new Token(
                successData.token.accessToken,
                successData.token.refreshToken,
            );
            return [token, successData.access]
        } catch (error: any) {
            handleApiError(error); // 공통 에러 처리
        }
    }
}

export default LoginApiClient;
