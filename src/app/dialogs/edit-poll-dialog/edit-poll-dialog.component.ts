/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Poll} from '../../model/poll';
import {User} from '../../model/user';
import {CommonToolsService} from '../../service/common-tools.service';
import {PollService} from '../../service/poll.service';

@Component({
  selector: 'app-edit-poll-dialog',
  templateUrl: './edit-poll-dialog.component.html',
  styleUrls: ['./edit-poll-dialog.component.sass']
})
export class EditPollDialogComponent implements OnInit {

  // Event Emitters
  @Input() poll: Poll;
  @Input() userData: User;
  @Input() isVisible: boolean;
  @Output() onClose = new EventEmitter<boolean>(); // true = success; false = cancel

  // Variables
  loading = false;
  name = '';
  startDate = new Date();
  endDate = new Date();

  /**
   * Initialize the component
   * @param pollService Injected PollService
   * @param tools Injected ToolsService
   */
  constructor(
    private pollService: PollService,
    private tools: CommonToolsService
  ) {}

  ngOnInit(): void {
    this.name = this.poll.name;
    this.startDate = new Date(this.poll.startDate);
    this.endDate = new Date(this.poll.endDate);
  }

  updatePoll(): void {
    this.loading = true;
    this.pollService.update(this.poll).subscribe((_) => {
      // Reset values
      this.name = '';
      this.loading = false;
      // Close dialog
      this.onClose.emit(true);
    }, (_) => {
      this.loading = false;
      this.tools.showErrorMessage('An error occurred while updating the poll.');
    });

    /*// Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, responseType: 'text', observe: 'response', withCredentials: true };
    const body = { name, startDate, endDate };
    // Send request
    this.http.put<string>(env.apiBaseUrl + '/users/' + this.userData.id + '/poll/' + this.poll.id, body, options)
      .subscribe((_: HttpResponse<string>) => {
        // Reset values
        this.name = '';
        this.loading = false;
        // Close dialog
        this.onClose.emit(true);
      }, (_) => {
        this.loading = false;
        this.tools.showErrorMessage('An error occurred while updating the poll.');
      });*/
  }

  onDatesChange(result: Date[]): void {
    console.log(result);
  }
}
