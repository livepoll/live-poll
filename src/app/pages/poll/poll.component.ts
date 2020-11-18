/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Poll} from '../../model/poll';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.sass']
})
export class PollComponent implements OnInit {

  poll: Poll;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => console.log(params.id) );
  }

  ngOnInit(): void {}

}
