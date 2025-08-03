import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../../../../../shared/service/forget-password.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  signinForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private forgetPasswordService: ForgetPasswordService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      userCredential: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const userCredential = this.signinForm.get('userCredential')?.value;

    if (!userCredential) {
      this.errorMessage = 'Please enter your user credentials.';
      return;
    }

    this.forgetPasswordService.getUserList(userCredential).subscribe(
      data => {
        console.log('Data', data);
        if(data && data.messageType === "2"){
          this.errorMessage="Couldn't find your My Bdjobs account!";
          return
        }
        this.forgetPasswordService.setSelectedAccount(data);
        this.router.navigate(['forgot-password/passwordSignin'], {});
        
      });

  }


}
