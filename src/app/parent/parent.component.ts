import { Component, OnInit } from '@angular/core';
import { Person } from '../models/Person';
import { DataService } from '../sevices/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  data: Person[];
  filteredPersons: Person[]
  personToDisplay: Person;
  previousPerson: Person = null;
  private arrayIndex = 1;
  numOfPersons: number;
  toDisplay: boolean = true;
  visitPerson: number;

  private _searchTerm: string
  get searchTerm() {
    return this._searchTerm
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredPersons = this.filterPersons(value)
  }
  filterPersons(searchString: string) {
    return this.data.filter(person => person.firstname.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
  }

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
      this.filteredPersons = this.data;
      this.personToDisplay = this.data[0];
      this.numOfPersons = this.data.length;
    });
    this.visitPerson = +this.route.snapshot.paramMap.get('id')
    if (this.route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this.route.snapshot.queryParamMap.get('searchTerm')
    } else {
      this.filteredPersons = this.data;
    }

  }

  nextPerson(): void {
    if (this.arrayIndex <= this.data.length - 1) {
      this.personToDisplay = this.data[this.arrayIndex];
      this.arrayIndex++;
    } else {
      this.personToDisplay = this.data[0];
      this.arrayIndex = 1;
    }
  }
  onChange(event: Person) {
    this.previousPerson = event;
  }

  onClick(id: number) {
    this.router.navigate(['/details', id],
      { queryParams: { 'searchTerm': this.searchTerm } })
  }
}
