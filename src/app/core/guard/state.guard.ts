import { inject } from '@angular/core';
import { Router, type CanActivateChildFn } from '@angular/router';
import { ForgetPasswordService } from '../../shared/service/forget-password.service';

export const stateGuard: CanActivateChildFn = (childRoute, state) => {
  inject(Router);
  console.log('State Guard:', state.url);
  return true;
};

export const chooseAccountGuard: CanActivateChildFn = (route, state) => {
  const forgetPasswordService = inject(ForgetPasswordService);
  const router = inject(Router);

  if (forgetPasswordService.hasUserAccounts()) {
    return true;
  } else {
    router.navigate(['forgot-password/findAccount']);
    return false;
  }
};

export const chooseRecoveryGuard: CanActivateChildFn = (route, state) => {
  const forgetPasswordService = inject(ForgetPasswordService);
  const router = inject(Router);

  if (forgetPasswordService.hasSelectedAccount()) {
    return true;
  } else {
    router.navigate(['forgot-password/findAccount']);
    return false;
  }
}

export const enterOtpGuard: CanActivateChildFn = (route, state) => {
  const forgetPasswordService = inject(ForgetPasswordService);
  const router = inject(Router);

  if (forgetPasswordService.hasSelectedAccount() && forgetPasswordService.hasResetDetails()) {
    return true;
  } else {
    router.navigate(['forgot-password/findAccount']);
    return false;
  }
}