import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginDetails } from 'src/app/models/login-details';
import { LoginResponse } from 'src/app/models/login-response';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockHttp: any;
  let mockRouter: any;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('http', ['post']);
    mockRouter = jasmine.createSpyObj('router', ['navigate']);

    //Set up the test module, providing a mocked HTTP client
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttp },
        { provide: Router, useValue: mockRouter },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  describe('Logging in', () => {
    const testUserName = 'test_username';
    const testPassword = 'test_password';
    const mockDecodedJWT = {
      exp: 12345,
    };
    const mockLoginResponse: LoginResponse = {
      accessToken: 'this_is_a_fake_jwt',
      refreshToken: 'this_is_a_fake_refreshToken',
      username: testUserName,
    };

    beforeEach(() => {
      spyOn(service, 'decodeToken').and.returnValue(mockDecodedJWT);
      mockHttp.post.and.returnValue(of(mockLoginResponse));
      service.login(testUserName, testPassword);
    });

    it('navigates the user to the home page', () => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
    });

    it('stores the relevant user information in local storage', () => {
      const authDetails: LoginDetails = JSON.parse(localStorage.getItem(service.AUTH_DETAILS_KEY) ?? '');
      expect(authDetails.accessToken).toEqual(mockLoginResponse.accessToken);
      expect(authDetails.refreshToken).toEqual(mockLoginResponse.refreshToken);
      expect(authDetails.username).toEqual(mockLoginResponse.username);
      expect(authDetails.expires).toEqual(mockDecodedJWT.exp);
    });    

    it('emits the login status', () => {
      service.loggedIn$.subscribe(isLoggedIn => {
        expect(isLoggedIn).toBeTruthy();
      });
    });
  });

  describe('Logging out', () => {
    beforeEach(() => {
      mockHttp.post.and.returnValue(of(null));
      service.logout();
    });

    it('navigates the user to the home page', () => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
    });

    it('emits the login status', () => {
      service.loggedIn$.subscribe(isLoggedIn => {
        expect(isLoggedIn).toBeFalse();
      });
    });
  });
});
