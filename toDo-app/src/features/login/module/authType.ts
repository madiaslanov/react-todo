export interface AuthState {
    id: number | null;
    email: string | null;
    login: string | null ;
    isAuth: boolean | null;
    messages: string[] | null;
}

export interface AuthTypeResponse {
    resultCode: number;
    messages: string[];
    data: {
        id: number;
        email: string;
        login: string;
    };
}