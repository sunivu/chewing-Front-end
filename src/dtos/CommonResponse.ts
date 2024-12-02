export interface CommonResponse<T> {
    status: number;
    data: T;
}
export interface SuccessResponseData {
    message: string;
}
export interface ErrorResponseData {
    errorCode: string; // 에러 코드
    message: string;   // 에러 메시지
}