export interface SendEmailVerificationRequest {
    email: string;
}
export interface VerifyEmailVerificationRequest {
    email: string;
    verificationCode: string;
    deviceId: string;
    provider: string;
    appToken: string;
}


export interface SendPhoneNumberVerificationRequest {
    phoneNumber: string;
    countryCode: string;
}

export interface VerifyPhoneNumberVerificationRequest {
    phoneNumber: string;
    countryCode: string;
    verificationCode: string;
    deviceId: string;
    provider: string;
    appToken: string;
}


export interface VerifyAppleRequest {
    appleId: string;
    deviceId: string;
    provider: string;
    appToken: string;
}
