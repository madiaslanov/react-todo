import {baseUrl} from "../../../services/api";
import {AuthTypeResponse} from "../module/authType.ts";

export const getAuthApi = async (): Promise<AuthTypeResponse> => {
    const response = await fetch(`${baseUrl}/auth/me`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "API-KEY": "115035e9-7031-4bfd-9b30-39b2a23ede3b",
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
};

export const loginApi = async (
    email: string,
    password: string,
    rememberMe: boolean,
): Promise<AuthTypeResponse> => {
    try {
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "API-KEY": "115035e9-7031-4bfd-9b30-39b2a23ede3b",
            },
            body: JSON.stringify({
                email,
                password,
                rememberMe
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

