/*
 * Copyright © Live-Poll 2020. All rights reserved
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SHA256} from 'crypto-js';
import {User} from '../../model/user';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  @Input() darkTheme = false;
  @Output() login = new EventEmitter<User>();

  loginMode = true;
  validateLoginForm!: FormGroup;
  validateResetPasswordForm!: FormGroup;
  username: string;
  password: string;
  remember = true;
  loading = false;
  passwordVisible = false;

  /**
   * Initialize login component
   *
   * @param formBuilder Injected form builder
   * @param http Injected http client
   * @param notificationService Injected notification service
   */
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private notificationService: NzNotificationService
  ) {}

  /**
   * Initialize form validation
   */
  ngOnInit(): void {
    this.validateLoginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    this.validateResetPasswordForm = this.formBuilder.group({
      username: [null, [Validators.required]]
    });
  }

  /**
   * Validates the login form
   */
  submitLoginForm(): void {
    // Validate form controls
    for (const i in this.validateLoginForm.controls) {
      this.validateLoginForm.controls[i].markAsDirty();
      this.validateLoginForm.controls[i].updateValueAndValidity();
    }
    if (this.validateLoginForm.valid) {
      this.loading = true;
      // Create user instance and trigger login
      const user = new User();
      user.username = this.username;
      user.password = SHA256(this.password).toString();
      user.accountState = this.remember ? 1 : 0;
      this.login.emit(user);
    }
  }

  /**
   * Validates the reset password form
   */
  submitForgotPasswordForm(): void {
    // Validate form controls
    for (const i in this.validateResetPasswordForm.controls) {
      this.validateResetPasswordForm.controls[i].markAsDirty();
      this.validateResetPasswordForm.controls[i].updateValueAndValidity();
    }
    if (this.validateResetPasswordForm.valid) {
      this.loading = true;
      this.resetPassword(this.username);
    }
  }

  /**
   * Reset the users password on the server
   *
   * @param username Username of user
   */
  resetPassword(username: string): void {
    // Build header, body and options
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options: any = { header, responseType: 'application/json', observe: 'response' };
    const body = { username };
    // Send request
    this.http.put<string>(env.apiBaseUrl + '/account/reset', body, options)
      .subscribe((response: HttpResponse<string>) => {
        if (response.ok) {
          // Request was successful, continue
          this.loginMode = true;
          this.loading = false;
        }
      }, (_) => {
        this.notificationService.error('An error occurred', 'Something went wrong.', { nzPlacement: 'topRight' });
        this.loading = false;
      });
  }
}
