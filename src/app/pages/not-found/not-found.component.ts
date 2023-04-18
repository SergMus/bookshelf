import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  public buttonText?: string;
  public link?: string;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.buttonText = data['btnText'];
      this.link = data['link'];
    });
  }
}
