class Email {
    private readonly emailAddress: string;

    constructor(emailAddress: string) {
        this.emailAddress = emailAddress;
    }


    getEmailAddress(): string {
        return this.emailAddress;
    }

    validate(): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(this.emailAddress);
    }
}

export default Email;