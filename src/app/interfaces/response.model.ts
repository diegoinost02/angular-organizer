export interface ResponseLogin {
    username: string;
    message: string;
    token: string;
    refresh_token: string;
}

export interface ResponseRefresh {
    token: string;
    refresh_token: string;
}