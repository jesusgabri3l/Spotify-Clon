export interface Auth {
    accessToken?: string;
    refreshToken?: string;
}

interface Image {
    height?: number;
    url?: string;
    width?: number;
}
interface topArtists {
    href?: string;
    items?: any[],
    limit?: number;
    next?: string;
    offset?: number;
    previous?: string;
    total?: number;
}

export interface User{
    country?: string;
    display_name?: string;
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
    topArtists?: topArtists;
}
