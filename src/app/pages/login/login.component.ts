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
  loginForm!: FormGroup;
  resetPasswordForm!: FormGroup;
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
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    this.resetPasswordForm = this.formBuilder.group({
      username: [null, [Validators.required]]
    });
  }

  /**
   * Validates the login form
   */
  submitLoginForm(): void {
    // Validate form controls
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    if (this.loginForm.valid) {
      this.loading = true;
      // Create user instance and trigger login
      const user = new User();
      user.username = this.loginForm.controls.username.value;
      user.password = SHA256(this.loginForm.controls.password.value).toString();
      user.accountState = this.loginForm.controls.remember.value ? 1 : 0;
      this.login.emit(user);
    }
  }

  /**
   * Validates the reset password form
   */
  submitForgotPasswordForm(): void {
    // Validate form controls
    for (const i in this.resetPasswordForm.controls) {
      this.resetPasswordForm.controls[i].markAsDirty();
      this.resetPasswordForm.controls[i].updateValueAndValidity();
    }
    if (this.resetPasswordForm.valid) {
      this.loading = true;
      this.resetPassword(this.loginForm.controls.username.value);
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
    const options: any = { header, responseType: 'application/json', observe: 'response', withCredentials: false };
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
