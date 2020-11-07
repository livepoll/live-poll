import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Poll } from '../../model/poll';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  polls: Poll[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
