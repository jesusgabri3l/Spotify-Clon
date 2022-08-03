export interface TokenBody {
    code: string;
    redirect_uri: string;
    grant_type: string;
}
export interface RefreshTokenBody {
    refresh_token?: string;
    grant_type: string;
}
