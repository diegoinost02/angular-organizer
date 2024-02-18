import { Component, effect, inject } from '@angular/core';
import { Note } from '../../../../interfaces/note.model';
import { NoteService } from '../../../../services/note.service';
import { FolderService } from '../../../../services/folder.service';
import { NoteDialogService } from '../../../../services/note-dialog.service';
import { User } from '../../../../interfaces/user.model';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})

export class NotesComponent{

  private folderService = inject(FolderService)
  private noteService = inject(NoteService)
  private noteDialogService = inject(NoteDialogService)

  folderSelected = this.folderService.folderSelected$;
  userNotes$ = this.noteService.userNotes$;

  constructor() {
    effect(()=>{
      this.noteService.getNotesByFolderIdAndStatus(this.folderSelected()!.id, true).subscribe();
    })
  }

  openNote(note: Note) {
    this.noteDialogService.openNoteDetails(note);
  }
  createNote() {
    this.noteDialogService.openNoteForm();
  }

}
