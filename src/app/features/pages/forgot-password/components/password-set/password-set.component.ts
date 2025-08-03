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
  selector: 'app-password-set',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './password-set.component.html',
  styleUrl: './password-set.component.scss'
})

export class PasswordSetComponent implements OnInit{

  selectedUserAccountList: any = null;
  resetDetails: ResetDetails | any = null;
  passwordSetForm: FormGroup;
  errorMessage: string | null = null;
  passwordStrength: number = 0;

  constructor(
    private fb: FormBuilder,
    private forgetPasswordService: ForgetPasswordService,
    public router: Router
  ) {
    this.passwordSetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[^*'\-|{}\[\]\/\\;:<>"?~!^,\s]+$/)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.forgetPasswordService.getSelectedAccount().subscribe(data => {
        this.selectedUserAccountList = data;
        // console.log('Received data in Enter OTP:', this.selectedUserAccountList);
      });
        
      this.forgetPasswordService.getResetDetails().subscribe(details => {
        this.resetDetails = details;
        // console.log('Received reset details:', this.resetDetails);
      });
      
      this.passwordSetForm.valueChanges.subscribe(() => {
        this.checkPasswordMatch();
      });
  }

  onSubmit() {
    const password = this.passwordSetForm.get('password')?.value;
    const confirmPassword = this.passwordSetForm.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      this.errorMessage = 'New Password cannot be empty.';
      return;
    }

    if (password.length < 8) {
      this.errorMessage = 'Password minimum 8 characters.';
      return;
    }
    
    if (this.passwordSetForm.get('password')?.invalid) {
      this.errorMessage = 'Password does not allow ", \', %, &, (, ), <, > or space.';
      return;
    }

    if (this.errorMessage) {
          return;
    }
    this.forgetPasswordService.setPassword(
      this.resetDetails.userName,
      this.resetDetails.recoveryType,
      password,
      confirmPassword
    ).subscribe(
      (response: any) => {

        if (response.statuscode === "0" && response.message === "Success") {
          this.router.navigate(['resetSuccess']);
        } else {
          this.errorMessage = 'Failed to reset password. Please try again.';
        }
      }
    );
  }

  goBack() {
    this.router.navigate(['enterOTP'], {});
  }

  cancel(){
    this.router.navigate(['findAccount'], {});
  }


  checkPasswordMatch(): void {
    const password = this.passwordSetForm.get('password')?.value;
    const confirmPassword = this.passwordSetForm.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      this.errorMessage = null; 
      return;
    }

    for (let i = 0; i < confirmPassword.length; i++) {
      if (confirmPassword[i] !== password[i]) {
        this.errorMessage = 'These passwords do not match.';
        return;
      }
    }

    if (confirmPassword.length > password.length) {
      this.errorMessage = 'These passwords do not match.';
    } else {
      this.errorMessage = null; 
    }
  }
  


  barClass: string[] = ['bg-[#F7F8FB]', 'bg-[#F7F8FB]', 'bg-[#F7F8FB]', 'bg-[#F7F8FB]', 'bg-[#F7F8FB]'];

  onPasswordInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    const strength = this.calculateStrength(input);
    this.passwordStrength = strength;
    this.updateBarColors(strength);
  }

  calculateStrength(password: string): number {
    let strength = 0;

    if (password.length > 2) {
      strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      if (password.length >= 8) strength++;
    }

    return strength;
  }

  updateBarColors(strength: number): void {
    this.barClass = ['bg-[#F7F8FB]', 'bg-[#F7F8FB]', 'bg-[#F7F8FB]', 'bg-[#F7F8FB]', 'bg-[#F7F8FB]'];


    if (strength == 1) {
      this.barClass = ['bg-red-500', 'bg - [#F7F8FB]', 'bg - [#F7F8FB]', 'bg - [#F7F8FB]', 'bg - [#F7F8FB]'];
    } else if (strength == 2 ) {
      this.barClass = ['bg-red-500', 'bg-red-500', 'bg - [#F7F8FB]', 'bg - [#F7F8FB]', 'bg - [#F7F8FB]'];
    } else if (strength == 3) {
      this.barClass = ['bg-orange-500', 'bg-orange-500', 'bg-orange-500', 'bg - [#F7F8FB]', 'bg - [#F7F8FB]'];
    } else if (strength ==4 ) {
      this.barClass = ['bg-orange-500', 'bg-orange-500', 'bg-orange-500', 'bg-orange-500', 'bg - [#F7F8FB]'];
    } else if (strength == 5) {
      this.barClass = ['bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-500'];
    }

  }
  
}
