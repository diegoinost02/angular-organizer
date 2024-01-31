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