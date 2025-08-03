import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResetDetails } from '../interfaces/reset-details';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  private ApiGetUserListUrl = 'https://my.bdjobs.com/apps/mybdjobs/v1/apps_recovery_userlist_v1.asp';
  private ApiSendOTPUrl = 'https://my.bdjobs.com/apps/mybdjobs/v1/apps_send_otp.asp';
  private ApiSubmitOTPUrl = 'https://mybdjobs.bdjobs.com/mybdjobs/password/checkOtp.asp';
  private ApiSetPasswordUrl = 'https://my.bdjobs.com/apps/mybdjobs/v1/apps_set_password.asp'
  
  private userAccountListSubject = new BehaviorSubject<any[]>([]);
  private selectedAccountSubject = new BehaviorSubject<any>(null);
  private resetDetailsSubject = new BehaviorSubject<ResetDetails | null>(null);

  userAccountList$ = this.userAccountListSubject.asObservable();
  selectedAccount$ = this.selectedAccountSubject.asObservable();

  constructor(private http: HttpClient) {}
  
  getUserList(userInfo: string): Observable<any> {
    const params = new HttpParams()
      .set('userCredentials', userInfo);
  
    return this.http.post<any[]>(this.ApiGetUserListUrl, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      map((response: any) => {
        if (response.data) {
          return response.data;
        } else {
          return response;
        }
      }),
      tap(data => {
        if (Array.isArray(data)) {
          this.userAccountListSubject.next(data);
        }
      })
    );
  }

  sendResetOtp(userId:string, recoveryType:string, DoB:string, requestType:string,userName:string): Observable<any> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('recoveryType', recoveryType)
      .set('dateOfBirth', DoB)
      .set('requestType', requestType)
      .set('userName', userName);
  
    return this.http.post<any[]>(this.ApiSendOTPUrl, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  submitOTP(otp: string, userName: string, requestType:string, refPage:string, reason:string): Observable<any> {
  
    const params = new HttpParams()
      .set('otpCode', otp)
      .set('userName', userName)
      .set('strtype', requestType)
      .set('pgRef', refPage)
      .set('str_reset_code_for', reason);

      return this.http.post<any[]>(this.ApiSubmitOTPUrl, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
  }

  setPassword(userName: string, recoveryType: string, pass: string, conPass:string): Observable<any> {
    const params = new HttpParams()
      .set('userName', userName)
      .set('recoveryType', recoveryType)
      .set('newPassword', pass)
      .set('confirmPassword', conPass);
  
    return this.http.post<any[]>(this.ApiSetPasswordUrl, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  setSelectedAccount(account: any): void {
    this.selectedAccountSubject.next(account);
  }

  getSelectedAccount(): Observable<any> {
    return this.selectedAccount$;
  }

  setResetDetails(details: ResetDetails): void {
    this.resetDetailsSubject.next(details);
  }

  getResetDetails(): Observable<ResetDetails | null> {
    return this.resetDetailsSubject.asObservable();
  }

  hasUserAccounts(): boolean {
    return this.userAccountListSubject.value && this.userAccountListSubject.value.length > 0;
  } // for gaurd

  hasSelectedAccount(): boolean {
    return this.selectedAccountSubject.value != null;
  } // for gaurd

  hasResetDetails(): boolean {
    return this.resetDetailsSubject.value != null;
  } // for gaurd
  
}
