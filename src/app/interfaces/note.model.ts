import { Folder } from "./folder.model";
import { User } from "./user.model";

export interface Note {
    id: number;
    title: string;
    description: string;
    user: User;
    folders: Folder[];
    status: boolean;
}
export interface CreateNoteDto extends Omit<Note, 'id' | 'user' | 'folders'>{
    user: {id: number};
    folders: FolderDto[];
}

export interface FolderDto {
    id: number;
}