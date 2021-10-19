export interface AuthState {
    user: User|null,
    email: string|null
}

export interface User {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    roles?: Array<string>,
    token_type: string
}

export interface UserData {
    username: string,
    password: string
}