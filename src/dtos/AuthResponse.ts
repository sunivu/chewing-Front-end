import {AccessStatus} from "../models/AccessStatus";

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface AuthData {
    token: TokenResponse;
    access: AccessStatus;
}