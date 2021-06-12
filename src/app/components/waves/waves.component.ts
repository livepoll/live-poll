/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-waves',
  templateUrl: './waves.component.html',
  styleUrls: ['./waves.component.sass']
})
export class WavesComponent implements OnInit {
  @Input() darkTheme = false;

  ngOnInit(): void {
  }
}
