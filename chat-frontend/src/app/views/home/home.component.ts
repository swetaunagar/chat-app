import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false;

  constructor(
    private authFormBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authFormValidation();
  }

  get forms() {
    return this.registrationForm.controls;
  }

  authFormValidation(): void {
    this.registrationForm = this.authFormBuilder.group({
      name: ['', Validators.required],
    });
  }

  async submittedRegister() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    await this.registerUserAPICall();
    this.router.navigate(['/chat-room']);
  }

  async registerUserAPICall() {
    return new Promise((resolve, reject) => {
      const request: User = this.registrationForm.value;
      this.userService.registerUser(request).subscribe((result) => {
        this.userService.setUser(result.data);
        resolve(result);
      })
    })
  }
}
