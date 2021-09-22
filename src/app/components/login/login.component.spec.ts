import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';

import { LoginComponent } from './login.component';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService = jasmine.createSpyObj('auth', ['login']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        {provide: AuthService, useValue: mockAuthService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should log the user in with the credentials filled out in the form', () => {
    const username = 'test_username';
    const password = 'test_password';

    const usernameField = fixture.debugElement.query(By.css('#username')).nativeElement;
    const passwordField = fixture.debugElement.query(By.css('#password')).nativeElement;
    usernameField.value = username;
    usernameField.dispatchEvent(new Event('input'));
    passwordField.value = password;
    passwordField.dispatchEvent(new Event('input'));

    fixture.debugElement.query(By.css('#loginBtn')).nativeElement.click();
    expect(mockAuthService.login).toHaveBeenCalledWith(username, password);
  });
});
