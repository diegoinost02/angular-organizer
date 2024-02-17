import { Component, effect, inject } from '@angular/core';
import { Note } from '../../../../interfaces/note.model';
import { NoteService } from '../../../../services/note.service';
import { FolderService } from '../../../../services/folder.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})

export class NotesComponent{

  private noteService = inject(NoteService)
  private folderService = inject(FolderService)

  folderSelected = this.folderService.folderSelected$;
  userNotes$ = this.noteService.userNotes$;

  constructor() {
    effect(()=>{
      this.noteService.getNotesByFolderIdAndStatus(this.folderSelected()!.id, true).subscribe();
    })
  }

  openNote(note: Note) {
    this.noteService.openNoteDetails(note);
  }
  createNote() {
    this.noteService.openNoteForm();
  }

}
