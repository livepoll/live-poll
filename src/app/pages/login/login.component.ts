/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SHA256} from 'crypto-js';
import {User} from '../../model/user';
import {CommonToolsService} from '../../service/common-tools.service';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  // Event Emitters
  onLogin = new EventEmitter<User>();
  onLoginResultChanged = new EventEmitter<string>();

  // Variables
  darkTheme = false;
  loginMode = true;
  loginForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  loading = false;
  passwordVisible = false;

  /**
   * Initialize login component
   *
   * @param formBuilder Injected form builder
   * @param tools Injected ToolsService
   * @param accountService Injected AccountService
   */
  constructor(
    private formBuilder: FormBuilder,
    private tools: CommonToolsService,
    private accountService: AccountService
  ) {
  }

  /**
   * Initialize form validation
   */
  ngOnInit(): void {
    // Initialize form
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    this.resetPasswordForm = this.formBuilder.group({
      username: [null, [Validators.required]]
    });
    // Wire up event emitters
    this.onLoginResultChanged.subscribe(errorMessage => {
      this.loginForm.controls.password.reset();
      this.loading = false;
      this.passwordVisible = false;
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
      const username = this.loginForm.controls.username.value;
      const password = SHA256(this.loginForm.controls.password.value).toString();
      const user = new User(username, password);
      user.accountState = this.loginForm.controls.remember.value ? 1 : 0;
      this.onLogin.emit(user);
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
    this.accountService.reset(username).subscribe((_) => {
      // Request was successful, continue
      this.loginMode = true;
      this.loading = false;
    }, (_) => {
      this.tools.showErrorMessage('Something went wrong.');
      this.loading = false;
    });
  }
}
