import { Component } from '@angular/core';
import { 
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
 } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ForgetPasswordService } from '../../../../../shared/service/forget-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Add ReactiveFormsModule here
  templateUrl: './find-account.component.html',
  styleUrls: ['./find-account.component.scss']
})
export class FindAccountComponent {

  findAccountForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private forgetPasswordService: ForgetPasswordService,
    public router: Router
  ) {
    this.findAccountForm = this.fb.group({
      userInfo: ['', Validators.required],
    });
  }

  fetchUserAccountList(userInfo: string) {
  this.forgetPasswordService.getUserList(userInfo).subscribe(
    data => {
      if(data && data.messageType === "2"){
        this.showError("Couldn't find your My Bdjobs account!");
        this.markFormFields();
      }else {
        this.router.navigate(['chooseAccount'], {});
        // console.log('Data fetched and stored in service:', data);
      }
    });
  }

  onSubmit() {
    if (this.findAccountForm.valid) {
      const userInfo = this.findAccountForm.value.userInfo;
      this.fetchUserAccountList(userInfo);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
  }
  
  markFormFields() {
    this.findAccountForm.get('userInfo')?.setErrors({ invalid: true });
  }

  goBack() {
    window.location.href = 'https://mybdjobs.bdjobs.com/mybdjobs/signin.asp';
    //this.router.navigate(['forgot-password'], {});
  }

  
}
