import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninWithPasswordComponent } from './signin-with-password.component';

describe('SigninWithPasswordComponent', () => {
  let component: SigninWithPasswordComponent;
  let fixture: ComponentFixture<SigninWithPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninWithPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninWithPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
