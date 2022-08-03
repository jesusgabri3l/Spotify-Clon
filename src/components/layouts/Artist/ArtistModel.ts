interface Image {
    height?: number;
    url?: string;
    width?: number;
}
export interface Artist {
    external_urls?: any;
    followers?: {href: string; total: number};
    genres?: string[];
    href?:string;
    id?: string;
    images: Image[];
    name?: string;
    popularity?: number;
    type?:string;
    uri?: string;
}
