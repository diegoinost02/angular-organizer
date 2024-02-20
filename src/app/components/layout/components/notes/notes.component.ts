import { Component, DestroyRef, effect, inject } from '@angular/core';
import { Note } from '../../../../interfaces/note.model';
import { NoteService } from '../../../../services/note.service';
import { NoteDialogService } from '../../../../services/dialogs/note-dialog.service';
import { UserService } from '../../../../services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FolderDialogService } from '../../../../services/dialogs/folder-dialog.service';
import { Folder } from '../../../../interfaces/folder.model';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})

export class NotesComponent{

  private userService = inject(UserService);
  private noteService = inject(NoteService);
  private noteDialogService = inject(NoteDialogService);
  private folderDialogService = inject(FolderDialogService);
  private destroyRef = inject(DestroyRef);

  folderSelected$ = this.userService.folderSelected$;
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
    // this.noteService.getNotesByFolderIdAndStatus(this.folderSelected$()!.id, true).subscribe();
    this.noteService.getNotesByFolderIdAndStatus(
      this.folderSelected$() ? this.folderSelected$()!.id : 0,
      true)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe();
  }

  openNote(note: Note) {
    this.noteDialogService.openNoteDetails(note);
  }

  createNote() {
    this.noteDialogService.openNoteForm();
  }

  openFolder(folder: Folder) {
    this.folderDialogService.openFolderDetails(folder);
  }

  createFolder(){
    this.folderDialogService.openFolderForm(); 
  }

}
