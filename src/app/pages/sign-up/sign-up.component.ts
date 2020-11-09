import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user';
import {SHA256} from 'crypto-js';

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
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      agb: [false, [Validators.required]]
    });
  }

  /**
   * Validates the sign up form
   */
  submitForm(): void {
    // Validate form controls
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.loading = true;
      this.signUp(this.username, this.email, this.password);
    }
  }

  /**
   * Sign up
   */
  signUp(username: string, email: string, password: string): void {

  }
}
