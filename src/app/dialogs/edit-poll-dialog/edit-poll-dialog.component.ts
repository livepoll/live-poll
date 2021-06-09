/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Poll} from '../../model/poll';
import {User} from '../../model/user';
import {CommonToolsService} from '../../service/common-tools.service';
import {PollService} from '../../service/poll.service';
import {FormBuilder, FormGroup} from '@angular/forms';

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
  validateForm!: FormGroup;

  /**
   * Initialize the component
   *
   * @param formBuilder Injected FormBuilder
   * @param pollService Injected PollService
   * @param tools Injected ToolsService
   */
  constructor(
    private formBuilder: FormBuilder,
    private pollService: PollService,
    private tools: CommonToolsService
  ) {}

  ngOnInit(): void {
    const startDate = this.poll.startDate ? new Date(this.poll.startDate) : null;
    const endDate = this.poll.startDate ? new Date(this.poll.endDate) : null;

    this.validateForm = this.formBuilder.group({
      name: [this.poll.name],
      date: [startDate, endDate]
    });
  }

  updatePoll(): void {
    this.loading = true;

    this.poll.name = this.validateForm.controls.name.value;
    this.poll.startDate = this.validateForm.controls.date?.value ? this.validateForm.controls.date.value[0] : null;
    this.poll.endDate = this.validateForm.controls.date?.value ? this.validateForm.controls.date.value[1] : null;

    // Commit to server
    this.pollService.update(this.poll).subscribe((_) => {
      // Reset values
      this.loading = false;
      // Close dialog
      this.onClose.emit(true);
    }, (_) => {
      this.loading = false;
      this.tools.showErrorMessage('An error occurred while updating the poll.');
    });
  }
}
