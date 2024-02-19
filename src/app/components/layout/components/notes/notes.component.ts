import { Component, effect, inject } from '@angular/core';
import { Note } from '../../../../interfaces/note.model';
import { NoteService } from '../../../../services/note.service';
import { FolderService } from '../../../../services/folder.service';
import { NoteDialogService } from '../../../../services/note-dialog.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})

export class NotesComponent{

  private userService = inject(UserService);
  private noteService = inject(NoteService)
  private noteDialogService = inject(NoteDialogService)

  folderSelected = this.userService.folderSelected$;
  userNotes$ = this.userService.userNotes$;

  constructor() {
    effect(()=>{
      this.getNotes();
    })
  }

  isEmpty(): boolean{
    if(this.userNotes$().length === 0) {
      return true;
    }
    return false;
  }
  getNotes(){
    this.noteService.getNotesByFolderIdAndStatus(this.folderSelected()!.id, true).subscribe();
  }
  openNote(note: Note) {
    this.noteDialogService.openNoteDetails(note);
  }
  createNote() {
    this.noteDialogService.openNoteForm();
  }

}
