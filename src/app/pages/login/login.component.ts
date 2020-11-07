import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SHA256 } from 'crypto-js';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  @Output() login = new EventEmitter<User>();

  validateForm!: FormGroup;
  username: string;
  password: string;
  remember = true;
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
      remember: [true]
    });
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
      // Create user instance and trigger login
      const user = new User();
      user.username = this.username;
      user.password = SHA256(this.password).toString();
      user.accountState = this.remember ? 1 : 0;
      this.login.emit(user);
    }
  }
}
