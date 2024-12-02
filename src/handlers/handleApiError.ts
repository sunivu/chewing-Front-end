import axios from "axios";
import {ErrorResponseData} from "../dtos/CommonResponse";


export function handleApiError(error: any): never {
    // Axios 에러 처리
    if (axios.isAxiosError(error)) {
        if (error.response?.data?.data) {
            const errorData = error.response.data.data as ErrorResponseData;
            throw new Error(`[${errorData.errorCode}] ${errorData.message}`);
        }

        // 서버 응답이 없는 경우
        throw new Error("서버로부터 응답이 없습니다.");
    }

    // 기타 에러 처리
    throw new Error(error.message || "알 수 없는 오류가 발생했습니다.");
}
