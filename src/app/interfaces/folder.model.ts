import { User } from "./user.model";

export interface Folder {
    id: number;
    name: string;
    user: User;
}