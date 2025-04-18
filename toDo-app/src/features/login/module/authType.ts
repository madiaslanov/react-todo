
export interface AuthTypeResponse {
    id: number;
    email: string;
    login: string;
}

export interface AuthState {
    id: number | null;
    email: string | null;
    login: string | null ;
}