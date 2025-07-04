export interface User {
    id: string;
    username: string;
    avatar: string;
}


// export interface Post {
// file: any;
// id: string;
// user_id: string;
// parent_id?: string | null;
// text: string;
// created_at?: string;
// User?: User;
// Post?: Post [];
// }
export interface Post {
id: string;
user_id: string;
parent_id?: string | null;
text: string;
file?: String | null;
created_at?: string;
User?: User;
Post?: Post [];
tag_name?: string | null;
}

export interface Place {
    id: string;
    place_id: string;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
}

export interface Tag {
    name: string;
}