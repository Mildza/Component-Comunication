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
  personToDisplay: Person;
  previousPerson: Person = null;
  private arrayIndex = 1;
  numOfPersons: number;
  toDisplay: boolean = true;
  visitPerson: number;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data
      this.personToDisplay = this.data[0];
      this.numOfPersons = this.data.length;
    });
    this.visitPerson = +this.route.snapshot.paramMap.get('id')
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
    this.router.navigate(['/details', id]);
  }
}
