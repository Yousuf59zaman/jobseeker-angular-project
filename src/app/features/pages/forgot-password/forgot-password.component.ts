import { Component } from '@angular/core';
import { BdjobsInfoComponent } from "./components/bdjobs-info/bdjobs-info.component";
import { FindAccountComponent } from "./components/find-account/find-account.component";
import { BdjobsInfoData } from '../../../shared/utils/bdjobs-info.data';
import { ChooseAccountComponent } from "./components/choose-account/choose-account.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { SecurityCodeComponent } from "./components/security-code/security-code.component";
import { PasswordSetComponent } from "./components/password-set/password-set.component";
import { SuccessfulComponent } from "./components/successful/successful.component";
import { AccessAccountComponent } from "./components/access-account/access-account.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SigninWithPasswordComponent } from "./components/signin-with-password/signin-with-password.component";
import { NavComponent } from "../../../core/layouts/nav/nav.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [BdjobsInfoComponent, FindAccountComponent, ChooseAccountComponent, WelcomeComponent, SecurityCodeComponent, PasswordSetComponent, SuccessfulComponent, AccessAccountComponent, SigninComponent, SigninWithPasswordComponent, NavComponent,RouterOutlet],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  bdjobsInfo = BdjobsInfoData;
}
