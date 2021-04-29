/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SHA256} from 'crypto-js';
import {Router} from '@angular/router';
import {CommonToolsService} from '../../service/common-tools.service';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  // Variables
  darkTheme = false;
  signUpForm!: FormGroup;
  loading = false;
  passwordVisible = false;

  /**
   * Initialize sign up component
   *
   * @param formBuilder Injected form builder
   * @param tools Injected ToolsService
   * @param accountService Injected AccountService
   * @param router Injected router service
   */
  constructor(
    private formBuilder: FormBuilder,
    private tools: CommonToolsService,
    private accountService: AccountService,
    private router: Router
  ) {
  }

  /**
   * Initialize form validation
   */
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]],
      agb: [false, [Validators.required, Validators.requiredTrue]],
      newsletter: [false, []]
    });
  }

  /**
   * Password control validator
   *
   * @param control Form element
   */
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.signUpForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  };

  /**
   * Validates the login form
   */
  submitForm(): void {
    // Validate form controls
    for (const i in this.signUpForm.controls) {
      this.signUpForm.controls[i].markAsDirty();
      this.signUpForm.controls[i].updateValueAndValidity();
    }
    if (this.signUpForm.valid) {
      this.loading = true;
      const username = this.signUpForm.controls.username.value;
      const email = this.signUpForm.controls.email.value;
      const password = this.signUpForm.controls.password.value;
      const newsletter = this.signUpForm.controls.newsletter.value;
      this.signUp(username, email, SHA256(password).toString(), newsletter);
    }
  }

  /**
   * Updates the confirm password validator on every update of the confirm password field
   */
  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.signUpForm.controls.confirmPassword.updateValueAndValidity());
  }

  /**
   * Sign up process
   *
   * @param username Username of the user
   * @param email Email address of the user
   * @param password Password of the user
   * @param newsletter Subscribe to the newsletter
   */
  signUp(username: string, email: string, password: string, newsletter: boolean): void {
    // Build user object
    const body = { username, email, password };
    // Send request
    this.accountService.register(body).subscribe((_) => {
      // Request was successful, continue
      this.tools.showSuccessMessage('Please check your email inbox and confirm your email, by clicking on the confirmation link.');
      this.router.navigateByUrl('/login');
    }, (error) => {
      console.log(error);
      this.tools.showErrorMessage('Something went wrong.');
      this.loading = false;
    });
  }
}
