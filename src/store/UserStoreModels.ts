import { Image } from '../models/GlobalModels';
export interface Auth {
    accessToken?: string;
    refreshToken?: string;
}
export interface User{
    country?: string;
    display_name?: string;
    name?: string;
    email?: string;
    explicit_content?: any;
    external_urls?: any;
    followers?: any;
    href?: string;
    id?: string;
    images?: Image[];
    product?: string;
    type?: string;
    uri?: string;
}
