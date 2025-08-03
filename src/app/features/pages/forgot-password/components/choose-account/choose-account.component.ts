import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
 } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ForgetPasswordService } from '../../../../../shared/service/forget-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './choose-account.component.html',
  styleUrl: './choose-account.component.scss'
})
export class ChooseAccountComponent implements OnInit {

  userAccountList: any[] = [];
  chooseAccountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private forgetPasswordService: ForgetPasswordService,
    public router: Router
  ) {
    this.chooseAccountForm = this.fb.group({
      selectedAccount: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.forgetPasswordService.userAccountList$.subscribe(data => {
      this.userAccountList = data;
      // console.log('Received data:', this.userAccountList);
    });

    this.chooseAccountForm.get('selectedAccount')?.valueChanges.subscribe(value => {
      // console.log('Selected Account ID:', value);
    });
  }

  onContinue(): void {
    const selectedAccount = this.chooseAccountForm.get('selectedAccount')?.value;
    const selectedAccountData = this.userAccountList.find(account => account.encryptedUserId === selectedAccount);

    if (selectedAccountData) {
      this.forgetPasswordService.setSelectedAccount(selectedAccountData);
      switch (true) {
      case (selectedAccountData.socialMediaName === 'G' && selectedAccountData.userName === ''):
        this.handleSocialSignIn(selectedAccountData);
        break;
      case (selectedAccountData.socialMediaName === 'L' && selectedAccountData.userName === ''):
        this.handleSocialSignIn(selectedAccountData);
        break;
      default:
        this.handleDefaultSignIn(selectedAccountData);
        break;
      }
    }

    //for social login test only -- remove later
    // if (selectedAccountData) {
    //   this.forgetPasswordService.setSelectedAccount(selectedAccountData);
    //   switch (selectedAccountData.socialMediaName) {
    //     case 'G':
    //       this.handleSocialSignIn(selectedAccountData);
    //       break;
    //     case 'L':
    //       this.handleSocialSignIn(selectedAccountData);
    //       break;
    //     default:
    //       this.handleDefaultSignIn(selectedAccountData);
    //       break;
    //   }
    // }
  }

  handleSocialSignIn(account: any): void {
    this.router.navigate(['accessAccount'], {});
  }

  handleDefaultSignIn(account: any): void {
    if (account.logInStatus === '0') {

      const userName = account.userName;
  
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
      
    } else {
    this.router.navigate(['chooseRecovery'], {});
    }
  }

  goBack() {
    this.router.navigate(['forgetpassword'], {});
  }
}
