// import messaging from '@react-native-firebase/messaging';
import 'react-native-get-random-values';
import { Platform } from 'react-native';
import Device from '../models/Device';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';

class DeviceInfoManager {
    private deviceId: string | null = null;
    private provider: string | null = null;
    private appToken: string | null = null;

    private constructor(deviceId: string | null, provider: string | null, appToken: string | null) {
        this.deviceId = deviceId;
        this.provider = provider;
        this.appToken = appToken;
    }

    /**
     * 팩토리 메서드를 통해 DeviceInfoManager 인스턴스 생성
     */
    static async create(): Promise<DeviceInfoManager> {
        const provider = Platform.OS; // "ios" 또는 "android"
        let deviceId: string | null = null;
        let appToken: string | null = "test";

        try {
            deviceId = await SecureStore.getItemAsync('deviceId');
            if (!deviceId) {
                deviceId = uuidv4();
                await SecureStore.setItemAsync('deviceId', deviceId);
            }
        } catch (error) {
            console.error("Failed to fetch Device ID:", error);
        }

        try {
            // appToken = await messaging().getToken();
        } catch (error) {
            console.error("Failed to fetch FCM token:", error);
        }

        return new DeviceInfoManager(deviceId, provider, appToken);
    }

    /**
     * 디바이스 정보와 FCM 토큰 반환
     */
    getDeviceInfo(): Device {
        if (!this.deviceId || !this.provider || !this.appToken) {
            throw new Error("Device information is incomplete.");
        }

        return new Device(this.deviceId, this.provider, this.appToken);
    }
}

export default DeviceInfoManager;
