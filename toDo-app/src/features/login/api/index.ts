import {baseUrl} from "../../../services/api";
import {AuthTypeResponse} from "../module/authType.ts";

export const getAuthApi = async (): Promise<AuthTypeResponse> => {
    try {
        const response = await fetch(`${baseUrl}auth/me`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }
}