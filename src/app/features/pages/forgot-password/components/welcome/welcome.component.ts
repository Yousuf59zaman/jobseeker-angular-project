import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
 } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ForgetPasswordService } from '../../../../../shared/service/forget-password.service';
import { ResetDetails } from '../../../../../shared/interfaces/reset-details';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {

  selectedUserAccountList: any = null;
  chooseRecoveryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private forgetPasswordService: ForgetPasswordService,
    public router: Router
  ) {
    this.chooseRecoveryForm = this.fb.group({
      resetMethod: ['', Validators.required],
      userId: [''],
      recoveryType: ['2'],
      DoB: [''],
      requestType: [''],
      userName: ['']
    });
  }

  ngOnInit():void {
    this.forgetPasswordService.getSelectedAccount().subscribe(data => {
      this.selectedUserAccountList = data;
      // console.log('Received data in Welcome Component:', this.selectedUserAccountList);

      this.chooseRecoveryForm.patchValue({
        userId: this.selectedUserAccountList.userId,
        DoB: this.selectedUserAccountList.DateOfBirth,
        userName: this.selectedUserAccountList.userName
      });


    });
  }

  onContinue() {
    const selectedMethod = this.chooseRecoveryForm.get('resetMethod')?.value;

    switch (selectedMethod) {
      case 'email':
        this.handleReset(1);
        break;
      case 'sms':
        this.handleReset(2);
        break;
      case 'password':
        this.handlePasswordLogin();
        break;
      default:
        break;
    }
  }

  handleReset(type: number) {
    
    if (type === 1) {
      this.chooseRecoveryForm.get('requestType')?.setValue('Email');
    } else {
      this.chooseRecoveryForm.get('requestType')?.setValue('Mobile');
    }

    const resetDetails: ResetDetails = {
      userId:this.chooseRecoveryForm.get('userId')?.value,
      recoveryType:this.chooseRecoveryForm.get('recoveryType')?.value,
      DoB:"",
      requestType:this.chooseRecoveryForm.get('requestType')?.value,
      userName:this.chooseRecoveryForm.get('userName')?.value,
    };

    this.forgetPasswordService.setResetDetails(resetDetails);

    this.forgetPasswordService.sendResetOtp(
      resetDetails.userId,
      resetDetails.recoveryType,
      resetDetails.DoB,
      resetDetails.requestType,
      resetDetails.userName
    ).subscribe();

    this.router.navigate(['enterOTP']);

  }

  handlePasswordLogin() {
    
    const userName = this.chooseRecoveryForm.get('userName')?.value;
  
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `https://mybdjobs.bdjobs.com/mybdjobs/signinprocess.asp`;
  
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'TXTUSERNAME';
    input.value = userName;
  
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  }

  goBack() {
    this.router.navigate(['chooseAccount'], {});
  }

  cancel(){
    this.router.navigate(['findAccount'], {});
  }
  
}
