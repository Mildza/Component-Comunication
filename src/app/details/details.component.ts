import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../sevices/data.service';
import { Person } from '../models/Person';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  items: Person;
  id: number;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this.dataService.getPerson(this.id).subscribe(
        data => this.items = data
      );
    });
  }

  nextPerson() {
    if (this.id < 3) {
      this.id++;
    } else {
      this.id = 1;
    }
    this.router.navigate(['/details', this.id]);
  }
}
