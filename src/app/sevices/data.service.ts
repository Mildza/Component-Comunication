import { Injectable } from '@angular/core';

import { Person } from './../models/Person'
import { Observable, of, from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data = [
    {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      gender: 'male',
      age: 30,
      image: 'male.jpg',
      married: 'yes',
    },
    {
      id: 2,
      firstname: 'Jane',
      lastname: 'Doe',
      gender: 'female',
      age: 25,
      image: 'female.jpg',
      married: 'yes',
    },
    {
      id: 3,
      firstname: 'Baby',
      lastname: 'Doe',
      gender: 'male',
      age: 1,
      image: 'baby.jpg',
      married: 'no',
    },
  ];

  constructor() { }

  getData(): Observable<Person[]> {
    return of(this.data)
  }
  getPerson(search: number): Observable<Person> {
    const source = from(this.data)
    return source.pipe(
      filter(results => results.id == search))
  }
}
