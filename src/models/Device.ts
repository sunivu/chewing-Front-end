class Device {
    private deviceId: string;
    private provider: string;
    private appToken: string;

    constructor(deviceId: string, provider: string, appToken: string) {
        this.deviceId = deviceId;
        this.provider = provider;
        this.appToken = appToken;
    }

    getDeviceId(): string {
        return this.deviceId;
    }

    getProvider(): string {
        return this.provider;
    }

    getAppToken(): string {
        return this.appToken;
    }
}


export default Device;