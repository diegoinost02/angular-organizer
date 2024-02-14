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

export class UserModel implements User {
    id: number = 0;
    username: string = '';
    email: string = '';
    folders: Folder[] = [];
    notes: Note[] = [];
    roles: Role[] = [];
    enabled: boolean = false;
  
    constructor(user?: any) {
      this.id = user == undefined ? 0 : user.id;
      this.username = user == undefined ? '' : user.username;
      this.email = user == undefined ? '' : user.email;
      this.folders = user == undefined ? [] : user.folders;
      this.notes = user == undefined ? [] : user.notes;
      this.roles = user == undefined ? [] : user.roles;
      this.enabled = user == undefined ? false : user.enabled;
    }
  
}