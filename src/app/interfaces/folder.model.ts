import { User } from "./user.model";

export interface Folder {
    id: number;
    name: string;
    user: User;
}
export interface CreateFolderDto extends Omit<Folder, 'id' | 'user'>{
    name: string;
    user: {id: number};
}