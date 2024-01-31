import { Role } from "./role.model";

export interface Note {
    id: number;
    title: string;
    description: string;
    folders: Role[];
    status: boolean;
}