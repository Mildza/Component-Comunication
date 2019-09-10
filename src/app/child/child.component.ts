import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Person } from '../models/Person';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit, OnChanges {
  @Input() item: Person[];
  @Input() displayPersons: boolean;
  @Input() visitPerson: number;
  @Output() previous: EventEmitter<Person> = new EventEmitter();

  private _personNum: number;
  @Input()
  set personNum(val: number) {
    this._personNum = val;
  }
  get personNum() {
    return this._personNum;
  }
  previousValue: Person;
  constructor() {
    this.previous.emit(null);

  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.item.previousValue) {
      this.previousValue = changes.item.previousValue;
      this.previous.emit(this.previousValue);
    } else {
      this.previousValue = null;
      this.previous.emit(this.previousValue);
    }
  }
}
