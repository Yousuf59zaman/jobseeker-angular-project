import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../../../../../shared/service/forget-password.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin-with-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin-with-password.component.html',
  styleUrl: './signin-with-password.component.scss'
})
export class SigninWithPasswordComponent implements OnInit {

  userAccount: any = null;
  passwordSigninForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private forgetPasswordService: ForgetPasswordService,
    public router: Router
  ) {
    this.passwordSigninForm = this.fb.group({
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.forgetPasswordService.getSelectedAccount().subscribe(data => {
      this.userAccount = data[0];
      //console.log('Received data in this component:', this.userAccount);
    });
  }

}
