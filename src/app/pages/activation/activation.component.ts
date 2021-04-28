/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component, EventEmitter, OnInit} from '@angular/core';
import {Poll} from '../../model/poll';
import {User} from '../../model/user';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.sass']
})
export class ActivationComponent implements OnInit {

  loading = true;
  success = true;

  /**
   * Initialize component
   *
   * @param route Active route
   * @param accountService Injected AccountService
   */
  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.accountService.confirm(params.token).subscribe((_) => {
        this.loading = false;
      }, (_) => {
        this.success = true;
        this.loading = false;
      });
    });
  }
}
