import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-security-code',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './security-code.component.html',
  styleUrl: './security-code.component.scss'
})
export class SecurityCodeComponent implements OnInit, OnDestroy{

  selectedUserAccountList: any = null;
  resetDetails: ResetDetails | null = null;
  errorMessage: string | null = null;
  securityCodeForm: FormGroup;

  countdownTime: number = 30;  
  showTimer: boolean = true;  
  isResendDisabled: boolean = true;
  private countdownSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private forgetPasswordService: ForgetPasswordService,
    public router: Router
  ) {
    this.securityCodeForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit(): void {

    this.startCountdown();

    this.forgetPasswordService.getSelectedAccount().subscribe(data => {
      this.selectedUserAccountList = data;
      // console.log('Received data in Enter OTP:', this.selectedUserAccountList);
    });

    this.forgetPasswordService.getResetDetails().subscribe(details => {
      this.resetDetails = details;
      // console.log('Received reset details:', this.resetDetails);
    });
  }

  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  startCountdown() {
    this.isResendDisabled = true;
    this.countdownTime = 30;  
    this.showTimer = true;    

    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.countdownTime > 0) {
        this.countdownTime--;
      } else {
        this.isResendDisabled = false;  
        this.showTimer = false;  
        if (this.countdownSubscription) {
          this.countdownSubscription.unsubscribe();
        }
      }
    });
  }

  validateNumber(event: KeyboardEvent): void {
    const key = event.key;
    if (!/^[0-9]$/.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
      event.preventDefault();
    }
  }

  ResendOTP() {
    this.errorMessage = null;
    if (this.resetDetails) {
      this.forgetPasswordService.sendResetOtp(
        this.resetDetails.userId,
        this.resetDetails.recoveryType,
        this.resetDetails.DoB,
        this.resetDetails.requestType,
        this.resetDetails.userName
      ).subscribe();

      this.startCountdown();

    }
  }

  onSubmit() {

    if (this.securityCodeForm.invalid) {
      this.securityCodeForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
      return;
    }

    const otp = this.securityCodeForm.get('otp')?.value;
    const refPage = "o";
    const reason = "fp";

    if (this.resetDetails) {
      this.forgetPasswordService.submitOTP(
        otp, 
        this.resetDetails.userName, 
        this.resetDetails.requestType, 
        refPage, 
        reason
      ).subscribe(response => {
        if (response.value === '1') {
          this.router.navigate(['setPassword']);
        } else {
          this.showErrorMessage("The code is not correct or expired or you have used this code once.");
        }
      });
    }
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
  }

  goBack() {
    this.router.navigate(['chooseRecovery'], {});
  }

  cancel(){
    this.router.navigate(['findAccount'], {});
  }

}
