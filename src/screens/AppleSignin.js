import * as AppleAuthentication from 'expo-apple-authentication';

export const AppleSignIn = async () => {
    try {
        // Apple 로그인 로직 추가.
        const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
        });

        // 로그인 성공 시 처리할 로직
        console.log("Apple login successful:", credential);
    } catch (error) {
        console.error("Apple 로그인 실패:", error);
    }
};
