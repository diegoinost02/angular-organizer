import { Component } from '@angular/core';
import { Note } from '../../../../interfaces/note.model';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})

export class NotesComponent {

  notes: Note[] = [
    {
      id: 1,
      title: 'Note 1',
      description: 'Description 1',
      folders: [],
      status: true
    },
    {
      id: 2,
      title: 'Note 2',
      description: 'Description 2',
      folders: [],
      status: true
    },
    {
      id: 3,
      title: 'Note 3',
      description: 'Description 3',
      folders: [],
      status: true
    },
    {
      id: 4,
      title: 'Note 4',
      description: 'Description 4',
      folders: [],
      status: true
    },
    {
      id: 5,
      title: 'Note 5',
      description: 'Description 5',
      folders: [],
      status: true
    },
    {
      id: 6,
      title: 'Note 6',
      description: 'Description 6',
      folders: [],
      status: true
    },
    {
      id: 7,
      title: 'Note 7',
      description: 'Description 7',
      folders: [],
      status: true
    },
    {
      id: 8,
      title: 'Note 8',
      description: 'Description 8',
      folders: [],
      status: true
    },
    {
      id: 9,
      title: 'Note 9',
      description: 'Description 9',
      folders: [],
      status: true
    },
    {
      id: 10,
      title: 'Note 10',
      description: 'Description 10',
      folders: [],
      status: true
    },
    {
      id: 11,
      title: 'Note 11',
      description: 'Description 11',
      folders: [],
      status: true
    }
  ];
}
