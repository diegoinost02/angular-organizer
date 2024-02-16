import { Folder } from "./folder.model";

export interface Note {
    id: number;
    title: string;
    description: string;
    userId: number;
    folders: Folder[];
    status: boolean;
}