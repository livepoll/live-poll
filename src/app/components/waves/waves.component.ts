import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-waves',
  templateUrl: './waves.component.html',
  styleUrls: ['./waves.component.sass']
})
export class WavesComponent implements OnInit{
  @Input() darkTheme = false;

  ngOnInit(): void {}
}
