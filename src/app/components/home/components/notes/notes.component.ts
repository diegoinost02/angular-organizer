import { Component, inject } from '@angular/core';
import { Note } from '../../../../interfaces/note.model';
import { NoteService } from '../../../../services/note.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})

export class NotesComponent {

  private noteService = inject(NoteService)

  notes: Note[] = [
    {
      id: 1,
      title: 'Note 1',
      description: 'Description 1',
      folders: [],
      status: true,
      userId: 1
    },
    {
      id: 2,
      title: 'Note 2',
      description: 'Description 2',
      folders: [],
      status: true,
      userId: 1
    },
    {
      id: 3,
      title: 'Note 3',
      description: 'Description 3',
      folders: [],
      status: true,
      userId: 1
    },
    {
      id: 4,
      title: 'Note 4',
      description: 'Description 4',
      folders: [],
      status: true,
      userId: 1
    },
    {
      id: 5,
      title: 'Note 5',
      description: 'Description 5',
      folders: [],
      status: true,
      userId: 1
    },
    {
      id: 6,
      title: 'Note 6',
      description: 'Description 6',
      folders: [],
      status: true,
      userId: 1
    },
    {
      id: 7,
      title: 'Note 7',
      description: 'Description 7',
      folders: [],
      status: true,
      userId: 1
    },
    {
      id: 8,
      title: 'Note 8',
      description: 'Description 8',
      folders: [],
      status: true,
      userId: 1
    },
    {
      id: 9,
      title: 'Note 9',
      description: 'Description 9',
      folders: [],
      status: true,
      userId: 1
    }
  ];

  openNote(note: Note) {
    this.noteService.openNoteDetails(note);
  }
  createNote() {
    this.noteService.openNoteForm();
  }

}
