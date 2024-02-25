import { Folder } from "./folder.model";
import { Note } from "./note.model";
import { Role } from "./role.model";

export interface User {
    id: number;
    username: string;
    email: string;
    folders: Folder[];
    notes: Note[];
    roles: Role[];
    enabled: boolean;
}
export interface UpdateUserDto extends Omit<User, 'folders' | 'notes' | 'roles' | 'enabled'>{
    password: string;
    newPassword: string | null;
}
export interface verifyPasswordDto {
    password: string;
}