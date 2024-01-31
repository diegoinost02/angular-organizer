import { Note } from "./note.model";

export interface Folder {
    id: number;
    name: string;
    notes: Note[];
}