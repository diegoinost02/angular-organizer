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
    },
    {
      id: 12,
      title: 'Note 12',
      description: 'Description 12',
      folders: [],
      status: true
    },
    {
      id: 13,
      title: 'Note 13',
      description: 'Description 13',
      folders: [],
      status: true
    },
    {
      id: 14,
      title: 'Note 14',
      description: 'Description 14',
      folders: [],
      status: true
    },
    {
      id: 15,
      title: 'Note 15',
      description: 'Description 15',
      folders: [],
      status: true
    },
    {
      id: 16,
      title: 'Note 16',
      description: 'Description 16',
      folders: [],
      status: true
    },
    {
      id: 17,
      title: 'Note 17',
      description: 'Description 17',
      folders: [],
      status: true
    },
    {
      id: 18,
      title: 'Note 18',
      description: 'Description 18',
      folders: [],
      status: true
    },
    {
      id: 19,
      title: 'Note 19',
      description: 'Description 19',
      folders: [],
      status: true
    },
    {
      id: 20,
      title: 'Note 20',
      description: 'Description 20',
      folders: [],
      status: true
    },
    {
      id: 21,
      title: 'Note 21',
      description: 'Description 21',
      folders: [],
      status: true
    },
    {
      id: 22,
      title: 'Note 22',
      description: 'Description 22',
      folders: [],
      status: true
    },
    {
      id: 23,
      title: 'Note 23',
      description: 'Description 23',
      folders: [],
      status: true
    },
    {
      id: 24,
      title: 'Note 24',
      description: 'Description 24',
      folders: [],
      status: true
    },
    {
      id: 25,
      title: 'Note 25',
      description: 'Description 25',
      folders: [],
      status: true
    },
    {
      id: 26,
      title: 'Note 26',
      description: 'Description 26',
      folders: [],
      status: true
    }
  ];
}
