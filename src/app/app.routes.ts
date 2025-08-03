import { Routes } from '@angular/router';
import { ForgotPasswordComponent } from './features/pages/forgot-password/forgot-password.component';
import { FindAccountComponent } from './features/pages/forgot-password/components/find-account/find-account.component';
import { WelcomeComponent } from './features/pages/forgot-password/components/welcome/welcome.component';
import { ChooseAccountComponent } from './features/pages/forgot-password/components/choose-account/choose-account.component';
import { AccessAccountComponent } from './features/pages/forgot-password/components/access-account/access-account.component';
import { SecurityCodeComponent } from './features/pages/forgot-password/components/security-code/security-code.component';
import { PasswordSetComponent } from './features/pages/forgot-password/components/password-set/password-set.component';
import { SuccessfulComponent } from './features/pages/forgot-password/components/successful/successful.component';
import { SigninComponent } from './features/pages/forgot-password/components/signin/signin.component';
import { SigninWithPasswordComponent } from './features/pages/forgot-password/components/signin-with-password/signin-with-password.component';
import { chooseAccountGuard, chooseRecoveryGuard, enterOtpGuard, stateGuard } from './core/guard/state.guard';

export const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
    children: [
      {
        path: '',
        component: FindAccountComponent,
      },
      // {
      //   path: 'signin',
      //   component: SigninComponent,
      // },
      // {
      //   path: 'passwordSignin',
      //   component: SigninWithPasswordComponent,
      // },
      {
        path: 'findAccount',
        component: FindAccountComponent,
      },
      {
        path: 'chooseAccount',
        component: ChooseAccountComponent,
        canActivate: [chooseAccountGuard],
      },
      {
        path: 'chooseRecovery',
        component: WelcomeComponent,
        canActivate: [chooseRecoveryGuard],
      },
      {
        path: 'accessAccount',
        component: AccessAccountComponent,
        canActivate: [chooseRecoveryGuard],
      },
      {
        path: 'enterOTP',
        component: SecurityCodeComponent,
        canActivate: [enterOtpGuard],
      },
      {
        path: 'setPassword',
        component: PasswordSetComponent,
        canActivate: [enterOtpGuard],
      },
      {
        path: 'resetSuccess',
        component: SuccessfulComponent,
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
