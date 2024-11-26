class PhoneNumber {
    private phoneNumber: string;
    private countryCode: string;

    constructor(phoneNumber: string, countryCode: string) {
        this.phoneNumber = phoneNumber;
        this.countryCode = countryCode;
    }


    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    getCountryCode(): string {
        return this.countryCode;
    }
}

export default PhoneNumber;
