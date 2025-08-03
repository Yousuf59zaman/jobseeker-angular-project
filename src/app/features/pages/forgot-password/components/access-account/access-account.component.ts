import { Component, OnInit } from '@angular/core';
import { ForgetPasswordService } from '../../../../../shared/service/forget-password.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './access-account.component.html',
  styleUrl: './access-account.component.scss'
})
export class AccessAccountComponent implements OnInit {

  selectedUserAccountList: any = null;

  constructor(
    private forgetPasswordService: ForgetPasswordService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgetPasswordService.getSelectedAccount().subscribe(data => {
      this.selectedUserAccountList = data;
      //console.log('Received data in Access Account Component:', this.selectedUserAccountList);
    });
  }

  signInWithGoogle() {
    // // @ts-ignore
    // window.google.accounts.id.initialize({
    //   client_id: '656340698751-kt8lk3hujr2grfo7rnjmddb85rmg1c2q.apps.googleusercontent.com', // Replace with your actual Client ID
    //   callback: this.handleCredentialResponse.bind(this),
    // });

    // // @ts-ignore
    // window.google.accounts.id.prompt(); 


    window.location.href = 'https://mybdjobs.bdjobs.com/mybdjobs/signin.asp';
  }
  
  goBack() {
    this.router.navigate(['chooseAccount'], {});
  }



}
