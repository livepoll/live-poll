import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { SHA256 } from 'crypto-js';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  @Input() darkTheme = false;

  validateForm!: FormGroup;
  username: string;
  email: string;
  password: string;
  loading = false;
  newsletter = false;

  /**
   * Initialize login component
   *
   * @param formBuilder Injected form builder
   */
  constructor(private formBuilder: FormBuilder) {}

  /**
   * Initialize form validation
   */
  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]],
      agb: [false, [Validators.required]],
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
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  /**
   * Validates the login form
   */
  submitForm(): void {
    // Validate form controls
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.loading = true;
      this.signUp(this.username, this.email, this.password, this.newsletter);
    }
  }

  /**
   * Updates the confirm password validator on every update of the confirm password field
   */
  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.confirmPassword.updateValueAndValidity());
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

  }
}
